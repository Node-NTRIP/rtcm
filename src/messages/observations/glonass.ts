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

import { Arr, ArrLength, Bool, DF, Int, Obj, UInt } from '../../decode-encode';
import { MessageType, NavSystem, RtcmMessage, RtcmMessageType, RtcmNavSystem, RtcmVersion, Since } from '../../rtcm';
import { constructPropertiesKey, constructWithProperties, constructWithPropertiesPlus } from '../../utils';
import { legacyLockIndicatorToTime, legacyLockTimeToIndicator } from './common';

// @DF(39)
export enum GlonassL1CodeIndicator {
    CA_CODE = 0,
    P_Y_CODE_DIRECT = 1
}

// @DF(46)
export enum GlonassL2CodeIndicator {
    CA_L2C_CODE = 0,
    P_Y_CODE_DIRECT = 1,
    RESERVED_0 = 2,
    RESERVED_1 = 3
}

@Since(RtcmVersion.V3_0) @NavSystem(RtcmNavSystem.GLONASS)
export abstract class RtcmMessageGlonassObservations extends RtcmMessage {
    @DF(3) @UInt(12) referenceStationId!: number;
    @DF(34) @UInt(27) glonassEpochTime!: number;
    @DF(5) @Bool synchronousGnss!: boolean;
    @DF(35) @ArrLength(5, 'satellites') private _satelliteCount!: number;
    @DF(36) @Bool divergenceFreeSmoothing!: boolean;
    @DF(37) @UInt(3) smoothingInterval!: number;
}

export abstract class GlonassObservationsData {
    static construct = constructWithPropertiesPlus;
}

export class GlonassL1ObservationsData extends GlonassObservationsData {
    static [constructPropertiesKey]: (exclude: 'lockTimeMillis' | 'lockTimeIndicator') =>
            {lockTimeIndicator: number} | {lockTimeMillis: number};

    @DF(39) @UInt(1) codeIndicator!: GlonassL1CodeIndicator;
    @DF(40) @UInt(5) satelliteFrequencyChannelNumber!: number;
    @DF(41) @UInt(25) pseudorange!: number;
    @DF(42) @Int(20) phaserangePseudorangeDiff!: number;

    @DF(43) @UInt(7) lockTimeIndicator!: number;
    get lockTimeMillis(): number { return legacyLockIndicatorToTime(this.lockTimeIndicator); }
    set lockTimeMillis(time: number) { this.lockTimeIndicator = legacyLockTimeToIndicator(time); }
}

export class GlonassL1ObservationsExtendedData extends GlonassL1ObservationsData {
    @DF(44) @UInt(7) pseudorangeModulusAmbiguity!: number;
    @DF(45) @UInt(8) cnr!: number;
}

export class GlonassL2ObservationsData extends GlonassObservationsData {
    static [constructPropertiesKey]: (exclude: 'lockTimeMillis' | 'lockTimeIndicator') =>
            {lockTimeIndicator: number} | {lockTimeMillis: number};

    @DF(46) @UInt(2) codeIndicator!: GlonassL2CodeIndicator;
    @DF(47) @Int(14) pseudorangeDiff!: number;
    @DF(48) @Int(20) phaserangePseudorangeDiff!: number;

    @DF(49) @UInt(7) lockTimeIndicator!: number;
    get lockTimeMillis(): number { return legacyLockIndicatorToTime(this.lockTimeIndicator); }
    set lockTimeMillis(time: number) { this.lockTimeIndicator = legacyLockTimeToIndicator(time); }
}

export class GlonassL2ObservationsExtendedData extends GlonassL2ObservationsData {
    @DF(50) @UInt(8) cnr!: number;
}

export class GlonassObservationsSatelliteData {
    @DF(38) @UInt(6) satelliteId!: number;

    static construct = constructWithProperties;
}

export class GlonassL1ObservationsSatelliteData extends GlonassObservationsSatelliteData {
    @Obj(GlonassL1ObservationsData)
    l1!: GlonassL1ObservationsData;
}

export class GlonassL1ObservationsExtendedSatelliteData extends GlonassObservationsSatelliteData {
    @Obj(GlonassL1ObservationsExtendedData)
    l1!: GlonassL1ObservationsExtendedData;
}

export class GlonassL1L2ObservationsSatelliteData extends GlonassObservationsSatelliteData {
    @Obj(GlonassL1ObservationsData)
    l1!: GlonassL1ObservationsData;

    @Obj(GlonassL2ObservationsData)
    l2!: GlonassL2ObservationsData;

    toL1Only(): GlonassL1ObservationsSatelliteData {
        return GlonassL1ObservationsSatelliteData.construct(
                {satelliteId: this.satelliteId, l1: this.l1});
    }
}

export class GlonassL1L2ObservationsExtendedSatelliteData extends GlonassObservationsSatelliteData {
    @Obj(GlonassL1ObservationsExtendedData)
    l1!: GlonassL1ObservationsExtendedData;

    @Obj(GlonassL2ObservationsExtendedData)
    l2!: GlonassL2ObservationsExtendedData;

    toL1Only(): GlonassL1ObservationsExtendedSatelliteData {
        return GlonassL1ObservationsExtendedSatelliteData.construct(
                {satelliteId: this.satelliteId, l1: this.l1});
    }
}

@MessageType(RtcmMessageType.GLONASS_L1_OBSERVATIONS)
export class RtcmMessageGlonassL1Observations extends RtcmMessageGlonassObservations {
    @Arr('_satelliteCount', Obj(GlonassL1ObservationsSatelliteData))
    satellites!: GlonassL1ObservationsSatelliteData[];
}

@MessageType(RtcmMessageType.GLONASS_L1_OBSERVATIONS_EXTENDED)
export class RtcmMessageGlonassL1ObservationsExtended extends RtcmMessageGlonassObservations {
    @Arr('_satelliteCount', Obj(GlonassL1ObservationsExtendedSatelliteData))
    satellites!: GlonassL1ObservationsExtendedSatelliteData[];
}

@MessageType(RtcmMessageType.GLONASS_L1_L2_OBSERVATIONS)
export class RtcmMessageGlonassL1L2Observations extends RtcmMessageGlonassObservations {
    @Arr('_satelliteCount', Obj(GlonassL1L2ObservationsSatelliteData))
    satellites!: GlonassL1L2ObservationsSatelliteData[];

    toL1Only(): RtcmMessageGlonassL1Observations {
        return RtcmMessageGlonassL1Observations.construct(
                {...this, satellites: this.satellites.map(s => s.toL1Only())});
    }
}

@MessageType(RtcmMessageType.GLONASS_L1_L2_OBSERVATIONS_EXTENDED)
export class RtcmMessageGlonassL1L2ObservationsExtended extends RtcmMessageGlonassObservations {
    @Arr('_satelliteCount', Obj(GlonassL1L2ObservationsExtendedSatelliteData))
    satellites!: GlonassL1L2ObservationsExtendedSatelliteData[];

    toL1Only(): RtcmMessageGlonassL1ObservationsExtended {
        return RtcmMessageGlonassL1ObservationsExtended.construct(
                {...this, satellites: this.satellites.map(s => s.toL1Only())});
    }
}
