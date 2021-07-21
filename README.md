# RTCM 3 Decoder/Encoder
Decoder/encoder for all RTCM 3 message types up to RTCM 3.3 Amendment 1 (c10403.3).

## Installing

```
npm install -S @gnss/rtcm
```

## Basic Usage
#### Decoding
```typescript
let buffer: Buffer = ...; // Raw bytes of message to be decoded
let message: RtcmMessage; // Decoded message
let length: number; // Length of decoded message in bytes
[message, length] = RtcmTransport.decode(buffer);
// ...
buffer = buffer.slice(length); // Move to next message
```

#### Encoding
```typescript
let message = ...; // Message to be encoded
let buffer: Buffer = Buffer.allocUnsafe(RtcmTransport.MAX_PACKET_SIZE);
let length: number; // Length of encoded message in bytes
length = RtcmTransport.encode(message, buffer);
// ...
buffer = buffer.slice(0, length); // Encoded message
```

### Creating
Messages can be manually constructed using `RtcmMessage???.construct({})`, which requires all message properties to be provided.
```typescript
RtcmMessagePhysicalReferenceStationPosition.construct({
    nonPhysicalReferenceStationId: 1,
    physicalReferenceStationId: 0,
    itrfEpochYear: 0,
    arpEcefX: 37927650000,
    arpEcefY: -4160650000,
    arpEcefZ: 50938770000
})
```

### Streams
Transform streams to convert from `RtcmMessage`s to raw bytes and vice-versa.
```typescript
let input: stream.Readable = ...;
let output: stream.Writable = ...;
input                                      // Stream of raw data
    .pipe(new RtcmDecodeTransformStream()) // Stream of RtcmMessage objects
    .pipe(new RtcmEncodeTransformStream()) // Stream of (identical) raw data
    .pipe(output);
```

`RtcmDecodeTransformStream` can optionally synchronize with the raw data stream e.g. if it starts receiving data from the middle of a message.

## Messages Supported
- **MT1001** (_RtcmMessageGpsL1Observables_)
- **MT1002** (_RtcmMessageGpsL1ObservablesExtended_)
- **MT1003** (_RtcmMessageGpsL1L2Observables_)
- **MT1004** (_RtcmMessageGpsL1L2ObservablesExtended_)
- **MT1005** (_RtcmMessageStationaryArp_)
- **MT1006** (_RtcmMessageStationaryArpHeight_)
- **MT1007** (_RtcmMessageAntennaDescriptor_)
- **MT1008** (_RtcmMessageAntennaDescriptorSerial_)
- **MT1009** (_RtcmMessageGlonassL1Observables_)
- **MT1010** (_RtcmMessageGlonassL1ObservablesExtended_)
- **MT1011** (_RtcmMessageGlonassL1L2Observables_)
- **MT1012** (_RtcmMessageGlonassL1L2ObservablesExtended_)
- **MT1013** (_RtcmMessageAuxiliaryOperationInformation_)
- **MT1014** (_RtcmMessageNetworkAuxiliaryStationData_)
- **MT1015** (_RtcmMessageGpsIonosphericCorrectionDifferences_)
- **MT1016** (_RtcmMessageGpsGeometricCorrectionDifferences_)
- **MT1017** (_RtcmMessageGpsCombinedCorrectionDifferences_)
- **MT1019** (_RtcmMessageGpsSatelliteEphemeris_)
- **MT1020** (_RtcmMessageGlonassSatelliteEphemerisData_)
- **MT1021** (_RtcmMessageHelmertAbridgedMolodenskiTransformationParameters_)
- **MT1022** (_RtcmMessageMolodenskiBadekasTransformationParameters_)
- **MT1023** (_RtcmMessageResidualsEllipsoidalGridRepresentation_)
- **MT1024** (_RtcmMessageResidualsPlaneGridRepresentation_)
- **MT1025** (_RtcmMessageProjectionParametersExceptLcc2spOm_)
- **MT1026** (_RtcmMessageProjectionParametersLcc2sp_)
- **MT1027** (_RtcmMessageProjectionParametersOm_)
- **MT1029** (_RtcmMessageUnicodeTextString_)
- **MT1030** (_RtcmMessageGpsNetworkRtkResidual_)
- **MT1031** (_RtcmMessageGlonassNetworkRtkResidual_)
- **MT1032** (_RtcmMessagePhysicalReferenceStationPosition_)
- **MT1033** (_RtcmMessageReceiverAntennaDescriptor_)
- **MT1034** (_RtcmMessageGpsNetworkFkpGradient_)
- **MT1035** (_RtcmMessageGlonassNetworkFkpGradient_)
- **MT1037** (_RtcmMessageGlonassIonosphericCorrectionDifferences_)
- **MT1038** (_RtcmMessageGlonassGeometricCorrectionDifferences_)
- **MT1039** (_RtcmMessageGlonassCombinedCorrectionDifferences_)
- **MT1041** (_RtcmMessageIrnssSatelliteEphemerisData_)
- **MT1042** (_RtcmMessageBdsSatelliteEphemerisData_)
- **MT1044** (_RtcmMessageQzssSatelliteEphemerisData_)
- **MT1045** (_RtcmMessageGalileoFNavSatelliteEphemerisData_)
- **MT1046** (_RtcmMessageGalileoINavSatelliteEphemerisData_)
- **MT1057** (_RtcmMessageSsrGpsOrbitCorrection_)
- **MT1058** (_RtcmMessageSsrGpsClockCorrection_)
- **MT1059** (_RtcmMessageSsrGpsCodeBias_)
- **MT1060** (_RtcmMessageSsrGpsCombinedCorrection_)
- **MT1061** (_RtcmMessageSsrGpsUra_)
- **MT1062** (_RtcmMessageSsrGpsHighRateClockCorrection_)
- **MT1063** (_RtcmMessageSsrGlonassOrbitCorrection_)
- **MT1064** (_RtcmMessageSsrGlonassClockCorrection_)
- **MT1065** (_RtcmMessageSsrGlonassCodeBias_)
- **MT1066** (_RtcmMessageSsrGlonassCombinedCorrection_)
- **MT1067** (_RtcmMessageSsrGlonassUra_)
- **MT1068** (_RtcmMessageSsrGlonassHighRateClockCorrection_)
- **MT1071** (_RtcmMessageMsm1Gps_)
- **MT1072** (_RtcmMessageMsm2Gps_)
- **MT1073** (_RtcmMessageMsm3Gps_)
- **MT1074** (_RtcmMessageMsm4Gps_)
- **MT1075** (_RtcmMessageMsm5Gps_)
- **MT1076** (_RtcmMessageMsm6Gps_)
- **MT1077** (_RtcmMessageMsm7Gps_)
- **MT1081** (_RtcmMessageMsm1Glonass_)
- **MT1082** (_RtcmMessageMsm2Glonass_)
- **MT1083** (_RtcmMessageMsm3Glonass_)
- **MT1084** (_RtcmMessageMsm4Glonass_)
- **MT1085** (_RtcmMessageMsm5Glonass_)
- **MT1086** (_RtcmMessageMsm6Glonass_)
- **MT1087** (_RtcmMessageMsm7Glonass_)
- **MT1091** (_RtcmMessageMsm1Galileo_)
- **MT1092** (_RtcmMessageMsm2Galileo_)
- **MT1093** (_RtcmMessageMsm3Galileo_)
- **MT1094** (_RtcmMessageMsm4Galileo_)
- **MT1095** (_RtcmMessageMsm5Galileo_)
- **MT1096** (_RtcmMessageMsm6Galileo_)
- **MT1097** (_RtcmMessageMsm7Galileo_)
- **MT1101** (_RtcmMessageMsm1Sbas_)
- **MT1102** (_RtcmMessageMsm2Sbas_)
- **MT1103** (_RtcmMessageMsm3Sbas_)
- **MT1104** (_RtcmMessageMsm4Sbas_)
- **MT1105** (_RtcmMessageMsm5Sbas_)
- **MT1106** (_RtcmMessageMsm6Sbas_)
- **MT1107** (_RtcmMessageMsm7Sbas_)
- **MT1111** (_RtcmMessageMsm1Qzss_)
- **MT1112** (_RtcmMessageMsm2Qzss_)
- **MT1113** (_RtcmMessageMsm3Qzss_)
- **MT1114** (_RtcmMessageMsm4Qzss_)
- **MT1115** (_RtcmMessageMsm5Qzss_)
- **MT1116** (_RtcmMessageMsm6Qzss_)
- **MT1117** (_RtcmMessageMsm7Qzss_)
- **MT1121** (_RtcmMessageMsm1Bds_)
- **MT1122** (_RtcmMessageMsm2Bds_)
- **MT1123** (_RtcmMessageMsm3Bds_)
- **MT1124** (_RtcmMessageMsm4Bds_)
- **MT1125** (_RtcmMessageMsm5Bds_)
- **MT1126** (_RtcmMessageMsm6Bds_)
- **MT1127** (_RtcmMessageMsm7Bds_)
- **MT1131** (_RtcmMessageMsm1Irnss_)
- **MT1132** (_RtcmMessageMsm2Irnss_)
- **MT1133** (_RtcmMessageMsm3Irnss_)
- **MT1134** (_RtcmMessageMsm4Irnss_)
- **MT1135** (_RtcmMessageMsm5Irnss_)
- **MT1136** (_RtcmMessageMsm6Irnss_)
- **MT1137** (_RtcmMessageMsm7Irnss_)
- **MT1230** (_RtcmMessageGlonassL1L2CodePhaseBiases_)

## Testing
`npm test`

## License
GPLv3

## Contributions
Contributions of new message types, bug fixes and general improvements via pull requests are welcome. Please ensure that code style matches that of the existing files.  