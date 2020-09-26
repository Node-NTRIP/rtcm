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

export type TypeKeys<T, U> = {
    [P in keyof T]: U extends T[P] ? P : never;
}[keyof T];

export type FunctionKeys<T> = TypeKeys<T, (...args: any[]) => any>;

export const constructPropertiesKey = Symbol('constructProperties');

export function constructWithProperties<T>(
        this: new () => T,
        properties: Omit<T, FunctionKeys<T>>): T {
    return Object.assign(new this(), properties);
}

export function constructWithPropertiesPlus<T, E extends keyof T = never, I = any>(
        this: (new () => T) & {
            [constructPropertiesKey]?: (exclude: E) => I,
        },
        properties: Omit<T, FunctionKeys<T> | E> & I): T {
    return Object.assign(new this(), properties);
}

export function constructWithPropertiesInternalGuard<T>(
        this: new (internalGuard: never) => T,
        properties: Omit<T, FunctionKeys<T>>): T {
    return Object.assign(new this(<never>undefined), properties);
}

export function constructWithPropertiesInternalGuardPlus<T, E extends keyof T = never, I = {}>(
        this: (new (internalGuard: never) => T) & {
            [constructPropertiesKey]?: (exclude: E) => I,
        },
        properties: Omit<T, FunctionKeys<T> | E> & I): T {
    return Object.assign(new this(<never>undefined), properties);
}

export function constructWithPropertiesAndParameters<T, U extends any[]>(
        this: new (...params: U) => T,
        properties: Omit<T, FunctionKeys<T>>,
        ...parameters: U): T {
    return Object.assign(new this(...parameters), properties);
}

export function constructWithPropertiesAndParametersPlus<T, U extends any[], E extends keyof T = never, I = {}>(
        this: (new (...params: U) => T) & {
            [constructPropertiesKey]?: (exclude: E) => I,
        },
        properties: Omit<T, FunctionKeys<T> | E> & I,
        ...parameters: U): T {
    return Object.assign(new this(...parameters), properties);
}

class Test {
    x = 1;
    y!: number;
}

let x: FunctionKeys<Test>;

let y: Omit<Test, NonNullable<TypeKeys<Test, undefined>>>;