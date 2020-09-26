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
import { constructWithProperties, constructWithPropertiesInternalGuard } from '../../utils';

@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GLONASS)
export abstract class RtcmMessageSsrGlonassCorrection extends RtcmMessage {
    @DF(385) @UInt(17) epochTime!: number;
    @DF(391) @UInt(4) ssrUpdateInterval!: number;
    @DF(388) @Bool multipleMessageIndicator!: boolean;
    @DF(375) @Bool @IfInstanceOf(() => RtcmMessageSsrGlonassOrbitCorrection) protected satelliteReferenceDatum!: boolean;
    @DF(413) @UInt(4) iodSsr!: number;
    @DF(414) @UInt(16) ssrProviderId!: number;
    @DF(415) @UInt(4) ssrSolutionId!: number;
    @DF(387) @ArrLength(6, 'satellites') private _satelliteCount!: number;
}

export class GlonassOrbitCorrectionSatelliteData {
    @DF(384) @UInt(5) satelliteId!: number;
    @DF(392) @UInt(8) iod!: number;
    @DF(365) @Int(22) deltaRadial!: number;
    @DF(366) @Int(20) deltaAlongTrack!: number;
    @DF(367) @Int(20) deltaCrossTrack!: number;
    @DF(368) @Int(21) dotDeltaRadial!: number;
    @DF(369) @Int(19) dotDeltaAlongTrack!: number;
    @DF(370) @Int(19) dotDeltaCrossTrack!: number;
}

@MessageType(RtcmMessageType.SSR_GLONASS_ORBIT_CORRECTION)
export class RtcmMessageSsrGlonassOrbitCorrection extends RtcmMessageSsrGlonassCorrection {
    // Expose protected
    public satelliteReferenceDatum!: boolean;

    @Arr('_satelliteCount', Obj(GlonassOrbitCorrectionSatelliteData))
    satellites!: GlonassOrbitCorrectionSatelliteData[];
}

export class GlonassClockCorrectionSatelliteData {
    @DF(384) @UInt(5) satelliteId!: number;
    @DF(376) @Int(22) deltaClockC0!: number;
    @DF(377) @Int(21) deltaClockC1!: number;
    @DF(378) @Int(27) deltaClockC2!: number;
}

@MessageType(RtcmMessageType.SSR_GLONASS_CLOCK_CORRECTION)
export class RtcmMessageSsrGlonassClockCorrection extends RtcmMessageSsrGlonassCorrection {
    @Arr('_satelliteCount', Obj(GlonassClockCorrectionSatelliteData))
    satellites!: GlonassClockCorrectionSatelliteData[];
}

export class GlonassCombinedCorrectionSatelliteData extends GlonassOrbitCorrectionSatelliteData {
    @DF(376) @Int(22) deltaClockC0!: number;
    @DF(377) @Int(21) deltaClockC1!: number;
    @DF(378) @Int(27) deltaClockC2!: number;
}

@MessageType(RtcmMessageType.SSR_GLONASS_COMBINED_CORRECTION)
export class RtcmMessageSsrGlonassCombinedCorrection extends RtcmMessageSsrGlonassCorrection {
    @Arr('_satelliteCount', Obj(GlonassCombinedCorrectionSatelliteData))
    satellites!: GlonassCombinedCorrectionSatelliteData[];
}

export class GlonassCodeBiasSatelliteCodeBias {
    @DF(381) @UInt(5) signalAndTrackingModeIndicator!: number;
    @DF(383) @Int(14) codeBias!: number;
}

export class GlonassCodeBiasSatelliteData {
    @DF(384) @UInt(5) satelliteId!: number;
    @DF(379) @ArrLength(5, 'codeBiases') private _codeBiasCount!: number;

    @Arr('_codeBiasCount', Obj(GlonassCodeBiasSatelliteCodeBias))
    codeBiases!: GlonassCodeBiasSatelliteCodeBias[];

    constructor(internalGuard: never) {}
    static construct = constructWithPropertiesInternalGuard;
}

@MessageType(RtcmMessageType.SSR_GLONASS_CODE_BIAS)
export class RtcmMessageSsrGlonassCodeBias extends RtcmMessageSsrGlonassCorrection {
    @Arr('_satelliteCount', Obj(GlonassCodeBiasSatelliteData))
    satellites!: GlonassCodeBiasSatelliteData[];
}

export class GlonassUraSatelliteData {
    @DF(384) @UInt(5) satelliteId!: number;
    @DF(389) @UInt(6) ssrUra!: number;
}

@MessageType(RtcmMessageType.SSR_GLONASS_URA)
export class RtcmMessageSsrGlonassUra extends RtcmMessageSsrGlonassCorrection {
    @Arr('_satelliteCount', Obj(GlonassUraSatelliteData))
    satellites!: GlonassUraSatelliteData[];
}

export class GlonassHighRateClockCorrectionSatelliteData {
    @DF(384) @UInt(5) satelliteId!: number;
    @DF(390) @Int(22) highRateClockCorrection!: number;
}

@MessageType(RtcmMessageType.SSR_GLONASS_HIGH_RATE_CLOCK_CORRECTION)
export class RtcmMessageSsrGlonassHighRateClockCorrection extends RtcmMessageSsrGlonassCorrection {
    @Arr('_satelliteCount', Obj(GlonassHighRateClockCorrectionSatelliteData))
    satellites!: GlonassHighRateClockCorrectionSatelliteData[];
}