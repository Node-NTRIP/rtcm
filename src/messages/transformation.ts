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

import { Arr, Bool, DF, IfInstanceOf, Int, Latin1, Obj, UInt } from '../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../rtcm';

export class RtcmMessageBaseTransformationParameters extends RtcmMessage {
    @DF(144) @Latin1(5) sourceName!: string;
    @DF(146) @Latin1(5) targetName!: string;
    @DF(147) @UInt(8) systemIdentificationNumber!: number;
    @DF(148) @UInt(10) utilizedTransformationMessageIndicator!: number;
    @DF(149) @UInt(5) plateNumber!: number;
    @DF(150) @UInt(4) computationIndicator!: number;
    @DF(151) @UInt(2) heightIndicator!: number;
    @DF(152) @Int(19) originLatitude!: number;
    @DF(153) @Int(20) originLongitude!: number;
    @DF(154) @UInt(14) nsExtension!: number;
    @DF(155) @UInt(14) ewExtension!: number;
    @DF(156) @Int(23) xTranslation!: number;
    @DF(157) @Int(23) yTranslation!: number;
    @DF(158) @Int(23) zTranslation!: number;
    @DF(159) @Int(32) xRotation!: number;
    @DF(160) @Int(32) yRotation!: number;
    @DF(161) @Int(32) zRotation!: number;
    @DF(162) @Int(25) scaleCorrection!: number;
    @DF(163) @Int(35) @IfInstanceOf(() => RtcmMessageMolodenskiBadekasTransformationParameters) protected mbRotationPointXCoordinate!: number;
    @DF(164) @Int(35) @IfInstanceOf(() => RtcmMessageMolodenskiBadekasTransformationParameters) protected mbRotationPointYCoordinate!: number;
    @DF(165) @Int(35) @IfInstanceOf(() => RtcmMessageMolodenskiBadekasTransformationParameters) protected mbRotationPointZCoordinate!: number;
    @DF(166) @UInt(24) sourceSystemEllipsoidSemiMajorAxis!: number;
    @DF(167) @UInt(25) sourceSystemEllipsoidSemiMinorAxis!: number;
    @DF(168) @UInt(24) targetSystemEllipsoidSemiMajorAxis!: number;
    @DF(169) @UInt(25) targetSystemEllipsoidSemiMinorAxis!: number;
    @DF(214) @UInt(3) horizontalHelmertMolodenskiQualityIndicator!: number;
    @DF(215) @UInt(3) verticalHelmertMolodenskiQualityIndicator!: number;
}

@MessageType(RtcmMessageType.HELMERT_ABRIDGED_MOLODENSKI_TRANSFORMATION_PARAMETERS) @Since(RtcmVersion.V3_1)
export class RtcmMessageHelmertAbridgedMolodenskiTransformationParameters extends RtcmMessageBaseTransformationParameters {}

@MessageType(RtcmMessageType.MOLODENSKI_BADEKAS_TRANSFORMATION_PARAMETERS) @Since(RtcmVersion.V3_1)
export class RtcmMessageMolodenskiBadekasTransformationParameters extends RtcmMessageBaseTransformationParameters {
    // Expose protected
    public mbRotationPointXCoordinate!: number;
    public mbRotationPointYCoordinate!: number;
    public mbRotationPointZCoordinate!: number;
}

export class ResidualsEllipsoidalGridRepresentationData {
    @DF(199) @Int(9) latitudeResidual!: number;
    @DF(200) @Int(9) longitudeResidual!: number;
    @DF(201) @Int(9) heightResidual!: number;
}

export class ResidualsPlaneGridRepresentationData {
    @DF(209) @Int(9) localNorthingResidual!: number;
    @DF(210) @Int(9) localEastingResidual!: number;
    @DF(211) @Int(9) localHeightResidual!: number;
}


export type ResidualsGridRepresentationDataArray<T> = [T, T, T, T, T, T, T, T, T, T, T, T, T, T, T, T];

export abstract class RtcmMessageResidualsGridRepresentation extends RtcmMessage {
    @DF(147) @UInt(8) systemIdentificationNumber!: number;
    @DF(190) @Bool horizontalShiftIndicator!: boolean;
    @DF(191) @Bool verticalShiftIndicator!: boolean;
}

@MessageType(RtcmMessageType.RESIDUALS_ELLIPSOIDAL_GRID_REPRESENTATION) @Since(RtcmVersion.V3_1)
export class RtcmMessageResidualsEllipsoidalGridRepresentation
        extends RtcmMessageResidualsGridRepresentation {
    @DF(192) @Int(21) latitudeGridsOrigin!: number;
    @DF(193) @Int(22) longitudeGridsOrigin!: number;
    @DF(194) @UInt(12) nsGridAreaExtension!: number;
    @DF(195) @UInt(12) ewGridAreaExtension!: number;
    @DF(196) @Int(8) meanLatitudeOffset!: number;
    @DF(197) @Int(8) meanLongitudeOffset!: number;
    @DF(198) @Int(15) meanHeightOffset!: number;
    @Arr(16, Obj(ResidualsEllipsoidalGridRepresentationData))
    residuals!: ResidualsGridRepresentationDataArray<ResidualsEllipsoidalGridRepresentationData>;
    @DF(212) @UInt(2) horizontalInterpolationMethodIndicator!: number;
    @DF(213) @UInt(2) verticalInterpolationMethodIndicator!: number;
    @DF(216) @UInt(3) horizontalGridQualityIndicator!: number;
    @DF(217) @UInt(3) verticalGridQualityIndicator!: number;
    @DF(51) @UInt(16) modifiedJulianDay!: number;
}

@MessageType(RtcmMessageType.RESIDUALS_PLANE_GRID_REPRESENTATION) @Since(RtcmVersion.V3_1)
export class RtcmMessageResidualsPlaneGridRepresentation
        extends RtcmMessageResidualsGridRepresentation {
    @DF(202) @Int(25) northingOrigin!: number;
    @DF(203) @Int(26) eastingOrigin!: number;
    @DF(204) @UInt(12) nsGridAreaExtension!: number;
    @DF(205) @UInt(12) ewGridAreaExtension!: number;
    @DF(206) @Int(10) meanLocalNorthingResidual!: number;
    @DF(207) @Int(10) meanLocalEastingResidual!: number;
    @DF(208) @Int(15) meanLocalHeightResidual!: number;

    @Arr(16, Obj(ResidualsPlaneGridRepresentationData))
    residuals!: ResidualsGridRepresentationDataArray<ResidualsPlaneGridRepresentationData>;

    @DF(212) @UInt(2) horizontalInterpolationMethodIndicator!: number;
    @DF(213) @UInt(2) verticalInterpolationMethodIndicator!: number;
    @DF(216) @UInt(3) horizontalGridQualityIndicator!: number;
    @DF(217) @UInt(3) verticalGridQualityIndicator!: number;
    @DF(51) @UInt(16) modifiedJulianDay!: number;
}

