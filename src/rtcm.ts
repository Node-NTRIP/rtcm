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

import { BitStream } from '@ntrip/bit-buffer';
import { constructPropertiesKey, FunctionKeys } from './utils';
import { DecoderEncoder, getDecoderEncoder } from './decode-encode';
import { CRC24Q_TABLE } from './crc';

export enum RtcmMessageType {
    // noinspection JSUnusedGlobalSymbols
    UNKNOWN = -1,

    // EXPERIMENTAL = 1,
    // EXPERIMENTAL = ...,
    // EXPERIMENTAL = 100,

    GPS_L1_OBSERVATIONS = 1001,
    GPS_L1_OBSERVATIONS_EXTENDED = 1002,
    GPS_L1_L2_OBSERVATIONS = 1003,
    GPS_L1_L2_OBSERVATIONS_EXTENDED = 1004,

    STATION_ARP = 1005,
    STATION_ARP_HEIGHT = 1006,

    ANTENNA_DESCRIPTOR = 1007,
    ANTENNA_DESCRIPTOR_SERIAL = 1008,

    GLONASS_L1_OBSERVATIONS = 1009,
    GLONASS_L1_OBSERVATIONS_EXTENDED = 1010,
    GLONASS_L1_L2_OBSERVATIONS = 1011,
    GLONASS_L1_L2_OBSERVATIONS_EXTENDED = 1012,

    AUXILIARY_OPERATION_INFORMATION = 1013,

    NETWORK_AUXILIARY_STATION_DATA = 1014,

    GPS_IONOSPHERIC_CORRECTION_DIFFERENCES = 1015,
    GPS_GEOMETRIC_CORRECTION_DIFFERENCES = 1016,
    GPS_COMBINED_CORRECTION_DIFFERENCES = 1017,
    // RESERVED_GPS_ALTERNATIVE_IONOSPHERIC_CORRECTION_DIFFERENCES = 1018,

    GPS_SATELLITE_EPHEMERIS_DATA = 1019,
    GLONASS_SATELLITE_EPHEMERIS_DATA = 1020,

    HELMERT_ABRIDGED_MOLODENSKI_TRANSFORMATION_PARAMETERS = 1021,
    MOLODENSKI_BADEKAS_TRANSFORMATION_PARAMETERS = 1022,

    RESIDUALS_ELLIPSOIDAL_GRID_REPRESENTATION = 1023,
    RESIDUALS_PLANE_GRID_REPRESENTATION = 1024,

    PROJECTION_PARAMETERS_EXCEPT_LCC2SP_OM = 1025,
    PROJECTION_PARAMETERS_LCC2SP = 1026,
    PROJECTION_PARAMETERS_OM = 1027,

    // RESERVED_GLOBAL_PLATE_FIXED_TRANSFORMATION = 1028,

    UNICODE_TEXT_STRING = 1029,

    GPS_NETWORK_RTK_RESIDUAL = 1030,
    GLONASS_NETWORK_RTK_RESIDUAL = 1031,

    PHYSICAL_REFERENCE_STATION_POSITION = 1032,
    RECEIVER_ANTENNA_DESCRIPTOR = 1033,

    GPS_NETWORK_FKP_GRADIENT = 1034,
    GLONASS_NETWORK_FKP_GRADIENT = 1035,

    GLONASS_IONOSPHERIC_CORRECTION_DIFFERENCES = 1037,
    GLONASS_GEOMETRIC_CORRECTION_DIFFERENCES = 1038,
    GLONASS_COMBINED_CORRECTION_DIFFERENCES = 1039,

    IRNSS_SATELLITE_EPHEMERIS_DATA = 1041,
    BEIDOU_SATELLITE_EPHEMERIS_DATA = 1042,
    QZSS_SATELLITE_EPHEMERIS_DATA = 1044,
    GALILEO_F_NAV_SATELLITE_EPHEMERIS_DATA = 1045,
    GALILEO_I_NAV_SATELLITE_EPHEMERIS_DATA = 1046,

    SSR_GPS_ORBIT_CORRECTION = 1057,
    SSR_GPS_CLOCK_CORRECTION = 1058,
    SSR_GPS_CODE_BIAS = 1059,
    SSR_GPS_COMBINED_CORRECTION = 1060,
    SSR_GPS_URA = 1061,
    SSR_GPS_HIGH_RATE_CLOCK_CORRECTION = 1062,

    SSR_GLONASS_ORBIT_CORRECTION = 1063,
    SSR_GLONASS_CLOCK_CORRECTION = 1064,
    SSR_GLONASS_CODE_BIAS = 1065,
    SSR_GLONASS_COMBINED_CORRECTION = 1066,
    SSR_GLONASS_URA = 1067,
    SSR_GLONASS_HIGH_RATE_CLOCK_CORRECTION = 1068,

    // RESERVED_MSM = 1070,

    GPS_MSM1 = 1071,
    GPS_MSM2 = 1072,
    GPS_MSM3 = 1073,
    GPS_MSM4 = 1074,
    GPS_MSM5 = 1075,
    GPS_MSM6 = 1076,
    GPS_MSM7 = 1077,

    // RESERVED_MSM = 1078,
    // RESERVED_MSM = 1079,
    // RESERVED_MSM = 1080,

    GLONASS_MSM1 = 1081,
    GLONASS_MSM2 = 1082,
    GLONASS_MSM3 = 1083,
    GLONASS_MSM4 = 1084,
    GLONASS_MSM5 = 1085,
    GLONASS_MSM6 = 1086,
    GLONASS_MSM7 = 1087,

    // RESERVED_MSM = 1088,
    // RESERVED_MSM = 1089,
    // RESERVED_MSM = 1090,

    GALILEO_MSM1 = 1091,
    GALILEO_MSM2 = 1092,
    GALILEO_MSM3 = 1093,
    GALILEO_MSM4 = 1094,
    GALILEO_MSM5 = 1095,
    GALILEO_MSM6 = 1096,
    GALILEO_MSM7 = 1097,

    // RESERVED_MSM = 1098,
    // RESERVED_MSM = 1099,
    // RESERVED_MSM = 1100,

    SBAS_MSM1 = 1101,
    SBAS_MSM2 = 1102,
    SBAS_MSM3 = 1103,
    SBAS_MSM4 = 1104,
    SBAS_MSM5 = 1105,
    SBAS_MSM6 = 1106,
    SBAS_MSM7 = 1107,

    // RESERVED_MSM = 1108,
    // RESERVED_MSM = 1109,
    // RESERVED_MSM = 1110,

    QZSS_MSM1 = 1111,
    QZSS_MSM2 = 1112,
    QZSS_MSM3 = 1113,
    QZSS_MSM4 = 1114,
    QZSS_MSM5 = 1115,
    QZSS_MSM6 = 1116,
    QZSS_MSM7 = 1117,

    // RESERVED_MSM = 1118,
    // RESERVED_MSM = 1119,
    // RESERVED_MSM = 1120,

    BEIDOU_MSM1 = 1121,
    BEIDOU_MSM2 = 1122,
    BEIDOU_MSM3 = 1123,
    BEIDOU_MSM4 = 1124,
    BEIDOU_MSM5 = 1125,
    BEIDOU_MSM6 = 1126,
    BEIDOU_MSM7 = 1127,

    // RESERVED_MSM = 1128,
    // RESERVED_MSM = 1129,
    // RESERVED_MSM = 1130,

    IRNSS_MSM1 = 1131,
    IRNSS_MSM2 = 1132,
    IRNSS_MSM3 = 1133,
    IRNSS_MSM4 = 1134,
    IRNSS_MSM5 = 1135,
    IRNSS_MSM6 = 1136,
    IRNSS_MSM7 = 1137,

    // RESERVED_MSM = 1138,
    // RESERVED_MSM = 1139,
    // RESERVED_MSM = 1140,

    FUTURE_1_MSM1 = 1141,
    FUTURE_1_MSM2 = 1142,
    FUTURE_1_MSM3 = 1143,
    FUTURE_1_MSM4 = 1144,
    FUTURE_1_MSM5 = 1145,
    FUTURE_1_MSM6 = 1146,
    FUTURE_1_MSM7 = 1147,

    // RESERVED_MSM = 1148,
    // RESERVED_MSM = 1149,
    // RESERVED_MSM = 1150,

    FUTURE_2_MSM1 = 1151,
    FUTURE_2_MSM2 = 1152,
    FUTURE_2_MSM3 = 1153,
    FUTURE_2_MSM4 = 1154,
    FUTURE_2_MSM5 = 1155,
    FUTURE_2_MSM6 = 1156,
    FUTURE_2_MSM7 = 1157,

    // RESERVED_MSM = 1158,
    // RESERVED_MSM = 1159,
    // RESERVED_MSM = 1160,

    FUTURE_3_MSM1 = 1161,
    FUTURE_3_MSM2 = 1162,
    FUTURE_3_MSM3 = 1163,
    FUTURE_3_MSM4 = 1164,
    FUTURE_3_MSM5 = 1165,
    FUTURE_3_MSM6 = 1166,
    FUTURE_3_MSM7 = 1167,

    // RESERVED_MSM = 1168,
    // RESERVED_MSM = 1169,
    // RESERVED_MSM = 1170,

    FUTURE_4_MSM1 = 1171,
    FUTURE_4_MSM2 = 1172,
    FUTURE_4_MSM3 = 1173,
    FUTURE_4_MSM4 = 1174,
    FUTURE_4_MSM5 = 1175,
    FUTURE_4_MSM6 = 1176,
    FUTURE_4_MSM7 = 1177,

    // RESERVED_MSM = 1178,
    // RESERVED_MSM = 1179,
    // RESERVED_MSM = 1180,

    FUTURE_5_MSM1 = 1181,
    FUTURE_5_MSM2 = 1182,
    FUTURE_5_MSM3 = 1183,
    FUTURE_5_MSM4 = 1184,
    FUTURE_5_MSM5 = 1185,
    FUTURE_5_MSM6 = 1186,
    FUTURE_5_MSM7 = 1187,

    // RESERVED_MSM = 1188,
    // RESERVED_MSM = 1189,
    // RESERVED_MSM = 1190,

    FUTURE_6_MSM1 = 1191,
    FUTURE_6_MSM2 = 1192,
    FUTURE_6_MSM3 = 1193,
    FUTURE_6_MSM4 = 1194,
    FUTURE_6_MSM5 = 1195,
    FUTURE_6_MSM6 = 1196,
    FUTURE_6_MSM7 = 1197,

    // RESERVED_MSM = 1198,
    // RESERVED_MSM = 1199,
    // RESERVED_MSM = 1200,

    FUTURE_7_MSM1 = 1201,
    FUTURE_7_MSM2 = 1202,
    FUTURE_7_MSM3 = 1203,
    FUTURE_7_MSM4 = 1204,
    FUTURE_7_MSM5 = 1205,
    FUTURE_7_MSM6 = 1206,
    FUTURE_7_MSM7 = 1207,

    // RESERVED_MSM = 1208,
    // RESERVED_MSM = 1209,
    // RESERVED_MSM = 1210,

    FUTURE_8_MSM1 = 1211,
    FUTURE_8_MSM2 = 1212,
    FUTURE_8_MSM3 = 1213,
    FUTURE_8_MSM4 = 1214,
    FUTURE_8_MSM5 = 1215,
    FUTURE_8_MSM6 = 1216,
    FUTURE_8_MSM7 = 1217,

    // RESERVED_MSM = 1218,
    // RESERVED_MSM = 1219,
    // RESERVED_MSM = 1220,

    FUTURE_9_MSM1 = 1221,
    FUTURE_9_MSM2 = 1222,
    FUTURE_9_MSM3 = 1223,
    FUTURE_9_MSM4 = 1224,
    FUTURE_9_MSM5 = 1225,
    FUTURE_9_MSM6 = 1226,
    FUTURE_9_MSM7 = 1227,

    // RESERVED_MSM = 1228,
    // RESERVED_MSM = 1229,

    GLONASS_L1_L2_CODE_PHASE_BIASES = 1230,

    PROPRIETARY_ASHTECH = 4095,
    PROPRIETARY_TRIMBLE = 4094,
    PROPRIETARY_NOVATEL = 4093,
    PROPRIETARY_LEICA = 4092,
    PROPRIETARY_TOPCON = 4091,
    PROPRIETARY_GEO = 4090,
    PROPRIETARY_SEPTENTRIO = 4089,
    PROPRIETARY_IFEN = 4088,
    PROPRIETARY_FUGRO = 4087,
    PROPRIETARY_INPOSITION = 4086,
    PROPRIETARY_GSA = 4085,
    PROPRIETARY_GEODETICS = 4084,
    PROPRIETARY_DLR = 4083,
    PROPRIETARY_CRCSI = 4082,
    PROPRIETARY_SNUGL = 4081,
    PROPRIETARY_NAVCOM = 4080,
    PROPRIETARY_SCSC = 4079,
    PROPRIETARY_COMNAV = 4078,
    PROPRIETARY_HEMISPHERE = 4077,
    PROPRIETARY_IGS = 4076,
    PROPRIETARY_ALBERDING = 4075,
    PROPRIETARY_UNICORE = 4074,
    PROPRIETARY_MITSUBISHI = 4073,
    PROPRIETARY_UBLOX = 4072,
    PROPRIETARY_WNLBS = 4071,
    PROPRIETARY_MENGXIN = 4070,
    PROPRIETARY_VERIPOS = 4069,
    PROPRIETARY_QIANXUN = 4068,
    PROPRIETARY_CTTIC = 4067,

    // PROPRIETARY_RESERVED = 4066,
    // PROPRIETARY_RESERVED = ...,
    // PROPRIETARY_RESERVED = 4001,
}

export enum RtcmVersion {
    V3_0 = 3.0,
    V3_1 = 3.1,
    V3_2 = 3.2,
    V3_3 = 3.3,
    FUTURE = 4
}

export enum RtcmNavSystem {
    GPS = 'GPS',
    GLONASS = 'GLONASS',
    GALILEO = 'GALILEO',
    QZSS = 'QZSS',
    SBAS = 'SBAS',
    BEIDOU = 'BEIDOU',
    IRNSS = 'IRNSS',
    FUTURE = 'FUTURE'
}

const rtcmMessageClasses: Map<RtcmMessageType, new (...args: never) => RtcmMessage> = new Map();
export const MessageType = (type: RtcmMessageType) =>
        <T extends RtcmMessage>(constructor: new (internalGuard: never) => T) => {
            Object.defineProperty(constructor, 'messageType', {
                value: type,
                writable: false
            });

            if (rtcmMessageClasses.has(type)) throw new Error(`Class for message type ${type} is already registered`);
            rtcmMessageClasses.set(type, constructor);
        };

const sinceMetadataKey = Symbol('since');
export const Since = (version: RtcmVersion) => Reflect.metadata(sinceMetadataKey, version);

const navSystemMetadataKey = Symbol('navSystem');
export const NavSystem = (version: RtcmNavSystem) => Reflect.metadata(navSystemMetadataKey, version);

/**
 * Abstract RTCM message, containing properties common to all RTCM messages
 */
@Since(RtcmVersion.V3_0)
export abstract class RtcmMessage {
    static get decoderEncoder(): DecoderEncoder { return getDecoderEncoder(this); }
    static get sinceVersion(): RtcmVersion { return Reflect.getMetadata(sinceMetadataKey, this); }
    static get navSystem(): RtcmNavSystem | null { return Reflect.getMetadata(navSystemMetadataKey, this) ?? null; }

    static readonly messageType: RtcmMessageType = RtcmMessageType.UNKNOWN;
    // Only modified by RtcmMessageUnknown, otherwise always returns the static messageType property
    get messageType(): RtcmMessageType { return (this.constructor as typeof RtcmMessage).messageType; };

    // Force users to initialize using RtcmMessage.construct()
    // noinspection JSUnusedLocalSymbols
    constructor(internalGuard: never) {}

    /**
     * Constructs a new RTCM message
     *
     * @param params Required parameters to initialize the message
     */
    static construct<T extends RtcmMessage, E extends keyof T = never, I = {}>(
            this: (new (internalGuard: never) => T) & {
                [constructPropertiesKey]: (exclude: E) => I,
            },
            params: Omit<T, 'messageType' | FunctionKeys<T> | E> & I): T {
        return Object.assign(new this(<never>undefined), params);
    }
    static [constructPropertiesKey]: (exclude: never) => {};
}

/**
 * Unknown RTCM message, for all message types for which a parser has not been provided
 */
@Since(RtcmVersion.V3_0)
export class RtcmMessageUnknown extends RtcmMessage {
    /** Returns the message type stored in the raw buffer, or unknown if the buffer is too short */
    get messageType(): RtcmMessageType {
        return this.raw.length >= 2 ? (this.raw[0] << 4 || this.raw[1] >> 4) : RtcmMessageType.UNKNOWN;
    }

    readonly raw!: Uint8Array;
}

export namespace RtcmTransport {
    export const SYNC_CHAR = 0xD3;

    export const HEADER_SIZE = 3;
    export const CRC_SIZE = 3;

    export const MAX_PACKET_SIZE = 1023 + HEADER_SIZE + CRC_SIZE;

    export class Exception extends Error {
        constructor(type: string, message: string) {
            super(`RTCM ${type} exception: ${message}`);
        }
    }

    export class DecodeException extends Exception {
        constructor(message: string) {
            super('decode', message);
        }
    }

    export class EncodeException extends Exception {
        constructor(message: string) {
            super('encode', message);
        }
    }

    function readUint(buffer: Uint8Array, offset: number, byteLength: number): number {
        let value = 0;
        for (let i = 0; i < byteLength; i++) {
            value = value << 8 | buffer[offset + i];
        }
        return value;
    }

    function writeUint(buffer: Uint8Array, value: number, offset: number, byteLength: number): void {
        for (let i = byteLength - 1; i >= 0; i--, value >>= 8) {
            buffer[offset + i] = value & 0xff;
        }
    }

    /**
     * Decodes the provided buffer to an RTCM message
     *
     * @param buffer Buffer to decode from
     * @returns Decoded RTCM message and number of bytes read from buffer
     * @throws {DecodeException} If buffer does not contain a valid RTCM message
     */
    export function decode(buffer: Uint8Array): [RtcmMessage, number] {
        const preamble = buffer[0];
        if (preamble != SYNC_CHAR)
            throw new DecodeException(`Invalid preamble (expected ${SYNC_CHAR.toString(16)}, got ${preamble.toString(16)})`);

        const messageLength = (buffer[1] & 0x03) << 8 | buffer[2];
        const messageEndByteIndex = HEADER_SIZE + messageLength;

        const crcContent = buffer.slice(0, messageEndByteIndex);
        const crcCalculated = crc24q(crcContent);
        const crcReceived = readUint(buffer, messageEndByteIndex, CRC_SIZE);
        if (crcCalculated != crcReceived)
            throw new DecodeException(`CRC does not match (expected ${crcReceived.toString(16)}, got ${crcCalculated.toString(16)})`);

        const messageType = messageLength >= 2 ? (buffer[3] << 4 | buffer [4] >> 4) as RtcmMessageType : RtcmMessageType.UNKNOWN;

        let message: RtcmMessage;
        const resultType = rtcmMessageClasses.get(messageType);
        if (resultType === undefined) {
            const messageContent = buffer.slice(HEADER_SIZE, messageEndByteIndex);
            message = RtcmMessageUnknown.construct({
                raw: messageContent
            });
        } else {
            message = new resultType(<never>undefined);

            const s = new BitStream(buffer, HEADER_SIZE);
            s.index += 12; // Skip message type
            const decoder = getDecoderEncoder(message.constructor).decoder;
            try {
                decoder.run(message, s);
            } catch (err) {
                throw new DecodeException(`Could not run script: ${err.message}\n${decoder.fullScript}\n${JSON.stringify(message)}`);
            }

            const finalByteIndex = s.byteIndex;
            if (finalByteIndex > messageLength)
                throw new DecodeException(`Corrupt ${resultType!.name}[${messageType}] detected, not long enough to contain necessary data (${messageLength} sent, ${finalByteIndex} required)`);
        }

        return [message, messageLength + HEADER_SIZE + CRC_SIZE];
    }

    /**
     * Encodes the provided RTCM message to the provided buffer
     *
     * @param message Message to encode
     * @param buffer Buffer to encode to
     * @returns Number of bytes written to the buffer
     * @throws {EncodeException} If an error occurs when running the encode script for the message
     */
    export function encode(message: RtcmMessage, buffer: Uint8Array): number {
        buffer[0] = SYNC_CHAR;

        let messageLength;
        if (message instanceof RtcmMessageUnknown) {
            messageLength = message.raw.length;
            message.raw.set(buffer, HEADER_SIZE);
        } else {
            const s = new BitStream(buffer, HEADER_SIZE);
            s.writeBits(message.messageType, 12);
            const encoder = getDecoderEncoder(message.constructor).encoder;
            try {
                encoder.run(message, s);
            } catch (err) {
                throw new EncodeException(`Could not run script: ${err.message}\n${encoder.fullScript}`);
            }
            messageLength = s.byteIndex;
        }
        writeUint(buffer, messageLength, 1, 2);

        const messageEndByteIndex = HEADER_SIZE + messageLength;

        const crcContent = buffer.slice(0, messageEndByteIndex);
        writeUint(buffer, crc24q(crcContent), messageEndByteIndex, CRC_SIZE);

        return messageLength + HEADER_SIZE + CRC_SIZE;
    }

    /**
     * Calculates a CRC-24Q checksum for the provided buffer
     *
     * @param buffer Buffer to calculate checksum for
     */
    export function crc24q(buffer: Uint8Array): number {
        let crc = 0;
        for (let i = 0; i < buffer.length; i++) {
            crc = (crc << 8) ^ CRC24Q_TABLE[(buffer[i] ^ (crc >> 16)) & 0xff];
        }
        return crc & 0xffffff;
    }
}

// Import all messages to add to decoder
import './messages/index';
