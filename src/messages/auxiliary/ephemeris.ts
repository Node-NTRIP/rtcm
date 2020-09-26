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

import { Bool, DF, Int, IntSM, Skip, UInt } from '../../decode-encode';
import { MessageType, NavSystem, RtcmMessage, RtcmMessageType, RtcmNavSystem, RtcmVersion, Since } from '../../rtcm';

@MessageType(RtcmMessageType.GPS_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GPS)
export class RtcmMessageGpsSatelliteEphemerisData extends RtcmMessage {
    @DF(9) @UInt(6) satelliteId!: number;
    @DF(76) @UInt(10) weekNumber!: number;
    @DF(77) @UInt(4) svAccuracy!: number;
    @DF(78) @UInt(2) codeOnL2!: number;
    @DF(79) @Int(14) idot!: number;
    @DF(71) @UInt(8) iode!: number;
    @DF(81) @UInt(16) t_oc!: number;
    @DF(82) @Int(8) a_f2!: number;
    @DF(83) @Int(16) a_f1!: number;
    @DF(84) @Int(22) a_f0!: number;
    @DF(85) @UInt(10) iodc!: number;
    @DF(86) @Int(16) c_rs!: number;
    @DF(87) @Int(16) deltaN!: number;
    @DF(88) @Int(32) m_0!: number;
    @DF(89) @Int(16) c_uc!: number;
    @DF(90) @UInt(32) e!: number;
    @DF(91) @Int(16) c_us!: number;
    @DF(92) @UInt(32) a_1_2!: number;
    @DF(93) @UInt(16) t_oe!: number;
    @DF(94) @Int(16) c_ic!: number;
    @DF(95) @Int(32) omega_0!: number;
    @DF(96) @Int(16) c_is!: number;
    @DF(97) @Int(32) i_0!: number;
    @DF(98) @Int(16) c_rc!: number;
    @DF(99) @Int(32) w!: number;
    @DF(100) @Int(24) omegadot!: number;
    @DF(101) @Int(8) t_gd!: number;
    @DF(102) @UInt(6) svHealth!: number;
    @DF(103) @Bool l2PDataFlag!: boolean;
    @DF(137) @UInt(1) fitInterval!: number;
}

@MessageType(RtcmMessageType.GLONASS_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_1) @NavSystem(RtcmNavSystem.GLONASS)
export class RtcmMessageGlonassSatelliteEphemerisData extends RtcmMessage {
    @DF(38) @UInt(6) satelliteId!: number;
    @DF(40) @UInt(5) satelliteFrequencyChannelNumber!: number;
    @DF(104) @Bool almanacHealth!: boolean;
    @DF(105) @Bool almanacHealthAvailabilityIndicator!: boolean;
    @DF(106) @UInt(2) p1!: number;
    @DF(107) @UInt(12) t_k!: number;
    @DF(108) @UInt(1) b_nMsbWord!: number;
    @DF(109) @UInt(1) p2!: number;
    @DF(110) @UInt(7) t_b!: number;
    @DF(111) @IntSM(24) x_n_1!: number;
    @DF(112) @IntSM(27) x_n!: number;
    @DF(113) @IntSM(5) x_n_2!: number;
    @DF(114) @IntSM(24) y_n_1!: number;
    @DF(115) @IntSM(27) y_n!: number;
    @DF(116) @IntSM(5) y_n_2!: number;
    @DF(117) @IntSM(24) z_n_1!: number;
    @DF(118) @IntSM(27) z_n!: number;
    @DF(119) @IntSM(5) z_n_2!: number;
    @DF(120) @UInt(1) p3!: number;
    @DF(121) @IntSM(11) gamma_n!: number;
    @DF(122) @UInt(2) mP!: number;
    @DF(123) @UInt(1) mL_n_3!: number;
    @DF(124) @IntSM(22) t_n!: number;
    @DF(125) @IntSM(5) mDeltaT_n!: number;
    @DF(126) @UInt(5) e_n!: number;
    @DF(127) @UInt(1) mP4!: number;
    @DF(128) @UInt(4) mF_t!: number;
    @DF(129) @UInt(11) mN_t!: number;
    @DF(130) @UInt(2) mM!: number;
    @DF(131) @UInt(1) remainderValid!: number;
    @DF(132) @UInt(11) n_a!: number;
    @DF(133) @IntSM(32) t_c!: number;
    @DF(134) @UInt(5) mN_4!: number;
    @DF(135) @IntSM(22) t_gps!: number;
    @DF(136) @UInt(1) mL_n_5!: number;
    @DF(1) @Skip(7) private skip2?: void;
}

@MessageType(RtcmMessageType.BEIDOU_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.BEIDOU)
export class RtcmMessageBdsSatelliteEphemerisData extends RtcmMessage {
    @DF(488) @UInt(6) satelliteId!: number;
    @DF(489) @UInt(13) weekNumber!: number;
    @DF(490) @UInt(4) svUrai!: number;
    @DF(491) @Int(14) idot!: number;
    @DF(492) @UInt(5) aode!: number;
    @DF(493) @UInt(17) t_oc!: number;
    @DF(494) @Int(11) a_2!: number;
    @DF(495) @Int(22) a_1!: number;
    @DF(496) @Int(24) a_0!: number;
    @DF(497) @UInt(5) aodc!: number;
    @DF(498) @Int(18) c_rs!: number;
    @DF(499) @Int(16) deltaN!: number;
    @DF(500) @Int(32) m_0!: number;
    @DF(501) @Int(18) c_uc!: number;
    @DF(502) @UInt(32) e!: number;
    @DF(503) @Int(18) c_us!: number;
    @DF(504) @UInt(32) a_1_2!: number;
    @DF(505) @UInt(17) t_oe!: number;
    @DF(506) @Int(18) c_ic!: number;
    @DF(507) @Int(32) omega_0!: number;
    @DF(508) @Int(18) c_is!: number;
    @DF(509) @Int(32) i_0!: number;
    @DF(510) @Int(18) c_rc!: number;
    @DF(511) @Int(32) w!: number;
    @DF(512) @Int(24) omegaDot!: number;
    @DF(513) @Int(10) t_gd1!: number;
    @DF(514) @Int(10) t_gd2!: number;
    @DF(515) @Bool svHealth!: boolean;
}

@MessageType(RtcmMessageType.QZSS_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.QZSS)
export class RtcmMessageQzssSatelliteEphemerisData extends RtcmMessage {
    @DF(429) @UInt(4) satelliteId!: number;
    @DF(430) @UInt(16) t_oc!: number;
    @DF(431) @Int(8) a_f2!: number;
    @DF(432) @Int(16) a_f1!: number;
    @DF(433) @Int(22) a_f0!: number;
    @DF(434) @UInt(8) iode!: number;
    @DF(435) @Int(16) c_rs!: number;
    @DF(436) @Int(16) deltaN_0!: number;
    @DF(437) @Int(32) m_0!: number;
    @DF(438) @Int(16) c_uc!: number;
    @DF(439) @UInt(32) e!: number;
    @DF(440) @Int(16) c_us!: number;
    @DF(441) @UInt(32) a_1_2!: number;
    @DF(442) @UInt(16) t_oe!: number;
    @DF(443) @Int(16) c_ic!: number;
    @DF(444) @Int(32) omega_0!: number;
    @DF(445) @Int(16) c_is!: number;
    @DF(446) @Int(32) i_0!: number;
    @DF(447) @Int(16) c_rc!: number;
    @DF(448) @Int(32) w_n!: number;
    @DF(449) @Int(24) omegaDot!: number;
    @DF(450) @Int(14) i_0_dot!: number;
    @DF(451) @UInt(2) l2ChannelCodes!: number;
    @DF(452) @UInt(10) weekNumber!: number;
    @DF(453) @UInt(4) ura!: number;
    @DF(454) @UInt(6) svHealth!: number;
    @DF(455) @Int(8) t_gd!: number;
    @DF(456) @UInt(10) iodc!: number;
    @DF(457) @UInt(1) fitInterval!: number;
}

@MessageType(RtcmMessageType.GALILEO_F_NAV_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_2) @NavSystem(RtcmNavSystem.GALILEO)
export class RtcmMessageGalileoFNavSatelliteEphemerisData extends RtcmMessage {
    @DF(252) @UInt(6) satelliteId!: number;
    @DF(289) @UInt(12) weekNumber!: number;
    @DF(290) @UInt(10) iodnav!: number;
    @DF(291) @UInt(8) svSisAccuracy!: number;
    @DF(292) @Int(14) idot!: number;
    @DF(293) @UInt(14) t_oc!: number;
    @DF(294) @Int(6) a_f2!: number;
    @DF(295) @Int(21) a_f1!: number;
    @DF(296) @Int(31) a_f0!: number;
    @DF(297) @Int(16) c_rs!: number;
    @DF(298) @Int(16) deltaN!: number;
    @DF(299) @Int(32) m_0!: number;
    @DF(300) @Int(16) c_uc!: number;
    @DF(301) @UInt(32) e!: number;
    @DF(302) @Int(16) c_us!: number;
    @DF(303) @UInt(32) a_1_2!: number;
    @DF(304) @UInt(14) t_oe!: number;
    @DF(305) @Int(16) c_ic!: number;
    @DF(306) @Int(32) omega_0!: number;
    @DF(307) @Int(16) c_is!: number;
    @DF(308) @Int(32) i_0!: number;
    @DF(309) @Int(16) c_rc!: number;
    @DF(310) @Int(32) w!: number;
    @DF(311) @Int(24) omegaDot!: number;
    @DF(312) @UInt(10) bgd_e5a_e1!: number;
    @DF(314) @UInt(2) navSignalHealthStatus!: number;
    @DF(315) @UInt(1) navDataValidityStatus!: number;
    @DF(1) @Skip(7) private skip2?: void;
}

@MessageType(RtcmMessageType.GALILEO_I_NAV_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.GALILEO)
export class RtcmMessageGalileoINavSatelliteEphemerisData extends RtcmMessage {
    @DF(252) @UInt(6) satelliteId!: number;
    @DF(289) @UInt(12) weekNumber!: number;
    @DF(290) @UInt(10) iodnav!: number;
    @DF(286) @UInt(8) sisaIndex!: number;
    @DF(292) @Int(14) idot!: number;
    @DF(293) @UInt(14) t_oc!: number;
    @DF(294) @Int(6) a_f2!: number;
    @DF(295) @Int(21) a_f1!: number;
    @DF(296) @Int(31) a_f0!: number;
    @DF(297) @Int(16) c_rs!: number;
    @DF(298) @Int(16) deltaN!: number;
    @DF(299) @Int(32) m_0!: number;
    @DF(300) @Int(16) c_uc!: number;
    @DF(301) @UInt(32) e!: number;
    @DF(302) @Int(16) c_us!: number;
    @DF(303) @UInt(32) a_1_2!: number;
    @DF(304) @UInt(14) t_oe!: number;
    @DF(305) @Int(16) c_ic!: number;
    @DF(306) @Int(32) omega_0!: number;
    @DF(307) @Int(16) c_is!: number;
    @DF(308) @Int(32) i_0!: number;
    @DF(309) @Int(16) c_rc!: number;
    @DF(310) @Int(32) w!: number;
    @DF(311) @Int(24) omegaDot!: number;
    @DF(312) @UInt(10) bgd_e5a_e1!: number;
    @DF(313) @UInt(10) bgd_e5b_e1!: number;
    @DF(316) @UInt(2) e5bSignalHealthStatus!: number;
    @DF(317) @UInt(1) e5bDataValidityStatus!: number;
    @DF(287) @UInt(2) e1bSignalHealthStatus!: number;
    @DF(288) @UInt(1) e1bDataValidityStatus!: number;
    @DF(1) @Skip(2) private skip2?: void;
}

@MessageType(RtcmMessageType.IRNSS_SATELLITE_EPHEMERIS_DATA)
@Since(RtcmVersion.V3_3) @NavSystem(RtcmNavSystem.IRNSS)
export class RtcmMessageIrnssSatelliteEphemerisData extends RtcmMessage {
    @DF(516) @UInt(6) satelliteId!: number;
    @DF(517) @UInt(10) weekNumber!: number;
    @DF(518) @Int(22) a_f0!: number;
    @DF(519) @Int(16) a_f1!: number;
    @DF(520) @Int(8) a_f2!: number;
    @DF(521) @UInt(4) ura!: number;
    @DF(522) @UInt(16) t_oc!: number;
    @DF(523) @Int(8) t_gd!: number;
    @DF(524) @Int(22) deltaN!: number;
    @DF(525) @UInt(8) iodec!: number;
    @DF(526) @UInt(10) reservedAfterIodec!: number;
    @DF(527) @Bool l5Flag!: boolean;
    @DF(528) @Bool sFlag!: boolean;
    @DF(529) @Int(15) c_uc!: number;
    @DF(530) @Int(15) c_us!: number;
    @DF(531) @Int(15) c_ic!: number;
    @DF(532) @Int(15) c_is!: number;
    @DF(533) @Int(15) c_rc!: number;
    @DF(534) @Int(15) c_rs!: number;
    @DF(535) @Int(14) idot!: number;
    @DF(536) @Int(32) m_0!: number;
    @DF(537) @UInt(16) t_oe!: number;
    @DF(538) @UInt(32) e!: number;
    @DF(539) @UInt(32) sqrt_a!: number;
    @DF(540) @Int(32) omega_0!: number;
    @DF(541) @Int(32) w!: number;
    @DF(542) @Int(22) omegaDot!: number;
    @DF(543) @Int(32) i_0!: number;
    @DF(544) @UInt(2) spareBitsAfterIdot!: number
    @DF(545) @UInt(2) spareBitsAfterI0!: number
}