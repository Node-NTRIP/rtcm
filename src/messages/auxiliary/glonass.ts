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

import { Bool, If, Int, Skip, UInt } from '../../decode-encode';
import { MessageType, NavSystem, RtcmMessage, RtcmMessageType, RtcmNavSystem, RtcmVersion, Since } from '../../rtcm';

@MessageType(RtcmMessageType.GLONASS_L1_L2_CODE_PHASE_BIASES)
@Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS)
export class RtcmMessageGlonassL1L2CodePhaseBiases extends RtcmMessage {
    @UInt(12) referenceStationId!: number;
    @Bool glonassCodePhaseBiasIndicator!: boolean;
    @Skip(3) private skip2?: void;

    @Bool includeL1CaCodePhaseBias!: boolean;
    @Bool includeL1PCodePhaseBias!: boolean;
    @Bool includeL2CaCodePhaseBias!: boolean;
    @Bool includeL2PCodePhaseBias!: boolean;

    @Int(16) @If('includeL1CaCodePhaseBias') l1CaCodePhaseBias!: number | undefined;
    @Int(16) @If('includeL1PCodePhaseBias') l1PCodePhaseBias!: number | undefined;
    @Int(16) @If('includeL2CaCodePhaseBias') l2CaCodePhaseBias!: number | undefined;
    @Int(16) @If('includeL2PCodePhaseBias') l2PCodePhaseBias!: number | undefined;
}