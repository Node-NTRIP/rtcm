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

import stream = require('stream');
import { RtcmMessage, RtcmTransport } from './rtcm';

/**
 * Stream to decode raw bytes to RTCM messages
 */
export class RtcmDecodeTransformStream extends stream.Transform {
    private readonly buffer: Buffer = Buffer.allocUnsafe(RtcmTransport.MAX_PACKET_SIZE);

    private index: number = 0;
    private synchronized: boolean = false;
    private potential: boolean = false;

    private readonly closeOnError: boolean = false;

    /**
     * Constructs a new RtcmDecodeTransformStream
     *
     * @param closeOnError Whether to emit an error event and close the stream if an invalid RTCM message is encountered.
     * @param synchronizedInitially Whether to expect stream to begin with a well formed RTCM message
     */
    constructor({ closeOnError = true, synchronizedInitially = false }: { closeOnError?: boolean, synchronizedInitially?: boolean } = {}) {
        super({
            readableObjectMode: true
        });

        this.closeOnError = closeOnError;
        this.synchronized = synchronizedInitially;
    }

    _transform(chunk: Buffer | string, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
        if (typeof chunk === 'string')
            chunk = Buffer.from(chunk as string, encoding as BufferEncoding);

        let chunkOffset = 0;

        // Buffer might not be able to hold entire contents of chunk at once, so consume it until empty
        while (chunk.length - chunkOffset > 0) {
            // Search for sync character to speed up process, unless already found
            if (!this.potential && !this.synchronized) {
                const potential = chunk.indexOf(RtcmTransport.SYNC_CHAR, chunkOffset);

                // No potential RTCM message found, throw away this chunk
                if (potential < 0) return callback();

                this.potential = true;
                chunkOffset = potential;
            }

            // Shift as many bytes as possible into buffer
            const copyBytes = Math.min(chunk.length - chunkOffset, this.buffer.length - this.index);
            chunk.copy(this.buffer, this.index, chunkOffset, chunkOffset + copyBytes);
            this.index += copyBytes;
            chunkOffset += copyBytes;

            do {
                let message;
                let packetLength;
                try {
                    // Early run to throw error if preamble is not correct (can happen after successful message)
                    if (this.buffer[0] !== RtcmTransport.SYNC_CHAR) RtcmTransport.decode(this.buffer);

                    // If header has not been received yet, wait
                    if (this.index < RtcmTransport.HEADER_SIZE) break;

                    // If full message has not been received yet, wait
                    const messageLength = (this.buffer[1] & 0x03) << 8 | this.buffer[2];
                    packetLength = messageLength + RtcmTransport.HEADER_SIZE + RtcmTransport.CRC_SIZE;
                    if (this.index < packetLength) break;

                    [message] = RtcmTransport.decode(this.buffer);
                } catch (err) {
                    if (this.synchronized && this.closeOnError)
                        return callback(err);

                    this.synchronized = false;
                    this.potential = false;

                    // Find next sync character
                    const potential = this.buffer.indexOf(RtcmTransport.SYNC_CHAR, 1);

                    // No potential RTCM message found, throw away the buffer contents and read from chunk again
                    if (potential < 0 || potential >= this.index) {
                        this.index = 0;
                        break;
                    }

                    this.potential = true;

                    // Shift new potential portion to start of buffer and try to decode again
                    this.buffer.copyWithin(0, potential);
                    this.index -= potential;

                    continue;
                }

                this.potential = false;
                this.synchronized = true;

                // Shift contents after packet to start of buffer, and move tail of buffer back by packet length
                this.buffer.copyWithin(0, packetLength);
                this.index -= packetLength;

                this.push(message);
                break;
            } while (true);
        }

        return callback();
    }
}

/**
 * Stream to encode RTCM messages to raw bytes
 */
export class RtcmEncodeTransformStream extends stream.Transform {
    private readonly buffer: Buffer = Buffer.allocUnsafe(RtcmTransport.MAX_PACKET_SIZE);

    constructor() {
        super({
            writableObjectMode: true
        });
    }

    _transform(chunk: RtcmMessage, encoding: string, callback: (error?: (Error | null), data?: any) => void): void {
        try {
            const length = RtcmTransport.encode(chunk, this.buffer);
            callback(null, this.buffer.slice(0, length));
        } catch (err) {
            callback(err);
        }
    }
}