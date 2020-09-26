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

export function legacyLockIndicatorToTime(indicator: number) {
    if (indicator < 24) return indicator;
    if (indicator < 48) return 2 * indicator - 24;
    if (indicator < 72) return 4 * indicator - 120;
    if (indicator < 96) return 8 * indicator - 408;
    if (indicator < 120) return 16 * indicator - 1176;
    if (indicator < 127) return 32 * indicator - 3096;
    return 937;
}

export function legacyLockTimeToIndicator(time: number) {
    if (time < 24) return Math.floor(time);
    if (time < 72) return Math.floor((time + 24) / 2);
    if (time < 168) return Math.floor((time + 120) / 4);
    if (time < 360) return Math.floor((time + 408) / 8);
    if (time < 744) return Math.floor((time + 1176) / 16);
    if (time < 937) return Math.floor((time + 3096) / 32);
    return 127;
}

export function msmLockIndicatorToTime(indicator: number) {
    return indicator === 0 ? 0 : 32 * (2 ** (indicator - 1));
}

export function msmLockTimeToIndicator(time: number) {
    return time < 32 ? 0 : Math.floor(Math.log2(time / 32)) + 1;
}

export function msmLockLossOfContinuity(previousTime: number, currentTime: number, timeInterval: number) {
    if (previousTime > currentTime) return true;
    if (previousTime === currentTime) return timeInterval >= previousTime;
    if (timeInterval >= (2 * currentTime - previousTime)) return true;
    return currentTime < timeInterval;
}

export function msmExtendedLockIndicatorToTime(indicator: number) {
    for (let i = 0; i <= 20; i++) {
        if (indicator < 64 + i * 32) return (2 ** i) * (indicator - (i * 32));
    }
    return 67108864;
}

export function msmExtendedLockTimeToIndicator(time: number) {
    for (let i = 0; i <= 20; i++) {
        if (time < 64 * (2 ** i)) return Math.floor(i * 32 + time / (2 ** i));
    }
    return 704;
}

export function msmExtendedLossOfContinuity(previousTime: number, currentTime: number, timeInterval: number) {
    const previousSupplementaryCoefficient = 2 ** Math.floor(Math.log2(previousTime));
    const currentSupplementaryCoefficient = 2 ** Math.floor(Math.log2(currentTime));

    if (previousTime > currentTime) return true;
    if (previousTime === currentTime) return timeInterval >= previousSupplementaryCoefficient;
    if (currentSupplementaryCoefficient > previousTime && timeInterval > (currentTime + currentSupplementaryCoefficient + previousTime)) return true;
    return currentTime < timeInterval;
}
