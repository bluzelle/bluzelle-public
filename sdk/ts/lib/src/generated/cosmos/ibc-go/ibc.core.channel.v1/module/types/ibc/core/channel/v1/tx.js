"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgAcknowledgementResponse = exports.MsgAcknowledgement = exports.MsgTimeoutOnCloseResponse = exports.MsgTimeoutOnClose = exports.MsgTimeoutResponse = exports.MsgTimeout = exports.MsgRecvPacketResponse = exports.MsgRecvPacket = exports.MsgChannelCloseConfirmResponse = exports.MsgChannelCloseConfirm = exports.MsgChannelCloseInitResponse = exports.MsgChannelCloseInit = exports.MsgChannelOpenConfirmResponse = exports.MsgChannelOpenConfirm = exports.MsgChannelOpenAckResponse = exports.MsgChannelOpenAck = exports.MsgChannelOpenTryResponse = exports.MsgChannelOpenTry = exports.MsgChannelOpenInitResponse = exports.MsgChannelOpenInit = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
const channel_1 = require("../../../../ibc/core/channel/v1/channel");
const client_1 = require("../../../../ibc/core/client/v1/client");
exports.protobufPackage = "ibc.core.channel.v1";
const baseMsgChannelOpenInit = { port_id: "", signer: "" };
exports.MsgChannelOpenInit = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel !== undefined) {
            channel_1.Channel.encode(message.channel, writer.uint32(18).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenInit);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel = channel_1.Channel.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgChannelOpenInit);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = String(object.port_id);
        }
        else {
            message.port_id = "";
        }
        if (object.channel !== undefined && object.channel !== null) {
            message.channel = channel_1.Channel.fromJSON(object.channel);
        }
        else {
            message.channel = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel !== undefined &&
            (obj.channel = message.channel
                ? channel_1.Channel.toJSON(message.channel)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgChannelOpenInit);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = object.port_id;
        }
        else {
            message.port_id = "";
        }
        if (object.channel !== undefined && object.channel !== null) {
            message.channel = channel_1.Channel.fromPartial(object.channel);
        }
        else {
            message.channel = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgChannelOpenInitResponse = {};
exports.MsgChannelOpenInitResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenInitResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgChannelOpenInitResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenInitResponse);
        return message;
    },
};
const baseMsgChannelOpenTry = {
    port_id: "",
    previous_channel_id: "",
    counterparty_version: "",
    signer: "",
};
exports.MsgChannelOpenTry = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.previous_channel_id !== "") {
            writer.uint32(18).string(message.previous_channel_id);
        }
        if (message.channel !== undefined) {
            channel_1.Channel.encode(message.channel, writer.uint32(26).fork()).ldelim();
        }
        if (message.counterparty_version !== "") {
            writer.uint32(34).string(message.counterparty_version);
        }
        if (message.proof_init.length !== 0) {
            writer.uint32(42).bytes(message.proof_init);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenTry);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.previous_channel_id = reader.string();
                    break;
                case 3:
                    message.channel = channel_1.Channel.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.counterparty_version = reader.string();
                    break;
                case 5:
                    message.proof_init = reader.bytes();
                    break;
                case 6:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgChannelOpenTry);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = String(object.port_id);
        }
        else {
            message.port_id = "";
        }
        if (object.previous_channel_id !== undefined &&
            object.previous_channel_id !== null) {
            message.previous_channel_id = String(object.previous_channel_id);
        }
        else {
            message.previous_channel_id = "";
        }
        if (object.channel !== undefined && object.channel !== null) {
            message.channel = channel_1.Channel.fromJSON(object.channel);
        }
        else {
            message.channel = undefined;
        }
        if (object.counterparty_version !== undefined &&
            object.counterparty_version !== null) {
            message.counterparty_version = String(object.counterparty_version);
        }
        else {
            message.counterparty_version = "";
        }
        if (object.proof_init !== undefined && object.proof_init !== null) {
            message.proof_init = bytesFromBase64(object.proof_init);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.previous_channel_id !== undefined &&
            (obj.previous_channel_id = message.previous_channel_id);
        message.channel !== undefined &&
            (obj.channel = message.channel
                ? channel_1.Channel.toJSON(message.channel)
                : undefined);
        message.counterparty_version !== undefined &&
            (obj.counterparty_version = message.counterparty_version);
        message.proof_init !== undefined &&
            (obj.proof_init = base64FromBytes(message.proof_init !== undefined ? message.proof_init : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgChannelOpenTry);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = object.port_id;
        }
        else {
            message.port_id = "";
        }
        if (object.previous_channel_id !== undefined &&
            object.previous_channel_id !== null) {
            message.previous_channel_id = object.previous_channel_id;
        }
        else {
            message.previous_channel_id = "";
        }
        if (object.channel !== undefined && object.channel !== null) {
            message.channel = channel_1.Channel.fromPartial(object.channel);
        }
        else {
            message.channel = undefined;
        }
        if (object.counterparty_version !== undefined &&
            object.counterparty_version !== null) {
            message.counterparty_version = object.counterparty_version;
        }
        else {
            message.counterparty_version = "";
        }
        if (object.proof_init !== undefined && object.proof_init !== null) {
            message.proof_init = object.proof_init;
        }
        else {
            message.proof_init = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgChannelOpenTryResponse = {};
exports.MsgChannelOpenTryResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenTryResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgChannelOpenTryResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenTryResponse);
        return message;
    },
};
const baseMsgChannelOpenAck = {
    port_id: "",
    channel_id: "",
    counterparty_channel_id: "",
    counterparty_version: "",
    signer: "",
};
exports.MsgChannelOpenAck = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.counterparty_channel_id !== "") {
            writer.uint32(26).string(message.counterparty_channel_id);
        }
        if (message.counterparty_version !== "") {
            writer.uint32(34).string(message.counterparty_version);
        }
        if (message.proof_try.length !== 0) {
            writer.uint32(42).bytes(message.proof_try);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(50).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(58).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenAck);
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
                    message.counterparty_channel_id = reader.string();
                    break;
                case 4:
                    message.counterparty_version = reader.string();
                    break;
                case 5:
                    message.proof_try = reader.bytes();
                    break;
                case 6:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 7:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgChannelOpenAck);
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
        if (object.counterparty_channel_id !== undefined &&
            object.counterparty_channel_id !== null) {
            message.counterparty_channel_id = String(object.counterparty_channel_id);
        }
        else {
            message.counterparty_channel_id = "";
        }
        if (object.counterparty_version !== undefined &&
            object.counterparty_version !== null) {
            message.counterparty_version = String(object.counterparty_version);
        }
        else {
            message.counterparty_version = "";
        }
        if (object.proof_try !== undefined && object.proof_try !== null) {
            message.proof_try = bytesFromBase64(object.proof_try);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.counterparty_channel_id !== undefined &&
            (obj.counterparty_channel_id = message.counterparty_channel_id);
        message.counterparty_version !== undefined &&
            (obj.counterparty_version = message.counterparty_version);
        message.proof_try !== undefined &&
            (obj.proof_try = base64FromBytes(message.proof_try !== undefined ? message.proof_try : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgChannelOpenAck);
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
        if (object.counterparty_channel_id !== undefined &&
            object.counterparty_channel_id !== null) {
            message.counterparty_channel_id = object.counterparty_channel_id;
        }
        else {
            message.counterparty_channel_id = "";
        }
        if (object.counterparty_version !== undefined &&
            object.counterparty_version !== null) {
            message.counterparty_version = object.counterparty_version;
        }
        else {
            message.counterparty_version = "";
        }
        if (object.proof_try !== undefined && object.proof_try !== null) {
            message.proof_try = object.proof_try;
        }
        else {
            message.proof_try = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgChannelOpenAckResponse = {};
exports.MsgChannelOpenAckResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenAckResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgChannelOpenAckResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenAckResponse);
        return message;
    },
};
const baseMsgChannelOpenConfirm = {
    port_id: "",
    channel_id: "",
    signer: "",
};
exports.MsgChannelOpenConfirm = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.proof_ack.length !== 0) {
            writer.uint32(26).bytes(message.proof_ack);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenConfirm);
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
                    message.proof_ack = reader.bytes();
                    break;
                case 4:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgChannelOpenConfirm);
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
        if (object.proof_ack !== undefined && object.proof_ack !== null) {
            message.proof_ack = bytesFromBase64(object.proof_ack);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.proof_ack !== undefined &&
            (obj.proof_ack = base64FromBytes(message.proof_ack !== undefined ? message.proof_ack : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgChannelOpenConfirm);
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
        if (object.proof_ack !== undefined && object.proof_ack !== null) {
            message.proof_ack = object.proof_ack;
        }
        else {
            message.proof_ack = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgChannelOpenConfirmResponse = {};
exports.MsgChannelOpenConfirmResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelOpenConfirmResponse);
        return message;
    },
};
const baseMsgChannelCloseInit = {
    port_id: "",
    channel_id: "",
    signer: "",
};
exports.MsgChannelCloseInit = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.signer !== "") {
            writer.uint32(26).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseInit);
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
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgChannelCloseInit);
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
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgChannelCloseInit);
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
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgChannelCloseInitResponse = {};
exports.MsgChannelCloseInitResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseInitResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgChannelCloseInitResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelCloseInitResponse);
        return message;
    },
};
const baseMsgChannelCloseConfirm = {
    port_id: "",
    channel_id: "",
    signer: "",
};
exports.MsgChannelCloseConfirm = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.proof_init.length !== 0) {
            writer.uint32(26).bytes(message.proof_init);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseConfirm);
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
                    message.proof_init = reader.bytes();
                    break;
                case 4:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgChannelCloseConfirm);
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
        if (object.proof_init !== undefined && object.proof_init !== null) {
            message.proof_init = bytesFromBase64(object.proof_init);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.proof_init !== undefined &&
            (obj.proof_init = base64FromBytes(message.proof_init !== undefined ? message.proof_init : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgChannelCloseConfirm);
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
        if (object.proof_init !== undefined && object.proof_init !== null) {
            message.proof_init = object.proof_init;
        }
        else {
            message.proof_init = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgChannelCloseConfirmResponse = {};
exports.MsgChannelCloseConfirmResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgChannelCloseConfirmResponse);
        return message;
    },
};
const baseMsgRecvPacket = { signer: "" };
exports.MsgRecvPacket = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof_commitment.length !== 0) {
            writer.uint32(18).bytes(message.proof_commitment);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(34).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgRecvPacket);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof_commitment = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgRecvPacket);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromJSON(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.proof_commitment !== undefined &&
            object.proof_commitment !== null) {
            message.proof_commitment = bytesFromBase64(object.proof_commitment);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.packet !== undefined &&
            (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.proof_commitment !== undefined &&
            (obj.proof_commitment = base64FromBytes(message.proof_commitment !== undefined
                ? message.proof_commitment
                : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgRecvPacket);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromPartial(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.proof_commitment !== undefined &&
            object.proof_commitment !== null) {
            message.proof_commitment = object.proof_commitment;
        }
        else {
            message.proof_commitment = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgRecvPacketResponse = {};
exports.MsgRecvPacketResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgRecvPacketResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgRecvPacketResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgRecvPacketResponse);
        return message;
    },
};
const baseMsgTimeout = { next_sequence_recv: 0, signer: "" };
exports.MsgTimeout = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof_unreceived.length !== 0) {
            writer.uint32(18).bytes(message.proof_unreceived);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(26).fork()).ldelim();
        }
        if (message.next_sequence_recv !== 0) {
            writer.uint32(32).uint64(message.next_sequence_recv);
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeout);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof_unreceived = reader.bytes();
                    break;
                case 3:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.next_sequence_recv = longToNumber(reader.uint64());
                    break;
                case 5:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgTimeout);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromJSON(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.proof_unreceived !== undefined &&
            object.proof_unreceived !== null) {
            message.proof_unreceived = bytesFromBase64(object.proof_unreceived);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.next_sequence_recv !== undefined &&
            object.next_sequence_recv !== null) {
            message.next_sequence_recv = Number(object.next_sequence_recv);
        }
        else {
            message.next_sequence_recv = 0;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.packet !== undefined &&
            (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.proof_unreceived !== undefined &&
            (obj.proof_unreceived = base64FromBytes(message.proof_unreceived !== undefined
                ? message.proof_unreceived
                : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.next_sequence_recv !== undefined &&
            (obj.next_sequence_recv = message.next_sequence_recv);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgTimeout);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromPartial(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.proof_unreceived !== undefined &&
            object.proof_unreceived !== null) {
            message.proof_unreceived = object.proof_unreceived;
        }
        else {
            message.proof_unreceived = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.next_sequence_recv !== undefined &&
            object.next_sequence_recv !== null) {
            message.next_sequence_recv = object.next_sequence_recv;
        }
        else {
            message.next_sequence_recv = 0;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgTimeoutResponse = {};
exports.MsgTimeoutResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeoutResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgTimeoutResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgTimeoutResponse);
        return message;
    },
};
const baseMsgTimeoutOnClose = { next_sequence_recv: 0, signer: "" };
exports.MsgTimeoutOnClose = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.proof_unreceived.length !== 0) {
            writer.uint32(18).bytes(message.proof_unreceived);
        }
        if (message.proof_close.length !== 0) {
            writer.uint32(26).bytes(message.proof_close);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
        }
        if (message.next_sequence_recv !== 0) {
            writer.uint32(40).uint64(message.next_sequence_recv);
        }
        if (message.signer !== "") {
            writer.uint32(50).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeoutOnClose);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.proof_unreceived = reader.bytes();
                    break;
                case 3:
                    message.proof_close = reader.bytes();
                    break;
                case 4:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.next_sequence_recv = longToNumber(reader.uint64());
                    break;
                case 6:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgTimeoutOnClose);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromJSON(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.proof_unreceived !== undefined &&
            object.proof_unreceived !== null) {
            message.proof_unreceived = bytesFromBase64(object.proof_unreceived);
        }
        if (object.proof_close !== undefined && object.proof_close !== null) {
            message.proof_close = bytesFromBase64(object.proof_close);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.next_sequence_recv !== undefined &&
            object.next_sequence_recv !== null) {
            message.next_sequence_recv = Number(object.next_sequence_recv);
        }
        else {
            message.next_sequence_recv = 0;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.packet !== undefined &&
            (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.proof_unreceived !== undefined &&
            (obj.proof_unreceived = base64FromBytes(message.proof_unreceived !== undefined
                ? message.proof_unreceived
                : new Uint8Array()));
        message.proof_close !== undefined &&
            (obj.proof_close = base64FromBytes(message.proof_close !== undefined
                ? message.proof_close
                : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.next_sequence_recv !== undefined &&
            (obj.next_sequence_recv = message.next_sequence_recv);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgTimeoutOnClose);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromPartial(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.proof_unreceived !== undefined &&
            object.proof_unreceived !== null) {
            message.proof_unreceived = object.proof_unreceived;
        }
        else {
            message.proof_unreceived = new Uint8Array();
        }
        if (object.proof_close !== undefined && object.proof_close !== null) {
            message.proof_close = object.proof_close;
        }
        else {
            message.proof_close = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.next_sequence_recv !== undefined &&
            object.next_sequence_recv !== null) {
            message.next_sequence_recv = object.next_sequence_recv;
        }
        else {
            message.next_sequence_recv = 0;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgTimeoutOnCloseResponse = {};
exports.MsgTimeoutOnCloseResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgTimeoutOnCloseResponse);
        return message;
    },
};
const baseMsgAcknowledgement = { signer: "" };
exports.MsgAcknowledgement = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.packet !== undefined) {
            channel_1.Packet.encode(message.packet, writer.uint32(10).fork()).ldelim();
        }
        if (message.acknowledgement.length !== 0) {
            writer.uint32(18).bytes(message.acknowledgement);
        }
        if (message.proof_acked.length !== 0) {
            writer.uint32(26).bytes(message.proof_acked);
        }
        if (message.proof_height !== undefined) {
            client_1.Height.encode(message.proof_height, writer.uint32(34).fork()).ldelim();
        }
        if (message.signer !== "") {
            writer.uint32(42).string(message.signer);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgAcknowledgement);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.packet = channel_1.Packet.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.acknowledgement = reader.bytes();
                    break;
                case 3:
                    message.proof_acked = reader.bytes();
                    break;
                case 4:
                    message.proof_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 5:
                    message.signer = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgAcknowledgement);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromJSON(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.acknowledgement !== undefined &&
            object.acknowledgement !== null) {
            message.acknowledgement = bytesFromBase64(object.acknowledgement);
        }
        if (object.proof_acked !== undefined && object.proof_acked !== null) {
            message.proof_acked = bytesFromBase64(object.proof_acked);
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromJSON(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = String(object.signer);
        }
        else {
            message.signer = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.packet !== undefined &&
            (obj.packet = message.packet ? channel_1.Packet.toJSON(message.packet) : undefined);
        message.acknowledgement !== undefined &&
            (obj.acknowledgement = base64FromBytes(message.acknowledgement !== undefined
                ? message.acknowledgement
                : new Uint8Array()));
        message.proof_acked !== undefined &&
            (obj.proof_acked = base64FromBytes(message.proof_acked !== undefined
                ? message.proof_acked
                : new Uint8Array()));
        message.proof_height !== undefined &&
            (obj.proof_height = message.proof_height
                ? client_1.Height.toJSON(message.proof_height)
                : undefined);
        message.signer !== undefined && (obj.signer = message.signer);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgAcknowledgement);
        if (object.packet !== undefined && object.packet !== null) {
            message.packet = channel_1.Packet.fromPartial(object.packet);
        }
        else {
            message.packet = undefined;
        }
        if (object.acknowledgement !== undefined &&
            object.acknowledgement !== null) {
            message.acknowledgement = object.acknowledgement;
        }
        else {
            message.acknowledgement = new Uint8Array();
        }
        if (object.proof_acked !== undefined && object.proof_acked !== null) {
            message.proof_acked = object.proof_acked;
        }
        else {
            message.proof_acked = new Uint8Array();
        }
        if (object.proof_height !== undefined && object.proof_height !== null) {
            message.proof_height = client_1.Height.fromPartial(object.proof_height);
        }
        else {
            message.proof_height = undefined;
        }
        if (object.signer !== undefined && object.signer !== null) {
            message.signer = object.signer;
        }
        else {
            message.signer = "";
        }
        return message;
    },
};
const baseMsgAcknowledgementResponse = {};
exports.MsgAcknowledgementResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgAcknowledgementResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(_) {
        const message = Object.assign({}, baseMsgAcknowledgementResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgAcknowledgementResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    ChannelOpenInit(request) {
        const data = exports.MsgChannelOpenInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenInit", data);
        return promise.then((data) => exports.MsgChannelOpenInitResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelOpenTry(request) {
        const data = exports.MsgChannelOpenTry.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenTry", data);
        return promise.then((data) => exports.MsgChannelOpenTryResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelOpenAck(request) {
        const data = exports.MsgChannelOpenAck.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenAck", data);
        return promise.then((data) => exports.MsgChannelOpenAckResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelOpenConfirm(request) {
        const data = exports.MsgChannelOpenConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelOpenConfirm", data);
        return promise.then((data) => exports.MsgChannelOpenConfirmResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelCloseInit(request) {
        const data = exports.MsgChannelCloseInit.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseInit", data);
        return promise.then((data) => exports.MsgChannelCloseInitResponse.decode(new minimal_1.Reader(data)));
    }
    ChannelCloseConfirm(request) {
        const data = exports.MsgChannelCloseConfirm.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "ChannelCloseConfirm", data);
        return promise.then((data) => exports.MsgChannelCloseConfirmResponse.decode(new minimal_1.Reader(data)));
    }
    RecvPacket(request) {
        const data = exports.MsgRecvPacket.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "RecvPacket", data);
        return promise.then((data) => exports.MsgRecvPacketResponse.decode(new minimal_1.Reader(data)));
    }
    Timeout(request) {
        const data = exports.MsgTimeout.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Timeout", data);
        return promise.then((data) => exports.MsgTimeoutResponse.decode(new minimal_1.Reader(data)));
    }
    TimeoutOnClose(request) {
        const data = exports.MsgTimeoutOnClose.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "TimeoutOnClose", data);
        return promise.then((data) => exports.MsgTimeoutOnCloseResponse.decode(new minimal_1.Reader(data)));
    }
    Acknowledgement(request) {
        const data = exports.MsgAcknowledgement.encode(request).finish();
        const promise = this.rpc.request("ibc.core.channel.v1.Msg", "Acknowledgement", data);
        return promise.then((data) => exports.MsgAcknowledgementResponse.decode(new minimal_1.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
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
//# sourceMappingURL=tx.js.map