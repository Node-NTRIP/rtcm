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

import { Bool, DF, Int, UInt } from '../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../rtcm';

export abstract class RtcmMessageProjectionParameters extends RtcmMessage {
    @DF(147) @UInt(8) systemIdentificationNumber!: number;
    @DF(170) @UInt(6) projectionType!: number;
}

@MessageType(RtcmMessageType.PROJECTION_PARAMETERS_EXCEPT_LCC2SP_OM) @Since(RtcmVersion.V3_1)
export class RtcmMessageProjectionParametersExceptLcc2spOm extends RtcmMessageProjectionParameters {
    @DF(171) @UInt(34) latitudeNaturalOrigin!: number;
    @DF(172) @UInt(35) longitudeNaturalOrigin!: number;
    @DF(173) @UInt(30) scaleFactorNaturalOrigin!: number;
    @DF(174) @UInt(36) falseEasting!: number;
    @DF(175) @Int(35) falseNorthing!: number;
}

@MessageType(RtcmMessageType.PROJECTION_PARAMETERS_LCC2SP) @Since(RtcmVersion.V3_1)
export class RtcmMessageProjectionParametersLcc2sp extends RtcmMessageProjectionParameters {
    @DF(176) @UInt(34) latitudeFalseOrigin!: number;
    @DF(177) @UInt(35) longitudeFalseOrigin!: number;
    @DF(178) @UInt(34) latitudeStandardParallel1!: number;
    @DF(179) @UInt(34) latitudeStandardParallel2!: number;
    @DF(180) @UInt(36) eastingFalseOrigin!: number;
    @DF(181) @Int(35) northingFalseOrigin!: number;
}

@MessageType(RtcmMessageType.PROJECTION_PARAMETERS_OM) @Since(RtcmVersion.V3_1)
export class RtcmMessageProjectionParametersOm extends RtcmMessageProjectionParameters {
    @DF(182) @Bool rectificationFlag!: boolean;
    @DF(183) @Int(34) latitudeProjectionCenter!: number;
    @DF(184) @Int(34) longitudeProjectionCenter!: number;
    @DF(185) @UInt(35) azimuthInitialLine!: number;
    @DF(186) @Int(26) differenceAngleFromRectifiedToSkewGrid!: number;
    @DF(187) @UInt(30) scaleFactorInitialLine!: number;
    @DF(188) @UInt(36) eastingProjectionCenter!: number;
    @DF(189) @Int(35) northingProjectionCenter!: number;
}