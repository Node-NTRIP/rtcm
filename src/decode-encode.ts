/*
 * This file is part of the @gnss/rtcm distribution (https://github.com/node-ntrip/rtcm).
 * Copyright (c) 2020 Nebojsa Cvetkovic.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import 'reflect-metadata';
import { BitStream } from 'bit-buffer-ts';
import { TextDecoder } from "util";

class Coder {
    private static readonly definitions: any[] = [];
    static define(definition: any): string {
        return `this.definitions[${Coder.definitions.push(definition) - 1}]`;
    }

    private readonly definitions = Coder.definitions;

    private lines: string[] = [];

    constructor(private readonly parent?: Coder) {}

    code(...code: string[]) {
        this.lines.push(...code);
    }

    set(prop: any, code: string) {
        this.code(`o.${prop} = ${code}`);
    }

    get fullLines(): string[] {
        return [...this.parent?.fullLines ?? [], ...this.lines];
    }

    get fullScript(): string {
        return this.fullLines.join('\n') + '\n';
    }

    compiled?: (o: Object, s: BitStream) => void;

    /**
     * Runs the generated coder script to de/encode a bit stream to/from the object
     *
     * @param o Object to de/encode
     * @param s BitStream to de/encode to/from
     */
    run(o: Object, s: BitStream): Object {
        this.parent?.run(o, s);
        if (this.compiled === undefined)
            this.compiled = new Function('o', 's', this.lines.join('\n')) as any;
        this.compiled!(o, s);
        return o;
    }
}

export class DecoderEncoder {
    readonly encoder: Coder;
    readonly decoder: Coder;

    static readonly utf8Decoder = Coder.define(new TextDecoder('utf8'));
    static readonly latin1Decoder = Coder.define(new TextDecoder('latin1'));

    static readonly utf8Encoder = Coder.define(new TextEncoder());

    constructor(private readonly parent?: DecoderEncoder) {
        this.encoder = new Coder(parent?.encoder);
        this.decoder = new Coder(parent?.decoder);
    }

    skip(bits: number): void {
        this.decoder.code(`s.index += ${bits};`);
        this.encoder.code(`s.writeBits(0, ${bits});`);
    }

    array(prop: string, count: string | number) {
        let length = typeof count === 'number' ? count : `o.${count}`;

        this.decoder.set(prop, `[]`);
        this.decoder.code(`for (let i = 0; i < ${length}; i++)`);

        this.encoder.code(`if (o.${prop}.length !== ${length})`,
                `\tthrow new Error("Incorrect number of elements in " + o.constructor.name + "['${prop}']: " + o.${prop}.length + " found, " + ${length} + " expected (max)");`)
        this.encoder.code(`for (let i = 0; i < ${length}; i++)`);
    }

    arrayLength(prop: string, bits: number, arrayProp: string) {
        this.encoder.set(prop, `Math.min(o.${arrayProp}.length, ${2 ** bits})`);
        this.unsigned(prop, bits);
    }

    object(prop: string, constructor: (new () => any) | (new (internalGuard: never) => any)): void {
        const ode = getDecoderEncoder(constructor);

        const constructorDef = Coder.define(constructor);
        const odeDef = Coder.define(ode);

        this.decoder.set(prop, `${odeDef}.decoder.run(new ${constructorDef}(), s);`)
        this.encoder.code(`${odeDef}.encoder.run(o.${prop}, s);`);
    }

    customDecoder(method: any) {
        this.decoder.code(`o.${method}(s);`);
    }

    customEncoder(method: any) {
        this.encoder.code(`o.${method}(s);`);
    }

    if(prop: any) {
        this.decoder.code(`if (o.${prop})`);
        this.encoder.code(`if (o.${prop})`);
    }

    ifInstanceOf(constructor: Function) {
        const constructorDef = Coder.define(constructor);

        this.decoder.code(`if (o instanceof ${constructorDef}())`);
        this.encoder.code(`if (o instanceof ${constructorDef}())`);
    }

    unsigned = (prop: any, bits: number): void => this.number(prop, false, bits);
    signed = (prop: any, bits: number): void => this.number(prop, true, bits);

    number(prop: any, signed: boolean, bits: number): void {
        this.decoder.set(prop, `s.readBits(${bits}, ${signed});`);

        this.encoder.code(`s.writeBits(o.${prop}, ${bits});`);
    }

    numberSignMagnitude(prop: any, bits: number): void {
        this.decoder.set(prop, `(s.readBoolean() ? -1 : 1) * s.readBits(${bits - 1});`);

        this.encoder.code(`s.writeBits(Math.abs(o.${prop}) | (o.${prop} < 0 ? (1 << ${bits - 1}) : 0), ${bits});`);
    }

    boolean(prop: any): void {
        this.decoder.set(prop, 's.readBoolean();');

        this.encoder.code(`s.writeBoolean(o.${prop});`);
    }

    latin1(prop: any, lengthBits: number): void {
        this.decoder.set(prop, `s.readString(s.readBits(${lengthBits}), ${DecoderEncoder.latin1Decoder});`);

        this.encoder.code(`{`,
                `\ts.writeBits(o.${prop}.length, ${lengthBits});`,
                `\tfor (let i = 0; i < o.${prop}.length; i++) {`,
                    `\t\tconst cp = o.${prop}.codePointAt(i);`,
                    `\t\tif (cp > 255)`,
                        `\t\t\tthrow new Error("Invalid latin1 codepoint " + cp);`,
                    `\ts.writeUint8(cp);`,
                `\t}`,
        `}`);
    }

    utf8(prop: any, charactersBits: number, lengthBits: number): void {
        this.decoder.code('{',
                `\ts.index += ${charactersBits};`,
                `\to.${prop} = s.readString(s.readBits(${lengthBits}), ${DecoderEncoder.utf8Decoder});`,
        '}');

        this.encoder.code('{',
                `\tlet encoded = ${DecoderEncoder.utf8Encoder}.encode(o.${prop});`,
                `\ts.writeBits(o.${prop}.length, ${charactersBits});`,
                `\ts.writeBits(encoded.length, ${lengthBits});`,
                `\ts.writeBuffer(encoded);`,
        '}');
    }
}

const decoderEncoderKey = Symbol('decoderEncoder');
export function getDecoderEncoder(target: any): DecoderEncoder {
    const c = (target.hasOwnProperty('constructor') ? target.constructor : target) as any;

    if (!Reflect.hasOwnMetadata(decoderEncoderKey, c))
        Reflect.defineMetadata(decoderEncoderKey,
                new DecoderEncoder(Reflect.getMetadata(decoderEncoderKey, c)), c);

    return Reflect.getMetadata(decoderEncoderKey, c) as DecoderEncoder;
}

function propertyDecorator(f: (decoderEncoder: DecoderEncoder, propertyKey: any) => void): PropertyDecorator {
    return (target: any, propertyKey: any): void => {
        f(getDecoderEncoder(target), propertyKey);
    }
}

export const Int = (bits: number) => propertyDecorator((de, key) => de.signed(key, bits));
export const UInt = (bits: number) => propertyDecorator((de, key) => de.unsigned(key, bits));
export const IntSM = (bits: number) => propertyDecorator((de, key) => de.numberSignMagnitude(key, bits));

export const Bool = propertyDecorator((de, key) => de.boolean(key));

export const Latin1 = (lengthBits: number) => propertyDecorator((de, key) => de.latin1(key, lengthBits));
export const Utf8 = (charactersBits: number, lengthBits: number) => propertyDecorator((de, key) => de.utf8(key, charactersBits, lengthBits));

export const Obj = (constructor: (new () => any) | (new (internalGuard: never) => any)) => propertyDecorator((de, key) => de.object(key, constructor));
export const Arr = (length: string | number, type: PropertyDecorator) =>
        (target: any, propertyKey: any): void => {
            getDecoderEncoder(target).array(propertyKey, length);
            type(target, propertyKey + '[i]');
        }
export const ArrLength = (bits: number, arrayProp: string) => propertyDecorator((de, key) => de.arrayLength(key, bits, arrayProp));

export const If = (prop: string) => propertyDecorator((de) => de.if(prop));
export const IfInstanceOf = (constructor: () => Function) => propertyDecorator((de) => de.ifInstanceOf(constructor))
export const Skip = (bits: number) => propertyDecorator((de) => de.skip(bits));

export const CustomDecoder = propertyDecorator((de, key) => de.customDecoder(key));
export const CustomEncoder = propertyDecorator((de, key) => de.customEncoder(key));

const dfMetadataKey = Symbol('df');
export const DF = (number: number) => Reflect.metadata(dfMetadataKey, number);