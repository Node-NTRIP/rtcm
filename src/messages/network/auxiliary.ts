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

import { DF, Int, UInt } from '../../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../../rtcm';

@MessageType(RtcmMessageType.NETWORK_AUXILIARY_STATION_DATA) @Since(RtcmVersion.V3_1)
export class RtcmMessageNetworkAuxiliaryStationData extends RtcmMessage {
    @DF(59) @UInt(8) networkId!: number;
    @DF(72) @UInt(4) subnetworkId!: number;

    @DF(58) @UInt(5) auxiliaryStationsTransmitted!: number;

    @DF(60) @UInt(12) masterReferenceStationId!: number;
    @DF(61) @UInt(12) auxiliaryReferenceStationId!: number;

    @DF(62) @Int(20) auxMasterDeltaLatitude!: number;
    @DF(63) @Int(21) auxMasterDeltaLongitude!: number;
    @DF(64) @Int(23) auxMasterDeltaHeight!: number;
}