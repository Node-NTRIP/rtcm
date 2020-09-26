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

import { RtcmTransport } from "../rtcm";

test.each([
    ['', 0x000000],
    ['\0', 0x000000],
    ['test', 0x0e3723],
    ['rtcm', 0x3b5176]
])('crc24q(%s) = %i', (input, expected) => {
    let buffer = Buffer.from(input);
    expect(RtcmTransport.crc24q(buffer)).toBe(expected);
});