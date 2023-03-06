"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const nft_1 = require("./nft");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.nft";
function createBaseGenesisState() {
    return {
        params: undefined,
        metadata: [],
        lastMetadataId: long_1.default.UZERO,
        nfts: [],
        collections: [],
        lastCollectionId: long_1.default.UZERO,
    };
}
exports.GenesisState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.params !== undefined) {
            nft_1.Params.encode(message.params, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.metadata) {
            nft_1.Metadata.encode(v, writer.uint32(18).fork()).ldelim();
        }
        if (!message.lastMetadataId.isZero()) {
            writer.uint32(24).uint64(message.lastMetadataId);
        }
        for (const v of message.nfts) {
            nft_1.NFT.encode(v, writer.uint32(34).fork()).ldelim();
        }
        for (const v of message.collections) {
            nft_1.Collection.encode(v, writer.uint32(42).fork()).ldelim();
        }
        if (!message.lastCollectionId.isZero()) {
            writer.uint32(48).uint64(message.lastCollectionId);
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
                    message.params = nft_1.Params.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.metadata.push(nft_1.Metadata.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.lastMetadataId = reader.uint64();
                    break;
                case 4:
                    message.nfts.push(nft_1.NFT.decode(reader, reader.uint32()));
                    break;
                case 5:
                    message.collections.push(nft_1.Collection.decode(reader, reader.uint32()));
                    break;
                case 6:
                    message.lastCollectionId = reader.uint64();
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
            params: isSet(object.params) ? nft_1.Params.fromJSON(object.params) : undefined,
            metadata: Array.isArray(object === null || object === void 0 ? void 0 : object.metadata)
                ? object.metadata.map((e) => nft_1.Metadata.fromJSON(e))
                : [],
            lastMetadataId: isSet(object.lastMetadataId)
                ? long_1.default.fromValue(object.lastMetadataId)
                : long_1.default.UZERO,
            nfts: Array.isArray(object === null || object === void 0 ? void 0 : object.nfts)
                ? object.nfts.map((e) => nft_1.NFT.fromJSON(e))
                : [],
            collections: Array.isArray(object === null || object === void 0 ? void 0 : object.collections)
                ? object.collections.map((e) => nft_1.Collection.fromJSON(e))
                : [],
            lastCollectionId: isSet(object.lastCollectionId)
                ? long_1.default.fromValue(object.lastCollectionId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.params !== undefined &&
            (obj.params = message.params ? nft_1.Params.toJSON(message.params) : undefined);
        if (message.metadata) {
            obj.metadata = message.metadata.map((e) => e ? nft_1.Metadata.toJSON(e) : undefined);
        }
        else {
            obj.metadata = [];
        }
        message.lastMetadataId !== undefined &&
            (obj.lastMetadataId = (message.lastMetadataId || long_1.default.UZERO).toString());
        if (message.nfts) {
            obj.nfts = message.nfts.map((e) => (e ? nft_1.NFT.toJSON(e) : undefined));
        }
        else {
            obj.nfts = [];
        }
        if (message.collections) {
            obj.collections = message.collections.map((e) => e ? nft_1.Collection.toJSON(e) : undefined);
        }
        else {
            obj.collections = [];
        }
        message.lastCollectionId !== undefined &&
            (obj.lastCollectionId = (message.lastCollectionId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseGenesisState();
        message.params =
            object.params !== undefined && object.params !== null
                ? nft_1.Params.fromPartial(object.params)
                : undefined;
        message.metadata =
            ((_a = object.metadata) === null || _a === void 0 ? void 0 : _a.map((e) => nft_1.Metadata.fromPartial(e))) || [];
        message.lastMetadataId =
            object.lastMetadataId !== undefined && object.lastMetadataId !== null
                ? long_1.default.fromValue(object.lastMetadataId)
                : long_1.default.UZERO;
        message.nfts = ((_b = object.nfts) === null || _b === void 0 ? void 0 : _b.map((e) => nft_1.NFT.fromPartial(e))) || [];
        message.collections =
            ((_c = object.collections) === null || _c === void 0 ? void 0 : _c.map((e) => nft_1.Collection.fromPartial(e))) || [];
        message.lastCollectionId =
            object.lastCollectionId !== undefined && object.lastCollectionId !== null
                ? long_1.default.fromValue(object.lastCollectionId)
                : long_1.default.UZERO;
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