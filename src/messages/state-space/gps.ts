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

import { Arr, ArrLength, Bool, DF, IfInstanceOf, Int, Obj, UInt } from '../../decode-encode';
import { MessageType, NavSystem, RtcmMessage, RtcmMessageType, RtcmNavSystem, RtcmVersion, Since } from '../../rtcm';
import { constructWithProperties } from '../../utils';

@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GPS)
export abstract class RtcmMessageSsrGpsCorrection extends RtcmMessage {
    @DF(385) @UInt(20) epochTime!: number;
    @DF(391) @UInt(4) ssrUpdateInterval!: number;
    @DF(388) @Bool multipleMessageIndicator!: boolean;
    @DF(375) @Bool @IfInstanceOf(() => RtcmMessageSsrGpsOrbitCorrection) protected satelliteReferenceDatum!: boolean;
    @DF(413) @UInt(4) iodSsr!: number;
    @DF(414) @UInt(16) ssrProviderId!: number;
    @DF(415) @UInt(4) ssrSolutionId!: number;
    @DF(387) @ArrLength(6, 'satellites') private _satelliteCount!: number;
}

export class GpsOrbitCorrectionSatelliteData {
    @DF(68) @UInt(6) satelliteId!: number;
    @DF(71) @UInt(8) iode!: number;
    @DF(365) @Int(22) deltaRadial!: number;
    @DF(366) @Int(20) deltaAlongTrack!: number;
    @DF(367) @Int(20) deltaCrossTrack!: number;
    @DF(368) @Int(21) dotDeltaRadial!: number;
    @DF(369) @Int(19) dotDeltaAlongTrack!: number;
    @DF(370) @Int(19) dotDeltaCrossTrack!: number;
}

@MessageType(RtcmMessageType.SSR_GPS_ORBIT_CORRECTION)
export class RtcmMessageSsrGpsOrbitCorrection extends RtcmMessageSsrGpsCorrection {
    // Expose protected
    public satelliteReferenceDatum!: boolean;

    @Arr('_satelliteCount', Obj(GpsOrbitCorrectionSatelliteData))
    satellites!: GpsOrbitCorrectionSatelliteData[];
}

export class GpsClockCorrectionSatelliteData {
    @DF(68) @UInt(6) satelliteId!: number;
    @DF(376) @Int(22) deltaClockC0!: number;
    @DF(377) @Int(21) deltaClockC1!: number;
    @DF(378) @Int(27) deltaClockC2!: number;
}

@MessageType(RtcmMessageType.SSR_GPS_CLOCK_CORRECTION)
export class RtcmMessageSsrGpsClockCorrection extends RtcmMessageSsrGpsCorrection {
    @Arr('_satelliteCount', Obj(GpsClockCorrectionSatelliteData))
    satellites!: GpsClockCorrectionSatelliteData[];
}

export class GpsCombinedCorrectionSatelliteData extends GpsOrbitCorrectionSatelliteData {
    @DF(376) @Int(22) deltaClockC0!: number;
    @DF(377) @Int(21) deltaClockC1!: number;
    @DF(378) @Int(27) deltaClockC2!: number;
}

@MessageType(RtcmMessageType.SSR_GPS_COMBINED_CORRECTION)
export class RtcmMessageSsrGpsCombinedCorrection extends RtcmMessageSsrGpsCorrection {
    @Arr('_satelliteCount', Obj(GpsCombinedCorrectionSatelliteData))
    satellites!: GpsCombinedCorrectionSatelliteData[];
}

export class GpsCodeBiasSatelliteCodeBias {
    @DF(380) @UInt(5) signalAndTrackingModeIndicator!: number;
    @DF(383) @Int(14) codeBias!: number;
}

export class GpsCodeBiasSatelliteData {
    @DF(68) @UInt(6) satelliteId!: number;
    @DF(379) @ArrLength(5, 'codeBiases') private _codeBiasCount!: number;

    @Arr('_codeBiasCount', Obj(GpsCodeBiasSatelliteCodeBias))
    codeBiases!: GpsCodeBiasSatelliteCodeBias[];

    static construct = constructWithProperties;
}

@MessageType(RtcmMessageType.SSR_GPS_CODE_BIAS)
export class RtcmMessageSsrGpsCodeBias extends RtcmMessageSsrGpsCorrection {
    @Arr('_satelliteCount', Obj(GpsCodeBiasSatelliteData))
    satellites!: GpsCodeBiasSatelliteData[];
}

export class GpsUraSatelliteData {
    @DF(68) @UInt(6) satelliteId!: number;
    @DF(389) @UInt(6) ssrUra!: number;
}

@MessageType(RtcmMessageType.SSR_GPS_URA)
export class RtcmMessageSsrGpsUra extends RtcmMessageSsrGpsCorrection {
    @Arr('_satelliteCount', Obj(GpsUraSatelliteData))
    satellites!: GpsUraSatelliteData[];
}

export class GpsHighRateClockCorrectionSatelliteData {
    @DF(68) @UInt(6) satelliteId!: number;
    @DF(390) @Int(22) highRateClockCorrection!: number;
}

@MessageType(RtcmMessageType.SSR_GPS_HIGH_RATE_CLOCK_CORRECTION)
export class RtcmMessageSsrGpsHighRateClockCorrection extends RtcmMessageSsrGpsCorrection {
    @Arr('_satelliteCount', Obj(GpsHighRateClockCorrectionSatelliteData))
    satellites!: GpsHighRateClockCorrectionSatelliteData[];
}