"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitID = exports.StoreInfo = exports.CommitInfo = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "cosmos.base.store.v1beta1";
function createBaseCommitInfo() {
    return { version: long_1.default.ZERO, storeInfos: [] };
}
exports.CommitInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.version.isZero()) {
            writer.uint32(8).int64(message.version);
        }
        for (const v of message.storeInfos) {
            exports.StoreInfo.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommitInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = reader.int64();
                    break;
                case 2:
                    message.storeInfos.push(exports.StoreInfo.decode(reader, reader.uint32()));
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
            version: isSet(object.version)
                ? long_1.default.fromValue(object.version)
                : long_1.default.ZERO,
            storeInfos: Array.isArray(object === null || object === void 0 ? void 0 : object.storeInfos)
                ? object.storeInfos.map((e) => exports.StoreInfo.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.version !== undefined &&
            (obj.version = (message.version || long_1.default.ZERO).toString());
        if (message.storeInfos) {
            obj.storeInfos = message.storeInfos.map((e) => e ? exports.StoreInfo.toJSON(e) : undefined);
        }
        else {
            obj.storeInfos = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseCommitInfo();
        message.version =
            object.version !== undefined && object.version !== null
                ? long_1.default.fromValue(object.version)
                : long_1.default.ZERO;
        message.storeInfos =
            ((_a = object.storeInfos) === null || _a === void 0 ? void 0 : _a.map((e) => exports.StoreInfo.fromPartial(e))) || [];
        return message;
    },
};
function createBaseStoreInfo() {
    return { name: "", commitId: undefined };
}
exports.StoreInfo = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.name !== "") {
            writer.uint32(10).string(message.name);
        }
        if (message.commitId !== undefined) {
            exports.CommitID.encode(message.commitId, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseStoreInfo();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.name = reader.string();
                    break;
                case 2:
                    message.commitId = exports.CommitID.decode(reader, reader.uint32());
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
            name: isSet(object.name) ? String(object.name) : "",
            commitId: isSet(object.commitId)
                ? exports.CommitID.fromJSON(object.commitId)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.name !== undefined && (obj.name = message.name);
        message.commitId !== undefined &&
            (obj.commitId = message.commitId
                ? exports.CommitID.toJSON(message.commitId)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseStoreInfo();
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        message.commitId =
            object.commitId !== undefined && object.commitId !== null
                ? exports.CommitID.fromPartial(object.commitId)
                : undefined;
        return message;
    },
};
function createBaseCommitID() {
    return { version: long_1.default.ZERO, hash: new Uint8Array() };
}
exports.CommitID = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.version.isZero()) {
            writer.uint32(8).int64(message.version);
        }
        if (message.hash.length !== 0) {
            writer.uint32(18).bytes(message.hash);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCommitID();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.version = reader.int64();
                    break;
                case 2:
                    message.hash = reader.bytes();
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
            version: isSet(object.version)
                ? long_1.default.fromValue(object.version)
                : long_1.default.ZERO,
            hash: isSet(object.hash)
                ? bytesFromBase64(object.hash)
                : new Uint8Array(),
        };
    },
    toJSON(message) {
        const obj = {};
        message.version !== undefined &&
            (obj.version = (message.version || long_1.default.ZERO).toString());
        message.hash !== undefined &&
            (obj.hash = base64FromBytes(message.hash !== undefined ? message.hash : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseCommitID();
        message.version =
            object.version !== undefined && object.version !== null
                ? long_1.default.fromValue(object.version)
                : long_1.default.ZERO;
        message.hash = (_a = object.hash) !== null && _a !== void 0 ? _a : new Uint8Array();
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
    arr.forEach((byte) => {
        bin.push(String.fromCharCode(byte));
    });
    return btoa(bin.join(""));
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=commit_info.js.map