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

@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GLONASS)
export class RtcmMessageGlonassCorrectionDifferences extends RtcmMessage {
    @DF(59) @UInt(8) networkId!: number;
    @DF(72) @UInt(4) subnetworkId!: number;

    @DF(233) @UInt(20) glonassEpochTime!: number;
    @DF(66) @Bool multipleMessageIndicator!: boolean;

    @DF(60) @UInt(12) masterReferenceStationId!: number;
    @DF(61) @UInt(12) auxiliaryReferenceStationId!: number;

    @DF(234) @ArrLength(4, 'satellites') private _satelliteCount!: number;
}

export class GlonassCorrectionDifferencesBaseSatelliteData {
    @DF(38) @UInt(6) satelliteId!: number;
    @DF(235) @UInt(2) ambiguityStatusFlag!: number;
    @DF(236) @UInt(3) nonSyncCount!: number;
}

export class GlonassIonosphericCorrectionDifferencesSatelliteData extends GlonassCorrectionDifferencesBaseSatelliteData {
    @DF(237) @Int(17) ionosphericCarrierPhaseCorrectionDifference!: number;
}

export class GlonassGeometricCorrectionDifferencesSatelliteData extends GlonassCorrectionDifferencesBaseSatelliteData {
    @DF(238) @Int(17) geometricCarrierPhaseCorrectionDifference!: number;
    @DF(239) @UInt(8) iod!: number;
}

export class GlonassCombinedCorrectionDifferencesSatelliteData extends GlonassGeometricCorrectionDifferencesSatelliteData {
    @DF(237) @Int(17) ionosphericCarrierPhaseCorrectionDifference!: number;
}

@MessageType(RtcmMessageType.GLONASS_IONOSPHERIC_CORRECTION_DIFFERENCES)
export class RtcmMessageGlonassIonosphericCorrectionDifferences extends RtcmMessageGlonassCorrectionDifferences {
    @Arr('_satelliteCount', Obj(GlonassIonosphericCorrectionDifferencesSatelliteData))
    satellites!: GlonassIonosphericCorrectionDifferencesSatelliteData[];
}

@MessageType(RtcmMessageType.GLONASS_GEOMETRIC_CORRECTION_DIFFERENCES)
export class RtcmMessageGlonassGeometricCorrectionDifferences extends RtcmMessageGlonassCorrectionDifferences {
    @Arr('_satelliteCount', Obj(GlonassGeometricCorrectionDifferencesSatelliteData))
    satellites!: GlonassGeometricCorrectionDifferencesSatelliteData[];
}

@MessageType(RtcmMessageType.GLONASS_COMBINED_CORRECTION_DIFFERENCES)
export class RtcmMessageGlonassCombinedCorrectionDifferences extends RtcmMessageGlonassCorrectionDifferences {
    @Arr('_satelliteCount', Obj(GlonassCombinedCorrectionDifferencesSatelliteData))
    satellites!: GlonassCombinedCorrectionDifferencesSatelliteData[];
}

export class GlonassNetworkRtkResidualSatelliteData {
    @DF(38) @UInt(6) satelliteId!: number;
    @DF(218) @UInt(8) s_oc!: number;
    @DF(219) @UInt(9) s_od!: number;
    @DF(220) @UInt(6) s_oh!: number;
    @DF(221) @UInt(10) s_ic!: number;
    @DF(222) @UInt(10) s_id!: number;
}

@MessageType(RtcmMessageType.GLONASS_NETWORK_RTK_RESIDUAL)
@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GLONASS)
export class RtcmMessageGlonassNetworkRtkResidual extends RtcmMessage {
    @DF(225) @UInt(17) residualsEpochTime!: number;
    @DF(3) @UInt(12) referenceStationId!: number;
    @DF(223) @UInt(7) nRefs!: number;
    @DF(35) @ArrLength(5, 'satellites') private _satelliteCount!: number;

    @Arr('_satelliteCount', Obj(GlonassNetworkRtkResidualSatelliteData))
    satellites!: GlonassNetworkRtkResidualSatelliteData[];
}

export class GlonassNetworkFkpGradientSatelliteData {
    @DF(38) @UInt(6) satelliteId!: number;
    @DF(392) @UInt(8) iode!: number;
    @DF(242) @UInt(12) geometricGradientNorth!: number;
    @DF(243) @UInt(12) geometricGradientEast!: number;
    @DF(244) @UInt(14) ionosphericGradientNorth!: number;
    @DF(245) @UInt(14) ionosphericGradientEast!: number;
}

@MessageType(RtcmMessageType.GLONASS_NETWORK_FKP_GRADIENT)
@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GLONASS)
export class RtcmMessageGlonassNetworkFkpGradient extends RtcmMessage {
    @DF(3) @UInt(12) referenceStationId!: number;
    @DF(241) @UInt(17) fkpEpochTime!: number;
    @DF(35) @ArrLength(5, 'satellites') private _satelliteCount!: number;

    @Arr('_satelliteCount', Obj(GlonassNetworkFkpGradientSatelliteData))
    satellites!: GlonassNetworkFkpGradientSatelliteData[];
}