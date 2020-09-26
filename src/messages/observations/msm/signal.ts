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
import { Bool, DF, IfInstanceOf, Int, UInt } from '../../../decode-encode';
import {
    msmExtendedLockIndicatorToTime,
    msmExtendedLockTimeToIndicator,
    msmLockIndicatorToTime,
    msmLockTimeToIndicator
} from '../common';
import { Msm2SatelliteData, Msm3SatelliteData } from './satellite';
import { SPEED_OF_LIGHT } from '../../../constants';

export class MsmSignalData {
    readonly id!: number;

    constructor(_internalGuard: never) {}

    static [constructPropertiesKey]: (exclude: never) => {};
    static construct = constructWithPropertiesInternalGuardPlus;
}

export class Msm1SignalData extends MsmSignalData {
    static [constructPropertiesKey]: (exclude: 'finePseudorange' | 'finePseudorangeMicroseconds' | 'finePseudorangeMeters') =>
            {finePseudorange: number} | {finePseudorangeMicroseconds: number} | {finePseudorangeMeters: number};

    @DF(400) @Int(15) finePseudorange!: number;
    get finePseudorangeMicroseconds(): number { return this.finePseudorange * 1000 / 2 ** 24; }
    set finePseudorangeMicroseconds(range: number) { this.finePseudorange = range * 2 ** 24 / 1000; }
    get finePseudorangeMeters(): number { return this.finePseudorangeMicroseconds * SPEED_OF_LIGHT / 1000_000; }
    set finePseudorangeMeters(range: number) { this.finePseudorangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }
}

export abstract class Msm23SignalData extends MsmSignalData {
    @DF(400) @Int(15) @IfInstanceOf(() => Msm3SignalData) protected finePseudorange!: number;

    @DF(401) @Int(22) finePhaserange!: number;
    get finePhaserangeMicroseconds(): number { return this.finePhaserange * 1000 / 2 ** 29; }
    set finePhaserangeMicroseconds(range: number) { this.finePhaserange = range * 2 ** 29 / 1000; }
    get finePhaserangeMeters(): number { return this.finePhaserangeMicroseconds * SPEED_OF_LIGHT / 1000_000; }
    set finePhaserangeMeters(range: number) { this.finePhaserangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }

    @DF(402) @UInt(4) phaserangeLockTimeIndicator!: number;
    get phaserangeLockTimeMillis(): number { return msmLockIndicatorToTime(this.phaserangeLockTimeIndicator); }
    set phaserangeLockTimeMillis(time: number) { this.phaserangeLockTimeIndicator = msmLockTimeToIndicator(time); }

    @DF(420) @Bool halfCycleAmbiguityIndicator!: boolean;
}

export class Msm2SignalData extends Msm23SignalData {
    static [constructPropertiesKey]: (exclude:
            'phaserangeLockTimeIndicator' | 'phaserangeLockTimeMillis' |
            'finePhaserange' | 'finePhaserangeMicroseconds' | 'finePhaserangeMeters') =>
            ({phaserangeLockTimeIndicator: number} | {phaserangeLockTimeMillis: number}) &
            ({finePhaserange: number} | {finePhaserangeMicroseconds: number} | {finePhaserangeMeters: number});
}

export class Msm3SignalData extends Msm23SignalData {
    static [constructPropertiesKey]: (exclude:
            'phaserangeLockTimeIndicator' | 'phaserangeLockTimeMillis' |
            'finePseudorange' | 'finePseudorangeMicroseconds' | 'finePseudorangeMeters' |
            'finePhaserange' | 'finePhaserangeMicroseconds' | 'finePhaserangeMeters') =>
            ({phaserangeLockTimeIndicator: number} | {phaserangeLockTimeMillis: number}) &
            ({finePseudorange: number} | {finePseudorangeMicroseconds: number} | {finePseudorangeMeters: number}) &
            ({finePhaserange: number} | {finePhaserangeMicroseconds: number} | {finePhaserangeMeters: number});

    // Expose protected
    public finePseudorange!: number;
    get finePseudorangeMicroseconds(): number { return this.finePseudorange * 1000 / 2 ** 24; }
    set finePseudorangeMicroseconds(range: number) { this.finePseudorange = range * 2 ** 24 / 1000; }
    get finePseudorangeMeters(): number { return this.finePseudorangeMicroseconds * SPEED_OF_LIGHT / 1000_000; }
    set finePseudorangeMeters(range: number) { this.finePseudorangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }
}

export class Msm4SignalData extends Msm3SignalData {
    @DF(403) @UInt(6) cnr!: number;
}

export class Msm5SignalData extends Msm4SignalData {
    static [constructPropertiesKey]: (exclude:
            'phaserangeLockTimeIndicator' | 'phaserangeLockTimeMillis' |
            'finePseudorange' | 'finePseudorangeMicroseconds' | 'finePseudorangeMeters' |
            'finePhaserange' | 'finePhaserangeMicroseconds' | 'finePhaserangeMeters' |
            'finePhaserangeRate' | 'finePhaserangeRateMetersPerSecond') =>
            ({phaserangeLockTimeIndicator: number} | {phaserangeLockTimeMillis: number}) &
            ({finePseudorange: number} | {finePseudorangeMicroseconds: number} | {finePseudorangeMeters: number}) &
            ({finePhaserange: number} | {finePhaserangeMicroseconds: number} | {finePhaserangeMeters: number}) &
            ({finePhaserangeRate: number} | {finePhaserangeRateMetersPerSecond: number});

    @DF(404) @Int(15) finePhaserangeRate!: number;

    get finePhaserangeRateMetersPerSecond(): number { return this.finePhaserangeRate / 10000; }
    set finePhaserangeRateMetersPerSecond(rangeRate: number) { this.finePhaserangeRate = rangeRate * 10000; }
}

export class Msm6SignalData extends MsmSignalData {
    static [constructPropertiesKey]: (exclude: 'phaserangeLockTimeIndicatorExtendedRangeResolution' | 'phaserangeLockTimeMillis' |
            'finePseudorangeExtendedResolution' | 'finePseudorangeMicroseconds' | 'finePseudorangeMeters' |
            'finePhaserangeExtendedResolution' | 'finePhaserangeMicroseconds' | 'finePhaserangeMeters') =>
            ({phaserangeLockTimeIndicatorExtendedRangeResolution: number} | {phaserangeLockTimeMillis: number}) &
            ({finePseudorangeExtendedResolution: number} | {finePseudorangeMicroseconds: number} | {finePseudorangeMeters: number}) &
            ({finePhaserangeExtendedResolution: number} | {finePhaserangeMicroseconds: number} | {finePhaserangeMeters: number});

    @DF(405) @Int(20) finePseudorangeExtendedResolution!: number;
    @DF(406) @Int(24) finePhaserangeExtendedResolution!: number;

    @DF(407) @UInt(10) phaserangeLockTimeIndicatorExtendedRangeResolution!: number;
    get phaserangeLockTimeMillis(): number { return msmExtendedLockIndicatorToTime(this.phaserangeLockTimeIndicatorExtendedRangeResolution); }
    set phaserangeLockTimeMillis(time: number) { this.phaserangeLockTimeIndicatorExtendedRangeResolution = msmExtendedLockTimeToIndicator(time); }

    @DF(420) @Bool halfCycleAmbiguityIndicator!: boolean;
    @DF(408) @UInt(10) cnrExtendedResolution!: number;

    get finePseudorangeMicroseconds(): number { return this.finePseudorangeExtendedResolution * 1000 / 2 ** 29; }
    set finePseudorangeMicroseconds(range: number) { this.finePseudorangeExtendedResolution = range * 2 ** 29 / 1000; }
    get finePseudorangeMeters(): number { return this.finePseudorangeMicroseconds * SPEED_OF_LIGHT / 1000_000; }
    set finePseudorangeMeters(range: number) { this.finePseudorangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }

    get finePhaserangeMicroseconds(): number { return this.finePhaserangeExtendedResolution * 1000 / 2 ** 31; }
    set finePhaserangeMicroseconds(range: number) { this.finePhaserangeExtendedResolution = range * 2 ** 31 / 1000; }
    get finePhaserangeMeters(): number { return this.finePhaserangeMicroseconds * SPEED_OF_LIGHT / 1000_000; }
    set finePhaserangeMeters(range: number) { this.finePhaserangeMicroseconds = range * 1000_000 / SPEED_OF_LIGHT; }
}

export class Msm7SignalData extends Msm6SignalData {
    static [constructPropertiesKey]: (exclude: 'phaserangeLockTimeIndicatorExtendedRangeResolution' | 'phaserangeLockTimeMillis' |
            'finePseudorangeExtendedResolution' | 'finePseudorangeMicroseconds' | 'finePseudorangeMeters' |
            'finePhaserangeExtendedResolution' | 'finePhaserangeMicroseconds' | 'finePhaserangeMeters' |
            'finePhaserangeRate' | 'finePhaserangeRateMetersPerSecond') =>
            ({phaserangeLockTimeIndicatorExtendedRangeResolution: number} | {phaserangeLockTimeMillis: number}) &
            ({finePseudorangeExtendedResolution: number} | {finePseudorangeMicroseconds: number} | {finePseudorangeMeters: number}) &
            ({finePhaserangeExtendedResolution: number} | {finePhaserangeMicroseconds: number} | {finePhaserangeMeters: number}) &
            ({finePhaserangeRate: number} | {finePhaserangeRateMetersPerSecond: number});

    @DF(404) @Int(15) finePhaserangeRate!: number;
    get finePhaserangeRateMetersPerSecond(): number { return this.finePhaserangeRate / 10000; }
    set finePhaserangeRateMetersPerSecond(rangeRate: number) { this.finePhaserangeRate = rangeRate * 10000; }
}