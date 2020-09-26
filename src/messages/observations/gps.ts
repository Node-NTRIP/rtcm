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
import { SPEED_OF_LIGHT } from '../../constants';
import { legacyLockIndicatorToTime, legacyLockTimeToIndicator } from './common';
import { constructPropertiesKey, constructWithProperties, constructWithPropertiesPlus } from '../../utils';

// @DF(10)
export enum GpsL1CodeIndicator {
    CA_CODE = 0,
    P_Y_CODE_DIRECT = 1
}

// @DF(16)
export enum GpsL2CodeIndicator {
    CA_L2C_CODE = 0,
    P_Y_CODE_DIRECT = 1,
    P_Y_CODE_CROSS_CORRELATED = 2,
    CORRELATED_P_Y
}

@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GPS)
export abstract class RtcmMessageGpsObservations extends RtcmMessage {
    @DF(3) @UInt(12) referenceStationId!: number;
    @DF(4) @UInt(30) gpsEpochTime!: number;
    @DF(5) @Bool synchronousGnss!: boolean;
    @DF(6) @ArrLength(5, 'satellites') private _satelliteCount!: number;
    @DF(7) @Bool divergenceFreeSmoothing!: boolean;
    @DF(8) @UInt(3) smoothingInterval!: number;
}

export abstract class GpsObservationsData {
    static construct = constructWithPropertiesPlus;
}

export class GpsL1ObservationsData extends GpsObservationsData {
    static [constructPropertiesKey]: (exclude: 'lockTimeMillis' | 'lockTimeIndicator') =>
            {lockTimeIndicator: number} | {lockTimeMillis: number};

    @DF(10) @UInt(1) codeIndicator!: GpsL1CodeIndicator;

    @DF(11) @UInt(24) pseudorange!: number;
    @DF(12) @Int(20) phaserangePseudorangeDiff!: number;

    @DF(13) @UInt(7) lockTimeIndicator!: number;
    get lockTimeMillis(): number { return legacyLockIndicatorToTime(this.lockTimeIndicator); }
    set lockTimeMillis(time: number) { this.lockTimeIndicator = legacyLockTimeToIndicator(time); }
}

export class GpsL1ObservationsExtendedData extends GpsL1ObservationsData {
    static [constructPropertiesKey]: (exclude: 'lockTimeMillis' | 'lockTimeIndicator' | 'pseudorangeModulusAmbiguity' | 'totalPseudorangeMeters') =>
            ({lockTimeIndicator: number} | {lockTimeMillis: number}) & {pseudorangeModulusAmbiguity: number};

    @DF(14) @UInt(8) pseudorangeModulusAmbiguity!: number;

    @DF(15) @UInt(8) cnr!: number;

    get totalPseudorangeMeters() { return this.pseudorangeModulusAmbiguity * SPEED_OF_LIGHT / 1000 + this.pseudorange / 0.02; }
    set totalPseudorangeMeters(pseudorange: number) {
        this.pseudorange = (pseudorange % (SPEED_OF_LIGHT / 1000)) * 0.02;
        this.pseudorangeModulusAmbiguity = Math.floor(pseudorange * 1000 / SPEED_OF_LIGHT);
    }
}

export class GpsL2ObservationsData extends GpsObservationsData {
    static [constructPropertiesKey]: (exclude: 'lockTimeMillis' | 'lockTimeIndicator') =>
            {lockTimeIndicator: number} | {lockTimeMillis: number};

    @DF(16) @UInt(2) codeIndicator!: GpsL2CodeIndicator;

    @DF(17) @Int(14) pseudorangeDiff!: number;
    @DF(18) @Int(20) phaserangePseudorangeDiff!: number;

    @DF(19) @UInt(7) lockTimeIndicator!: number;
    get lockTimeMillis(): number { return legacyLockIndicatorToTime(this.lockTimeIndicator); }
    set lockTimeMillis(time: number) { this.lockTimeIndicator = legacyLockTimeToIndicator(time); }
}

export class GpsL2ObservationsExtendedData extends GpsL2ObservationsData {
    @DF(20) @UInt(8) cnr!: number;
}

export class GpsObservationsSatelliteData {
    @DF(9) @UInt(6) satelliteId!: number;

    static construct = constructWithProperties;
}

export class GpsL1ObservationsSatelliteData extends GpsObservationsSatelliteData {
    @Obj(GpsL1ObservationsData)
    l1!: GpsL1ObservationsData;
}

export class GpsL1ObservationsExtendedSatelliteData extends GpsObservationsSatelliteData {
    @Obj(GpsL1ObservationsExtendedData)
    l1!: GpsL1ObservationsExtendedData;
}

export class GpsL1L2ObservationsSatelliteData extends GpsObservationsSatelliteData {
    @Obj(GpsL1ObservationsData)
    l1!: GpsL1ObservationsData;

    @Obj(GpsL2ObservationsData)
    l2!: GpsL2ObservationsData;

    toL1Only(): GpsL1ObservationsSatelliteData {
        return GpsL1ObservationsSatelliteData.construct(
                {satelliteId: this.satelliteId, l1: this.l1});
    }
}

export class GpsL1L2ObservationsExtendedSatelliteData extends GpsObservationsSatelliteData {
    @Obj(GpsL1ObservationsExtendedData)
    l1!: GpsL1ObservationsExtendedData;

    @Obj(GpsL2ObservationsExtendedData)
    l2!: GpsL2ObservationsExtendedData;

    toL1Only(): GpsL1ObservationsExtendedSatelliteData {
        return GpsL1ObservationsExtendedSatelliteData.construct(
                {satelliteId: this.satelliteId, l1: this.l1});
    }
}

@MessageType(RtcmMessageType.GPS_L1_OBSERVATIONS)
export class RtcmMessageGpsL1Observations extends RtcmMessageGpsObservations {
    @Arr('_satelliteCount', Obj(GpsL1ObservationsSatelliteData))
    satellites!: GpsL1ObservationsSatelliteData[];
}

@MessageType(RtcmMessageType.GPS_L1_OBSERVATIONS_EXTENDED)
export class RtcmMessageGpsL1ObservationsExtended extends RtcmMessageGpsObservations {
    @Arr('_satelliteCount', Obj(GpsL1ObservationsExtendedSatelliteData))
    satellites!: GpsL1ObservationsExtendedSatelliteData[];
}

@MessageType(RtcmMessageType.GPS_L1_L2_OBSERVATIONS)
export class RtcmMessageGpsL1L2Observations extends RtcmMessageGpsObservations {
    @Arr('_satelliteCount', Obj(GpsL1L2ObservationsSatelliteData))
    satellites!: GpsL1L2ObservationsSatelliteData[];

    toL1Only(): RtcmMessageGpsL1Observations {
        return RtcmMessageGpsL1Observations.construct(
                {...this, satellites: this.satellites.map(s => s.toL1Only())});
    }
}

@MessageType(RtcmMessageType.GPS_L1_L2_OBSERVATIONS_EXTENDED)
export class RtcmMessageGpsL1L2ObservationsExtended extends RtcmMessageGpsObservations {
    @Arr('_satelliteCount', Obj(GpsL1L2ObservationsExtendedSatelliteData))
    satellites!: GpsL1L2ObservationsExtendedSatelliteData[];

    toL1Only(): RtcmMessageGpsL1ObservationsExtended {
        return RtcmMessageGpsL1ObservationsExtended.construct(
                {...this, satellites: this.satellites.map(s => s.toL1Only())});
    }
}
