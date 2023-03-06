"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgSetTaxCollectorResponse = exports.MsgSetTaxCollector = exports.MsgSetTransferTaxBpResponse = exports.MsgSetTransferTaxBp = exports.MsgSetGasTaxBpResponse = exports.MsgSetGasTaxBp = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.tax";
function createBaseMsgSetGasTaxBp() {
    return { creator: "", bp: long_1.default.ZERO };
}
exports.MsgSetGasTaxBp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (!message.bp.isZero()) {
            writer.uint32(16).int64(message.bp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetGasTaxBp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.bp = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            bp: isSet(object.bp) ? long_1.default.fromValue(object.bp) : long_1.default.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.bp !== undefined && (obj.bp = (message.bp || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgSetGasTaxBp();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.bp =
            object.bp !== undefined && object.bp !== null
                ? long_1.default.fromValue(object.bp)
                : long_1.default.ZERO;
        return message;
    },
};
function createBaseMsgSetGasTaxBpResponse() {
    return {};
}
exports.MsgSetGasTaxBpResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetGasTaxBpResponse();
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
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSetGasTaxBpResponse();
        return message;
    },
};
function createBaseMsgSetTransferTaxBp() {
    return { creator: "", bp: long_1.default.ZERO };
}
exports.MsgSetTransferTaxBp = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (!message.bp.isZero()) {
            writer.uint32(16).int64(message.bp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetTransferTaxBp();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.bp = reader.int64();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            bp: isSet(object.bp) ? long_1.default.fromValue(object.bp) : long_1.default.ZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.bp !== undefined && (obj.bp = (message.bp || long_1.default.ZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgSetTransferTaxBp();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.bp =
            object.bp !== undefined && object.bp !== null
                ? long_1.default.fromValue(object.bp)
                : long_1.default.ZERO;
        return message;
    },
};
function createBaseMsgSetTransferTaxBpResponse() {
    return {};
}
exports.MsgSetTransferTaxBpResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetTransferTaxBpResponse();
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
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSetTransferTaxBpResponse();
        return message;
    },
};
function createBaseMsgSetTaxCollector() {
    return { creator: "", taxCollector: "" };
}
exports.MsgSetTaxCollector = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.taxCollector !== "") {
            writer.uint32(18).string(message.taxCollector);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetTaxCollector();
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
        return {
            creator: isSet(object.creator) ? String(object.creator) : "",
            taxCollector: isSet(object.taxCollector)
                ? String(object.taxCollector)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.taxCollector !== undefined &&
            (obj.taxCollector = message.taxCollector);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgSetTaxCollector();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.taxCollector = (_b = object.taxCollector) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgSetTaxCollectorResponse() {
    return {};
}
exports.MsgSetTaxCollectorResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSetTaxCollectorResponse();
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
        return {};
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = createBaseMsgSetTaxCollectorResponse();
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.SetGasTaxBp = this.SetGasTaxBp.bind(this);
        this.SetTransferTaxBp = this.SetTransferTaxBp.bind(this);
        this.SetTaxCollector = this.SetTaxCollector.bind(this);
    }
    SetGasTaxBp(request) {
        const data = exports.MsgSetGasTaxBp.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Msg", "SetGasTaxBp", data);
        return promise.then((data) => exports.MsgSetGasTaxBpResponse.decode(new minimal_1.default.Reader(data)));
    }
    SetTransferTaxBp(request) {
        const data = exports.MsgSetTransferTaxBp.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Msg", "SetTransferTaxBp", data);
        return promise.then((data) => exports.MsgSetTransferTaxBpResponse.decode(new minimal_1.default.Reader(data)));
    }
    SetTaxCollector(request) {
        const data = exports.MsgSetTaxCollector.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Msg", "SetTaxCollector", data);
        return promise.then((data) => exports.MsgSetTaxCollectorResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.MsgClientImpl = MsgClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=tx.js.map