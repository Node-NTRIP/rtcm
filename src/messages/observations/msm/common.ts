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
    satelliteMask!: [number, number];
    signalMask!: number;
    cellMask!: number[];

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
        this._info.satelliteMask = [s.readUint32(), s.readUint32()];
        this._info.signalMask = s.readUint32();

        // Extract ids
        for (let m = 0; m < 1; m++) {
            for (let i = 1; i <= 32; i++) {
                const id = (m << 5) + i;
                if ((this._info.satelliteMask[m] >> (32 - i)) & 0b1) {
                    const satellite = new this.satelliteConstructor(<never>undefined);
                    (satellite as {id: number}).id = id;
                    this._satellites.push(satellite);
                    this._info.satelliteIds.push(id);
                }
            }
        }
        for (let i = 1; i <= 32; i++) if ((this._info.signalMask >> (32 - i)) & 0b1) this._info.signalIds.push(i);

        // Read cell mask
        this._info.cellMask = [];
        for (let i = 0; i < this._info.satelliteIds.length; i++) this._info.cellMask[i] = s.readBits(this._info.signalIds.length);

        // Read satellites
        for (const satellite of this._satellites) satelliteDecoder.run(satellite, s);

        // Read signals
        for (let i = 0; i < this._info.satelliteIds.length; i++) {
            const signals = [];
            for (let j = 0; j < this._info.signalIds.length; j++) {
                if ((this._info.cellMask[i] >> (this._info.signalIds.length - j - 1)) & 0b1) {
                    const signal = new this.signalConstructor(<never>undefined);
                    (signal as {id: number}).id = this._info.signalIds[j];
                    signalDecoder.run(signal, s);
                    signals.push(signal);
                }
            }
            (this.satellites[i] as {signals: readonly U[]}).signals = signals;
        }
    }

    @CustomEncoder
    private encodeBody(s: BitStream) {
        const satelliteEncoder = getDecoderEncoder(this.satelliteConstructor).encoder;
        const signalEncoder = getDecoderEncoder(this.signalConstructor).encoder;

        // Write satellite, signal and cell masks
        s.writeUint32(this._info.satelliteMask[0]);
        s.writeUint32(this._info.satelliteMask[1]);
        s.writeUint32(this._info.signalMask);
        for (const cellMask of this._info.cellMask) s.writeBits(cellMask, this._info.signalIds.length);

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

    private _info: MsmHeaderInfo = new MsmHeaderInfo();
    get info(): Readonly<MsmHeaderInfo> { return this._info; }

    private _satellites!: Readonly<T>[];
    get satellites(): readonly Readonly<T>[] { return this._satellites; }
    set satellites(satellites: readonly Readonly<T>[]) {
        // Sort satellites by ID
        this._satellites = Array.from(satellites)
                .sort((a, b) => a.id - b.id);

        // Create mask for satellite signals
        const satelliteSignalsMap = satellites.map(satellite =>
                satellite.signals.reduce(
                        (mask, signal) => mask | (0b1 << (32 - signal.id)), 0
                ) >>> 0
        );

        // Satellite mask
        this._info.satelliteMask = [0, 0];
        this._info.satelliteMask[0] = satellites.filter(satellite => satellite.id <= 32)
                .reduce((mask, satellite) => mask | (0b1 << (32 - satellite.id)), 0) >>> 0;
        this._info.satelliteMask[1] = satellites.filter(satellite => satellite.id > 32)
                .reduce((mask, satellite) => mask | (0b1 << (64 - satellite.id)), 0) >>> 0;

        // Satellite ids
        this._info.satelliteIds = this.satellites.map(satellite => satellite.id);

        // Overall signal mask is the OR of each satellite signal mask
        this._info.signalMask = satelliteSignalsMap.reduce((mask, satelliteMask) => mask | satelliteMask) >>> 0;

        // Signal ids
        this._info.signalIds = [];
        for (let i = 1; i <= 32; i++) if (((this._info.signalMask >> (32 - i)) & 0b1) === 1) this._info.signalIds.push(i);

        // Cell mask for each satellite
        this._info.cellMask = new Array(satellites.length).fill(0);
        for (let i = 0; i < satellites.length; i++) {
            for (let j = 0; j < this._info.signalIds.length; j++) {
                if (((satelliteSignalsMap[i] >> (32 - this._info.signalIds[j])) & 0b1) === 1)
                    this.info.cellMask[i] |= 0b1 << (this._info.signalIds.length - j - 1);
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