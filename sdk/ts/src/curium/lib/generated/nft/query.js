"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryClientImpl = exports.QueryCollectionResponse = exports.QueryCollectionRequest = exports.QueryMetadataResponse = exports.QueryMetadataRequest = exports.QueryNFTsByOwnerResponse = exports.QueryNFTsByOwnerRequest = exports.QueryNFTInfoResponse = exports.QueryNFTInfoRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const nft_1 = require("./nft");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.nft";
function createBaseQueryNFTInfoRequest() {
    return { id: "" };
}
exports.QueryNFTInfoRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNFTInfoRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
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
            id: isSet(object.id) ? String(object.id) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryNFTInfoRequest();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryNFTInfoResponse() {
    return { nft: undefined, metadata: undefined };
}
exports.QueryNFTInfoResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.nft !== undefined) {
            nft_1.NFT.encode(message.nft, writer.uint32(10).fork()).ldelim();
        }
        if (message.metadata !== undefined) {
            nft_1.Metadata.encode(message.metadata, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNFTInfoResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nft = nft_1.NFT.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.metadata = nft_1.Metadata.decode(reader, reader.uint32());
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
            nft: isSet(object.nft) ? nft_1.NFT.fromJSON(object.nft) : undefined,
            metadata: isSet(object.metadata)
                ? nft_1.Metadata.fromJSON(object.metadata)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.nft !== undefined &&
            (obj.nft = message.nft ? nft_1.NFT.toJSON(message.nft) : undefined);
        message.metadata !== undefined &&
            (obj.metadata = message.metadata
                ? nft_1.Metadata.toJSON(message.metadata)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryNFTInfoResponse();
        message.nft =
            object.nft !== undefined && object.nft !== null
                ? nft_1.NFT.fromPartial(object.nft)
                : undefined;
        message.metadata =
            object.metadata !== undefined && object.metadata !== null
                ? nft_1.Metadata.fromPartial(object.metadata)
                : undefined;
        return message;
    },
};
function createBaseQueryNFTsByOwnerRequest() {
    return { owner: "" };
}
exports.QueryNFTsByOwnerRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.owner !== "") {
            writer.uint32(10).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNFTsByOwnerRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.owner = reader.string();
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
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryNFTsByOwnerRequest();
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseQueryNFTsByOwnerResponse() {
    return { nfts: [], metadata: [] };
}
exports.QueryNFTsByOwnerResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.nfts) {
            nft_1.NFT.encode(v, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.metadata) {
            nft_1.Metadata.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryNFTsByOwnerResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nfts.push(nft_1.NFT.decode(reader, reader.uint32()));
                    break;
                case 2:
                    message.metadata.push(nft_1.Metadata.decode(reader, reader.uint32()));
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
            nfts: Array.isArray(object === null || object === void 0 ? void 0 : object.nfts)
                ? object.nfts.map((e) => nft_1.NFT.fromJSON(e))
                : [],
            metadata: Array.isArray(object === null || object === void 0 ? void 0 : object.metadata)
                ? object.metadata.map((e) => nft_1.Metadata.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.nfts) {
            obj.nfts = message.nfts.map((e) => (e ? nft_1.NFT.toJSON(e) : undefined));
        }
        else {
            obj.nfts = [];
        }
        if (message.metadata) {
            obj.metadata = message.metadata.map((e) => e ? nft_1.Metadata.toJSON(e) : undefined);
        }
        else {
            obj.metadata = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseQueryNFTsByOwnerResponse();
        message.nfts = ((_a = object.nfts) === null || _a === void 0 ? void 0 : _a.map((e) => nft_1.NFT.fromPartial(e))) || [];
        message.metadata =
            ((_b = object.metadata) === null || _b === void 0 ? void 0 : _b.map((e) => nft_1.Metadata.fromPartial(e))) || [];
        return message;
    },
};
function createBaseQueryMetadataRequest() {
    return { id: long_1.default.UZERO };
}
exports.QueryMetadataRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMetadataRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
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
            id: isSet(object.id) ? long_1.default.fromValue(object.id) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryMetadataRequest();
        message.id =
            object.id !== undefined && object.id !== null
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseQueryMetadataResponse() {
    return { metadata: undefined };
}
exports.QueryMetadataResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.metadata !== undefined) {
            nft_1.Metadata.encode(message.metadata, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryMetadataResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadata = nft_1.Metadata.decode(reader, reader.uint32());
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
            metadata: isSet(object.metadata)
                ? nft_1.Metadata.fromJSON(object.metadata)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.metadata !== undefined &&
            (obj.metadata = message.metadata
                ? nft_1.Metadata.toJSON(message.metadata)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryMetadataResponse();
        message.metadata =
            object.metadata !== undefined && object.metadata !== null
                ? nft_1.Metadata.fromPartial(object.metadata)
                : undefined;
        return message;
    },
};
function createBaseQueryCollectionRequest() {
    return { id: long_1.default.UZERO };
}
exports.QueryCollectionRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
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
            id: isSet(object.id) ? long_1.default.fromValue(object.id) : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseQueryCollectionRequest();
        message.id =
            object.id !== undefined && object.id !== null
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseQueryCollectionResponse() {
    return { collection: undefined, nfts: [] };
}
exports.QueryCollectionResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.collection !== undefined) {
            nft_1.Collection.encode(message.collection, writer.uint32(10).fork()).ldelim();
        }
        for (const v of message.nfts) {
            nft_1.NFT.encode(v, writer.uint32(18).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseQueryCollectionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collection = nft_1.Collection.decode(reader, reader.uint32());
                    break;
                case 2:
                    message.nfts.push(nft_1.NFT.decode(reader, reader.uint32()));
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
            collection: isSet(object.collection)
                ? nft_1.Collection.fromJSON(object.collection)
                : undefined,
            nfts: Array.isArray(object === null || object === void 0 ? void 0 : object.nfts)
                ? object.nfts.map((e) => nft_1.NFT.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.collection !== undefined &&
            (obj.collection = message.collection
                ? nft_1.Collection.toJSON(message.collection)
                : undefined);
        if (message.nfts) {
            obj.nfts = message.nfts.map((e) => (e ? nft_1.NFT.toJSON(e) : undefined));
        }
        else {
            obj.nfts = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseQueryCollectionResponse();
        message.collection =
            object.collection !== undefined && object.collection !== null
                ? nft_1.Collection.fromPartial(object.collection)
                : undefined;
        message.nfts = ((_a = object.nfts) === null || _a === void 0 ? void 0 : _a.map((e) => nft_1.NFT.fromPartial(e))) || [];
        return message;
    },
};
class QueryClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.NFTInfo = this.NFTInfo.bind(this);
        this.NFTsByOwner = this.NFTsByOwner.bind(this);
        this.Metadata = this.Metadata.bind(this);
        this.Collection = this.Collection.bind(this);
    }
    NFTInfo(request) {
        const data = exports.QueryNFTInfoRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Query", "NFTInfo", data);
        return promise.then((data) => exports.QueryNFTInfoResponse.decode(new minimal_1.default.Reader(data)));
    }
    NFTsByOwner(request) {
        const data = exports.QueryNFTsByOwnerRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Query", "NFTsByOwner", data);
        return promise.then((data) => exports.QueryNFTsByOwnerResponse.decode(new minimal_1.default.Reader(data)));
    }
    Metadata(request) {
        const data = exports.QueryMetadataRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Query", "Metadata", data);
        return promise.then((data) => exports.QueryMetadataResponse.decode(new minimal_1.default.Reader(data)));
    }
    Collection(request) {
        const data = exports.QueryCollectionRequest.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Query", "Collection", data);
        return promise.then((data) => exports.QueryCollectionResponse.decode(new minimal_1.default.Reader(data)));
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