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

import { DF, Latin1, UInt } from '../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../rtcm';

@MessageType(RtcmMessageType.ANTENNA_DESCRIPTOR) @Since(RtcmVersion.V3_0)
export class RtcmMessageAntennaDescriptor extends RtcmMessage {
    @DF(3) @UInt(12) referenceStationId!: number;
    @DF(30) @Latin1(8) antennaDescriptor!: string;
    @DF(31) @UInt(8) antennaSetupId!: number;
}

@MessageType(RtcmMessageType.ANTENNA_DESCRIPTOR_SERIAL) @Since(RtcmVersion.V3_0)
export class RtcmMessageAntennaDescriptorSerial extends RtcmMessageAntennaDescriptor {
    @DF(33) @Latin1(8) antennaSerialNumber!: string;
}

@MessageType(RtcmMessageType.RECEIVER_ANTENNA_DESCRIPTOR) @Since(RtcmVersion.V3_1)
export class RtcmMessageReceiverAntennaDescriptor extends RtcmMessageAntennaDescriptorSerial {
    @DF(228) @Latin1(8) receiverTypeDescriptor!: string;
    @DF(230) @Latin1(8) receiverFirmwareVersion!: string;
    @DF(232) @Latin1(8) receiverSerialNumber!: string;
}