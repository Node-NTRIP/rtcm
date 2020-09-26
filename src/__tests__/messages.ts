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

import { RtcmMessage, RtcmMessageType, RtcmTransport } from '../rtcm';

import {
    GlonassCodeBiasSatelliteData,
    GlonassL1L2ObservationsExtendedSatelliteData,
    GlonassL1L2ObservationsSatelliteData,
    GlonassL1ObservationsData,
    GlonassL1ObservationsExtendedData,
    GlonassL1ObservationsExtendedSatelliteData,
    GlonassL1ObservationsSatelliteData,
    GlonassL2ObservationsData,
    GlonassL2ObservationsExtendedData, GpsCodeBiasSatelliteData,
    GpsL1L2ObservationsExtendedSatelliteData,
    GpsL1L2ObservationsSatelliteData,
    GpsL1ObservationsData,
    GpsL1ObservationsExtendedData, GpsL1ObservationsSatelliteData,
    GpsL2ObservationsData,
    GpsL2ObservationsExtendedData,
    Msm1SatelliteData,
    Msm1SignalData,
    Msm2SatelliteData,
    Msm2SignalData,
    Msm3SatelliteData,
    Msm3SignalData,
    Msm4SatelliteData,
    Msm4SignalData,
    Msm5SatelliteData,
    Msm5SignalData,
    Msm6SatelliteData,
    Msm6SignalData,
    Msm7SatelliteData,
    Msm7SignalData,
    ResidualsEllipsoidalGridRepresentationData,
    ResidualsGridRepresentationDataArray,
    ResidualsPlaneGridRepresentationData,
    RtcmMessageAntennaDescriptor,
    RtcmMessageAntennaDescriptorSerial,
    RtcmMessageAuxiliaryOperationInformation,
    RtcmMessageBdsSatelliteEphemerisData,
    RtcmMessageGalileoFNavSatelliteEphemerisData,
    RtcmMessageGalileoINavSatelliteEphemerisData,
    RtcmMessageGlonassCombinedCorrectionDifferences,
    RtcmMessageGlonassGeometricCorrectionDifferences,
    RtcmMessageGlonassIonosphericCorrectionDifferences,
    RtcmMessageGlonassL1L2CodePhaseBiases,
    RtcmMessageGlonassL1L2Observations,
    RtcmMessageGlonassL1L2ObservationsExtended,
    RtcmMessageGlonassL1Observations,
    RtcmMessageGlonassL1ObservationsExtended,
    RtcmMessageGlonassNetworkFkpGradient,
    RtcmMessageGlonassNetworkRtkResidual,
    RtcmMessageGlonassSatelliteEphemerisData,
    RtcmMessageGpsCombinedCorrectionDifferences,
    RtcmMessageGpsGeometricCorrectionDifferences,
    RtcmMessageGpsIonosphericCorrectionDifferences,
    RtcmMessageGpsL1L2Observations,
    RtcmMessageGpsL1L2ObservationsExtended,
    RtcmMessageGpsL1Observations,
    RtcmMessageGpsL1ObservationsExtended,
    RtcmMessageGpsNetworkFkpGradient,
    RtcmMessageGpsNetworkRtkResidual,
    RtcmMessageGpsSatelliteEphemerisData,
    RtcmMessageHelmertAbridgedMolodenskiTransformationParameters,
    RtcmMessageIrnssSatelliteEphemerisData,
    RtcmMessageMolodenskiBadekasTransformationParameters,
    RtcmMessageMsm1Gps,
    RtcmMessageMsm2Gps,
    RtcmMessageMsm3Gps,
    RtcmMessageMsm4Gps,
    RtcmMessageMsm5Gps,
    RtcmMessageMsm6Gps,
    RtcmMessageMsm7Gps,
    RtcmMessageNetworkAuxiliaryStationData,
    RtcmMessagePhysicalReferenceStationPosition,
    RtcmMessageProjectionParametersExceptLcc2spOm,
    RtcmMessageProjectionParametersLcc2sp,
    RtcmMessageProjectionParametersOm,
    RtcmMessageQzssSatelliteEphemerisData,
    RtcmMessageReceiverAntennaDescriptor,
    RtcmMessageResidualsEllipsoidalGridRepresentation,
    RtcmMessageResidualsPlaneGridRepresentation,
    RtcmMessageSsrGlonassClockCorrection,
    RtcmMessageSsrGlonassCodeBias,
    RtcmMessageSsrGlonassCombinedCorrection,
    RtcmMessageSsrGlonassHighRateClockCorrection,
    RtcmMessageSsrGlonassOrbitCorrection,
    RtcmMessageSsrGlonassUra,
    RtcmMessageSsrGpsClockCorrection,
    RtcmMessageSsrGpsCodeBias,
    RtcmMessageSsrGpsCombinedCorrection,
    RtcmMessageSsrGpsHighRateClockCorrection,
    RtcmMessageSsrGpsOrbitCorrection,
    RtcmMessageSsrGpsUra,
    RtcmMessageStationArp,
    RtcmMessageStationArpHeight,
    RtcmMessageUnicodeTextString
} from '../messages';

const messages: [string, RtcmMessageType, [number, RtcmMessage, string][]][] = [];

export function registerMessage(messageClass: typeof RtcmMessage, messageType: RtcmMessageType, sampleMessages: [RtcmMessage, string][]): void {
    messages.push([messageClass.name, messageType,
        sampleMessages.map((value, i) =>
                [i + 1, ...value] as [number, RtcmMessage, string])]);
}

function intV(bits: number) {
    return -(2 ** (bits - 2)) + 1;
}

function uintV(bits: number) {
    return 2 ** (bits - 1) - 1;
}

/**
 * MT1001 GPS L1 Observations
 */
registerMessage(
        RtcmMessageGpsL1Observations,
        RtcmMessageType.GPS_L1_OBSERVATIONS,
        [
            [RtcmMessageGpsL1Observations.construct({
                referenceStationId: uintV(12),
                gpsEpochTime: uintV(30),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [GpsL1ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GpsL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        pseudorange: uintV(24),
                        phaserangePseudorangeDiff: uintV(20),
                        lockTimeIndicator: uintV(7)
                    })
                }), GpsL1ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GpsL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        pseudorange: uintV(24),
                        phaserangePseudorangeDiff: uintV(20),
                        lockTimeIndicator: uintV(7)
                    })
                })]
            }), 'd300173e97ff7ffffffe2b7cfffffeffffefdf3fffffbffffbf0534377']
        ]
);

/**
 * MT1002 GPS L1 Observations Extended
 */
registerMessage(
        RtcmMessageGpsL1ObservationsExtended,
        RtcmMessageType.GPS_L1_OBSERVATIONS_EXTENDED,
        [
            [RtcmMessageGpsL1ObservationsExtended.construct({
                referenceStationId: uintV(12),
                gpsEpochTime: uintV(30),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [{
                    satelliteId: uintV(6),
                    l1: GpsL1ObservationsExtendedData.construct({
                        codeIndicator: uintV(1),
                        pseudorange: uintV(24),
                        phaserangePseudorangeDiff: uintV(20),
                        lockTimeIndicator: uintV(7),
                        pseudorangeModulusAmbiguity: uintV(8),
                        cnr: uintV(8)
                    })
                }, {
                    satelliteId: uintV(6),
                    l1: GpsL1ObservationsExtendedData.construct({
                        codeIndicator: uintV(1),
                        pseudorange: uintV(24),
                        phaserangePseudorangeDiff: uintV(20),
                        lockTimeIndicator: uintV(7),
                        pseudorangeModulusAmbiguity: uintV(8),
                        cnr: uintV(8)
                    })
                }]
            }), 'd3001b3ea7ff7ffffffe2b7cfffffeffffefdfdfdf3fffffbffffbf7f7f0ff65ab']
        ]
);

/**
 * MT1003 GPS L1/L2 Observations
 */
registerMessage(
        RtcmMessageGpsL1L2Observations,
        RtcmMessageType.GPS_L1_L2_OBSERVATIONS,
        [
            [RtcmMessageGpsL1L2Observations.construct({
                referenceStationId: uintV(12),
                gpsEpochTime: uintV(30),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [GpsL1L2ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GpsL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        pseudorange: uintV(24),
                        phaserangePseudorangeDiff: uintV(20),
                        lockTimeIndicator: uintV(7)
                    }),
                    l2: GpsL2ObservationsData.construct({
                        codeIndicator: uintV(2),
                        pseudorangeDiff: intV(14),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7)
                    })
                }), GpsL1L2ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GpsL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        pseudorange: uintV(24),
                        phaserangePseudorangeDiff: uintV(20),
                        lockTimeIndicator: uintV(7)
                    }),
                    l2: GpsL2ObservationsData.construct({
                        codeIndicator: uintV(2),
                        pseudorangeDiff: intV(14),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7)
                    })
                })]
            }), 'd300223eb7ff7ffffffe2b7cfffffeffffefdc00700005fbe7fffff7ffff7ee00380002fc0d92971']
        ]
);

/**
 * MT1004 GPS L1/L2 Observations Extended
 */
registerMessage(
        RtcmMessageGpsL1L2ObservationsExtended,
        RtcmMessageType.GPS_L1_L2_OBSERVATIONS_EXTENDED,
        [
            [RtcmMessageGpsL1L2ObservationsExtended.construct({
                referenceStationId: uintV(12),
                gpsEpochTime: uintV(30),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [
                    GpsL1L2ObservationsExtendedSatelliteData.construct({
                        satelliteId: uintV(6),
                        l1: GpsL1ObservationsExtendedData.construct({
                            codeIndicator: 1,
                            pseudorange: uintV(24),
                            phaserangePseudorangeDiff: uintV(19),
                            lockTimeIndicator: uintV(7),
                            pseudorangeModulusAmbiguity: uintV(8),
                            cnr: uintV(8)
                        }),
                        l2: GpsL2ObservationsExtendedData.construct({
                            codeIndicator: uintV(2),
                            pseudorangeDiff: intV(14),
                            phaserangePseudorangeDiff: intV(20),
                            lockTimeIndicator: uintV(7),
                            cnr: uintV(8)
                        })
                    }), GpsL1L2ObservationsExtendedSatelliteData.construct({
                        satelliteId: uintV(6),
                        l1: GpsL1ObservationsExtendedData.construct({
                            codeIndicator: 0,
                            pseudorange: uintV(23),
                            phaserangePseudorangeDiff: uintV(18),
                            lockTimeIndicator: uintV(6),
                            pseudorangeModulusAmbiguity: uintV(8),
                            cnr: uintV(8)
                        }),
                        l2: GpsL2ObservationsExtendedData.construct({
                            codeIndicator: uintV(2),
                            pseudorangeDiff: intV(14),
                            phaserangePseudorangeDiff: intV(20),
                            lockTimeIndicator: uintV(7),
                            cnr: uintV(8)
                        })
                    })]
            }), 'd300283ec7ff7ffffffe2b7efffffe7fffefdfdfdc00700005fbfbe3fffff1ffff3efefee00380002fdfc0279842']
        ]
);

/**
 * MT1005 Station ARP
 */
registerMessage(
        RtcmMessageStationArp,
        RtcmMessageType.STATION_ARP,
        [
            [RtcmMessageStationArp.construct({
                referenceStationId: uintV(12),
                _itrfRealizationYear: uintV(6),
                gpsIndicator: true,
                glonassIndicator: true,
                _galileoIndicator: false,
                referenceStationIndicator: false,
                arpEcefX: intV(38),
                singleReceiverOscillatorIndicator: true,
                arpEcefY: intV(38),
                quarterCycleIndicator: uintV(2),
                arpEcefZ: intV(38)
            }), 'd300133ed7ff7f3000000001b0000000017000000001d6367d']
        ]
);

/**
 * MT1006 Station ARP with Height
 */
registerMessage(
        RtcmMessageStationArpHeight,
        RtcmMessageType.STATION_ARP_HEIGHT,
        [
            [RtcmMessageStationArpHeight.construct({
                referenceStationId: uintV(12),
                _itrfRealizationYear: uintV(6),
                gpsIndicator: true,
                glonassIndicator: true,
                _galileoIndicator: false,
                referenceStationIndicator: false,
                arpEcefX: intV(38),
                singleReceiverOscillatorIndicator: true,
                arpEcefY: intV(38),
                quarterCycleIndicator: uintV(2),
                arpEcefZ: intV(38),
                antennaHeight: uintV(16)
            }), 'd300153ee7ff7f3000000001b00000000170000000017fff91a4ff']
        ]
);

/**
 * MT1007 Antenna Descriptor
 */
registerMessage(RtcmMessageAntennaDescriptor,
        RtcmMessageType.ANTENNA_DESCRIPTOR,
        [
            [RtcmMessageAntennaDescriptor.construct({
                referenceStationId: uintV(12),
                antennaDescriptor: 'antennaDescriptor',
                antennaSetupId: uintV(8)
            }), 'd300163ef7ff11616e74656e6e6144657363726970746f727fe4b748']
        ]
);

/**
 * MT1008 Antenna Descriptor Serial
 */
registerMessage(RtcmMessageAntennaDescriptorSerial,
        RtcmMessageType.ANTENNA_DESCRIPTOR_SERIAL,
        [
            [RtcmMessageAntennaDescriptorSerial.construct({
                referenceStationId: uintV(12),
                antennaDescriptor: 'antennaDescriptor',
                antennaSetupId: uintV(8),
                antennaSerialNumber: 'antennaSerialNumber'
            }), 'd3002a3f07ff11616e74656e6e6144657363726970746f727f13616e74656e6e6153657269616c4e756d626572959236']
        ]
);

/**
 * MT1009 GLONASS L1 Observations
 */
registerMessage(
        RtcmMessageGlonassL1Observations,
        RtcmMessageType.GLONASS_L1_OBSERVATIONS,
        [
            [RtcmMessageGlonassL1Observations.construct({
                referenceStationId: uintV(12),
                glonassEpochTime: uintV(27),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [GlonassL1ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                    })
                }), GlonassL1ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                    })
                })]
            }), 'd300183f17ff7ffffff15be7bffffff00005fbe7bffffff00005f886aecf']
        ]
);

/**
 * MT1010 GLONASS L1 Observations Extended
 */
registerMessage(
        RtcmMessageGlonassL1ObservationsExtended,
        RtcmMessageType.GLONASS_L1_OBSERVATIONS_EXTENDED,
        [
            [RtcmMessageGlonassL1ObservationsExtended.construct({
                referenceStationId: uintV(12),
                glonassEpochTime: uintV(27),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [GlonassL1ObservationsExtendedSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsExtendedData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                        pseudorangeModulusAmbiguity: uintV(7),
                        cnr: uintV(8)
                    })
                }), GlonassL1ObservationsExtendedSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsExtendedData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                        pseudorangeModulusAmbiguity: uintV(7),
                        cnr: uintV(8)
                    })
                })]
            }), 'd3001c3f27ff7ffffff15be7bffffff00005fbf7f7cf7fffffe0000bf7efe0a5c8dd']
        ]
);

/**
 * MT1011 GLONASS L1/L2 Observations
 */
registerMessage(
        RtcmMessageGlonassL1L2Observations,
        RtcmMessageType.GLONASS_L1_L2_OBSERVATIONS,
        [
            [RtcmMessageGlonassL1L2Observations.construct({
                referenceStationId: uintV(12),
                glonassEpochTime: uintV(27),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [GlonassL1L2ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                    }),
                    l2: GlonassL2ObservationsData.construct({
                        codeIndicator: uintV(2),
                        pseudorangeDiff: intV(14),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                    })
                }), GlonassL1L2ObservationsSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                    }),
                    l2: GlonassL2ObservationsData.construct({
                        codeIndicator: uintV(2),
                        pseudorangeDiff: intV(14),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                    })
                })]
            }), 'd300233f37ff7ffffff15be7bffffff00005fb800e0000bf7cf7fffffe0000bf7001c00017e0b7133d']
        ]
);

/**
 * MT1012 GLONASS L1/L2 Observations Extended
 */
registerMessage(
        RtcmMessageGlonassL1L2ObservationsExtended,
        RtcmMessageType.GLONASS_L1_L2_OBSERVATIONS_EXTENDED,
        [
            [RtcmMessageGlonassL1L2ObservationsExtended.construct({
                referenceStationId: uintV(12),
                glonassEpochTime: uintV(27),
                synchronousGnss: true,
                divergenceFreeSmoothing: true,
                smoothingInterval: uintV(3),
                satellites: [GlonassL1L2ObservationsExtendedSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsExtendedData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                        pseudorangeModulusAmbiguity: uintV(7),
                        cnr: uintV(8)
                    }),
                    l2: GlonassL2ObservationsExtendedData.construct({
                        codeIndicator: uintV(2),
                        pseudorangeDiff: intV(14),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                        cnr: uintV(8)
                    })
                }), GlonassL1L2ObservationsExtendedSatelliteData.construct({
                    satelliteId: uintV(6),
                    l1: GlonassL1ObservationsExtendedData.construct({
                        codeIndicator: uintV(1),
                        satelliteFrequencyChannelNumber: uintV(5),
                        pseudorange: uintV(25),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                        pseudorangeModulusAmbiguity: uintV(6),
                        cnr: uintV(7)
                    }),
                    l2: GlonassL2ObservationsExtendedData.construct({
                        codeIndicator: uintV(2),
                        pseudorangeDiff: intV(14),
                        phaserangePseudorangeDiff: intV(20),
                        lockTimeIndicator: uintV(7),
                        cnr: uintV(8)
                    })
                })]
            }), 'd300293f47ff7ffffff15be7bffffff00005fbf7f7001c00017efef9effffffc00017e7cfdc00700005fbf809d25bc']
        ]
);

/**
 * MT1013 Auxiliary Operation Information
 */
registerMessage(
        RtcmMessageAuxiliaryOperationInformation,
        RtcmMessageType.AUXILIARY_OPERATION_INFORMATION,
        [
            [RtcmMessageAuxiliaryOperationInformation.construct({
                referenceStationId: uintV(12),
                modifiedJulianDay: uintV(16),
                secondsOfDay: uintV(17),
                leapSeconds: uintV(8),
                messageAnnouncements: [
                    {
                        messageType: RtcmMessageType.AUXILIARY_OPERATION_INFORMATION,
                        syncFlag: true,
                        transmissionInterval: 100
                    }, {
                        messageType: RtcmMessageType.RECEIVER_ANTENNA_DESCRIPTOR,
                        syncFlag: true,
                        transmissionInterval: 50
                    }, {
                        messageType: RtcmMessageType.GPS_SATELLITE_EPHEMERIS_DATA,
                        syncFlag: false,
                        transmissionInterval: uintV(16)
                    }
                ]
            }), 'd300143f57ff7fff7fff8dfcfd600c881300323fb3fff822674e']
        ]
);

/**
 * MT1014 Network Auxiliary Station Data
 */
registerMessage(
        RtcmMessageNetworkAuxiliaryStationData,
        RtcmMessageType.NETWORK_AUXILIARY_STATION_DATA,
        [
            [RtcmMessageNetworkAuxiliaryStationData.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                auxiliaryStationsTransmitted: uintV(5),
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                auxMasterDeltaLatitude: intV(20),
                auxMasterDeltaLongitude: intV(21),
                auxMasterDeltaHeight: intV(23)
            }), 'd3000f3f67f77bffbffe0000e000070000085c233d']
        ]
);

/**
 * MT1015 GPS Ionospheric Correction Difference
 */
registerMessage(
        RtcmMessageGpsIonosphericCorrectionDifferences,
        RtcmMessageType.GPS_IONOSPHERIC_CORRECTION_DIFFERENCES,
        [
            [RtcmMessageGpsIonosphericCorrectionDifferences.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                gpsEpochTime: uintV(23),
                multipleMessageIndicator: true,
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }, {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }]
            }), 'd300113f77f77fffff7ff7ff27d6ffff7d6ffff020ef9f']
        ]
);

/**
 * MT1016 GPS Geometric Correction Difference
 */
registerMessage(
        RtcmMessageGpsGeometricCorrectionDifferences,
        RtcmMessageType.GPS_GEOMETRIC_CORRECTION_DIFFERENCES,
        [
            [RtcmMessageGpsGeometricCorrectionDifferences.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                gpsEpochTime: uintV(23),
                multipleMessageIndicator: true,
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iode: uintV(8)
                    }, {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iode: uintV(8)
                    }]
            }), 'd300133f87f77fffff7ff7ff27d6ffff7f7d6ffff7f0ad55dd']
        ]
);

/**
 * MT1017 GPS Combined Correction Difference
 */
registerMessage(
        RtcmMessageGpsCombinedCorrectionDifferences,
        RtcmMessageType.GPS_COMBINED_CORRECTION_DIFFERENCES,
        [
            [RtcmMessageGpsCombinedCorrectionDifferences.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                gpsEpochTime: uintV(23),
                multipleMessageIndicator: true,
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iode: uintV(8),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }, {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iode: uintV(8),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }]
            }), 'd300173f97f77fffff7ff7ff27d6ffff7f7fffbeb7fffbfbfffc4aacd2']
        ]
);

/**
 * MT1019 GPS Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageGpsSatelliteEphemerisData,
        RtcmMessageType.GPS_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageGpsSatelliteEphemerisData.construct({
                satelliteId: uintV(6),
                weekNumber: uintV(10),
                svAccuracy: uintV(4),
                codeOnL2: uintV(2),
                idot: intV(14),
                iode: uintV(8),
                t_oc: uintV(16),
                a_f2: intV(8),
                a_f1: intV(16),
                a_f0: intV(22),
                iodc: uintV(10),
                c_rs: intV(16),
                deltaN: intV(16),
                m_0: intV(32),
                c_uc: intV(16),
                e: uintV(32),
                c_us: intV(16),
                a_1_2: uintV(32),
                t_oe: uintV(16),
                c_ic: intV(16),
                omega_0: intV(32),
                c_is: intV(16),
                i_0: intV(32),
                c_rc: intV(16),
                w: intV(32),
                omegadot: intV(24),
                t_gd: intV(8),
                svHealth: uintV(6),
                l2PDataFlag: true,
                fitInterval: uintV(1)
            }), 'd3003d3fb7dff770017f7fffc1c001c00005ffc001c001c0000001c0017fffffffc0017fffffff7fffc001c0000001c001c0000001c001c0000001c00001c17eb8ded7']
        ]
);

/**
 * MT1020 GLONASS Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageGlonassSatelliteEphemerisData,
        RtcmMessageType.GLONASS_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageGlonassSatelliteEphemerisData.construct({
                satelliteId: uintV(6),
                satelliteFrequencyChannelNumber: uintV(5),
                almanacHealth: true,
                almanacHealthAvailabilityIndicator: false,
                p1: uintV(2),
                t_k: uintV(12),
                b_nMsbWord: uintV(1),
                p2: uintV(1),
                t_b: uintV(7),
                x_n_1: intV(24),
                x_n: intV(27),
                x_n_2: intV(5),
                y_n_1: intV(24),
                y_n: intV(27),
                y_n_2: intV(5),
                z_n_1: intV(24),
                z_n: intV(27),
                z_n_2: intV(5),
                p3: uintV(1),
                gamma_n: intV(11),
                mP: uintV(2),
                mL_n_3: uintV(1),
                t_n: intV(22),
                mDeltaT_n: intV(5),
                e_n: uintV(5),
                mP4: uintV(1),
                mF_t: uintV(4),
                mN_t: uintV(11),
                mM: uintV(2),
                remainderValid: uintV(1),
                n_a: uintV(11),
                t_c: intV(32),
                mN_4: uintV(5),
                t_gps: intV(22),
                mL_n_5: uintV(1),
            }), 'd3002d3fc7df2ffe3fbfffffbffffff7bfffffbffffff7bfffffbffffff75ff57ffffdde77fe9ffdfffffffbefffff0062a477']
        ]
);

/**
 * MT1021 Helmert/Abridged Molodenski Transformation Parameters
 */
registerMessage(
        RtcmMessageHelmertAbridgedMolodenskiTransformationParameters,
        RtcmMessageType.HELMERT_ABRIDGED_MOLODENSKI_TRANSFORMATION_PARAMETERS,
        [
            [RtcmMessageHelmertAbridgedMolodenskiTransformationParameters.construct({
                sourceName: 'sourceName',
                targetName: 'targetName',
                systemIdentificationNumber: uintV(8),
                utilizedTransformationMessageIndicator: uintV(10),
                plateNumber: uintV(5),
                computationIndicator: uintV(4),
                heightIndicator: uintV(2),
                originLatitude: intV(19),
                originLongitude: intV(20),
                nsExtension: uintV(14),
                ewExtension: uintV(14),
                xTranslation: intV(23),
                yTranslation: intV(23),
                zTranslation: intV(23),
                xRotation: intV(32),
                yRotation: intV(32),
                zRotation: intV(32),
                scaleCorrection: intV(25),
                sourceSystemEllipsoidSemiMajorAxis: uintV(24),
                sourceSystemEllipsoidSemiMinorAxis: uintV(25),
                targetSystemEllipsoidSemiMajorAxis: uintV(24),
                targetSystemEllipsoidSemiMinorAxis: uintV(25),
                horizontalHelmertMolodenskiQualityIndicator: uintV(3),
                verticalHelmertMolodenskiQualityIndicator: uintV(3)
            }), 'd300483fd539b7bab931b2a730b6b2a9d185c99d95d13985b595fdff7bb8000700005fff7fff00000e00001c000038000000380000003800000038000017fffff7fffffbfffffbfffffdb0b3a80d']
        ]
);

/**
 * MT1022 Molodenski-Badekas Transformation Parameters
 */
registerMessage(
        RtcmMessageMolodenskiBadekasTransformationParameters,
        RtcmMessageType.MOLODENSKI_BADEKAS_TRANSFORMATION_PARAMETERS,
        [
            [RtcmMessageMolodenskiBadekasTransformationParameters.construct({
                sourceName: 'sourceName',
                targetName: 'targetName',
                systemIdentificationNumber: uintV(8),
                utilizedTransformationMessageIndicator: uintV(10),
                plateNumber: uintV(5),
                computationIndicator: uintV(4),
                heightIndicator: uintV(2),
                originLatitude: intV(19),
                originLongitude: intV(20),
                nsExtension: uintV(14),
                ewExtension: uintV(14),
                xTranslation: intV(23),
                yTranslation: intV(23),
                zTranslation: intV(23),
                xRotation: intV(32),
                yRotation: intV(32),
                zRotation: intV(32),
                scaleCorrection: intV(25),
                mbRotationPointXCoordinate: intV(35),
                mbRotationPointYCoordinate: intV(35),
                mbRotationPointZCoordinate: intV(35),
                sourceSystemEllipsoidSemiMajorAxis: uintV(24),
                sourceSystemEllipsoidSemiMinorAxis: uintV(25),
                targetSystemEllipsoidSemiMajorAxis: uintV(24),
                targetSystemEllipsoidSemiMinorAxis: uintV(25),
                horizontalHelmertMolodenskiQualityIndicator: uintV(3),
                verticalHelmertMolodenskiQualityIndicator: uintV(3)
            }), 'd300553fe539b7bab931b2a730b6b2a9d185c99d95d13985b595fdff7bb8000700005fff7fff00000e00001c00003800000038000000380000003800001c0000000380000000700000000bfffffbfffffdfffffdfffffed8d2cc14']
        ]
);

/**
 * MT1023 Residuals, Ellipsoidal Grid Representation
 */
registerMessage(
        RtcmMessageResidualsEllipsoidalGridRepresentation,
        RtcmMessageType.RESIDUALS_ELLIPSOIDAL_GRID_REPRESENTATION,
        [
            [RtcmMessageResidualsEllipsoidalGridRepresentation.construct({
                systemIdentificationNumber: uintV(8),
                horizontalShiftIndicator: true,
                verticalShiftIndicator: false,
                latitudeGridsOrigin: intV(21),
                longitudeGridsOrigin: intV(22),
                nsGridAreaExtension: uintV(12),
                ewGridAreaExtension: uintV(12),
                meanLatitudeOffset: intV(8),
                meanLongitudeOffset: intV(8),
                meanHeightOffset: intV(15),
                residuals: new Array(16).fill({
                    latitudeResidual: intV(9),
                    longitudeResidual: intV(9),
                    heightResidual: intV(9),
                }) as ResidualsGridRepresentationDataArray<ResidualsEllipsoidalGridRepresentationData>,
                horizontalInterpolationMethodIndicator: uintV(2),
                verticalInterpolationMethodIndicator: uintV(2),
                horizontalGridQualityIndicator: uintV(3),
                verticalGridQualityIndicator: uintV(3),
                modifiedJulianDay: uintV(16)
            }), 'd300493ff7fb0000380000bffbffe0e0e001c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e07038156dfffc01e02ae']
        ]
);

/**
 * MT1024 Residuals, Plane Grid Representation
 */
registerMessage(
        RtcmMessageResidualsPlaneGridRepresentation,
        RtcmMessageType.RESIDUALS_PLANE_GRID_REPRESENTATION,
        [
            [RtcmMessageResidualsPlaneGridRepresentation.construct({
                systemIdentificationNumber: uintV(8),
                horizontalShiftIndicator: true,
                verticalShiftIndicator: false,
                northingOrigin: intV(25),
                eastingOrigin: uintV(26),
                nsGridAreaExtension: uintV(12),
                ewGridAreaExtension: uintV(12),
                meanLocalNorthingResidual: intV(10),
                meanLocalEastingResidual: intV(10),
                meanLocalHeightResidual: intV(15),
                residuals: new Array(16).fill({
                    localNorthingResidual: intV(9),
                    localEastingResidual: intV(9),
                    localHeightResidual: intV(9),
                }) as ResidualsGridRepresentationDataArray<ResidualsPlaneGridRepresentationData>,
                horizontalInterpolationMethodIndicator: uintV(2),
                verticalInterpolationMethodIndicator: uintV(2),
                horizontalGridQualityIndicator: uintV(3),
                verticalGridQualityIndicator: uintV(3),
                modifiedJulianDay: uintV(16)
            }), 'd3004a4007fb000002ffffffbffbffe0380e001c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e070381c0e07038156dfffc0591dd']
        ]
);

/**
 * MT1025 Projection Parameters Except LCC2SP/OM
 */
registerMessage(
        RtcmMessageProjectionParametersExceptLcc2spOm,
        RtcmMessageType.PROJECTION_PARAMETERS_EXCEPT_LCC2SP_OM,
        [
            [RtcmMessageProjectionParametersExceptLcc2spOm.construct({
                systemIdentificationNumber: uintV(8),
                projectionType: uintV(6),
                latitudeNaturalOrigin: uintV(34),
                longitudeNaturalOrigin: uintV(35),
                scaleFactorNaturalOrigin: uintV(30),
                falseEasting: uintV(36),
                falseNorthing: intV(35)
            }), 'd300194017f7dffffffff7fffffffefffffffbffffffffe000000010d325fc']
        ]
);

/**
 * MT1026 Projection Parameters LCC2SP
 */
registerMessage(
        RtcmMessageProjectionParametersLcc2sp,
        RtcmMessageType.PROJECTION_PARAMETERS_LCC2SP,
        [
            [RtcmMessageProjectionParametersLcc2sp.construct({
                systemIdentificationNumber: uintV(8),
                projectionType: uintV(6),
                latitudeFalseOrigin: uintV(34),
                longitudeFalseOrigin: uintV(35),
                latitudeStandardParallel1: uintV(34),
                latitudeStandardParallel2: uintV(34),
                eastingFalseOrigin: uintV(36),
                northingFalseOrigin: intV(35),
            }), 'd3001e4027f7dffffffff7fffffffeffffffffbfffffffefffffffff8000000040c93b26']
        ]
);

/**
 * MT1027 Projection Parameters OM
 */
registerMessage(
        RtcmMessageProjectionParametersOm,
        RtcmMessageType.PROJECTION_PARAMETERS_OM,
        [
            [RtcmMessageProjectionParametersOm.construct({
                systemIdentificationNumber: uintV(8),
                projectionType: uintV(6),
                rectificationFlag: true,
                latitudeProjectionCenter: intV(34),
                longitudeProjectionCenter: intV(34),
                azimuthInitialLine: uintV(35),
                differenceAngleFromRectifiedToSkewGrid: intV(26),
                scaleFactorInitialLine: uintV(30),
                eastingProjectionCenter: uintV(36),
                northingProjectionCenter: intV(35)
            }), 'd300214037f7f80000000e00000002fffffffff0000017ffffffdfffffffff0000000080a1037b']
        ]
);

/**
 * MT1029 Unicode Text String
 */
registerMessage(
        RtcmMessageUnicodeTextString,
        RtcmMessageType.UNICODE_TEXT_STRING,
        [
            [RtcmMessageUnicodeTextString.construct({
                referenceStationId: uintV(12),
                modifiedJulianDay: uintV(16),
                secondsOfDay: uintV(17),
                text: 'Hello world, Καλημέρα κόσμε, コンニチハ'
            }), 'd300444057ff7fff7fffa23b48656c6c6f20776f726c642c20ce9aceb1cebbceb7cebce1bdb3cf81ceb120cebae1bdb9cf83cebcceb52c20e382b3e383b3e3838be38381e3838fa9b4c5']
        ]
);

/**
 * MT1030 GPS Network RTK Residual
 */
registerMessage(
        RtcmMessageGpsNetworkRtkResidual,
        RtcmMessageType.GPS_NETWORK_RTK_RESIDUAL,
        [
            [RtcmMessageGpsNetworkRtkResidual.construct({
                residualsEpochTime: uintV(20),
                referenceStationId: uintV(12),
                nRefs: uintV(7),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        s_oc: uintV(8),
                        s_od: uintV(9),
                        s_oh: uintV(6),
                        s_ic: uintV(10),
                        s_id: uintV(10)
                    }, {
                        satelliteId: uintV(6),
                        s_oc: uintV(8),
                        s_od: uintV(9),
                        s_oh: uintV(6),
                        s_ic: uintV(10),
                        s_id: uintV(10)
                    }
                ]
            }), 'd300144067ffff7ff7e27dfdfefbfeffbefeff7dff7fc078290a']
        ]
);

/**
 * MT1031 GLONASS Network RTK Residual
 */
registerMessage(
        RtcmMessageGlonassNetworkRtkResidual,
        RtcmMessageType.GLONASS_NETWORK_RTK_RESIDUAL,
        [
            [RtcmMessageGlonassNetworkRtkResidual.construct({
                residualsEpochTime: uintV(17),
                referenceStationId: uintV(12),
                nRefs: uintV(7),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        s_oc: uintV(8),
                        s_od: uintV(9),
                        s_oh: uintV(6),
                        s_ic: uintV(10),
                        s_id: uintV(10)
                    }, {
                        satelliteId: uintV(6),
                        s_oc: uintV(8),
                        s_od: uintV(9),
                        s_oh: uintV(6),
                        s_ic: uintV(10),
                        s_id: uintV(10)
                    }
                ]
            }), 'd300134077fffbffbf13efeff7dff7fdf7f7fbeffbfe79779b']
        ]
);

/**
 * MT1032 Physical Reference Station Position
 */
registerMessage(
        RtcmMessagePhysicalReferenceStationPosition,
        RtcmMessageType.PHYSICAL_REFERENCE_STATION_POSITION,
        [
            [RtcmMessagePhysicalReferenceStationPosition.construct({
                nonPhysicalReferenceStationId: uintV(12),
                physicalReferenceStationId: uintV(12),
                itrfEpochYear: uintV(6),
                arpEcefX: intV(38),
                arpEcefY: intV(38),
                arpEcefZ: intV(38)
            }), 'd300144087ff7ff7f000000001c0000000070000000010f65392']
        ]
);

/**
 * MT1033 Receiver Antenna Descriptor
 */
registerMessage(
        RtcmMessageReceiverAntennaDescriptor,
        RtcmMessageType.RECEIVER_ANTENNA_DESCRIPTOR,
        [
            [RtcmMessageReceiverAntennaDescriptor.construct({
                referenceStationId: uintV(12),
                antennaDescriptor: 'antennaDescriptor',
                antennaSetupId: uintV(8),
                antennaSerialNumber: 'antennaSerialNumber',
                receiverTypeDescriptor: 'receiverTypeDescriptor',
                receiverFirmwareVersion: 'receiverFirmwareVersion',
                receiverSerialNumber: 'receiverSerialNumber'
            }), 'd3006e4097ff11616e74656e6e6144657363726970746f727f13616e74656e6e6153657269616c4e756d6265721672656365697665725479706544657363726970746f721772656365697665724669726d7761726556657273696f6e14726563656976657253657269616c4e756d6265722a22ef']
        ]
);

/**
 * MT1034 GPS Network FKP Gradient
 */
registerMessage(
        RtcmMessageGpsNetworkFkpGradient,
        RtcmMessageType.GPS_NETWORK_FKP_GRADIENT,
        [
            [RtcmMessageGpsNetworkFkpGradient.construct({
                referenceStationId: uintV(12),
                fkpEpochTime: uintV(17),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        geometricGradientNorth: uintV(12),
                        geometricGradientEast: uintV(12),
                        ionosphericGradientNorth: uintV(14),
                        ionosphericGradientEast: uintV(14)
                    }, {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        geometricGradientNorth: uintV(12),
                        geometricGradientEast: uintV(12),
                        ionosphericGradientNorth: uintV(14),
                        ionosphericGradientEast: uintV(14)
                    }
                ]
            }), 'd3001740a7ff0ffff13efeffeffefffbffefbfbffbffbffefff821d386']
        ]
);

/**
 * MT1035 GLONASS Network FKP Gradient
 */
registerMessage(
        RtcmMessageGlonassNetworkFkpGradient,
        RtcmMessageType.GLONASS_NETWORK_FKP_GRADIENT,
        [
            [RtcmMessageGlonassNetworkFkpGradient.construct({
                referenceStationId: uintV(12),
                fkpEpochTime: uintV(17),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        geometricGradientNorth: uintV(12),
                        geometricGradientEast: uintV(12),
                        ionosphericGradientNorth: uintV(14),
                        ionosphericGradientEast: uintV(14)
                    }, {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        geometricGradientNorth: uintV(12),
                        geometricGradientEast: uintV(12),
                        ionosphericGradientNorth: uintV(14),
                        ionosphericGradientEast: uintV(14)
                    }
                ]
            }), 'd3001740b7ff7fff89f7f7ff7ff7ffdfff7dfdffdffdfff7ffc06d2433']
        ]
);

/**
 * MT1037 GLONASS Ionospheric Correction Difference
 */
registerMessage(
        RtcmMessageGlonassIonosphericCorrectionDifferences,
        RtcmMessageType.GLONASS_IONOSPHERIC_CORRECTION_DIFFERENCES,
        [
            [RtcmMessageGlonassIonosphericCorrectionDifferences.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                glonassEpochTime: uintV(20),
                multipleMessageIndicator: true,
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }, {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }]
            }), 'd3001140d7f77ffffbffbff93eb7fffbeb7fff80ab0fb6']
        ]
);

/**
 * MT1038 GLONASS Geometric Correction Difference
 */
registerMessage(
        RtcmMessageGlonassGeometricCorrectionDifferences,
        RtcmMessageType.GLONASS_GEOMETRIC_CORRECTION_DIFFERENCES,
        [
            [RtcmMessageGlonassGeometricCorrectionDifferences.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                glonassEpochTime: uintV(20),
                multipleMessageIndicator: true,
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iod: uintV(8)
                    }, {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iod: uintV(8)
                    }]
            }), 'd3001340e7f77ffffbffbff93eb7fffbfbeb7fffbf80299e1c']
        ]
);

/**
 * MT1039 GLONASS Combined Correction Difference
 */
registerMessage(
        RtcmMessageGlonassCombinedCorrectionDifferences,
        RtcmMessageType.GLONASS_COMBINED_CORRECTION_DIFFERENCES,
        [
            [RtcmMessageGlonassCombinedCorrectionDifferences.construct({
                networkId: uintV(8),
                subnetworkId: uintV(4),
                glonassEpochTime: uintV(20),
                multipleMessageIndicator: true,
                masterReferenceStationId: uintV(12),
                auxiliaryReferenceStationId: uintV(12),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iod: uintV(8),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }, {
                        satelliteId: uintV(6),
                        ambiguityStatusFlag: uintV(2),
                        nonSyncCount: uintV(3),
                        geometricCarrierPhaseCorrectionDifference: uintV(17),
                        iod: uintV(8),
                        ionosphericCarrierPhaseCorrectionDifference: uintV(17)
                    }]
            }), 'd3001740f7f77ffffbffbff93eb7fffbfbfffdf5bfffdfdfffe02a1b3f']
        ]
);

/**
 * MT1041 IRNSS Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageIrnssSatelliteEphemerisData,
        RtcmMessageType.IRNSS_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageIrnssSatelliteEphemerisData.construct({
                satelliteId: uintV(6),
                weekNumber: uintV(10),
                a_f0: intV(22),
                a_f1: intV(16),
                a_f2: intV(8),
                ura: uintV(4),
                t_oc: uintV(16),
                t_gd: intV(8),
                deltaN: intV(22),
                iodec: uintV(8),
                reservedAfterIodec: uintV(10),
                l5Flag: true,
                sFlag: false,
                c_uc: intV(15),
                c_us: intV(15),
                c_ic: intV(15),
                c_is: intV(15),
                c_rc: intV(15),
                c_rs: intV(15),
                idot: intV(14),
                m_0: intV(32),
                t_oe: uintV(16),
                e: uintV(32),
                sqrt_a: uintV(32),
                omega_0: intV(32),
                w: intV(32),
                omegaDot: intV(22),
                i_0: intV(32),
                spareBitsAfterIdot: uintV(2),
                spareBitsAfterI0: uintV(2)
            }), 'd3003d4117dffc00007000705dffff07000017f7fec0038007000e001c0038007001c00000017fff7fffffff7fffffffc0000001c0000001c0000700000005404577b0']
        ]
);

/**
 * MT1042 BeiDou Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageBdsSatelliteEphemerisData,
        RtcmMessageType.BEIDOU_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageBdsSatelliteEphemerisData.construct({
                satelliteId: uintV(6),
                weekNumber: uintV(13),
                svUrai: uintV(4),
                idot: intV(14),
                aode: uintV(5),
                t_oc: uintV(17),
                a_2: intV(11),
                a_1: intV(22),
                a_0: intV(24),
                aodc: uintV(5),
                c_rs: intV(18),
                deltaN: intV(16),
                m_0: intV(32),
                c_uc: intV(18),
                e: uintV(32),
                c_us: intV(18),
                a_1_2: uintV(32),
                t_oe: uintV(17),
                c_ic: intV(18),
                omega_0: intV(32),
                c_is: intV(18),
                i_0: intV(32),
                c_rc: intV(18),
                w: intV(32),
                omegaDot: intV(24),
                t_gd1: intV(10),
                t_gd2: intV(10),
                svHealth: true
            }), 'd300404127dffef800bdffff80700001c000017e00038003800000038000bfffffffe0002fffffffeffffc0007000000070001c0000001c00070000000700000701c06bcb617']
        ]
);

/**
 * MT1044 QZSS Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageQzssSatelliteEphemerisData,
        RtcmMessageType.QZSS_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageQzssSatelliteEphemerisData.construct({
                satelliteId: uintV(4),
                t_oc: uintV(16),
                a_f2: intV(8),
                a_f1: intV(16),
                a_f0: intV(22),
                iode: uintV(8),
                c_rs: intV(16),
                deltaN_0: intV(16),
                m_0: intV(32),
                c_uc: intV(16),
                e: uintV(32),
                c_us: intV(16),
                a_1_2: uintV(32),
                t_oe: uintV(16),
                c_ic: intV(16),
                omega_0: intV(32),
                c_is: intV(16),
                i_0: intV(32),
                c_rc: intV(16),
                w_n: intV(32),
                omegaDot: intV(24),
                i_0_dot: intV(14),
                l2ChannelCodes: uintV(2),
                weekNumber: uintV(10),
                ura: uintV(4),
                svHealth: uintV(6),
                t_gd: intV(8),
                iodc: uintV(10),
                fitInterval: uintV(1),
            }), 'd3003d41477fffc1c001c00005ff00070007000000070005ffffffff0005fffffffdffff0007000000070007000000070007000000070000070015ff77f05ff0a691f5']
        ]
);

/**
 * MT1045 GALILEO F-NAV Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageGalileoFNavSatelliteEphemerisData,
        RtcmMessageType.GALILEO_F_NAV_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageGalileoFNavSatelliteEphemerisData.construct({
                satelliteId: uintV(6),
                weekNumber: uintV(12),
                iodnav: uintV(10),
                svSisAccuracy: uintV(8),
                idot: intV(14),
                t_oc: uintV(14),
                a_f2: intV(6),
                a_f1: intV(21),
                a_f0: intV(31),
                c_rs: intV(16),
                deltaN: intV(16),
                m_0: intV(32),
                c_uc: intV(16),
                e: uintV(32),
                c_us: intV(16),
                a_1_2: uintV(32),
                t_oe: uintV(14),
                c_ic: intV(16),
                omega_0: intV(32),
                c_is: intV(16),
                i_0: intV(32),
                c_rc: intV(16),
                w: intV(32),
                omegaDot: intV(24),
                bgd_e5a_e1: uintV(10),
                navSignalHealthStatus: uintV(2),
                navDataValidityStatus: uintV(1),
            }), 'd3003e4157dffdff7fc005fffc7000038000000700070007000000070005ffffffff0005fffffffdfffc001c0000001c001c0000001c001c0000001c000017fd0012488e']
        ]
);

/**
 * MT1046 GALILEO I-NAV Satellite Ephemeris Data
 */
registerMessage(
        RtcmMessageGalileoINavSatelliteEphemerisData,
        RtcmMessageType.GALILEO_I_NAV_SATELLITE_EPHEMERIS_DATA,
        [
            [RtcmMessageGalileoINavSatelliteEphemerisData.construct({

                satelliteId: uintV(6),
                weekNumber: uintV(12),
                iodnav: uintV(10),
                sisaIndex: uintV(8),
                idot: intV(14),
                t_oc: uintV(14),
                a_f2: intV(6),
                a_f1: intV(21),
                a_f0: intV(31),
                c_rs: intV(16),
                deltaN: intV(16),
                m_0: intV(32),
                c_uc: intV(16),
                e: uintV(32),
                c_us: intV(16),
                a_1_2: uintV(32),
                t_oe: uintV(14),
                c_ic: intV(16),
                omega_0: intV(32),
                c_is: intV(16),
                i_0: intV(32),
                c_rc: intV(16),
                w: intV(32),
                omegaDot: intV(24),
                bgd_e5a_e1: uintV(10),
                bgd_e5b_e1: uintV(10),
                e5bSignalHealthStatus: uintV(2),
                e5bDataValidityStatus: uintV(1),
                e1bSignalHealthStatus: uintV(2),
                e1bDataValidityStatus: uintV(1)
            }), 'd3003f4167dffdff7fc005fffc7000038000000700070007000000070005ffffffff0005fffffffdfffc001c0000001c001c0000001c001c0000001c000017fdff486bf055']
        ]
);

/**
 * MT1057 SSR GPS Orbit Correction
 */
registerMessage(
        RtcmMessageSsrGpsOrbitCorrection,
        RtcmMessageType.SSR_GPS_ORBIT_CORRECTION,
        [
            [RtcmMessageSsrGpsOrbitCorrection.construct({
                epochTime: uintV(20),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                satelliteReferenceDatum: false,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19)
                    }, {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19)
                    }
                ]
            }), 'd3002b4217ffff79dfffdc27dff00001c0001c0001c0000e0001c0002fbfe00003800038000380001c0003800040c95b0c']
        ]
);

/**
 * MT1058 SSR GPS Clock Correction
 */
registerMessage(
        RtcmMessageSsrGpsClockCorrection,
        RtcmMessageType.SSR_GPS_CLOCK_CORRECTION,
        [
            [RtcmMessageSsrGpsClockCorrection.construct({
                epochTime: uintV(20),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }, {
                        satelliteId: uintV(6),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }
                ]
            }), 'd3001c4227ffff7bbfffb84fe0000380001c000002fe0000380001c00000203c04ad']
        ]
);

/**
 * MT1059 SSR GPS Code Bias
 */
registerMessage(
        RtcmMessageSsrGpsCodeBias,
        RtcmMessageType.SSR_GPS_CODE_BIAS,
        [
            [RtcmMessageSsrGpsCodeBias.construct({
                epochTime: uintV(20),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    GpsCodeBiasSatelliteData.construct({
                        satelliteId: uintV(6),
                        codeBiases: [
                            {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }, {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }
                        ]
                    }), GpsCodeBiasSatelliteData.construct({
                        satelliteId: uintV(6),
                        codeBiases: [
                            {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }, {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }
                        ]
                    })
                ]
            }), 'd300154237ffff7bbfffb84f89f800bf0017c4fc005f800866a77e']
        ]
);

/**
 * MT1060 SSR GPS Combined Correction
 */
registerMessage(
        RtcmMessageSsrGpsCombinedCorrection,
        RtcmMessageType.SSR_GPS_COMBINED_CORRECTION,
        [
            [RtcmMessageSsrGpsCombinedCorrection.construct({
                epochTime: uintV(20),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }, {
                        satelliteId: uintV(6),
                        iode: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }
                ]
            }), 'd3003c4247ffff7bbfffb84fbfe00003800038000380001c00038000700001c0000e0000017dff00001c0001c0001c0000e0001c000380000e000070000008a684a4']
        ]
);

/**
 * MT1061 SSR GPS URA
 */
registerMessage(
        RtcmMessageSsrGpsUra,
        RtcmMessageType.SSR_GPS_URA,
        [
            [RtcmMessageSsrGpsUra.construct({
                epochTime: uintV(20),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        ssrUra: uintV(6)
                    }, {
                        satelliteId: uintV(6),
                        ssrUra: uintV(6)
                    }
                ]
            }), 'd3000c4257ffff7bbfffb84fbefbe0a42f06']
        ]
);

/**
 * MT1062 SSR GPS High Rate Clock Correction
 */
registerMessage(
        RtcmMessageSsrGpsHighRateClockCorrection,
        RtcmMessageType.SSR_GPS_HIGH_RATE_CLOCK_CORRECTION,
        [
            [RtcmMessageSsrGpsHighRateClockCorrection.construct({
                epochTime: uintV(20),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(6),
                        highRateClockCorrection: intV(22)
                    }, {
                        satelliteId: uintV(6),
                        highRateClockCorrection: intV(22)
                    }
                ]
            }), 'd300104267ffff7bbfffb84fe00002fe00002058daf1']
        ]
);

/**
 * MT1063 SSR GLONASS Orbit Correction
 */
registerMessage(
        RtcmMessageSsrGlonassOrbitCorrection,
        RtcmMessageType.SSR_GLONASS_ORBIT_CORRECTION,
        [
            [RtcmMessageSsrGlonassOrbitCorrection.construct({
                epochTime: uintV(17),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                satelliteReferenceDatum: false,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(5),
                        iod: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19)
                    }, {
                        satelliteId: uintV(5),
                        iod: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19)
                    }
                ]
            }), 'd3002a4277fffbcefffee13dff00001c0001c0001c0000e0001c0002f7fc00007000070000700003800070000851801c']
        ]
);

/**
 * MT1064 SSR GLONASS Clock Correction
 */
registerMessage(
        RtcmMessageSsrGlonassClockCorrection,
        RtcmMessageType.SSR_GLONASS_CLOCK_CORRECTION,
        [
            [RtcmMessageSsrGlonassClockCorrection.construct({
                epochTime: uintV(17),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(5),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }, {
                        satelliteId: uintV(5),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }
                ]
            }), 'd3001b4287fffbddfffdc27e0000380001c000002fc0000700003800000435c971']
        ]
);

/**
 * MT1065 SSR GLONASS Code Bias
 */
registerMessage(
        RtcmMessageSsrGlonassCodeBias,
        RtcmMessageType.SSR_GLONASS_CODE_BIAS,
        [
            [RtcmMessageSsrGlonassCodeBias.construct({
                epochTime: uintV(17),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    GlonassCodeBiasSatelliteData.construct({
                        satelliteId: uintV(5),
                        codeBiases: [
                            {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }, {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }
                        ]
                    }), GlonassCodeBiasSatelliteData.construct({
                        satelliteId: uintV(5),
                        codeBiases: [
                            {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }, {
                                signalAndTrackingModeIndicator: uintV(5),
                                codeBias: intV(14),
                            }
                        ]
                    })
                ]
            }), 'd300144297fffbddfffdc2789f800bf001789f800bf001420b63']
        ]
);

/**
 * MT1066 SSR GLONASS Combined Correction
 */
registerMessage(
        RtcmMessageSsrGlonassCombinedCorrection,
        RtcmMessageType.SSR_GLONASS_COMBINED_CORRECTION,
        [
            [RtcmMessageSsrGlonassCombinedCorrection.construct({
                epochTime: uintV(17),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(5),
                        iod: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }, {
                        satelliteId: uintV(5),
                        iod: uintV(8),
                        deltaRadial: intV(22),
                        deltaAlongTrack: intV(20),
                        deltaCrossTrack: intV(20),
                        dotDeltaRadial: intV(21),
                        dotDeltaAlongTrack: intV(19),
                        dotDeltaCrossTrack: intV(19),
                        deltaClockC0: intV(22),
                        deltaClockC1: intV(21),
                        deltaClockC2: intV(27)
                    }
                ]
            }), 'd3003b42a7fffbddfffdc27bfe00003800038000380001c00038000700001c0000e0000017bfe00003800038000380001c00038000700001c0000e000001c7688b']
        ]
);

/**
 * MT1067 SSR GLONASS URA
 */
registerMessage(
        RtcmMessageSsrGlonassUra,
        RtcmMessageType.SSR_GLONASS_URA,
        [
            [RtcmMessageSsrGlonassUra.construct({
                epochTime: uintV(17),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(5),
                        ssrUra: uintV(6)
                    }, {
                        satelliteId: uintV(5),
                        ssrUra: uintV(6)
                    }
                ]
            }), 'd3000b42b7fffbddfffdc27bef7ce946f8']
        ]
);

/**
 * MT1068 SSR GLONASS High Rate Clock Correction
 */
registerMessage(
        RtcmMessageSsrGlonassHighRateClockCorrection,
        RtcmMessageType.SSR_GLONASS_HIGH_RATE_CLOCK_CORRECTION,
        [
            [RtcmMessageSsrGlonassHighRateClockCorrection.construct({
                epochTime: uintV(17),
                ssrUpdateInterval: uintV(4),
                multipleMessageIndicator: true,
                iodSsr: uintV(4),
                ssrProviderId: uintV(16),
                ssrSolutionId: uintV(4),
                satellites: [
                    {
                        satelliteId: uintV(5),
                        highRateClockCorrection: intV(22)
                    }, {
                        satelliteId: uintV(5),
                        highRateClockCorrection: intV(22)
                    }
                ]
            }), 'd3000f42c7fffbddfffdc27e00002fc000046e77f9']
        ]
);

/**
 * MT1071 GPS MSM1
 */
registerMessage(
        RtcmMessageMsm1Gps,
        RtcmMessageType.GPS_MSM1,
        [
            [RtcmMessageMsm1Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm1SatelliteData.construct({
                                id: 1,
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: [
                                    Msm1SignalData.construct({
                                        id: 1,
                                        finePseudorange: intV(15)
                                    }),
                                ]
                            },
                    ), Msm1SatelliteData.construct({
                                id: 2,
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: []
                            },
                    ),
                ],
            }), 'd3001a42f7ff7ffffffcc02de000000000000000400000004ffbff800422d7cf']
        ]
);

/**
 * MT1072 GPS MSM2
 */
registerMessage(
        RtcmMessageMsm2Gps,
        RtcmMessageType.GPS_MSM2,
        [
            [RtcmMessageMsm2Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm2SatelliteData.construct({
                                id: 1,
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: [
                                    Msm2SignalData.construct({
                                        id: 1,
                                        finePhaserange: intV(22),
                                        phaserangeLockTimeIndicator: uintV(4),
                                        halfCycleAmbiguityIndicator: true
                                    }),
                                ]
                            },
                    ), Msm2SatelliteData.construct({
                                id: 2,
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: []
                            },
                    ),
                ],
            }), 'd3001c4307ff7ffffffcc02de000000000000000400000004ffbff80000bc04aba46']
        ]
);

/**
 * MT1073 GPS MSM3
 */
registerMessage(
        RtcmMessageMsm3Gps,
        RtcmMessageType.GPS_MSM3,
        [
            [RtcmMessageMsm3Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm3SatelliteData.construct({
                                id: 1,
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: [
                                    Msm3SignalData.construct({
                                        id: 1,
                                        finePseudorange: intV(15),
                                        finePhaserange: intV(22),
                                        phaserangeLockTimeIndicator: uintV(4),
                                        halfCycleAmbiguityIndicator: true
                                    }),
                                ]
                            },
                    ), Msm3SatelliteData.construct({
                                id: 2,
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: []
                            },
                    ),
                ],
            }), 'd3001e4317ff7ffffffcc02de000000000000000400000004ffbff800700001780186372']
        ]
);

/**
 * MT1074 GPS MSM4
 */
registerMessage(
        RtcmMessageMsm4Gps,
        RtcmMessageType.GPS_MSM4,
        [
            [RtcmMessageMsm4Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm4SatelliteData.construct({
                                id: 1,
                                roughRangeIntegerMilliseconds: uintV(8),
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: [
                                    Msm4SignalData.construct({
                                        id: 1,
                                        finePseudorange: intV(15),
                                        finePhaserange: intV(22),
                                        phaserangeLockTimeIndicator: uintV(4),
                                        halfCycleAmbiguityIndicator: true,
                                        cnr: uintV(6)
                                    }),
                                ]
                            },
                    ), Msm4SatelliteData.construct({
                                id: 2,
                                roughRangeIntegerMilliseconds: uintV(8),
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: []
                            },
                    ),
                ],
            }), 'd300204327ff7ffffffcc02de000000000000000400000004feffbfbff8007000017be9ac1d0']
        ]
);

/**
 * MT1075 GPS MSM5
 */
registerMessage(
        RtcmMessageMsm5Gps,
        RtcmMessageType.GPS_MSM5,
        [
            [RtcmMessageMsm5Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm5SatelliteData.construct({
                                id: 1,
                                roughRangeIntegerMilliseconds: uintV(8),
                                extendedInformation: uintV(4),
                                roughRangeModulo1Millisecond: uintV(10),
                                roughPhaserangeRateMetersPerSecond: intV(14),
                                signals: [
                                    Msm5SignalData.construct({
                                        id: 1,
                                        finePseudorange: intV(15),
                                        finePhaserange: intV(22),
                                        phaserangeLockTimeIndicator: uintV(4),
                                        halfCycleAmbiguityIndicator: true,
                                        cnr: uintV(6),
                                        finePhaserangeRate: intV(15)
                                    }),
                                ]
                            },
                    ), Msm5SatelliteData.construct({
                                id: 2,
                                roughRangeIntegerMilliseconds: uintV(8),
                                extendedInformation: uintV(4),
                                roughRangeModulo1Millisecond: uintV(10),
                                roughPhaserangeRateMetersPerSecond: intV(14),
                                signals: []
                            },
                    ),
                ],
            }), 'd300274337ff7ffffffcc02de000000000000000400000004feeffe002feeffe0038007000017bf800407004b5']
        ]
);

/**
 * MT1076 GPS MSM6
 */
registerMessage(
        RtcmMessageMsm6Gps,
        RtcmMessageType.GPS_MSM6,
        [
            [RtcmMessageMsm6Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm6SatelliteData.construct({
                                id: 1,
                                roughRangeIntegerMilliseconds: uintV(8),
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: [
                                    Msm6SignalData.construct({
                                        id: 1,
                                        finePseudorangeExtendedResolution: intV(20),
                                        finePhaserangeExtendedResolution: intV(24),
                                        phaserangeLockTimeIndicatorExtendedRangeResolution: uintV(10),
                                        halfCycleAmbiguityIndicator: true,
                                        cnrExtendedResolution: uintV(10),
                                    }),
                                ]
                            },
                    ), Msm6SatelliteData.construct({
                                id: 2,
                                roughRangeIntegerMilliseconds: uintV(8),
                                roughRangeModulo1Millisecond: uintV(10),
                                signals: []
                            },
                    ),
                ],
            }), 'd300224347ff7ffffffcc02de000000000000000400000004feffbfbff80003800002ffdff521ee1']
        ]
);

/**
 * MT1077 GPS MSM7
 */
registerMessage(
        RtcmMessageMsm7Gps,
        RtcmMessageType.GPS_MSM7,
        [
            [RtcmMessageMsm7Gps.construct({
                referenceStationId: uintV(12),
                gnssEpochTime: uintV(30),
                multipleMessage: false,
                issueOfDataStation: uintV(3),
                clockSteeringIndicator: uintV(2),
                externalClockIndicator: uintV(2),
                divergenceFreeSmoothingIndicator: true,
                smoothingInterval: uintV(3),
                satellites: [
                    Msm7SatelliteData.construct({
                                id: 1,
                                roughRangeIntegerMilliseconds: uintV(8),
                                extendedInformation: uintV(4),
                                roughRangeModulo1Millisecond: uintV(10),
                                roughPhaserangeRateMetersPerSecond: intV(14),
                                signals: [
                                    Msm7SignalData.construct({
                                        id: 1,
                                        finePseudorangeExtendedResolution: intV(20),
                                        finePhaserangeExtendedResolution: intV(24),
                                        phaserangeLockTimeIndicatorExtendedRangeResolution: uintV(10),
                                        halfCycleAmbiguityIndicator: true,
                                        cnrExtendedResolution: uintV(10),
                                        finePhaserangeRate: intV(15)
                                    }),
                                ]
                            },
                    ), Msm7SatelliteData.construct({
                        id: 2,
                        roughRangeIntegerMilliseconds: uintV(8),
                        extendedInformation: uintV(4),
                        roughRangeModulo1Millisecond: uintV(10),
                        roughPhaserangeRateMetersPerSecond: intV(14),
                        signals: []
                    }),
                ],
            }), 'd300294357ff7ffffffcc02de000000000000000400000004feeffe002feeffe00380003800002ffdffc0020a814ba']
        ]
);

/**
 * MT1230 GLONASS L1/L2 Code Phase Biases
 */
registerMessage(
        RtcmMessageGlonassL1L2CodePhaseBiases,
        RtcmMessageType.GLONASS_L1_L2_CODE_PHASE_BIASES,
        [
            [RtcmMessageGlonassL1L2CodePhaseBiases.construct({
                referenceStationId: uintV(12),
                glonassCodePhaseBiasIndicator: true,
                includeL1CaCodePhaseBias: true,
                includeL1PCodePhaseBias: true,
                includeL2CaCodePhaseBias: true,
                includeL2PCodePhaseBias: false,
                l1CaCodePhaseBias: intV(16),
                l1PCodePhaseBias: intV(16),
                l2CaCodePhaseBias: intV(16),
                l2PCodePhaseBias: undefined
            }), 'd3000a4ce7ff8ec001c001c001a47c43']
        ]
);

describe.each(messages)('%s (MT%s)', (messageClassName, messageType, sampleMessages) => {
    test('message type', () => {
        expect(sampleMessages[0][1].messageType).toBe(messageType);
        expect((sampleMessages[0][1].constructor as typeof RtcmMessage).messageType).toBe(messageType);
    });

    describe.each(sampleMessages)('sample #%d', (sampleNumber, sampleMessage, sampleOutput) => {
        const sampleBuffer = Buffer.from(sampleOutput, 'hex');


        test('encode', () => {
            const buffer = Buffer.alloc(RtcmTransport.MAX_PACKET_SIZE);
            const length = RtcmTransport.encode(sampleMessage, buffer);
            expect(buffer.slice(0, length).toString('hex')).toEqual(sampleOutput);
            expect(length).toBe(sampleBuffer.length);
        });

        test('decode', () => {
            const [message, length] = RtcmTransport.decode(sampleBuffer);
            expect(message).toEqual(sampleMessage);
            expect(length).toBe(sampleBuffer.length);
        });
    });
});
