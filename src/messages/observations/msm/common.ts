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
import { BitStream } from '@ntrip/bit-buffer';
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

export abstract class RtcmMessageMsm<T extends MsmSatelliteData<U>, U extends MsmSignalData> extends RtcmMessage {
    protected constructor(
            internalGuard: never,
            private readonly satelliteConstructor: new () => T,
            private readonly signalConstructor: new () => U
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

        this.satellites = [];

        // Read satellite mask
        for (let i = 1; i <= 64; i++) {
            if (s.readBoolean()) {
                const satellite = new this.satelliteConstructor();
                satellite.id = i;
                satellite.signals = [];
                this.satellites.push(satellite);
            }
        }

        // Read signal mask
        const signalIds: number[] = [];
        for (let i = 1; i <= 32; i++) if (s.readBoolean()) signalIds.push(i);

        // Read cell mask
        for (const satellite of this.satellites) {
            for (let i = 0; i < signalIds.length; i++) {
                if (s.readBoolean()) {
                    const signal = new this.signalConstructor();
                    signal.id = signalIds[i];
                    satellite.signals.push(signal);
                }
            }
        }

        // Read satellites
        for (const satellite of this.satellites) satelliteDecoder.run(satellite, s);

        // Read signals
        for (const satellite of this.satellites)
            for (const signal of satellite.signals)
                signalDecoder.run(signal, s);
    }

    @CustomEncoder
    private encodeBody(s: BitStream) {
        const satelliteEncoder = getDecoderEncoder(this.satelliteConstructor).encoder;
        const signalEncoder = getDecoderEncoder(this.signalConstructor).encoder;

        const signalsMap: Record<number, true> = {};
        const satellitesMap: Record<number, T> = {};
        const satelliteSignalsMap: Record<number, Record<number, U>> = {};

        // Map satellites and signals to objects for encoding
        for (const satellite of this.satellites) {
            satellitesMap[satellite.id] = satellite;
            satelliteSignalsMap[satellite.id] = {};
            for (const signal of satellite.signals) {
                signalsMap[signal.id] = true;
                satelliteSignalsMap[satellite.id][signal.id] = signal;
            }
        }

        // Write satellite and signal masks
        for (let i = 1; i <= 64; i++) s.writeBoolean(satellitesMap[i] !== undefined);
        for (let i = 1; i <= 32; i++) s.writeBoolean(signalsMap[i] !== undefined);

        // Extract unique signal IDs
        const signalIds = Object.keys(signalsMap).map(Number);

        // Write cell mask
        for (const satellite of Object.values(satellitesMap)) {
            for (const signalId of signalIds) {
                s.writeBoolean(satelliteSignalsMap[satellite.id][signalId] !== undefined);
            }
        }

        // Write satellites
        for (const satellite of Object.values(satellitesMap)) {
            satelliteEncoder.run(satellite, s);
        }

        // Write signals
        for (const signals of Object.values(satelliteSignalsMap)) {
            for (const signal of Object.values(signals)) {
                signalEncoder.run(signal, s);
            }
        }
    }

    satellites!: T[];
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