"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryGetTaxInfoResponse = exports.QueryGetTaxInfoRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
const Long = require("long");
exports.protobufPackage = "bluzelle.curium.tax";
const baseQueryGetTaxInfoRequest = {};
exports.QueryGetTaxInfoRequest = {
    encode(_, writer = minimal_1.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryGetTaxInfoRequest);
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
        const message = Object.assign({}, baseQueryGetTaxInfoRequest);
        return message;
    },
    toJSON(_) {
        const obj = {};
        return obj;
    },
    fromPartial(_) {
        const message = Object.assign({}, baseQueryGetTaxInfoRequest);
        return message;
    },
};
const baseQueryGetTaxInfoResponse = {
    gasTaxBp: 0,
    transferTaxBp: 0,
    taxCollector: "",
};
exports.QueryGetTaxInfoResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.gasTaxBp !== 0) {
            writer.uint32(8).int64(message.gasTaxBp);
        }
        if (message.transferTaxBp !== 0) {
            writer.uint32(16).int64(message.transferTaxBp);
        }
        if (message.taxCollector !== "") {
            writer.uint32(26).string(message.taxCollector);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryGetTaxInfoResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.gasTaxBp = longToNumber(reader.int64());
                    break;
                case 2:
                    message.transferTaxBp = longToNumber(reader.int64());
                    break;
                case 3:
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
        const message = Object.assign({}, baseQueryGetTaxInfoResponse);
        if (object.gasTaxBp !== undefined && object.gasTaxBp !== null) {
            message.gasTaxBp = Number(object.gasTaxBp);
        }
        else {
            message.gasTaxBp = 0;
        }
        if (object.transferTaxBp !== undefined && object.transferTaxBp !== null) {
            message.transferTaxBp = Number(object.transferTaxBp);
        }
        else {
            message.transferTaxBp = 0;
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
        message.gasTaxBp !== undefined && (obj.gasTaxBp = message.gasTaxBp);
        message.transferTaxBp !== undefined &&
            (obj.transferTaxBp = message.transferTaxBp);
        message.taxCollector !== undefined &&
            (obj.taxCollector = message.taxCollector);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryGetTaxInfoResponse);
        if (object.gasTaxBp !== undefined && object.gasTaxBp !== null) {
            message.gasTaxBp = object.gasTaxBp;
        }
        else {
            message.gasTaxBp = 0;
        }
        if (object.transferTaxBp !== undefined && object.transferTaxBp !== null) {
            message.transferTaxBp = object.transferTaxBp;
        }
        else {
            message.transferTaxBp = 0;
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
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    GetTaxInfo(request) {
        const data = exports.QueryGetTaxInfoRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.tax.Query", "GetTaxInfo", data);
        return promise.then((data) => exports.QueryGetTaxInfoResponse.decode(new minimal_1.Reader(data)));
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