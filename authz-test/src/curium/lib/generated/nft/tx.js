"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MsgClientImpl = exports.MsgUpdateCollectionAuthorityResponse = exports.MsgUpdateCollectionAuthority = exports.MsgCreateCollectionResponse = exports.MsgCreateCollection = exports.MsgUpdateMintAuthorityResponse = exports.MsgUpdateMintAuthority = exports.MsgUpdateMetadataAuthorityResponse = exports.MsgUpdateMetadataAuthority = exports.MsgUpdateMetadataResponse = exports.MsgUpdateMetadata = exports.MsgSignMetadataResponse = exports.MsgSignMetadata = exports.MsgTransferNFTResponse = exports.MsgTransferNFT = exports.MsgPrintEditionResponse = exports.MsgPrintEdition = exports.MsgCreateNFTResponse = exports.MsgCreateNFT = exports.protobufPackage = void 0;
/* eslint-disable */
const nft_1 = require("./nft");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.nft";
function createBaseMsgCreateNFT() {
    return { sender: "", collId: long_1.default.UZERO, metadata: undefined };
}
exports.MsgCreateNFT = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.collId.isZero()) {
            writer.uint32(16).uint64(message.collId);
        }
        if (message.metadata !== undefined) {
            nft_1.Metadata.encode(message.metadata, writer.uint32(26).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.collId = reader.uint64();
                    break;
                case 3:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            collId: isSet(object.collId) ? long_1.default.fromValue(object.collId) : long_1.default.UZERO,
            metadata: isSet(object.metadata)
                ? nft_1.Metadata.fromJSON(object.metadata)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.collId !== undefined &&
            (obj.collId = (message.collId || long_1.default.UZERO).toString());
        message.metadata !== undefined &&
            (obj.metadata = message.metadata
                ? nft_1.Metadata.toJSON(message.metadata)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgCreateNFT();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.collId =
            object.collId !== undefined && object.collId !== null
                ? long_1.default.fromValue(object.collId)
                : long_1.default.UZERO;
        message.metadata =
            object.metadata !== undefined && object.metadata !== null
                ? nft_1.Metadata.fromPartial(object.metadata)
                : undefined;
        return message;
    },
};
function createBaseMsgCreateNFTResponse() {
    return { id: "", metadataId: long_1.default.UZERO };
}
exports.MsgCreateNFTResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateNFTResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
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
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgCreateNFTResponse();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseMsgPrintEdition() {
    return { sender: "", collId: long_1.default.UZERO, metadataId: long_1.default.UZERO, owner: "" };
}
exports.MsgPrintEdition = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.collId.isZero()) {
            writer.uint32(16).uint64(message.collId);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(24).uint64(message.metadataId);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPrintEdition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.collId = reader.uint64();
                    break;
                case 3:
                    message.metadataId = reader.uint64();
                    break;
                case 4:
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            collId: isSet(object.collId) ? long_1.default.fromValue(object.collId) : long_1.default.UZERO,
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.collId !== undefined &&
            (obj.collId = (message.collId || long_1.default.UZERO).toString());
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgPrintEdition();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.collId =
            object.collId !== undefined && object.collId !== null
                ? long_1.default.fromValue(object.collId)
                : long_1.default.UZERO;
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        message.owner = (_b = object.owner) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgPrintEditionResponse() {
    return { id: "", metadataId: long_1.default.UZERO };
}
exports.MsgPrintEditionResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.id !== "") {
            writer.uint32(10).string(message.id);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgPrintEditionResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.string();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
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
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined && (obj.id = message.id);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgPrintEditionResponse();
        message.id = (_a = object.id) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseMsgTransferNFT() {
    return { sender: "", id: "", newOwner: "" };
}
exports.MsgTransferNFT = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.id !== "") {
            writer.uint32(18).string(message.id);
        }
        if (message.newOwner !== "") {
            writer.uint32(26).string(message.newOwner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTransferNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.id = reader.string();
                    break;
                case 3:
                    message.newOwner = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            id: isSet(object.id) ? String(object.id) : "",
            newOwner: isSet(object.newOwner) ? String(object.newOwner) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.id !== undefined && (obj.id = message.id);
        message.newOwner !== undefined && (obj.newOwner = message.newOwner);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseMsgTransferNFT();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.id = (_b = object.id) !== null && _b !== void 0 ? _b : "";
        message.newOwner = (_c = object.newOwner) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseMsgTransferNFTResponse() {
    return {};
}
exports.MsgTransferNFTResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgTransferNFTResponse();
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
        const message = createBaseMsgTransferNFTResponse();
        return message;
    },
};
function createBaseMsgSignMetadata() {
    return { sender: "", metadataId: long_1.default.UZERO };
}
exports.MsgSignMetadata = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseMsgSignMetadata();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseMsgSignMetadataResponse() {
    return {};
}
exports.MsgSignMetadataResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgSignMetadataResponse();
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
        const message = createBaseMsgSignMetadataResponse();
        return message;
    },
};
function createBaseMsgUpdateMetadata() {
    return {
        sender: "",
        metadataId: long_1.default.UZERO,
        name: "",
        uri: "",
        sellerFeeBasisPoints: 0,
        creators: [],
    };
}
exports.MsgUpdateMetadata = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.uri !== "") {
            writer.uint32(34).string(message.uri);
        }
        if (message.sellerFeeBasisPoints !== 0) {
            writer.uint32(40).uint32(message.sellerFeeBasisPoints);
        }
        for (const v of message.creators) {
            nft_1.Creator.encode(v, writer.uint32(50).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.uri = reader.string();
                    break;
                case 5:
                    message.sellerFeeBasisPoints = reader.uint32();
                    break;
                case 6:
                    message.creators.push(nft_1.Creator.decode(reader, reader.uint32()));
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
            name: isSet(object.name) ? String(object.name) : "",
            uri: isSet(object.uri) ? String(object.uri) : "",
            sellerFeeBasisPoints: isSet(object.sellerFeeBasisPoints)
                ? Number(object.sellerFeeBasisPoints)
                : 0,
            creators: Array.isArray(object === null || object === void 0 ? void 0 : object.creators)
                ? object.creators.map((e) => nft_1.Creator.fromJSON(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.sellerFeeBasisPoints !== undefined &&
            (obj.sellerFeeBasisPoints = Math.round(message.sellerFeeBasisPoints));
        if (message.creators) {
            obj.creators = message.creators.map((e) => e ? nft_1.Creator.toJSON(e) : undefined);
        }
        else {
            obj.creators = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseMsgUpdateMetadata();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        message.uri = (_c = object.uri) !== null && _c !== void 0 ? _c : "";
        message.sellerFeeBasisPoints = (_d = object.sellerFeeBasisPoints) !== null && _d !== void 0 ? _d : 0;
        message.creators =
            ((_e = object.creators) === null || _e === void 0 ? void 0 : _e.map((e) => nft_1.Creator.fromPartial(e))) || [];
        return message;
    },
};
function createBaseMsgUpdateMetadataResponse() {
    return {};
}
exports.MsgUpdateMetadataResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMetadataResponse();
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
        const message = createBaseMsgUpdateMetadataResponse();
        return message;
    },
};
function createBaseMsgUpdateMetadataAuthority() {
    return { sender: "", metadataId: long_1.default.UZERO, newAuthority: "" };
}
exports.MsgUpdateMetadataAuthority = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        if (message.newAuthority !== "") {
            writer.uint32(26).string(message.newAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMetadataAuthority();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
                    break;
                case 3:
                    message.newAuthority = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
            newAuthority: isSet(object.newAuthority)
                ? String(object.newAuthority)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        message.newAuthority !== undefined &&
            (obj.newAuthority = message.newAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUpdateMetadataAuthority();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        message.newAuthority = (_b = object.newAuthority) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgUpdateMetadataAuthorityResponse() {
    return {};
}
exports.MsgUpdateMetadataAuthorityResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMetadataAuthorityResponse();
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
        const message = createBaseMsgUpdateMetadataAuthorityResponse();
        return message;
    },
};
function createBaseMsgUpdateMintAuthority() {
    return { sender: "", metadataId: long_1.default.UZERO, newAuthority: "" };
}
exports.MsgUpdateMintAuthority = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        if (message.newAuthority !== "") {
            writer.uint32(26).string(message.newAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMintAuthority();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
                    break;
                case 3:
                    message.newAuthority = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
            newAuthority: isSet(object.newAuthority)
                ? String(object.newAuthority)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        message.newAuthority !== undefined &&
            (obj.newAuthority = message.newAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUpdateMintAuthority();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        message.newAuthority = (_b = object.newAuthority) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgUpdateMintAuthorityResponse() {
    return {};
}
exports.MsgUpdateMintAuthorityResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateMintAuthorityResponse();
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
        const message = createBaseMsgUpdateMintAuthorityResponse();
        return message;
    },
};
function createBaseMsgCreateCollection() {
    return {
        sender: "",
        symbol: "",
        name: "",
        uri: "",
        isMutable: false,
        updateAuthority: "",
    };
}
exports.MsgCreateCollection = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (message.symbol !== "") {
            writer.uint32(18).string(message.symbol);
        }
        if (message.name !== "") {
            writer.uint32(26).string(message.name);
        }
        if (message.uri !== "") {
            writer.uint32(34).string(message.uri);
        }
        if (message.isMutable === true) {
            writer.uint32(40).bool(message.isMutable);
        }
        if (message.updateAuthority !== "") {
            writer.uint32(50).string(message.updateAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateCollection();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.symbol = reader.string();
                    break;
                case 3:
                    message.name = reader.string();
                    break;
                case 4:
                    message.uri = reader.string();
                    break;
                case 5:
                    message.isMutable = reader.bool();
                    break;
                case 6:
                    message.updateAuthority = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            symbol: isSet(object.symbol) ? String(object.symbol) : "",
            name: isSet(object.name) ? String(object.name) : "",
            uri: isSet(object.uri) ? String(object.uri) : "",
            isMutable: isSet(object.isMutable) ? Boolean(object.isMutable) : false,
            updateAuthority: isSet(object.updateAuthority)
                ? String(object.updateAuthority)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.symbol !== undefined && (obj.symbol = message.symbol);
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.isMutable !== undefined && (obj.isMutable = message.isMutable);
        message.updateAuthority !== undefined &&
            (obj.updateAuthority = message.updateAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f;
        const message = createBaseMsgCreateCollection();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.symbol = (_b = object.symbol) !== null && _b !== void 0 ? _b : "";
        message.name = (_c = object.name) !== null && _c !== void 0 ? _c : "";
        message.uri = (_d = object.uri) !== null && _d !== void 0 ? _d : "";
        message.isMutable = (_e = object.isMutable) !== null && _e !== void 0 ? _e : false;
        message.updateAuthority = (_f = object.updateAuthority) !== null && _f !== void 0 ? _f : "";
        return message;
    },
};
function createBaseMsgCreateCollectionResponse() {
    return { id: long_1.default.UZERO };
}
exports.MsgCreateCollectionResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgCreateCollectionResponse();
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
        const message = createBaseMsgCreateCollectionResponse();
        message.id =
            object.id !== undefined && object.id !== null
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseMsgUpdateCollectionAuthority() {
    return { sender: "", collectionId: long_1.default.UZERO, newAuthority: "" };
}
exports.MsgUpdateCollectionAuthority = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.sender !== "") {
            writer.uint32(10).string(message.sender);
        }
        if (!message.collectionId.isZero()) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.newAuthority !== "") {
            writer.uint32(26).string(message.newAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCollectionAuthority();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sender = reader.string();
                    break;
                case 2:
                    message.collectionId = reader.uint64();
                    break;
                case 3:
                    message.newAuthority = reader.string();
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
            sender: isSet(object.sender) ? String(object.sender) : "",
            collectionId: isSet(object.collectionId)
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO,
            newAuthority: isSet(object.newAuthority)
                ? String(object.newAuthority)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.sender !== undefined && (obj.sender = message.sender);
        message.collectionId !== undefined &&
            (obj.collectionId = (message.collectionId || long_1.default.UZERO).toString());
        message.newAuthority !== undefined &&
            (obj.newAuthority = message.newAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseMsgUpdateCollectionAuthority();
        message.sender = (_a = object.sender) !== null && _a !== void 0 ? _a : "";
        message.collectionId =
            object.collectionId !== undefined && object.collectionId !== null
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO;
        message.newAuthority = (_b = object.newAuthority) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseMsgUpdateCollectionAuthorityResponse() {
    return {};
}
exports.MsgUpdateCollectionAuthorityResponse = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMsgUpdateCollectionAuthorityResponse();
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
        const message = createBaseMsgUpdateCollectionAuthorityResponse();
        return message;
    },
};
class MsgClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.CreateNFT = this.CreateNFT.bind(this);
        this.PrintEdition = this.PrintEdition.bind(this);
        this.TransferNFT = this.TransferNFT.bind(this);
        this.SignMetadata = this.SignMetadata.bind(this);
        this.UpdateMetadata = this.UpdateMetadata.bind(this);
        this.UpdateMetadataAuthority = this.UpdateMetadataAuthority.bind(this);
        this.UpdateMintAuthority = this.UpdateMintAuthority.bind(this);
        this.CreateCollection = this.CreateCollection.bind(this);
        this.UpdateCollectionAuthority = this.UpdateCollectionAuthority.bind(this);
    }
    CreateNFT(request) {
        const data = exports.MsgCreateNFT.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "CreateNFT", data);
        return promise.then((data) => exports.MsgCreateNFTResponse.decode(new minimal_1.default.Reader(data)));
    }
    PrintEdition(request) {
        const data = exports.MsgPrintEdition.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "PrintEdition", data);
        return promise.then((data) => exports.MsgPrintEditionResponse.decode(new minimal_1.default.Reader(data)));
    }
    TransferNFT(request) {
        const data = exports.MsgTransferNFT.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "TransferNFT", data);
        return promise.then((data) => exports.MsgTransferNFTResponse.decode(new minimal_1.default.Reader(data)));
    }
    SignMetadata(request) {
        const data = exports.MsgSignMetadata.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "SignMetadata", data);
        return promise.then((data) => exports.MsgSignMetadataResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpdateMetadata(request) {
        const data = exports.MsgUpdateMetadata.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "UpdateMetadata", data);
        return promise.then((data) => exports.MsgUpdateMetadataResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpdateMetadataAuthority(request) {
        const data = exports.MsgUpdateMetadataAuthority.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "UpdateMetadataAuthority", data);
        return promise.then((data) => exports.MsgUpdateMetadataAuthorityResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpdateMintAuthority(request) {
        const data = exports.MsgUpdateMintAuthority.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "UpdateMintAuthority", data);
        return promise.then((data) => exports.MsgUpdateMintAuthorityResponse.decode(new minimal_1.default.Reader(data)));
    }
    CreateCollection(request) {
        const data = exports.MsgCreateCollection.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "CreateCollection", data);
        return promise.then((data) => exports.MsgCreateCollectionResponse.decode(new minimal_1.default.Reader(data)));
    }
    UpdateCollectionAuthority(request) {
        const data = exports.MsgUpdateCollectionAuthority.encode(request).finish();
        const promise = this.rpc.request("bluzelle.curium.nft.Msg", "UpdateCollectionAuthority", data);
        return promise.then((data) => exports.MsgUpdateCollectionAuthorityResponse.decode(new minimal_1.default.Reader(data)));
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