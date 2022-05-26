"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryHasContentResponse = exports.QueryHasContentRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "bluzelle.curium.storage";
const baseQueryHasContentRequest = { cid: "" };
exports.QueryHasContentRequest = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.cid !== "") {
            writer.uint32(10).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryHasContentRequest);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.cid = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryHasContentRequest);
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = String(object.cid);
        }
        else {
            message.cid = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryHasContentRequest);
        if (object.cid !== undefined && object.cid !== null) {
            message.cid = object.cid;
        }
        else {
            message.cid = "";
        }
        return message;
    },
};
const baseQueryHasContentResponse = { hasContent: false };
exports.QueryHasContentResponse = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.hasContent === true) {
            writer.uint32(8).bool(message.hasContent);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseQueryHasContentResponse);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.hasContent = reader.bool();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseQueryHasContentResponse);
        if (object.hasContent !== undefined && object.hasContent !== null) {
            message.hasContent = Boolean(object.hasContent);
        }
        else {
            message.hasContent = false;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.hasContent !== undefined && (obj.hasContent = message.hasContent);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseQueryHasContentResponse);
        if (object.hasContent !== undefined && object.hasContent !== null) {
            message.hasContent = object.hasContent;
        }
        else {
            message.hasContent = false;
        }
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
    }
    HasContent(request) {
        const data = exports.QueryHasContentRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.storage.Query", "HasContent", data);
        return promise.then((data) => exports.QueryHasContentResponse.decode(new minimal_1.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
//# sourceMappingURL=query.js.map