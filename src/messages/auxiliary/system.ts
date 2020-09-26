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

import { Arr, ArrLength, Bool, DF, Obj, UInt } from '../../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../../rtcm';

export class RtcmMessageAuxiliaryOperationInformationMessageParameters {
    @DF(55) @UInt(12) messageType!: RtcmMessageType;
    @DF(56) @Bool syncFlag!: boolean;
    @DF(57) @UInt(16) transmissionInterval!: number;
}

@MessageType(RtcmMessageType.AUXILIARY_OPERATION_INFORMATION) @Since(RtcmVersion.V3_0)
export class RtcmMessageAuxiliaryOperationInformation extends RtcmMessage {
    @DF(3) @UInt(12) referenceStationId!: number;

    @DF(51) @UInt(16) modifiedJulianDay!: number;
    @DF(52) @UInt(17) secondsOfDay!: number;

    @DF(53) @ArrLength(5, 'messageAnnouncements') private _messageAnnouncementCount!: number;

    @DF(54) @UInt(8) leapSeconds!: number;

    @Arr('_messageAnnouncementCount', Obj(RtcmMessageAuxiliaryOperationInformationMessageParameters))
    messageAnnouncements!: RtcmMessageAuxiliaryOperationInformationMessageParameters[];
}