"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryNextSequenceReceiveResponse = exports.QueryNextSequenceReceiveRequest = exports.QueryUnreceivedAcksResponse = exports.QueryUnreceivedAcksRequest = exports.QueryUnreceivedPacketsResponse = exports.QueryUnreceivedPacketsRequest = exports.QueryPacketAcknowledgementsResponse = exports.QueryPacketAcknowledgementsRequest = exports.QueryPacketAcknowledgementResponse = exports.QueryPacketAcknowledgementRequest = exports.QueryPacketReceiptResponse = exports.QueryPacketReceiptRequest = exports.QueryPacketCommitmentsResponse = exports.QueryPacketCommitmentsRequest = exports.QueryPacketCommitmentResponse = exports.QueryPacketCommitmentRequest = exports.QueryChannelConsensusStateResponse = exports.QueryChannelConsensusStateRequest = exports.QueryChannelClientStateResponse = exports.QueryChannelClientStateRequest = exports.QueryConnectionChannelsResponse = exports.QueryConnectionChannelsRequest = exports.QueryChannelsResponse = exports.QueryChannelsRequest = exports.QueryChannelResponse = exports.QueryChannelRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
const channel_1 = require("../../../../ibc/core/channel/v1/channel");
const client_1 = require("../../../../ibc/core/client/v1/client");
const pagination_1 = require("../../../../cosmos/base/query/v1beta1/pagination");
const any_1 = require("../../../../google/protobuf/any");
exports.protobufPackage = "ibc.core.channel.v1";
const baseQueryChannelRequest = { port_id: "", channel_id: "" };
exports.QueryChannelRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelRequest);
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelRequest);
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
        return message;
    },
};
const baseQueryChannelResponse = {};
exports.QueryChannelResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.channel !== undefined) {
            channel_1.Channel.encode(message.channel, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channel = channel_1.Channel.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelResponse);
        if (object.channel !== undefined && object.channel !== null) {
            message.channel = channel_1.Channel.fromJSON(object.channel);
        }
        else {
            message.channel = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.channel !== undefined &&
            (obj.channel = message.channel
                ? channel_1.Channel.toJSON(message.channel)
                : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelResponse);
        if (object.channel !== undefined && object.channel !== null) {
            message.channel = channel_1.Channel.fromPartial(object.channel);
        }
        else {
            message.channel = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryChannelsRequest = {};
exports.QueryChannelsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelsRequest);
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelsRequest);
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryChannelsResponse = {};
exports.QueryChannelsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.channels) {
            channel_1.IdentifiedChannel.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelsResponse);
        message.channels = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channels.push(channel_1.IdentifiedChannel.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelsResponse);
        message.channels = [];
        if (object.channels !== undefined && object.channels !== null) {
            for (const e of object.channels) {
                message.channels.push(channel_1.IdentifiedChannel.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
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
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        message.height !== undefined &&
            (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelsResponse);
        message.channels = [];
        if (object.channels !== undefined && object.channels !== null) {
            for (const e of object.channels) {
                message.channels.push(channel_1.IdentifiedChannel.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
};
const baseQueryConnectionChannelsRequest = { connection: "" };
exports.QueryConnectionChannelsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.connection !== "") {
            writer.uint32(10).string(message.connection);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConnectionChannelsRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.connection = reader.string();
                    break;
                case 2:
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryConnectionChannelsRequest);
        if (object.connection !== undefined && object.connection !== null) {
            message.connection = String(object.connection);
        }
        else {
            message.connection = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.connection !== undefined && (obj.connection = message.connection);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryConnectionChannelsRequest);
        if (object.connection !== undefined && object.connection !== null) {
            message.connection = object.connection;
        }
        else {
            message.connection = "";
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryConnectionChannelsResponse = {};
exports.QueryConnectionChannelsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.channels) {
            channel_1.IdentifiedChannel.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryConnectionChannelsResponse);
        message.channels = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.channels.push(channel_1.IdentifiedChannel.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryConnectionChannelsResponse);
        message.channels = [];
        if (object.channels !== undefined && object.channels !== null) {
            for (const e of object.channels) {
                message.channels.push(channel_1.IdentifiedChannel.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
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
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        message.height !== undefined &&
            (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryConnectionChannelsResponse);
        message.channels = [];
        if (object.channels !== undefined && object.channels !== null) {
            for (const e of object.channels) {
                message.channels.push(channel_1.IdentifiedChannel.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
};
const baseQueryChannelClientStateRequest = {
    port_id: "",
    channel_id: "",
};
exports.QueryChannelClientStateRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelClientStateRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelClientStateRequest);
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelClientStateRequest);
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
        return message;
    },
};
const baseQueryChannelClientStateResponse = {};
exports.QueryChannelClientStateResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.identified_client_state !== undefined) {
            client_1.IdentifiedClientState.encode(message.identified_client_state, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelClientStateResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.identified_client_state = client_1.IdentifiedClientState.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelClientStateResponse);
        if (object.identified_client_state !== undefined &&
            object.identified_client_state !== null) {
            message.identified_client_state = client_1.IdentifiedClientState.fromJSON(object.identified_client_state);
        }
        else {
            message.identified_client_state = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.identified_client_state !== undefined &&
            (obj.identified_client_state = message.identified_client_state
                ? client_1.IdentifiedClientState.toJSON(message.identified_client_state)
                : undefined);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelClientStateResponse);
        if (object.identified_client_state !== undefined &&
            object.identified_client_state !== null) {
            message.identified_client_state = client_1.IdentifiedClientState.fromPartial(object.identified_client_state);
        }
        else {
            message.identified_client_state = undefined;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryChannelConsensusStateRequest = {
    port_id: "",
    channel_id: "",
    revision_number: 0,
    revision_height: 0,
};
exports.QueryChannelConsensusStateRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.revision_number !== 0) {
            writer.uint32(24).uint64(message.revision_number);
        }
        if (message.revision_height !== 0) {
            writer.uint32(32).uint64(message.revision_height);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelConsensusStateRequest);
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
                    message.revision_number = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.revision_height = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelConsensusStateRequest);
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
        if (object.revision_number !== undefined &&
            object.revision_number !== null) {
            message.revision_number = Number(object.revision_number);
        }
        else {
            message.revision_number = 0;
        }
        if (object.revision_height !== undefined &&
            object.revision_height !== null) {
            message.revision_height = Number(object.revision_height);
        }
        else {
            message.revision_height = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.revision_number !== undefined &&
            (obj.revision_number = message.revision_number);
        message.revision_height !== undefined &&
            (obj.revision_height = message.revision_height);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelConsensusStateRequest);
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
        if (object.revision_number !== undefined &&
            object.revision_number !== null) {
            message.revision_number = object.revision_number;
        }
        else {
            message.revision_number = 0;
        }
        if (object.revision_height !== undefined &&
            object.revision_height !== null) {
            message.revision_height = object.revision_height;
        }
        else {
            message.revision_height = 0;
        }
        return message;
    },
};
const baseQueryChannelConsensusStateResponse = { client_id: "" };
exports.QueryChannelConsensusStateResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.consensus_state !== undefined) {
            any_1.Any.encode(message.consensus_state, writer.uint32(10).fork()).ldelim();
        }
        if (message.client_id !== "") {
            writer.uint32(18).string(message.client_id);
        }
        if (message.proof.length !== 0) {
            writer.uint32(26).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryChannelConsensusStateResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.consensus_state = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.client_id = reader.string();
                    break;
                case 3:
                    message.proof = reader.bytes();
                    break;
                case 4:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryChannelConsensusStateResponse);
        if (object.consensus_state !== undefined &&
            object.consensus_state !== null) {
            message.consensus_state = any_1.Any.fromJSON(object.consensus_state);
        }
        else {
            message.consensus_state = undefined;
        }
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = String(object.client_id);
        }
        else {
            message.client_id = "";
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.consensus_state !== undefined &&
            (obj.consensus_state = message.consensus_state
                ? any_1.Any.toJSON(message.consensus_state)
                : undefined);
        message.client_id !== undefined && (obj.client_id = message.client_id);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryChannelConsensusStateResponse);
        if (object.consensus_state !== undefined &&
            object.consensus_state !== null) {
            message.consensus_state = any_1.Any.fromPartial(object.consensus_state);
        }
        else {
            message.consensus_state = undefined;
        }
        if (object.client_id !== undefined && object.client_id !== null) {
            message.client_id = object.client_id;
        }
        else {
            message.client_id = "";
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryPacketCommitmentRequest = {
    port_id: "",
    channel_id: "",
    sequence: 0,
};
exports.QueryPacketCommitmentRequest = {
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
        const message = Object.assign({}, baseQueryPacketCommitmentRequest);
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
        const message = Object.assign({}, baseQueryPacketCommitmentRequest);
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
        const message = Object.assign({}, baseQueryPacketCommitmentRequest);
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
const baseQueryPacketCommitmentResponse = {};
exports.QueryPacketCommitmentResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.commitment.length !== 0) {
            writer.uint32(10).bytes(message.commitment);
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commitment = reader.bytes();
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentResponse);
        if (object.commitment !== undefined && object.commitment !== null) {
            message.commitment = bytesFromBase64(object.commitment);
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.commitment !== undefined &&
            (obj.commitment = base64FromBytes(message.commitment !== undefined ? message.commitment : new Uint8Array()));
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentResponse);
        if (object.commitment !== undefined && object.commitment !== null) {
            message.commitment = object.commitment;
        }
        else {
            message.commitment = new Uint8Array();
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryPacketCommitmentsRequest = {
    port_id: "",
    channel_id: "",
};
exports.QueryPacketCommitmentsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentsRequest);
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
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentsRequest);
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
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentsRequest);
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
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        return message;
    },
};
const baseQueryPacketCommitmentsResponse = {};
exports.QueryPacketCommitmentsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.commitments) {
            channel_1.PacketState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketCommitmentsResponse);
        message.commitments = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.commitments.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentsResponse);
        message.commitments = [];
        if (object.commitments !== undefined && object.commitments !== null) {
            for (const e of object.commitments) {
                message.commitments.push(channel_1.PacketState.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.commitments) {
            obj.commitments = message.commitments.map((e) => e ? channel_1.PacketState.toJSON(e) : undefined);
        }
        else {
            obj.commitments = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        message.height !== undefined &&
            (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketCommitmentsResponse);
        message.commitments = [];
        if (object.commitments !== undefined && object.commitments !== null) {
            for (const e of object.commitments) {
                message.commitments.push(channel_1.PacketState.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
};
const baseQueryPacketReceiptRequest = {
    port_id: "",
    channel_id: "",
    sequence: 0,
};
exports.QueryPacketReceiptRequest = {
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
        const message = Object.assign({}, baseQueryPacketReceiptRequest);
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
        const message = Object.assign({}, baseQueryPacketReceiptRequest);
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
        const message = Object.assign({}, baseQueryPacketReceiptRequest);
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
const baseQueryPacketReceiptResponse = { received: false };
exports.QueryPacketReceiptResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.received === true) {
            writer.uint32(16).bool(message.received);
        }
        if (message.proof.length !== 0) {
            writer.uint32(26).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketReceiptResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 2:
                    message.received = reader.bool();
                    break;
                case 3:
                    message.proof = reader.bytes();
                    break;
                case 4:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketReceiptResponse);
        if (object.received !== undefined && object.received !== null) {
            message.received = Boolean(object.received);
        }
        else {
            message.received = false;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.received !== undefined && (obj.received = message.received);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketReceiptResponse);
        if (object.received !== undefined && object.received !== null) {
            message.received = object.received;
        }
        else {
            message.received = false;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryPacketAcknowledgementRequest = {
    port_id: "",
    channel_id: "",
    sequence: 0,
};
exports.QueryPacketAcknowledgementRequest = {
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
        const message = Object.assign({}, baseQueryPacketAcknowledgementRequest);
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
        const message = Object.assign({}, baseQueryPacketAcknowledgementRequest);
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
        const message = Object.assign({}, baseQueryPacketAcknowledgementRequest);
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
const baseQueryPacketAcknowledgementResponse = {};
exports.QueryPacketAcknowledgementResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.acknowledgement.length !== 0) {
            writer.uint32(10).bytes(message.acknowledgement);
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.acknowledgement = reader.bytes();
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementResponse);
        if (object.acknowledgement !== undefined &&
            object.acknowledgement !== null) {
            message.acknowledgement = bytesFromBase64(object.acknowledgement);
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.acknowledgement !== undefined &&
            (obj.acknowledgement = base64FromBytes(message.acknowledgement !== undefined
                ? message.acknowledgement
                : new Uint8Array()));
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementResponse);
        if (object.acknowledgement !== undefined &&
            object.acknowledgement !== null) {
            message.acknowledgement = object.acknowledgement;
        }
        else {
            message.acknowledgement = new Uint8Array();
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
const baseQueryPacketAcknowledgementsRequest = {
    port_id: "",
    channel_id: "",
    packet_commitment_sequences: 0,
};
exports.QueryPacketAcknowledgementsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.pagination !== undefined) {
            pagination_1.PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
        }
        writer.uint32(34).fork();
        for (const v of message.packet_commitment_sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementsRequest);
        message.packet_commitment_sequences = [];
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
                    message.pagination = pagination_1.PageRequest.decode(reader, reader.uint32());
                    break;
                case 4:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.packet_commitment_sequences.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.packet_commitment_sequences.push(longToNumber(reader.uint64()));
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementsRequest);
        message.packet_commitment_sequences = [];
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
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.packet_commitment_sequences !== undefined &&
            object.packet_commitment_sequences !== null) {
            for (const e of object.packet_commitment_sequences) {
                message.packet_commitment_sequences.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageRequest.toJSON(message.pagination)
                : undefined);
        if (message.packet_commitment_sequences) {
            obj.packet_commitment_sequences = message.packet_commitment_sequences.map((e) => e);
        }
        else {
            obj.packet_commitment_sequences = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementsRequest);
        message.packet_commitment_sequences = [];
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
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageRequest.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.packet_commitment_sequences !== undefined &&
            object.packet_commitment_sequences !== null) {
            for (const e of object.packet_commitment_sequences) {
                message.packet_commitment_sequences.push(e);
            }
        }
        return message;
    },
};
const baseQueryPacketAcknowledgementsResponse = {};
exports.QueryPacketAcknowledgementsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.acknowledgements) {
            channel_1.PacketState.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.pagination !== undefined) {
            pagination_1.PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
        }
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryPacketAcknowledgementsResponse);
        message.acknowledgements = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.acknowledgements.push(channel_1.PacketState.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.pagination = pagination_1.PageResponse.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementsResponse);
        message.acknowledgements = [];
        if (object.acknowledgements !== undefined &&
            object.acknowledgements !== null) {
            for (const e of object.acknowledgements) {
                message.acknowledgements.push(channel_1.PacketState.fromJSON(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromJSON(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.acknowledgements) {
            obj.acknowledgements = message.acknowledgements.map((e) => e ? channel_1.PacketState.toJSON(e) : undefined);
        }
        else {
            obj.acknowledgements = [];
        }
        message.pagination !== undefined &&
            (obj.pagination = message.pagination
                ? pagination_1.PageResponse.toJSON(message.pagination)
                : undefined);
        message.height !== undefined &&
            (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryPacketAcknowledgementsResponse);
        message.acknowledgements = [];
        if (object.acknowledgements !== undefined &&
            object.acknowledgements !== null) {
            for (const e of object.acknowledgements) {
                message.acknowledgements.push(channel_1.PacketState.fromPartial(e));
            }
        }
        if (object.pagination !== undefined && object.pagination !== null) {
            message.pagination = pagination_1.PageResponse.fromPartial(object.pagination);
        }
        else {
            message.pagination = undefined;
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
};
const baseQueryUnreceivedPacketsRequest = {
    port_id: "",
    channel_id: "",
    packet_commitment_sequences: 0,
};
exports.QueryUnreceivedPacketsRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        writer.uint32(26).fork();
        for (const v of message.packet_commitment_sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedPacketsRequest);
        message.packet_commitment_sequences = [];
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
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.packet_commitment_sequences.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.packet_commitment_sequences.push(longToNumber(reader.uint64()));
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryUnreceivedPacketsRequest);
        message.packet_commitment_sequences = [];
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
        if (object.packet_commitment_sequences !== undefined &&
            object.packet_commitment_sequences !== null) {
            for (const e of object.packet_commitment_sequences) {
                message.packet_commitment_sequences.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        if (message.packet_commitment_sequences) {
            obj.packet_commitment_sequences = message.packet_commitment_sequences.map((e) => e);
        }
        else {
            obj.packet_commitment_sequences = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryUnreceivedPacketsRequest);
        message.packet_commitment_sequences = [];
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
        if (object.packet_commitment_sequences !== undefined &&
            object.packet_commitment_sequences !== null) {
            for (const e of object.packet_commitment_sequences) {
                message.packet_commitment_sequences.push(e);
            }
        }
        return message;
    },
};
const baseQueryUnreceivedPacketsResponse = { sequences: 0 };
exports.QueryUnreceivedPacketsResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedPacketsResponse);
        message.sequences = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.sequences.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.sequences.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 2:
                    message.height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryUnreceivedPacketsResponse);
        message.sequences = [];
        if (object.sequences !== undefined && object.sequences !== null) {
            for (const e of object.sequences) {
                message.sequences.push(Number(e));
            }
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.sequences) {
            obj.sequences = message.sequences.map((e) => e);
        }
        else {
            obj.sequences = [];
        }
        message.height !== undefined &&
            (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryUnreceivedPacketsResponse);
        message.sequences = [];
        if (object.sequences !== undefined && object.sequences !== null) {
            for (const e of object.sequences) {
                message.sequences.push(e);
            }
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
};
const baseQueryUnreceivedAcksRequest = {
    port_id: "",
    channel_id: "",
    packet_ack_sequences: 0,
};
exports.QueryUnreceivedAcksRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        writer.uint32(26).fork();
        for (const v of message.packet_ack_sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedAcksRequest);
        message.packet_ack_sequences = [];
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
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.packet_ack_sequences.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.packet_ack_sequences.push(longToNumber(reader.uint64()));
                    }
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryUnreceivedAcksRequest);
        message.packet_ack_sequences = [];
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
        if (object.packet_ack_sequences !== undefined &&
            object.packet_ack_sequences !== null) {
            for (const e of object.packet_ack_sequences) {
                message.packet_ack_sequences.push(Number(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        if (message.packet_ack_sequences) {
            obj.packet_ack_sequences = message.packet_ack_sequences.map((e) => e);
        }
        else {
            obj.packet_ack_sequences = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryUnreceivedAcksRequest);
        message.packet_ack_sequences = [];
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
        if (object.packet_ack_sequences !== undefined &&
            object.packet_ack_sequences !== null) {
            for (const e of object.packet_ack_sequences) {
                message.packet_ack_sequences.push(e);
            }
        }
        return message;
    },
};
const baseQueryUnreceivedAcksResponse = { sequences: 0 };
exports.QueryUnreceivedAcksResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        writer.uint32(10).fork();
        for (const v of message.sequences) {
            writer.uint64(v);
        }
        writer.ldelim();
        if (message.height !== undefined) {
            client_1.Height.encode(message.height, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryUnreceivedAcksResponse);
        message.sequences = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    if ((tag & 7) === 2) {
                        const end2 = reader.uint32() + reader.pos;
                        while (reader.pos < end2) {
                            message.sequences.push(longToNumber(reader.uint64()));
                        }
                    }
                    else {
                        message.sequences.push(longToNumber(reader.uint64()));
                    }
                    break;
                case 2:
                    message.height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryUnreceivedAcksResponse);
        message.sequences = [];
        if (object.sequences !== undefined && object.sequences !== null) {
            for (const e of object.sequences) {
                message.sequences.push(Number(e));
            }
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromJSON(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.sequences) {
            obj.sequences = message.sequences.map((e) => e);
        }
        else {
            obj.sequences = [];
        }
        message.height !== undefined &&
            (obj.height = message.height ? client_1.Height.toJSON(message.height) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryUnreceivedAcksResponse);
        message.sequences = [];
        if (object.sequences !== undefined && object.sequences !== null) {
            for (const e of object.sequences) {
                message.sequences.push(e);
            }
        }
        if (object.height !== undefined && object.height !== null) {
            message.height = client_1.Height.fromPartial(object.height);
        }
        else {
            message.height = undefined;
        }
        return message;
    },
};
const baseQueryNextSequenceReceiveRequest = {
    port_id: "",
    channel_id: "",
};
exports.QueryNextSequenceReceiveRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryNextSequenceReceiveRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryNextSequenceReceiveRequest);
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
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryNextSequenceReceiveRequest);
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
        return message;
    },
};
const baseQueryNextSequenceReceiveResponse = {
    next_sequence_receive: 0,
};
exports.QueryNextSequenceReceiveResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.next_sequence_receive !== 0) {
            writer.uint32(8).uint64(message.next_sequence_receive);
        }
        if (message.proof.length !== 0) {
            writer.uint32(18).bytes(message.proof);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryNextSequenceReceiveResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.next_sequence_receive = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.proof = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryNextSequenceReceiveResponse);
        if (object.next_sequence_receive !== undefined &&
            object.next_sequence_receive !== null) {
            message.next_sequence_receive = Number(object.next_sequence_receive);
        }
        else {
            message.next_sequence_receive = 0;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = bytesFromBase64(object.proof);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.next_sequence_receive !== undefined &&
            (obj.next_sequence_receive = message.next_sequence_receive);
        message.proof !== undefined &&
            (obj.proof = base64FromBytes(message.proof !== undefined ? message.proof : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryNextSequenceReceiveResponse);
        if (object.next_sequence_receive !== undefined &&
            object.next_sequence_receive !== null) {
            message.next_sequence_receive = object.next_sequence_receive;
        }
        else {
            message.next_sequence_receive = 0;
        }
        if (object.proof !== undefined && object.proof !== null) {
            message.proof = object.proof;
        }
        else {
            message.proof = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    Channel(request) {
        const data = exports.QueryChannelRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channel", data);
        return promise.then((data) => exports.QueryChannelResponse.decode(new minimal_1.Reader(data)));
    }
    Channels(request) {
        const data = exports.QueryChannelsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "Channels", data);
        return promise.then((data) => exports.QueryChannelsResponse.decode(new minimal_1.Reader(data)));
    }
    ConnectionChannels(request) {
        const data = exports.QueryConnectionChannelsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ConnectionChannels", data);
        return promise.then((data) => exports.QueryConnectionChannelsResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelClientState(request) {
        const data = exports.QueryChannelClientStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelClientState", data);
        return promise.then((data) => exports.QueryChannelClientStateResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelConsensusState(request) {
        const data = exports.QueryChannelConsensusStateRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "ChannelConsensusState", data);
        return promise.then((data) => exports.QueryChannelConsensusStateResponse.decode(new minimal_1.Reader(data)));
    }
    PacketCommitment(request) {
        const data = exports.QueryPacketCommitmentRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitment", data);
        return promise.then((data) => exports.QueryPacketCommitmentResponse.decode(new minimal_1.Reader(data)));
    }
    PacketCommitments(request) {
        const data = exports.QueryPacketCommitmentsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketCommitments", data);
        return promise.then((data) => exports.QueryPacketCommitmentsResponse.decode(new minimal_1.Reader(data)));
    }
    PacketReceipt(request) {
        const data = exports.QueryPacketReceiptRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketReceipt", data);
        return promise.then((data) => exports.QueryPacketReceiptResponse.decode(new minimal_1.Reader(data)));
    }
    PacketAcknowledgement(request) {
        const data = exports.QueryPacketAcknowledgementRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgement", data);
        return promise.then((data) => exports.QueryPacketAcknowledgementResponse.decode(new minimal_1.Reader(data)));
    }
    PacketAcknowledgements(request) {
        const data = exports.QueryPacketAcknowledgementsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "PacketAcknowledgements", data);
        return promise.then((data) => exports.QueryPacketAcknowledgementsResponse.decode(new minimal_1.Reader(data)));
    }
    UnreceivedPackets(request) {
        const data = exports.QueryUnreceivedPacketsRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedPackets", data);
        return promise.then((data) => exports.QueryUnreceivedPacketsResponse.decode(new minimal_1.Reader(data)));
    }
    UnreceivedAcks(request) {
        const data = exports.QueryUnreceivedAcksRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "UnreceivedAcks", data);
        return promise.then((data) => exports.QueryUnreceivedAcksResponse.decode(new minimal_1.Reader(data)));
    }
    NextSequenceReceive(request) {
        const data = exports.QueryNextSequenceReceiveRequest.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Query", "NextSequenceReceive", data);
        return promise.then((data) => exports.QueryNextSequenceReceiveResponse.decode(new minimal_1.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
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
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
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
//# sourceMappingURL=query.js.map