"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fee = exports.ModeInfo_Multi = exports.ModeInfo_Single = exports.ModeInfo = exports.SignerInfo = exports.AuthInfo = exports.TxBody = exports.SignDoc = exports.TxRaw = exports.Tx = exports.protobufPackage = void 0;
/* eslint-disable */
const signing_1 = require("../../../cosmos/tx/signing/v1beta1/signing");
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
const any_1 = require("../../../google/protobuf/any");
const multisig_1 = require("../../../cosmos/crypto/multisig/v1beta1/multisig");
const coin_1 = require("../../../cosmos/base/v1beta1/coin");
exports.protobufPackage = "cosmos.tx.v1beta1";
const baseTx = {};
exports.Tx = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.body !== undefined) {
            exports.TxBody.encode(message.body, writer.uint32(10).fork()).ldelim();
        }
        if (message.auth_info !== undefined) {
            exports.AuthInfo.encode(message.auth_info, writer.uint32(18).fork()).ldelim();
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTx);
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.body = exports.TxBody.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.auth_info = exports.AuthInfo.decode(reader, reader.uint32());
                    break;
                case 3:
                    message.signatures.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseTx);
        message.signatures = [];
        if (object.body !== undefined && object.body !== null) {
            message.body = exports.TxBody.fromJSON(object.body);
        }
        else {
            message.body = undefined;
        }
        if (object.auth_info !== undefined && object.auth_info !== null) {
            message.auth_info = exports.AuthInfo.fromJSON(object.auth_info);
        }
        else {
            message.auth_info = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.body !== undefined &&
            (obj.body = message.body ? exports.TxBody.toJSON(message.body) : undefined);
        message.auth_info !== undefined &&
            (obj.auth_info = message.auth_info
                ? exports.AuthInfo.toJSON(message.auth_info)
                : undefined);
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseTx);
        message.signatures = [];
        if (object.body !== undefined && object.body !== null) {
            message.body = exports.TxBody.fromPartial(object.body);
        }
        else {
            message.body = undefined;
        }
        if (object.auth_info !== undefined && object.auth_info !== null) {
            message.auth_info = exports.AuthInfo.fromPartial(object.auth_info);
        }
        else {
            message.auth_info = undefined;
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(e);
            }
        }
        return message;
    },
};
const baseTxRaw = {};
exports.TxRaw = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.body_bytes.length !== 0) {
            writer.uint32(10).bytes(message.body_bytes);
        }
        if (message.auth_info_bytes.length !== 0) {
            writer.uint32(18).bytes(message.auth_info_bytes);
        }
        for (const v of message.signatures) {
            writer.uint32(26).bytes(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTxRaw);
        message.signatures = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.body_bytes = reader.bytes();
                    break;
                case 2:
                    message.auth_info_bytes = reader.bytes();
                    break;
                case 3:
                    message.signatures.push(reader.bytes());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseTxRaw);
        message.signatures = [];
        if (object.body_bytes !== undefined && object.body_bytes !== null) {
            message.body_bytes = bytesFromBase64(object.body_bytes);
        }
        if (object.auth_info_bytes !== undefined &&
            object.auth_info_bytes !== null) {
            message.auth_info_bytes = bytesFromBase64(object.auth_info_bytes);
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(bytesFromBase64(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.body_bytes !== undefined &&
            (obj.body_bytes = base64FromBytes(message.body_bytes !== undefined ? message.body_bytes : new Uint8Array()));
        message.auth_info_bytes !== undefined &&
            (obj.auth_info_bytes = base64FromBytes(message.auth_info_bytes !== undefined
                ? message.auth_info_bytes
                : new Uint8Array()));
        if (message.signatures) {
            obj.signatures = message.signatures.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
        }
        else {
            obj.signatures = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseTxRaw);
        message.signatures = [];
        if (object.body_bytes !== undefined && object.body_bytes !== null) {
            message.body_bytes = object.body_bytes;
        }
        else {
            message.body_bytes = new Uint8Array();
        }
        if (object.auth_info_bytes !== undefined &&
            object.auth_info_bytes !== null) {
            message.auth_info_bytes = object.auth_info_bytes;
        }
        else {
            message.auth_info_bytes = new Uint8Array();
        }
        if (object.signatures !== undefined && object.signatures !== null) {
            for (const e of object.signatures) {
                message.signatures.push(e);
            }
        }
        return message;
    },
};
const baseSignDoc = { chain_id: "", account_number: 0 };
exports.SignDoc = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.body_bytes.length !== 0) {
            writer.uint32(10).bytes(message.body_bytes);
        }
        if (message.auth_info_bytes.length !== 0) {
            writer.uint32(18).bytes(message.auth_info_bytes);
        }
        if (message.chain_id !== "") {
            writer.uint32(26).string(message.chain_id);
        }
        if (message.account_number !== 0) {
            writer.uint32(32).uint64(message.account_number);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignDoc);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.body_bytes = reader.bytes();
                    break;
                case 2:
                    message.auth_info_bytes = reader.bytes();
                    break;
                case 3:
                    message.chain_id = reader.string();
                    break;
                case 4:
                    message.account_number = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseSignDoc);
        if (object.body_bytes !== undefined && object.body_bytes !== null) {
            message.body_bytes = bytesFromBase64(object.body_bytes);
        }
        if (object.auth_info_bytes !== undefined &&
            object.auth_info_bytes !== null) {
            message.auth_info_bytes = bytesFromBase64(object.auth_info_bytes);
        }
        if (object.chain_id !== undefined && object.chain_id !== null) {
            message.chain_id = String(object.chain_id);
        }
        else {
            message.chain_id = "";
        }
        if (object.account_number !== undefined && object.account_number !== null) {
            message.account_number = Number(object.account_number);
        }
        else {
            message.account_number = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.body_bytes !== undefined &&
            (obj.body_bytes = base64FromBytes(message.body_bytes !== undefined ? message.body_bytes : new Uint8Array()));
        message.auth_info_bytes !== undefined &&
            (obj.auth_info_bytes = base64FromBytes(message.auth_info_bytes !== undefined
                ? message.auth_info_bytes
                : new Uint8Array()));
        message.chain_id !== undefined && (obj.chain_id = message.chain_id);
        message.account_number !== undefined &&
            (obj.account_number = message.account_number);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignDoc);
        if (object.body_bytes !== undefined && object.body_bytes !== null) {
            message.body_bytes = object.body_bytes;
        }
        else {
            message.body_bytes = new Uint8Array();
        }
        if (object.auth_info_bytes !== undefined &&
            object.auth_info_bytes !== null) {
            message.auth_info_bytes = object.auth_info_bytes;
        }
        else {
            message.auth_info_bytes = new Uint8Array();
        }
        if (object.chain_id !== undefined && object.chain_id !== null) {
            message.chain_id = object.chain_id;
        }
        else {
            message.chain_id = "";
        }
        if (object.account_number !== undefined && object.account_number !== null) {
            message.account_number = object.account_number;
        }
        else {
            message.account_number = 0;
        }
        return message;
    },
};
const baseTxBody = { memo: "", timeout_height: 0 };
exports.TxBody = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.messages) {
            any_1.Any.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.memo !== "") {
            writer.uint32(18).string(message.memo);
        }
        if (message.timeout_height !== 0) {
            writer.uint32(24).uint64(message.timeout_height);
        }
        for (const v of message.extension_options) {
            any_1.Any.encode(v, writer.uint32(8186).fork()).ldelim();
        }
        for (const v of message.non_critical_extension_options) {
            any_1.Any.encode(v, writer.uint32(16378).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseTxBody);
        message.messages = [];
        message.extension_options = [];
        message.non_critical_extension_options = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.messages.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.memo = reader.string();
                    break;
                case 3:
                    message.timeout_height = longToNumber(reader.uint64());
                    break;
                case 1023:
                    message.extension_options.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                case 2047:
                    message.non_critical_extension_options.push(any_1.Any.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseTxBody);
        message.messages = [];
        message.extension_options = [];
        message.non_critical_extension_options = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (const e of object.messages) {
                message.messages.push(any_1.Any.fromJSON(e));
            }
        }
        if (object.memo !== undefined && object.memo !== null) {
            message.memo = String(object.memo);
        }
        else {
            message.memo = "";
        }
        if (object.timeout_height !== undefined && object.timeout_height !== null) {
            message.timeout_height = Number(object.timeout_height);
        }
        else {
            message.timeout_height = 0;
        }
        if (object.extension_options !== undefined &&
            object.extension_options !== null) {
            for (const e of object.extension_options) {
                message.extension_options.push(any_1.Any.fromJSON(e));
            }
        }
        if (object.non_critical_extension_options !== undefined &&
            object.non_critical_extension_options !== null) {
            for (const e of object.non_critical_extension_options) {
                message.non_critical_extension_options.push(any_1.Any.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.messages) {
            obj.messages = message.messages.map((e) => e ? any_1.Any.toJSON(e) : undefined);
        }
        else {
            obj.messages = [];
        }
        message.memo !== undefined && (obj.memo = message.memo);
        message.timeout_height !== undefined &&
            (obj.timeout_height = message.timeout_height);
        if (message.extension_options) {
            obj.extension_options = message.extension_options.map((e) => e ? any_1.Any.toJSON(e) : undefined);
        }
        else {
            obj.extension_options = [];
        }
        if (message.non_critical_extension_options) {
            obj.non_critical_extension_options = message.non_critical_extension_options.map((e) => (e ? any_1.Any.toJSON(e) : undefined));
        }
        else {
            obj.non_critical_extension_options = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseTxBody);
        message.messages = [];
        message.extension_options = [];
        message.non_critical_extension_options = [];
        if (object.messages !== undefined && object.messages !== null) {
            for (const e of object.messages) {
                message.messages.push(any_1.Any.fromPartial(e));
            }
        }
        if (object.memo !== undefined && object.memo !== null) {
            message.memo = object.memo;
        }
        else {
            message.memo = "";
        }
        if (object.timeout_height !== undefined && object.timeout_height !== null) {
            message.timeout_height = object.timeout_height;
        }
        else {
            message.timeout_height = 0;
        }
        if (object.extension_options !== undefined &&
            object.extension_options !== null) {
            for (const e of object.extension_options) {
                message.extension_options.push(any_1.Any.fromPartial(e));
            }
        }
        if (object.non_critical_extension_options !== undefined &&
            object.non_critical_extension_options !== null) {
            for (const e of object.non_critical_extension_options) {
                message.non_critical_extension_options.push(any_1.Any.fromPartial(e));
            }
        }
        return message;
    },
};
const baseAuthInfo = {};
exports.AuthInfo = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.signer_infos) {
            exports.SignerInfo.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.fee !== undefined) {
            exports.Fee.encode(message.fee, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseAuthInfo);
        message.signer_infos = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signer_infos.push(exports.SignerInfo.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.fee = exports.Fee.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseAuthInfo);
        message.signer_infos = [];
        if (object.signer_infos !== undefined && object.signer_infos !== null) {
            for (const e of object.signer_infos) {
                message.signer_infos.push(exports.SignerInfo.fromJSON(e));
            }
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = exports.Fee.fromJSON(object.fee);
        }
        else {
            message.fee = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.signer_infos) {
            obj.signer_infos = message.signer_infos.map((e) => e ? exports.SignerInfo.toJSON(e) : undefined);
        }
        else {
            obj.signer_infos = [];
        }
        message.fee !== undefined &&
            (obj.fee = message.fee ? exports.Fee.toJSON(message.fee) : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseAuthInfo);
        message.signer_infos = [];
        if (object.signer_infos !== undefined && object.signer_infos !== null) {
            for (const e of object.signer_infos) {
                message.signer_infos.push(exports.SignerInfo.fromPartial(e));
            }
        }
        if (object.fee !== undefined && object.fee !== null) {
            message.fee = exports.Fee.fromPartial(object.fee);
        }
        else {
            message.fee = undefined;
        }
        return message;
    },
};
const baseSignerInfo = { sequence: 0 };
exports.SignerInfo = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.public_key !== undefined) {
            any_1.Any.encode(message.public_key, writer.uint32(10).fork()).ldelim();
        }
        if (message.mode_info !== undefined) {
            exports.ModeInfo.encode(message.mode_info, writer.uint32(18).fork()).ldelim();
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseSignerInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.public_key = any_1.Any.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mode_info = exports.ModeInfo.decode(reader, reader.uint32());
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
        const message = Object.assign({}, baseSignerInfo);
        if (object.public_key !== undefined && object.public_key !== null) {
            message.public_key = any_1.Any.fromJSON(object.public_key);
        }
        else {
            message.public_key = undefined;
        }
        if (object.mode_info !== undefined && object.mode_info !== null) {
            message.mode_info = exports.ModeInfo.fromJSON(object.mode_info);
        }
        else {
            message.mode_info = undefined;
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
        message.public_key !== undefined &&
            (obj.public_key = message.public_key
                ? any_1.Any.toJSON(message.public_key)
                : undefined);
        message.mode_info !== undefined &&
            (obj.mode_info = message.mode_info
                ? exports.ModeInfo.toJSON(message.mode_info)
                : undefined);
        message.sequence !== undefined && (obj.sequence = message.sequence);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseSignerInfo);
        if (object.public_key !== undefined && object.public_key !== null) {
            message.public_key = any_1.Any.fromPartial(object.public_key);
        }
        else {
            message.public_key = undefined;
        }
        if (object.mode_info !== undefined && object.mode_info !== null) {
            message.mode_info = exports.ModeInfo.fromPartial(object.mode_info);
        }
        else {
            message.mode_info = undefined;
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
const baseModeInfo = {};
exports.ModeInfo = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.single !== undefined) {
            exports.ModeInfo_Single.encode(message.single, writer.uint32(10).fork()).ldelim();
        }
        if (message.multi !== undefined) {
            exports.ModeInfo_Multi.encode(message.multi, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseModeInfo);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.single = exports.ModeInfo_Single.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.multi = exports.ModeInfo_Multi.decode(reader, reader.uint32());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseModeInfo);
        if (object.single !== undefined && object.single !== null) {
            message.single = exports.ModeInfo_Single.fromJSON(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = exports.ModeInfo_Multi.fromJSON(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.single !== undefined &&
            (obj.single = message.single
                ? exports.ModeInfo_Single.toJSON(message.single)
                : undefined);
        message.multi !== undefined &&
            (obj.multi = message.multi
                ? exports.ModeInfo_Multi.toJSON(message.multi)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseModeInfo);
        if (object.single !== undefined && object.single !== null) {
            message.single = exports.ModeInfo_Single.fromPartial(object.single);
        }
        else {
            message.single = undefined;
        }
        if (object.multi !== undefined && object.multi !== null) {
            message.multi = exports.ModeInfo_Multi.fromPartial(object.multi);
        }
        else {
            message.multi = undefined;
        }
        return message;
    },
};
const baseModeInfo_Single = { mode: 0 };
exports.ModeInfo_Single = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.mode !== 0) {
            writer.uint32(8).int32(message.mode);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseModeInfo_Single);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.mode = reader.int32();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseModeInfo_Single);
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = (0, signing_1.signModeFromJSON)(object.mode);
        }
        else {
            message.mode = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.mode !== undefined && (obj.mode = (0, signing_1.signModeToJSON)(message.mode));
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseModeInfo_Single);
        if (object.mode !== undefined && object.mode !== null) {
            message.mode = object.mode;
        }
        else {
            message.mode = 0;
        }
        return message;
    },
};
const baseModeInfo_Multi = {};
exports.ModeInfo_Multi = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.bitarray !== undefined) {
            multisig_1.CompactBitArray.encode(message.bitarray, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.mode_infos) {
            exports.ModeInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseModeInfo_Multi);
        message.mode_infos = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.bitarray = multisig_1.CompactBitArray.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.mode_infos.push(exports.ModeInfo.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseModeInfo_Multi);
        message.mode_infos = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = multisig_1.CompactBitArray.fromJSON(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.mode_infos !== undefined && object.mode_infos !== null) {
            for (const e of object.mode_infos) {
                message.mode_infos.push(exports.ModeInfo.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.bitarray !== undefined &&
            (obj.bitarray = message.bitarray
                ? multisig_1.CompactBitArray.toJSON(message.bitarray)
                : undefined);
        if (message.mode_infos) {
            obj.mode_infos = message.mode_infos.map((e) => e ? exports.ModeInfo.toJSON(e) : undefined);
        }
        else {
            obj.mode_infos = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseModeInfo_Multi);
        message.mode_infos = [];
        if (object.bitarray !== undefined && object.bitarray !== null) {
            message.bitarray = multisig_1.CompactBitArray.fromPartial(object.bitarray);
        }
        else {
            message.bitarray = undefined;
        }
        if (object.mode_infos !== undefined && object.mode_infos !== null) {
            for (const e of object.mode_infos) {
                message.mode_infos.push(exports.ModeInfo.fromPartial(e));
            }
        }
        return message;
    },
};
const baseFee = { gas_limit: 0, payer: "", granter: "" };
exports.Fee = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.amount) {
            coin_1.Coin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        if (message.gas_limit !== 0) {
            writer.uint32(16).uint64(message.gas_limit);
        }
        if (message.payer !== "") {
            writer.uint32(26).string(message.payer);
        }
        if (message.granter !== "") {
            writer.uint32(34).string(message.granter);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseFee);
        message.amount = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.amount.push(coin_1.Coin.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.gas_limit = longToNumber(reader.uint64());
                    break;
                case 3:
                    message.payer = reader.string();
                    break;
                case 4:
                    message.granter = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseFee);
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(coin_1.Coin.fromJSON(e));
            }
        }
        if (object.gas_limit !== undefined && object.gas_limit !== null) {
            message.gas_limit = Number(object.gas_limit);
        }
        else {
            message.gas_limit = 0;
        }
        if (object.payer !== undefined && object.payer !== null) {
            message.payer = String(object.payer);
        }
        else {
            message.payer = "";
        }
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = String(object.granter);
        }
        else {
            message.granter = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.amount) {
            obj.amount = message.amount.map((e) => (e ? coin_1.Coin.toJSON(e) : undefined));
        }
        else {
            obj.amount = [];
        }
        message.gas_limit !== undefined && (obj.gas_limit = message.gas_limit);
        message.payer !== undefined && (obj.payer = message.payer);
        message.granter !== undefined && (obj.granter = message.granter);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseFee);
        message.amount = [];
        if (object.amount !== undefined && object.amount !== null) {
            for (const e of object.amount) {
                message.amount.push(coin_1.Coin.fromPartial(e));
            }
        }
        if (object.gas_limit !== undefined && object.gas_limit !== null) {
            message.gas_limit = object.gas_limit;
        }
        else {
            message.gas_limit = 0;
        }
        if (object.payer !== undefined && object.payer !== null) {
            message.payer = object.payer;
        }
        else {
            message.payer = "";
        }
        if (object.granter !== undefined && object.granter !== null) {
            message.granter = object.granter;
        }
        else {
            message.granter = "";
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