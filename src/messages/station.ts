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

import { Bool, DF, Int, Skip, UInt } from '../decode-encode';
import { MessageType, RtcmMessage, RtcmMessageType, RtcmVersion, Since } from '../rtcm';
import { constructPropertiesKey } from '../utils';

@MessageType(RtcmMessageType.STATION_ARP) @Since(RtcmVersion.V3_0)
export class RtcmMessageStationArp extends RtcmMessage {
    static [constructPropertiesKey]: (exclude: 'arpEcefX' | 'arpEcefY' | 'arpEcefZ' | 'arpEcef') =>
            {arpEcefX: number, arpEcefY: number, arpEcefZ: number} | {arpEcef: [number, number, number]};

    @DF(3) @UInt(12) referenceStationId!: number;
    @DF(21) @UInt(6) _itrfRealizationYear!: number;

    @DF(22) @Bool gpsIndicator!: boolean;
    @DF(23) @Bool glonassIndicator!: boolean;
    @DF(24) @Bool _galileoIndicator!: boolean;
    @DF(141) @Bool referenceStationIndicator!: boolean;

    @DF(25) @Int(38) arpEcefX!: number;

    @DF(142) @Bool singleReceiverOscillatorIndicator!: boolean;

    @DF(1) @Skip(1) private skip2?: void;

    @DF(26) @Int(38) arpEcefY!: number;

    @DF(364) @UInt(2) quarterCycleIndicator!: number;

    @DF(27) @Int(38) arpEcefZ!: number;

    get arpEcef(): [number, number, number] { return [this.arpEcefX, this.arpEcefY, this.arpEcefZ] };
    set arpEcef(ecef: [number, number, number]) { [this.arpEcefX, this.arpEcefY, this.arpEcefZ] = ecef; }
}

@MessageType(RtcmMessageType.STATION_ARP_HEIGHT) @Since(RtcmVersion.V3_0)
export class RtcmMessageStationArpHeight extends RtcmMessageStationArp {
    @DF(28) @UInt(16) antennaHeight!: number;
}

@MessageType(RtcmMessageType.PHYSICAL_REFERENCE_STATION_POSITION) @Since(RtcmVersion.V3_1)
export class RtcmMessagePhysicalReferenceStationPosition extends RtcmMessage {
    static [constructPropertiesKey]: (exclude: 'arpEcefX' | 'arpEcefY' | 'arpEcefZ' | 'arpEcef') =>
            {arpEcefX: number, arpEcefY: number, arpEcefZ: number} | {arpEcef: [number, number, number]};

    @DF(3) @UInt(12) nonPhysicalReferenceStationId!: number;
    @DF(226) @UInt(12) physicalReferenceStationId!: number;

    @DF(21) @UInt(6) itrfEpochYear!: number;

    @DF(25) @Int(38) arpEcefX!: number;
    @DF(26) @Int(38) arpEcefY!: number;
    @DF(27) @Int(38) arpEcefZ!: number;

    get arpEcef(): [number, number, number] { return [this.arpEcefX, this.arpEcefY, this.arpEcefZ] };
    set arpEcef(ecef: [number, number, number]) { [this.arpEcefX, this.arpEcefY, this.arpEcefZ] = ecef; }
}