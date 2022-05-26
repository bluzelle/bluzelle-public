"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgSetTaxCollectorResponse = exports.MsgSetTaxCollector = exports.MsgSetTransferTaxBpResponse = exports.MsgSetTransferTaxBp = exports.MsgSetGasTaxBpResponse = exports.MsgSetGasTaxBp = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = "bluzelle.curium.tax";
const baseMsgSetGasTaxBp = { creator: "", bp: 0 };
exports.MsgSetGasTaxBp = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.bp !== 0) {
            writer.uint32(16).int64(message.bp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetGasTaxBp);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.bp = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgSetGasTaxBp);
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.bp !== undefined && object.bp !== null) {
            message.bp = Number(object.bp);
        }
        else {
            message.bp = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.bp !== undefined && (obj.bp = message.bp);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgSetGasTaxBp);
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.bp !== undefined && object.bp !== null) {
            message.bp = object.bp;
        }
        else {
            message.bp = 0;
        }
        return message;
    },
};
const baseMsgSetGasTaxBpResponse = {};
exports.MsgSetGasTaxBpResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetGasTaxBpResponse);
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
        const message = Object.assign({}, baseMsgSetGasTaxBpResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgSetGasTaxBpResponse);
        return message;
    },
};
const baseMsgSetTransferTaxBp = { creator: "", bp: 0 };
exports.MsgSetTransferTaxBp = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.bp !== 0) {
            writer.uint32(16).int64(message.bp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetTransferTaxBp);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.bp = longToNumber(reader.int64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgSetTransferTaxBp);
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.bp !== undefined && object.bp !== null) {
            message.bp = Number(object.bp);
        }
        else {
            message.bp = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.bp !== undefined && (obj.bp = message.bp);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgSetTransferTaxBp);
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.bp !== undefined && object.bp !== null) {
            message.bp = object.bp;
        }
        else {
            message.bp = 0;
        }
        return message;
    },
};
const baseMsgSetTransferTaxBpResponse = {};
exports.MsgSetTransferTaxBpResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetTransferTaxBpResponse);
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
        const message = Object.assign({}, baseMsgSetTransferTaxBpResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgSetTransferTaxBpResponse);
        return message;
    },
};
const baseMsgSetTaxCollector = { creator: "", taxCollector: "" };
exports.MsgSetTaxCollector = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.taxCollector !== "") {
            writer.uint32(18).string(message.taxCollector);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetTaxCollector);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.taxCollector = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseMsgSetTaxCollector);
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = String(object.creator);
        }
        else {
            message.creator = "";
        }
        if (object.taxCollector !== undefined && object.taxCollector !== null) {
            message.taxCollector = String(object.taxCollector);
        }
        else {
            message.taxCollector = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.taxCollector !== undefined &&
            (obj.taxCollector = message.taxCollector);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseMsgSetTaxCollector);
        if (object.creator !== undefined && object.creator !== null) {
            message.creator = object.creator;
        }
        else {
            message.creator = "";
        }
        if (object.taxCollector !== undefined && object.taxCollector !== null) {
            message.taxCollector = object.taxCollector;
        }
        else {
            message.taxCollector = "";
        }
        return message;
    },
};
const baseMsgSetTaxCollectorResponse = {};
exports.MsgSetTaxCollectorResponse = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseMsgSetTaxCollectorResponse);
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
        const message = Object.assign({}, baseMsgSetTaxCollectorResponse);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseMsgSetTaxCollectorResponse);
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    SetGasTaxBp(request) {
        const data = exports.MsgSetGasTaxBp.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Msg", "SetGasTaxBp", data);
        return promise.then((data) => exports.MsgSetGasTaxBpResponse.decode(new minimal_1.Reader(data)));
    }
    SetTransferTaxBp(request) {
        const data = exports.MsgSetTransferTaxBp.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Msg", "SetTransferTaxBp", data);
        return promise.then((data) => exports.MsgSetTransferTaxBpResponse.decode(new minimal_1.Reader(data)));
    }
    SetTaxCollector(request) {
        const data = exports.MsgSetTaxCollector.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Msg", "SetTaxCollector", data);
        return promise.then((data) => exports.MsgSetTaxCollectorResponse.decode(new minimal_1.Reader(data)));
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