"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LegacyAminoPubKey = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const any_1 = require("../../../google/protobuf/any");
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "cosmos.crypto.multisig";
function createBaseLegacyAminoPubKey() {
    return { threshold: 0, publicKeys: [] };
}
exports.LegacyAminoPubKey = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.threshold !== 0) {
            writer.uint32(8).uint32(message.threshold);
        }
        for (const v of message.publicKeys) {
            any_1.Any.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseLegacyAminoPubKey();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.threshold = reader.uint32();
                    break;
                case 2:
                    message.publicKeys.push(any_1.Any.decode(reader, reader.uint32()));
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
            threshold: isSet(object.threshold) ? Number(object.threshold) : 0,
            publicKeys: Array.isArray(object === null || object === void 0 ? void 0 : object.publicKeys)
                ? object.publicKeys.map((e) => any_1.Any.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.threshold !== undefined &&
            (obj.threshold = Math.round(message.threshold));
        if (message.publicKeys) {
            obj.publicKeys = message.publicKeys.map((e) => e ? any_1.Any.toJSON(e) : undefined);
        }
        else {
            obj.publicKeys = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseLegacyAminoPubKey();
        message.threshold = (_a = object.threshold) !== null && _a !== void 0 ? _a : 0;
        message.publicKeys =
            ((_b = object.publicKeys) === null || _b === void 0 ? void 0 : _b.map((e) => any_1.Any.fromPartial(e))) || [];
        return message;
    },
};
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=keys.js.map