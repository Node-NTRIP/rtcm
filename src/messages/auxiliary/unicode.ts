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

import {DF, UInt, Utf8} from '../../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../../rtcm';

@MessageType(RtcmMessageType.UNICODE_TEXT_STRING) @Since(RtcmVersion.V3_1)
export class RtcmMessageUnicodeTextString extends RtcmMessage {
    @DF(3) @UInt(12) referenceStationId!: number;

    @DF(51) @UInt(16) modifiedJulianDay!: number;
    @DF(52) @UInt(17) secondsOfDay!: number;

    @DF(140) @Utf8(7, 8) text!: string;
}