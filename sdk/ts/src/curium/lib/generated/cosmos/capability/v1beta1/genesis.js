"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.GenesisOwners = exports.protobufPackage = void 0;
/* eslint-disable */
const capability_1 = require("./capability");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "cosmos.capability.v1beta1";
function createBaseGenesisOwners() {
    return { index: long_1.default.UZERO, indexOwners: undefined };
}
exports.GenesisOwners = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.index.isZero()) {
            writer.uint32(8).uint64(message.index);
        }
        if (message.indexOwners !== undefined) {
            capability_1.CapabilityOwners.encode(message.indexOwners, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisOwners();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint64();
                    break;
                case 2:
                    message.indexOwners = capability_1.CapabilityOwners.decode(reader, reader.uint32());
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
            index: isSet(object.index) ? long_1.default.fromValue(object.index) : long_1.default.UZERO,
            indexOwners: isSet(object.indexOwners)
                ? capability_1.CapabilityOwners.fromJSON(object.indexOwners)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined &&
            (obj.index = (message.index || long_1.default.UZERO).toString());
        message.indexOwners !== undefined &&
            (obj.indexOwners = message.indexOwners
                ? capability_1.CapabilityOwners.toJSON(message.indexOwners)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseGenesisOwners();
        message.index =
            object.index !== undefined && object.index !== null
                ? long_1.default.fromValue(object.index)
                : long_1.default.UZERO;
        message.indexOwners =
            object.indexOwners !== undefined && object.indexOwners !== null
                ? capability_1.CapabilityOwners.fromPartial(object.indexOwners)
                : undefined;
        return message;
    },
};
function createBaseGenesisState() {
    return { index: long_1.default.UZERO, owners: [] };
}
exports.GenesisState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.index.isZero()) {
            writer.uint32(8).uint64(message.index);
        }
        for (const v of message.owners) {
            exports.GenesisOwners.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseGenesisState();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.index = reader.uint64();
                    break;
                case 2:
                    message.owners.push(exports.GenesisOwners.decode(reader, reader.uint32()));
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
            index: isSet(object.index) ? long_1.default.fromValue(object.index) : long_1.default.UZERO,
            owners: Array.isArray(object === null || object === void 0 ? void 0 : object.owners)
                ? object.owners.map((e) => exports.GenesisOwners.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.index !== undefined &&
            (obj.index = (message.index || long_1.default.UZERO).toString());
        if (message.owners) {
            obj.owners = message.owners.map((e) => e ? exports.GenesisOwners.toJSON(e) : undefined);
        }
        else {
            obj.owners = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGenesisState();
        message.index =
            object.index !== undefined && object.index !== null
                ? long_1.default.fromValue(object.index)
                : long_1.default.UZERO;
        message.owners =
            ((_a = object.owners) === null || _a === void 0 ? void 0 : _a.map((e) => exports.GenesisOwners.fromPartial(e))) || [];
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
//# sourceMappingURL=genesis.js.map