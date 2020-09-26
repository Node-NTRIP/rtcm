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

import { MessageType, NavSystem, RtcmMessageType, RtcmNavSystem, RtcmVersion, Since } from '../../../rtcm';
import {
    RtcmMessageMsm1,
    RtcmMessageMsm2,
    RtcmMessageMsm3,
    RtcmMessageMsm4,
    RtcmMessageMsm5,
    RtcmMessageMsm6,
    RtcmMessageMsm7
} from './common';

@MessageType(RtcmMessageType.GPS_MSM1) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm1Gps extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.GPS_MSM2) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm2Gps extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.GPS_MSM3) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm3Gps extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.GPS_MSM4) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm4Gps extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.GPS_MSM5) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm5Gps extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.GPS_MSM6) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm6Gps extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.GPS_MSM7) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GPS) export class RtcmMessageMsm7Gps extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.GLONASS_MSM1) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm1Glonass extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.GLONASS_MSM2) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm2Glonass extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.GLONASS_MSM3) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm3Glonass extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.GLONASS_MSM4) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm4Glonass extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.GLONASS_MSM5) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm5Glonass extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.GLONASS_MSM6) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm6Glonass extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.GLONASS_MSM7) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GLONASS) export class RtcmMessageMsm7Glonass extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.GALILEO_MSM1) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm1Galileo extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.GALILEO_MSM2) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm2Galileo extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.GALILEO_MSM3) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm3Galileo extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.GALILEO_MSM4) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm4Galileo extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.GALILEO_MSM5) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm5Galileo extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.GALILEO_MSM6) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm6Galileo extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.GALILEO_MSM7) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO) export class RtcmMessageMsm7Galileo extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.SBAS_MSM1) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm1Sbas extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.SBAS_MSM2) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm2Sbas extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.SBAS_MSM3) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm3Sbas extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.SBAS_MSM4) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm4Sbas extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.SBAS_MSM5) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm5Sbas extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.SBAS_MSM6) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm6Sbas extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.SBAS_MSM7) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.SBAS) export class RtcmMessageMsm7Sbas extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.QZSS_MSM1) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm1Qzss extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.QZSS_MSM2) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm2Qzss extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.QZSS_MSM3) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm3Qzss extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.QZSS_MSM4) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm4Qzss extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.QZSS_MSM5) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm5Qzss extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.QZSS_MSM6) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm6Qzss extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.QZSS_MSM7) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS) export class RtcmMessageMsm7Qzss extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.BEIDOU_MSM1) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm1Bds extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.BEIDOU_MSM2) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm2Bds extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.BEIDOU_MSM3) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm3Bds extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.BEIDOU_MSM4) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm4Bds extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.BEIDOU_MSM5) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm5Bds extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.BEIDOU_MSM6) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm6Bds extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.BEIDOU_MSM7) @Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.BEIDOU) export class RtcmMessageMsm7Bds extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.IRNSS_MSM1) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm1Irnss extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.IRNSS_MSM2) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm2Irnss extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.IRNSS_MSM3) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm3Irnss extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.IRNSS_MSM4) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm4Irnss extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.IRNSS_MSM5) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm5Irnss extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.IRNSS_MSM6) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm6Irnss extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.IRNSS_MSM7) @Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS) export class RtcmMessageMsm7Irnss extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_1_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future1 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_1_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future1 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_1_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future1 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_1_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future1 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_1_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future1 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_1_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future1 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_1_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future1 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_2_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future2 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_2_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future2 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_2_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future2 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_2_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future2 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_2_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future2 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_2_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future2 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_2_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future2 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_3_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future3 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_3_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future3 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_3_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future3 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_3_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future3 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_3_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future3 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_3_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future3 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_3_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future3 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_4_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future4 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_4_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future4 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_4_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future4 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_4_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future4 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_4_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future4 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_4_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future4 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_4_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future4 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_5_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future5 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_5_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future5 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_5_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future5 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_5_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future5 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_5_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future5 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_5_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future5 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_5_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future5 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_6_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future6 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_6_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future6 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_6_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future6 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_6_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future6 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_6_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future6 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_6_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future6 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_6_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future6 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_7_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future7 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_7_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future7 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_7_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future7 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_7_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future7 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_7_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future7 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_7_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future7 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_7_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future7 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_8_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future8 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_8_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future8 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_8_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future8 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_8_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future8 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_8_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future8 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_8_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future8 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_8_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future8 extends RtcmMessageMsm7 {}

@MessageType(RtcmMessageType.FUTURE_9_MSM1) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm1Future9 extends RtcmMessageMsm1 {}
@MessageType(RtcmMessageType.FUTURE_9_MSM2) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm2Future9 extends RtcmMessageMsm2 {}
@MessageType(RtcmMessageType.FUTURE_9_MSM3) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm3Future9 extends RtcmMessageMsm3 {}
@MessageType(RtcmMessageType.FUTURE_9_MSM4) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm4Future9 extends RtcmMessageMsm4 {}
@MessageType(RtcmMessageType.FUTURE_9_MSM5) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm5Future9 extends RtcmMessageMsm5 {}
@MessageType(RtcmMessageType.FUTURE_9_MSM6) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm6Future9 extends RtcmMessageMsm6 {}
@MessageType(RtcmMessageType.FUTURE_9_MSM7) @Since(RtcmVersion.FUTURE) @NavSystem(RtcmNavSystem.FUTURE) export class RtcmMessageMsm7Future9 extends RtcmMessageMsm7 {}

export type NavSystemReferenceSignals = Record<string, [number | ((k: number) => number), string]>;
export const referenceSignals: Record<RtcmNavSystem, NavSystemReferenceSignals> = {
    [RtcmNavSystem.GPS]: {
        L1: [1575.42, 'L1C'],
        L2: [12227.6, 'L2P'],
        L3: [1176.45, 'L5I']
    },
    [RtcmNavSystem.GLONASS]: {
        G1: [(k: number) => 1602 + k * 9 / 16, 'L1C'],
        G2: [(k: number) => 1246 + k * 7 / 16, 'L2C']
    },
    [RtcmNavSystem.GALILEO]: {
        E1: [1575.42, 'L1B'],
        E5A: [1176.45, 'L5I'],
        E5B: [1207.14, 'L7I'],
        E5AB: [1191.795, 'L8I'],
        E6: [1278.75, 'L6B'],
    },
    [RtcmNavSystem.SBAS]: {
        L1: [1575.42, 'L1C'],
        L5: [1176.45, 'L5I']
    },
    [RtcmNavSystem.QZSS]: {
        L1: [1575.42, 'L1C'],
        L2: [1227.60, 'L2S'],
        L5: [1176.45, 'L5I']
    },
    [RtcmNavSystem.BEIDOU]: {
        B1: [1561.098, 'L2I'],
        B2: [1207.140, 'L7I'],
        B3: [1268.52, 'L6I']
    },
    [RtcmNavSystem.IRNSS]: {
        L5: [1176.45, 'L5A']
    },
    [RtcmNavSystem.FUTURE]: {}
}

export type NavSystemSignalIdMapping = Record<number, [number, string, string]>;
export const signalIdMapping: Record<RtcmNavSystem, NavSystemSignalIdMapping> = {
    [RtcmNavSystem.GPS]: {
        2: [1, 'L1', '1C'],
        3: [1, 'L1', '1P'],
        4: [1, 'L1', '1W'],
        8: [2, 'L2', '2C'],
        9: [2, 'L2', '2P'],
        10: [2, 'L2', '2W'],
        15: [2, 'L2', '2S'],
        16: [2, 'L2', '2L'],
        17: [2, 'L2', '2X'],
        22: [5, 'L5', '5I'],
        23: [5, 'L5', '5Q'],
        24: [5, 'L5', '5X'],
        30: [1, 'L1', '1S'],
        31: [1, 'L1', '1L'],
        32: [1, 'L1', '1X']
    },
    [RtcmNavSystem.GLONASS]: {
        1: [1, 'G1', '1C'],
        2: [1, 'G1', '1P'],
        8: [2, 'G2', '2C'],
        9: [2, 'G2', '2P']
    },
    [RtcmNavSystem.GALILEO]: {
        2: [1, 'E1', '1C'],
        3: [1, 'E1', '1A'],
        4: [1, 'E1', '1B'],
        5: [1, 'E1', '1X'],
        6: [1, 'E1', '1Z'],
        8: [6, 'E6', '6C'],
        9: [6, 'E6', '6A'],
        10: [6, 'E6', '6B'],
        11: [6, 'E6', '6X'],
        12: [6, 'E6', '6Z'],
        14: [5, 'E5B', '7I'],
        15: [5, 'E5B', '7Q'],
        16: [5, 'E5B', '7X'],
        18: [5, 'E5AB', '8I'],
        19: [5, 'E5AB', '8Q'],
        20: [5, 'E5AB', '8X'],
        22: [5, 'E5A', '5I'],
        23: [5, 'E5A', '5Q'],
        24: [5, 'E5A', '5X']
    },
    [RtcmNavSystem.SBAS]: {
        2: [1, 'L1', '1C'],
        22: [5, 'L5', '5I'],
        23: [5, 'L5', '5Q'],
        24: [5, 'L5', '5X']
    },
    [RtcmNavSystem.QZSS]: {
        2: [1, 'L1', '1C'],
        9: [0, 'LEX', '6S'],
        10: [0, 'LEX', '6L'],
        11: [0, 'LEX', '6X'],
        15: [2, 'L2', '2S'],
        16: [2, 'L2', '2L'],
        17: [2, 'L2', '2X'],
        22: [5, 'L5', '5I'],
        23: [5, 'L5', '5Q'],
        24: [5, 'L5', '5X'],
        30: [1, 'L1', '1S'],
        31: [1, 'L1', '1L'],
        32: [1, 'L1', '1X']
    },
    [RtcmNavSystem.BEIDOU]: {
        2: [1, 'B1', '2I'],
        3: [1, 'B1', '2Q'],
        4: [1, 'B1', '2X'],
        8: [3, 'B3', '6I'],
        9: [3, 'B3', '6Q'],
        10: [3, 'B3', '6X'],
        14: [2, 'B2', '7I'],
        15: [2, 'B2', '7Q'],
        16: [2, 'B2', '7X']
    },
    [RtcmNavSystem.IRNSS]: {
        22: [5, 'L5', '5A']
    },
    [RtcmNavSystem.FUTURE]: {}
}