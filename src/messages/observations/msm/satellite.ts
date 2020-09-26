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
    constructPropertiesKey,
    constructWithPropertiesInternalGuardPlus
} from '../../../utils';
import { DF, IfInstanceOf, Int, UInt } from '../../../decode-encode';
import { SPEED_OF_LIGHT } from '../../../constants';
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

export abstract class MsmSatelliteData<T extends MsmSignalData> {
    readonly id!: number;
    readonly signals!: readonly T[];

    constructor(_internalGuard: never) {}

    static construct = constructWithPropertiesInternalGuardPlus;
}

export abstract class Msm123SatelliteData<T extends Msm1SignalData | Msm2SignalData | Msm3SignalData> extends MsmSatelliteData<T> {
    static [constructPropertiesKey]: (exclude: 'roughRangeModulo1Millisecond' | 'roughRangeMicroseconds' | 'roughRangeMeters') =>
            {roughRangeModulo1Millisecond: number} | {roughRangeMicroseconds: number} | {roughRangeMeters: number};

    @DF(398) @UInt(10) roughRangeModulo1Millisecond!: number;

    getRoughRangeMicroseconds(roughRangeIntegerMilliseconds: number): number {
        return roughRangeIntegerMilliseconds * 1000
                + this.roughRangeModulo1Millisecond * 1000 / 2 ** 10;
    }
    set roughRangeMicroseconds(range: number) { this.roughRangeModulo1Millisecond = Math.round((range % 1000) * 2 ** 10 / 1000); }

    getRoughRangeMeters(roughRangeIntegerMilliseconds: number): number {
        return this.getRoughRangeMicroseconds(roughRangeIntegerMilliseconds) * SPEED_OF_LIGHT / 1000_000;
    }
    set roughRangeMeters(range: number) { this.roughRangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }
}

export class Msm1SatelliteData extends Msm123SatelliteData<Msm1SignalData> {}
export class Msm2SatelliteData extends Msm123SatelliteData<Msm2SignalData> {}
export class Msm3SatelliteData extends Msm123SatelliteData<Msm3SignalData> {}

export abstract class Msm4567SatelliteData<T extends Msm4SignalData | Msm5SignalData | Msm6SignalData | Msm7SignalData> extends MsmSatelliteData<T> {
    static [constructPropertiesKey]: (exclude: 'roughRangeIntegerMilliseconds' | 'roughRangeModulo1Millisecond' |
            'roughRangeMicroseconds' | 'roughRangeMeters') =>
            {roughRangeIntegerMilliseconds: number, roughRangeModulo1Millisecond: number} |
            {roughRangeMicroseconds: number} | {roughRangeMeters: number};

    @DF(397) @UInt(8) roughRangeIntegerMilliseconds!: number;
    @UInt(4) @IfInstanceOf(() => Msm57SatelliteData) protected extendedInformation!: number;
    @DF(398) @UInt(10) roughRangeModulo1Millisecond!: number;
    @DF(399) @Int(14) @IfInstanceOf(() => Msm57SatelliteData) protected roughPhaserangeRateMetersPerSecond!: number;

    get roughRangeMicroseconds(): number {
        return this.roughRangeIntegerMilliseconds * 1000 + this.roughRangeModulo1Millisecond * 1000 / 2 ** 10;
    }
    set roughRangeMicroseconds(range: number) {
        this.roughRangeIntegerMilliseconds = Math.floor(range / 1000);
        this.roughRangeModulo1Millisecond = Math.round((range % 1000) * (2 ** 10) / 1000);
    }

    get roughRangeMeters(): number { return this.roughRangeMicroseconds * SPEED_OF_LIGHT / 1000_000; }
    set roughRangeMeters(range: number) { this.roughRangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }
}

export abstract class Msm46SatelliteData<T extends Msm4SignalData | Msm6SignalData> extends Msm4567SatelliteData<T> {}
export class Msm4SatelliteData extends Msm46SatelliteData<Msm4SignalData> {}
export class Msm6SatelliteData extends Msm46SatelliteData<Msm6SignalData> {}

export abstract class Msm57SatelliteData<T extends Msm5SignalData | Msm7SignalData> extends Msm4567SatelliteData<T> {
    public extendedInformation!: number;
    public roughPhaserangeRateMetersPerSecond!: number;
}
export class Msm5SatelliteData extends Msm57SatelliteData<Msm5SignalData> {}
export class Msm7SatelliteData extends Msm57SatelliteData<Msm7SignalData> {}