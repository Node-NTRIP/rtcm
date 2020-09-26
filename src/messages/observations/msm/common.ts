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

import {
    Bool,
    CustomDecoder,
    CustomEncoder,
    DF,
    getDecoderEncoder,
    Skip,
    UInt
} from '../../../decode-encode';
import { RtcmMessage } from '../../../rtcm';
import { BitStream } from 'bit-buffer-ts';
import {
    Msm1SatelliteData,
    Msm2SatelliteData,
    Msm3SatelliteData,
    Msm4SatelliteData,
    Msm5SatelliteData,
    Msm6SatelliteData,
    Msm7SatelliteData,
    MsmSatelliteData
} from './satellite';
import {
    Msm1SignalData,
    Msm2SignalData,
    Msm3SignalData,
    Msm4SignalData,
    Msm5SignalData,
    Msm6SignalData,
    Msm7SignalData,
    MsmSignalData
} from './signal';
import { constructPropertiesKey } from '../../../utils';

export class MsmHeaderInfo {
    satelliteMask!: boolean[];
    signalMask!: boolean[];
    cellMask!: boolean[];

    satelliteIds: number[] = [];
    signalIds: number[] = [];
    get cellCount(): number { return this.satelliteIds.length * this.signalIds.length; }
}

export abstract class RtcmMessageMsm<T extends MsmSatelliteData<U>, U extends MsmSignalData> extends RtcmMessage {
    static [constructPropertiesKey]: (exclude: 'info') => {};

    protected constructor(
            internalGuard: never,
            private readonly satelliteConstructor: new (_internalGuard: never) => T,
            private readonly signalConstructor: new (_internalGuard: never) => U
    ) {
        super(internalGuard);
    }

    @DF(3) @UInt(12) referenceStationId!: number;
    @UInt(30) gnssEpochTime!: number;
    @DF(393) @Bool multipleMessage!: boolean;
    @DF(409) @UInt(3) issueOfDataStation!: number;
    @DF(1) @Skip(7) private skip2?: void;
    @DF(411) @UInt(2) clockSteeringIndicator!: number;
    @DF(412) @UInt(2) externalClockIndicator!: number;
    @DF(417) @Bool divergenceFreeSmoothingIndicator!: boolean;
    @DF(418) @UInt(3) smoothingInterval!: number;

    @CustomDecoder
    private decodeBody(s: BitStream) {
        const satelliteDecoder = getDecoderEncoder(this.satelliteConstructor).decoder;
        const signalDecoder = getDecoderEncoder(this.signalConstructor).decoder;

        this._satellites = [];

        // Read satellite mask
        this.info.satelliteMask = s.readBitArray(64);
        this.info.signalMask = s.readBitArray(32);

        // Extract ids
        for (let i = 0; i < 64; i++) {
            if (this.info.satelliteMask[i]) {
                const satellite = new this.satelliteConstructor(<never>undefined);
                (satellite as {id: number}).id = i + 1;
                this._satellites.push(satellite);
                this.info.satelliteIds.push(i + 1);
            }
        }
        for (let i = 0; i < 32; i++) if (this.info.signalMask[i]) this.info.signalIds.push(i + 1);

        // Read cell mask
        this.info.cellMask = s.readBitArray(this.info.cellCount);

        let cellMaskIndex = 0;
        for (const satellite of this._satellites) {
            const signals = [];
            for (let j = 0; j < this.info.signalIds.length; j++) {
                if (this.info.cellMask[cellMaskIndex++]) {
                    const signal = new this.signalConstructor(<never>undefined);
                    (signal as {id: number}).id = this.info.signalIds[j];
                    signals.push(signal);
                }
            }
            (satellite as {signals: readonly U[]}).signals = signals;
        }

        // Read satellites
        for (const satellite of this._satellites) satelliteDecoder.run(satellite, s);

        // Read signals
        for (const satellite of this._satellites)
            for (const signal of satellite.signals)
                signalDecoder.run(signal, s);
    }

    @CustomEncoder
    private encodeBody(s: BitStream) {
        const satelliteEncoder = getDecoderEncoder(this.satelliteConstructor).encoder;
        const signalEncoder = getDecoderEncoder(this.signalConstructor).encoder;

        // Write satellite, signal and cell masks
        s.writeBitArray(this.info.satelliteMask);
        s.writeBitArray(this.info.signalMask);
        s.writeBitArray(this.info.cellMask);

        // Write satellites
        for (const satellite of this._satellites) {
            satelliteEncoder.run(satellite, s);
        }

        // Write signals
        for (const satellite of this._satellites) {
            for (const signal of satellite.signals) {
                signalEncoder.run(signal, s);
            }
        }
    }

    info: MsmHeaderInfo = new MsmHeaderInfo();

    private _satellites!: Readonly<T>[];
    get satellites(): readonly Readonly<T>[] { return this._satellites; }
    set satellites(satellites: readonly Readonly<T>[]) {
        this._satellites = Array.from(satellites).sort((a, b) => a.id - b.id);

        const satelliteSignalsMap = satellites.map(satellite =>
                satellite.signals.reduce(
                        (mask, signal) => mask | (0b1 << (signal.id - 1)), 0
                )
        );
        const signalsMask = satelliteSignalsMap.reduce((mask, satelliteMask) => mask | satelliteMask);

        this.info.satelliteMask = new Array(64).fill(false);
        this.info.satelliteIds = satellites.map(satellite => satellite.id);
        for (const satelliteId of this.info.satelliteIds) this.info.satelliteMask[satelliteId - 1] = true;

        this.info.signalMask = new Array(32).fill(false);
        this.info.signalIds = [];
        for (let i = 0; i < 32; i++) {
            if (((signalsMask >> i) & 0b1) === 0) continue;
            this.info.signalMask[i] = true;
            this.info.signalIds.push(i + 1);
        }

        this.info.cellMask = new Array(this.info.cellCount);
        let cellMaskIndex = 0;
        for (const satelliteSignals of satelliteSignalsMap) {
            for (const signalId of this.info.signalIds) {
                this.info.cellMask[cellMaskIndex++] = ((satelliteSignals >> (signalId - 1)) & 0b1) === 1;
            }
        }
    }
}

export abstract class RtcmMessageMsm1 extends RtcmMessageMsm<Msm1SatelliteData, Msm1SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm1SatelliteData, Msm1SignalData); }
}
export abstract class RtcmMessageMsm2 extends RtcmMessageMsm<Msm2SatelliteData, Msm2SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm2SatelliteData, Msm2SignalData); }
}
export abstract class RtcmMessageMsm3 extends RtcmMessageMsm<Msm3SatelliteData, Msm3SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm3SatelliteData, Msm3SignalData); }
}
export abstract class RtcmMessageMsm4 extends RtcmMessageMsm<Msm4SatelliteData, Msm4SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm4SatelliteData, Msm4SignalData); }
}
export abstract class RtcmMessageMsm5 extends RtcmMessageMsm<Msm5SatelliteData, Msm5SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm5SatelliteData, Msm5SignalData); }
}
export abstract class RtcmMessageMsm6 extends RtcmMessageMsm<Msm6SatelliteData, Msm6SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm6SatelliteData, Msm6SignalData); }
}
export abstract class RtcmMessageMsm7 extends RtcmMessageMsm<Msm7SatelliteData, Msm7SignalData> {
    constructor(internalGuard: never) { super(internalGuard, Msm7SatelliteData, Msm7SignalData); }
}