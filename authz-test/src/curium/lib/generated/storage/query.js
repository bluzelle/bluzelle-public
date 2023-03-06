"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryHasContentResponse = exports.QueryHasContentRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.storage";
function createBaseQueryHasContentRequest() {
    return { cid: "" };
}
exports.QueryHasContentRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.cid !== "") {
            writer.uint32(10).string(message.cid);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHasContentRequest();
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
        return {
            cid: isSet(object.cid) ? String(object.cid) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.cid !== undefined && (obj.cid = message.cid);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryHasContentRequest();
        message.cid = (_a = object.cid) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryHasContentResponse() {
    return { hasContent: false };
}
exports.QueryHasContentResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.hasContent === true) {
            writer.uint32(8).bool(message.hasContent);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryHasContentResponse();
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
        return {
            hasContent: isSet(object.hasContent) ? Boolean(object.hasContent) : false,
        };
    },
    toJSON(message) {
        const obj = {};
        message.hasContent !== undefined && (obj.hasContent = message.hasContent);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryHasContentResponse();
        message.hasContent = (_a = object.hasContent) !== null && _a !== void 0 ? _a : false;
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.HasContent = this.HasContent.bind(this);
    }
    HasContent(request) {
        const data = exports.QueryHasContentRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.storage.Query", "HasContent", data);
        return promise.then((data) => exports.QueryHasContentResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.QueryClientImpl = QueryClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=query.js.map