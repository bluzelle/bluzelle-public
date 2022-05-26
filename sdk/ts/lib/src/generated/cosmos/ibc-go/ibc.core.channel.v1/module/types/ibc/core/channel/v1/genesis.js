"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PacketSequence = exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
const channel_1 = require("../../../../ibc/core/channel/v1/channel");
exports.protobufPackage = "ibc.core.channel.v1";
const baseGenesisState = { next_channel_sequence: 0 };
exports.GenesisState = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.channels) {
            channel_1.IdentifiedChannel.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.acknowledgements) {
            channel_1.PacketState.encode(v, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.commitments) {
            channel_1.PacketState.encode(v, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.receipts) {
            channel_1.PacketState.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.send_sequences) {
            exports.PacketSequence.encode(v, writer.uint32(42).fork()).ldelim();
        }
        for (const v of message.recv_sequences) {
            exports.PacketSequence.encode(v, writer.uint32(50).fork()).ldelim();
        }
        for (const v of message.ack_sequences) {
            exports.PacketSequence.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.next_channel_sequence !== 0) {
            writer.uint32(64).uint64(message.next_channel_sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGenesisState);
        message.channels = [];
        message.acknowledgements = [];
        message.commitments = [];
        message.receipts = [];
        message.send_sequences = [];
        message.recv_sequences = [];
        message.ack_sequences = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channels.push(channel_1.IdentifiedChannel.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.acknowledgements.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.commitments.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 4:
                    message.receipts.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.send_sequences.push(exports.PacketSequence.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.recv_sequences.push(exports.PacketSequence.decode(reader, reader.uint32()));
                    break;
                case 7:
                    message.ack_sequences.push(exports.PacketSequence.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.next_channel_sequence = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGenesisState);
        message.channels = [];
        message.acknowledgements = [];
        message.commitments = [];
        message.receipts = [];
        message.send_sequences = [];
        message.recv_sequences = [];
        message.ack_sequences = [];
        if (object.channels !== undefined && object.channels !== null) {
            for (const e of object.channels) {
                message.channels.push(channel_1.IdentifiedChannel.fromJSON(e));
            }
        }
        if (object.acknowledgements !== undefined &&
            object.acknowledgements !== null) {
            for (const e of object.acknowledgements) {
                message.acknowledgements.push(channel_1.PacketState.fromJSON(e));
            }
        }
        if (object.commitments !== undefined && object.commitments !== null) {
            for (const e of object.commitments) {
                message.commitments.push(channel_1.PacketState.fromJSON(e));
            }
        }
        if (object.receipts !== undefined && object.receipts !== null) {
            for (const e of object.receipts) {
                message.receipts.push(channel_1.PacketState.fromJSON(e));
            }
        }
        if (object.send_sequences !== undefined && object.send_sequences !== null) {
            for (const e of object.send_sequences) {
                message.send_sequences.push(exports.PacketSequence.fromJSON(e));
            }
        }
        if (object.recv_sequences !== undefined && object.recv_sequences !== null) {
            for (const e of object.recv_sequences) {
                message.recv_sequences.push(exports.PacketSequence.fromJSON(e));
            }
        }
        if (object.ack_sequences !== undefined && object.ack_sequences !== null) {
            for (const e of object.ack_sequences) {
                message.ack_sequences.push(exports.PacketSequence.fromJSON(e));
            }
        }
        if (object.next_channel_sequence !== undefined &&
            object.next_channel_sequence !== null) {
            message.next_channel_sequence = Number(object.next_channel_sequence);
        }
        else {
            message.next_channel_sequence = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.channels) {
            obj.channels = message.channels.map((e) => e ? channel_1.IdentifiedChannel.toJSON(e) : undefined);
        }
        else {
            obj.channels = [];
        }
        if (message.acknowledgements) {
            obj.acknowledgements = message.acknowledgements.map((e) => e ? channel_1.PacketState.toJSON(e) : undefined);
        }
        else {
            obj.acknowledgements = [];
        }
        if (message.commitments) {
            obj.commitments = message.commitments.map((e) => e ? channel_1.PacketState.toJSON(e) : undefined);
        }
        else {
            obj.commitments = [];
        }
        if (message.receipts) {
            obj.receipts = message.receipts.map((e) => e ? channel_1.PacketState.toJSON(e) : undefined);
        }
        else {
            obj.receipts = [];
        }
        if (message.send_sequences) {
            obj.send_sequences = message.send_sequences.map((e) => e ? exports.PacketSequence.toJSON(e) : undefined);
        }
        else {
            obj.send_sequences = [];
        }
        if (message.recv_sequences) {
            obj.recv_sequences = message.recv_sequences.map((e) => e ? exports.PacketSequence.toJSON(e) : undefined);
        }
        else {
            obj.recv_sequences = [];
        }
        if (message.ack_sequences) {
            obj.ack_sequences = message.ack_sequences.map((e) => e ? exports.PacketSequence.toJSON(e) : undefined);
        }
        else {
            obj.ack_sequences = [];
        }
        message.next_channel_sequence !== undefined &&
            (obj.next_channel_sequence = message.next_channel_sequence);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseGenesisState);
        message.channels = [];
        message.acknowledgements = [];
        message.commitments = [];
        message.receipts = [];
        message.send_sequences = [];
        message.recv_sequences = [];
        message.ack_sequences = [];
        if (object.channels !== undefined && object.channels !== null) {
            for (const e of object.channels) {
                message.channels.push(channel_1.IdentifiedChannel.fromPartial(e));
            }
        }
        if (object.acknowledgements !== undefined &&
            object.acknowledgements !== null) {
            for (const e of object.acknowledgements) {
                message.acknowledgements.push(channel_1.PacketState.fromPartial(e));
            }
        }
        if (object.commitments !== undefined && object.commitments !== null) {
            for (const e of object.commitments) {
                message.commitments.push(channel_1.PacketState.fromPartial(e));
            }
        }
        if (object.receipts !== undefined && object.receipts !== null) {
            for (const e of object.receipts) {
                message.receipts.push(channel_1.PacketState.fromPartial(e));
            }
        }
        if (object.send_sequences !== undefined && object.send_sequences !== null) {
            for (const e of object.send_sequences) {
                message.send_sequences.push(exports.PacketSequence.fromPartial(e));
            }
        }
        if (object.recv_sequences !== undefined && object.recv_sequences !== null) {
            for (const e of object.recv_sequences) {
                message.recv_sequences.push(exports.PacketSequence.fromPartial(e));
            }
        }
        if (object.ack_sequences !== undefined && object.ack_sequences !== null) {
            for (const e of object.ack_sequences) {
                message.ack_sequences.push(exports.PacketSequence.fromPartial(e));
            }
        }
        if (object.next_channel_sequence !== undefined &&
            object.next_channel_sequence !== null) {
            message.next_channel_sequence = object.next_channel_sequence;
        }
        else {
            message.next_channel_sequence = 0;
        }
        return message;
    },
};
const basePacketSequence = { port_id: "", channel_id: "", sequence: 0 };
exports.PacketSequence = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, basePacketSequence);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel_id = reader.string();
                    break;
                case 3:
                    message.sequence = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, basePacketSequence);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = String(object.port_id);
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = String(object.channel_id);
        }
        else {
            message.channel_id = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = Number(object.sequence);
        }
        else {
            message.sequence = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.sequence !== undefined && (obj.sequence = message.sequence);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, basePacketSequence);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = object.port_id;
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = object.channel_id;
        }
        else {
            message.channel_id = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = 0;
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    (0, minimal_1.configure)();
}
//# sourceMappingURL=genesis.js.map