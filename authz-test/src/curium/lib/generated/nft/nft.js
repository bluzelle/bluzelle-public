"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventUpdateCollectionAuthority = exports.EventCollectionUnverification = exports.EventCollectionVerification = exports.EventCollectionCreation = exports.EventMintAuthorityUpdate = exports.EventMetadataAuthorityUpdate = exports.EventMetadataUpdate = exports.EventMetadataSign = exports.EventNFTTransfer = exports.EventPrintEdition = exports.EventNFTCreation = exports.EventMetadataCreation = exports.Params = exports.NFT = exports.Creator = exports.Collection = exports.Metadata = exports.MasterEdition = exports.protobufPackage = void 0;
/* eslint-disable */
const coin_1 = require("../cosmos/base/v1beta1/coin");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.nft";
function createBaseMasterEdition() {
    return { supply: long_1.default.UZERO, maxSupply: long_1.default.UZERO };
}
exports.MasterEdition = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.supply.isZero()) {
            writer.uint32(8).uint64(message.supply);
        }
        if (!message.maxSupply.isZero()) {
            writer.uint32(16).uint64(message.maxSupply);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMasterEdition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.supply = reader.uint64();
                    break;
                case 2:
                    message.maxSupply = reader.uint64();
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
            supply: isSet(object.supply) ? long_1.default.fromValue(object.supply) : long_1.default.UZERO,
            maxSupply: isSet(object.maxSupply)
                ? long_1.default.fromValue(object.maxSupply)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.supply !== undefined &&
            (obj.supply = (message.supply || long_1.default.UZERO).toString());
        message.maxSupply !== undefined &&
            (obj.maxSupply = (message.maxSupply || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        const message = createBaseMasterEdition();
        message.supply =
            object.supply !== undefined && object.supply !== null
                ? long_1.default.fromValue(object.supply)
                : long_1.default.UZERO;
        message.maxSupply =
            object.maxSupply !== undefined && object.maxSupply !== null
                ? long_1.default.fromValue(object.maxSupply)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseMetadata() {
    return {
        id: long_1.default.UZERO,
        name: "",
        uri: "",
        sellerFeeBasisPoints: 0,
        primarySaleHappened: false,
        isMutable: false,
        creators: [],
        metadataAuthority: "",
        mintAuthority: "",
        masterEdition: undefined,
    };
}
exports.Metadata = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
        }
        if (message.name !== "") {
            writer.uint32(18).string(message.name);
        }
        if (message.uri !== "") {
            writer.uint32(26).string(message.uri);
        }
        if (message.sellerFeeBasisPoints !== 0) {
            writer.uint32(32).uint32(message.sellerFeeBasisPoints);
        }
        if (message.primarySaleHappened === true) {
            writer.uint32(40).bool(message.primarySaleHappened);
        }
        if (message.isMutable === true) {
            writer.uint32(48).bool(message.isMutable);
        }
        for (const v of message.creators) {
            exports.Creator.encode(v, writer.uint32(58).fork()).ldelim();
        }
        if (message.metadataAuthority !== "") {
            writer.uint32(66).string(message.metadataAuthority);
        }
        if (message.mintAuthority !== "") {
            writer.uint32(74).string(message.mintAuthority);
        }
        if (message.masterEdition !== undefined) {
            exports.MasterEdition.encode(message.masterEdition, writer.uint32(82).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseMetadata();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
                    break;
                case 2:
                    message.name = reader.string();
                    break;
                case 3:
                    message.uri = reader.string();
                    break;
                case 4:
                    message.sellerFeeBasisPoints = reader.uint32();
                    break;
                case 5:
                    message.primarySaleHappened = reader.bool();
                    break;
                case 6:
                    message.isMutable = reader.bool();
                    break;
                case 7:
                    message.creators.push(exports.Creator.decode(reader, reader.uint32()));
                    break;
                case 8:
                    message.metadataAuthority = reader.string();
                    break;
                case 9:
                    message.mintAuthority = reader.string();
                    break;
                case 10:
                    message.masterEdition = exports.MasterEdition.decode(reader, reader.uint32());
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
            name: isSet(object.name) ? String(object.name) : "",
            uri: isSet(object.uri) ? String(object.uri) : "",
            sellerFeeBasisPoints: isSet(object.sellerFeeBasisPoints)
                ? Number(object.sellerFeeBasisPoints)
                : 0,
            primarySaleHappened: isSet(object.primarySaleHappened)
                ? Boolean(object.primarySaleHappened)
                : false,
            isMutable: isSet(object.isMutable) ? Boolean(object.isMutable) : false,
            creators: Array.isArray(object === null || object === void 0 ? void 0 : object.creators)
                ? object.creators.map((e) => exports.Creator.fromJSON(e))
                : [],
            metadataAuthority: isSet(object.metadataAuthority)
                ? String(object.metadataAuthority)
                : "",
            mintAuthority: isSet(object.mintAuthority)
                ? String(object.mintAuthority)
                : "",
            masterEdition: isSet(object.masterEdition)
                ? exports.MasterEdition.fromJSON(object.masterEdition)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.id !== undefined &&
            (obj.id = (message.id || long_1.default.UZERO).toString());
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.sellerFeeBasisPoints !== undefined &&
            (obj.sellerFeeBasisPoints = Math.round(message.sellerFeeBasisPoints));
        message.primarySaleHappened !== undefined &&
            (obj.primarySaleHappened = message.primarySaleHappened);
        message.isMutable !== undefined && (obj.isMutable = message.isMutable);
        if (message.creators) {
            obj.creators = message.creators.map((e) => e ? exports.Creator.toJSON(e) : undefined);
        }
        else {
            obj.creators = [];
        }
        message.metadataAuthority !== undefined &&
            (obj.metadataAuthority = message.metadataAuthority);
        message.mintAuthority !== undefined &&
            (obj.mintAuthority = message.mintAuthority);
        message.masterEdition !== undefined &&
            (obj.masterEdition = message.masterEdition
                ? exports.MasterEdition.toJSON(message.masterEdition)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const message = createBaseMetadata();
        message.id =
            object.id !== undefined && object.id !== null
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        message.name = (_a = object.name) !== null && _a !== void 0 ? _a : "";
        message.uri = (_b = object.uri) !== null && _b !== void 0 ? _b : "";
        message.sellerFeeBasisPoints = (_c = object.sellerFeeBasisPoints) !== null && _c !== void 0 ? _c : 0;
        message.primarySaleHappened = (_d = object.primarySaleHappened) !== null && _d !== void 0 ? _d : false;
        message.isMutable = (_e = object.isMutable) !== null && _e !== void 0 ? _e : false;
        message.creators =
            ((_f = object.creators) === null || _f === void 0 ? void 0 : _f.map((e) => exports.Creator.fromPartial(e))) || [];
        message.metadataAuthority = (_g = object.metadataAuthority) !== null && _g !== void 0 ? _g : "";
        message.mintAuthority = (_h = object.mintAuthority) !== null && _h !== void 0 ? _h : "";
        message.masterEdition =
            object.masterEdition !== undefined && object.masterEdition !== null
                ? exports.MasterEdition.fromPartial(object.masterEdition)
                : undefined;
        return message;
    },
};
function createBaseCollection() {
    return {
        id: long_1.default.UZERO,
        symbol: "",
        name: "",
        uri: "",
        isMutable: false,
        updateAuthority: "",
    };
}
exports.Collection = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.id.isZero()) {
            writer.uint32(8).uint64(message.id);
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
        const message = createBaseCollection();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.id = reader.uint64();
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
            id: isSet(object.id) ? long_1.default.fromValue(object.id) : long_1.default.UZERO,
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
        message.id !== undefined &&
            (obj.id = (message.id || long_1.default.UZERO).toString());
        message.symbol !== undefined && (obj.symbol = message.symbol);
        message.name !== undefined && (obj.name = message.name);
        message.uri !== undefined && (obj.uri = message.uri);
        message.isMutable !== undefined && (obj.isMutable = message.isMutable);
        message.updateAuthority !== undefined &&
            (obj.updateAuthority = message.updateAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c, _d, _e;
        const message = createBaseCollection();
        message.id =
            object.id !== undefined && object.id !== null
                ? long_1.default.fromValue(object.id)
                : long_1.default.UZERO;
        message.symbol = (_a = object.symbol) !== null && _a !== void 0 ? _a : "";
        message.name = (_b = object.name) !== null && _b !== void 0 ? _b : "";
        message.uri = (_c = object.uri) !== null && _c !== void 0 ? _c : "";
        message.isMutable = (_d = object.isMutable) !== null && _d !== void 0 ? _d : false;
        message.updateAuthority = (_e = object.updateAuthority) !== null && _e !== void 0 ? _e : "";
        return message;
    },
};
function createBaseCreator() {
    return { address: "", verified: false, share: 0 };
}
exports.Creator = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.address !== "") {
            writer.uint32(10).string(message.address);
        }
        if (message.verified === true) {
            writer.uint32(16).bool(message.verified);
        }
        if (message.share !== 0) {
            writer.uint32(24).uint32(message.share);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseCreator();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.address = reader.string();
                    break;
                case 2:
                    message.verified = reader.bool();
                    break;
                case 3:
                    message.share = reader.uint32();
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
            address: isSet(object.address) ? String(object.address) : "",
            verified: isSet(object.verified) ? Boolean(object.verified) : false,
            share: isSet(object.share) ? Number(object.share) : 0,
        };
    },
    toJSON(message) {
        const obj = {};
        message.address !== undefined && (obj.address = message.address);
        message.verified !== undefined && (obj.verified = message.verified);
        message.share !== undefined && (obj.share = Math.round(message.share));
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseCreator();
        message.address = (_a = object.address) !== null && _a !== void 0 ? _a : "";
        message.verified = (_b = object.verified) !== null && _b !== void 0 ? _b : false;
        message.share = (_c = object.share) !== null && _c !== void 0 ? _c : 0;
        return message;
    },
};
function createBaseNFT() {
    return {
        collId: long_1.default.UZERO,
        metadataId: long_1.default.UZERO,
        seq: long_1.default.UZERO,
        owner: "",
    };
}
exports.NFT = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.collId.isZero()) {
            writer.uint32(8).uint64(message.collId);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        if (!message.seq.isZero()) {
            writer.uint32(24).uint64(message.seq);
        }
        if (message.owner !== "") {
            writer.uint32(34).string(message.owner);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseNFT();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collId = reader.uint64();
                    break;
                case 2:
                    message.metadataId = reader.uint64();
                    break;
                case 3:
                    message.seq = reader.uint64();
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
            collId: isSet(object.collId) ? long_1.default.fromValue(object.collId) : long_1.default.UZERO,
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
            seq: isSet(object.seq) ? long_1.default.fromValue(object.seq) : long_1.default.UZERO,
            owner: isSet(object.owner) ? String(object.owner) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.collId !== undefined &&
            (obj.collId = (message.collId || long_1.default.UZERO).toString());
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        message.seq !== undefined &&
            (obj.seq = (message.seq || long_1.default.UZERO).toString());
        message.owner !== undefined && (obj.owner = message.owner);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseNFT();
        message.collId =
            object.collId !== undefined && object.collId !== null
                ? long_1.default.fromValue(object.collId)
                : long_1.default.UZERO;
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        message.seq =
            object.seq !== undefined && object.seq !== null
                ? long_1.default.fromValue(object.seq)
                : long_1.default.UZERO;
        message.owner = (_a = object.owner) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseParams() {
    return { issuePrice: undefined };
}
exports.Params = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.issuePrice !== undefined) {
            coin_1.Coin.encode(message.issuePrice, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseParams();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.issuePrice = coin_1.Coin.decode(reader, reader.uint32());
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
            issuePrice: isSet(object.issuePrice)
                ? coin_1.Coin.fromJSON(object.issuePrice)
                : undefined,
        };
    },
    toJSON(message) {
        const obj = {};
        message.issuePrice !== undefined &&
            (obj.issuePrice = message.issuePrice
                ? coin_1.Coin.toJSON(message.issuePrice)
                : undefined);
        return obj;
    },
    fromPartial(object) {
        const message = createBaseParams();
        message.issuePrice =
            object.issuePrice !== undefined && object.issuePrice !== null
                ? coin_1.Coin.fromPartial(object.issuePrice)
                : undefined;
        return message;
    },
};
function createBaseEventMetadataCreation() {
    return { creator: "", metadataId: long_1.default.UZERO };
}
exports.EventMetadataCreation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventMetadataCreation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
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
            creator: isSet(object.creator) ? String(object.creator) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventMetadataCreation();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseEventNFTCreation() {
    return { creator: "", nftId: "" };
}
exports.EventNFTCreation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (message.nftId !== "") {
            writer.uint32(18).string(message.nftId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventNFTCreation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.nftId = reader.string();
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
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.nftId !== undefined && (obj.nftId = message.nftId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventNFTCreation();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.nftId = (_b = object.nftId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventPrintEdition() {
    return { metadataId: "", edition: long_1.default.UZERO };
}
exports.EventPrintEdition = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.metadataId !== "") {
            writer.uint32(10).string(message.metadataId);
        }
        if (!message.edition.isZero()) {
            writer.uint32(16).uint64(message.edition);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventPrintEdition();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadataId = reader.string();
                    break;
                case 2:
                    message.edition = reader.uint64();
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
            metadataId: isSet(object.metadataId) ? String(object.metadataId) : "",
            edition: isSet(object.edition)
                ? long_1.default.fromValue(object.edition)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.metadataId !== undefined && (obj.metadataId = message.metadataId);
        message.edition !== undefined &&
            (obj.edition = (message.edition || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventPrintEdition();
        message.metadataId = (_a = object.metadataId) !== null && _a !== void 0 ? _a : "";
        message.edition =
            object.edition !== undefined && object.edition !== null
                ? long_1.default.fromValue(object.edition)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseEventNFTTransfer() {
    return { nftId: "", sender: "", receiver: "" };
}
exports.EventNFTTransfer = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.nftId !== "") {
            writer.uint32(10).string(message.nftId);
        }
        if (message.sender !== "") {
            writer.uint32(18).string(message.sender);
        }
        if (message.receiver !== "") {
            writer.uint32(26).string(message.receiver);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventNFTTransfer();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.nftId = reader.string();
                    break;
                case 2:
                    message.sender = reader.string();
                    break;
                case 3:
                    message.receiver = reader.string();
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
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
            sender: isSet(object.sender) ? String(object.sender) : "",
            receiver: isSet(object.receiver) ? String(object.receiver) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.nftId !== undefined && (obj.nftId = message.nftId);
        message.sender !== undefined && (obj.sender = message.sender);
        message.receiver !== undefined && (obj.receiver = message.receiver);
        return obj;
    },
    fromPartial(object) {
        var _a, _b, _c;
        const message = createBaseEventNFTTransfer();
        message.nftId = (_a = object.nftId) !== null && _a !== void 0 ? _a : "";
        message.sender = (_b = object.sender) !== null && _b !== void 0 ? _b : "";
        message.receiver = (_c = object.receiver) !== null && _c !== void 0 ? _c : "";
        return message;
    },
};
function createBaseEventMetadataSign() {
    return { signer: "", metadataId: long_1.default.UZERO };
}
exports.EventMetadataSign = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.signer !== "") {
            writer.uint32(10).string(message.signer);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventMetadataSign();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.signer = reader.string();
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
            signer: isSet(object.signer) ? String(object.signer) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.signer !== undefined && (obj.signer = message.signer);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventMetadataSign();
        message.signer = (_a = object.signer) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseEventMetadataUpdate() {
    return { updater: "", metadataId: long_1.default.UZERO };
}
exports.EventMetadataUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.updater !== "") {
            writer.uint32(10).string(message.updater);
        }
        if (!message.metadataId.isZero()) {
            writer.uint32(16).uint64(message.metadataId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventMetadataUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.updater = reader.string();
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
            updater: isSet(object.updater) ? String(object.updater) : "",
            metadataId: isSet(object.metadataId)
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.updater !== undefined && (obj.updater = message.updater);
        message.metadataId !== undefined &&
            (obj.metadataId = (message.metadataId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventMetadataUpdate();
        message.updater = (_a = object.updater) !== null && _a !== void 0 ? _a : "";
        message.metadataId =
            object.metadataId !== undefined && object.metadataId !== null
                ? long_1.default.fromValue(object.metadataId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseEventMetadataAuthorityUpdate() {
    return { metadataId: "", newAuthority: "" };
}
exports.EventMetadataAuthorityUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.metadataId !== "") {
            writer.uint32(10).string(message.metadataId);
        }
        if (message.newAuthority !== "") {
            writer.uint32(18).string(message.newAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventMetadataAuthorityUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadataId = reader.string();
                    break;
                case 2:
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
            metadataId: isSet(object.metadataId) ? String(object.metadataId) : "",
            newAuthority: isSet(object.newAuthority)
                ? String(object.newAuthority)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.metadataId !== undefined && (obj.metadataId = message.metadataId);
        message.newAuthority !== undefined &&
            (obj.newAuthority = message.newAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventMetadataAuthorityUpdate();
        message.metadataId = (_a = object.metadataId) !== null && _a !== void 0 ? _a : "";
        message.newAuthority = (_b = object.newAuthority) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventMintAuthorityUpdate() {
    return { metadataId: "", newAuthority: "" };
}
exports.EventMintAuthorityUpdate = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.metadataId !== "") {
            writer.uint32(10).string(message.metadataId);
        }
        if (message.newAuthority !== "") {
            writer.uint32(18).string(message.newAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventMintAuthorityUpdate();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.metadataId = reader.string();
                    break;
                case 2:
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
            metadataId: isSet(object.metadataId) ? String(object.metadataId) : "",
            newAuthority: isSet(object.newAuthority)
                ? String(object.newAuthority)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.metadataId !== undefined && (obj.metadataId = message.metadataId);
        message.newAuthority !== undefined &&
            (obj.newAuthority = message.newAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventMintAuthorityUpdate();
        message.metadataId = (_a = object.metadataId) !== null && _a !== void 0 ? _a : "";
        message.newAuthority = (_b = object.newAuthority) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventCollectionCreation() {
    return { creator: "", collectionId: long_1.default.UZERO };
}
exports.EventCollectionCreation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.creator !== "") {
            writer.uint32(10).string(message.creator);
        }
        if (!message.collectionId.isZero()) {
            writer.uint32(16).uint64(message.collectionId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCollectionCreation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.creator = reader.string();
                    break;
                case 2:
                    message.collectionId = reader.uint64();
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
            collectionId: isSet(object.collectionId)
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO,
        };
    },
    toJSON(message) {
        const obj = {};
        message.creator !== undefined && (obj.creator = message.creator);
        message.collectionId !== undefined &&
            (obj.collectionId = (message.collectionId || long_1.default.UZERO).toString());
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventCollectionCreation();
        message.creator = (_a = object.creator) !== null && _a !== void 0 ? _a : "";
        message.collectionId =
            object.collectionId !== undefined && object.collectionId !== null
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO;
        return message;
    },
};
function createBaseEventCollectionVerification() {
    return { verifier: "", collectionId: long_1.default.UZERO, nftId: "" };
}
exports.EventCollectionVerification = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.verifier !== "") {
            writer.uint32(10).string(message.verifier);
        }
        if (!message.collectionId.isZero()) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.nftId !== "") {
            writer.uint32(26).string(message.nftId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCollectionVerification();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.verifier = reader.string();
                    break;
                case 2:
                    message.collectionId = reader.uint64();
                    break;
                case 3:
                    message.nftId = reader.string();
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
            verifier: isSet(object.verifier) ? String(object.verifier) : "",
            collectionId: isSet(object.collectionId)
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO,
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.verifier !== undefined && (obj.verifier = message.verifier);
        message.collectionId !== undefined &&
            (obj.collectionId = (message.collectionId || long_1.default.UZERO).toString());
        message.nftId !== undefined && (obj.nftId = message.nftId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventCollectionVerification();
        message.verifier = (_a = object.verifier) !== null && _a !== void 0 ? _a : "";
        message.collectionId =
            object.collectionId !== undefined && object.collectionId !== null
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO;
        message.nftId = (_b = object.nftId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventCollectionUnverification() {
    return { verifier: "", collectionId: long_1.default.UZERO, nftId: "" };
}
exports.EventCollectionUnverification = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.verifier !== "") {
            writer.uint32(10).string(message.verifier);
        }
        if (!message.collectionId.isZero()) {
            writer.uint32(16).uint64(message.collectionId);
        }
        if (message.nftId !== "") {
            writer.uint32(26).string(message.nftId);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventCollectionUnverification();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.verifier = reader.string();
                    break;
                case 2:
                    message.collectionId = reader.uint64();
                    break;
                case 3:
                    message.nftId = reader.string();
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
            verifier: isSet(object.verifier) ? String(object.verifier) : "",
            collectionId: isSet(object.collectionId)
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO,
            nftId: isSet(object.nftId) ? String(object.nftId) : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.verifier !== undefined && (obj.verifier = message.verifier);
        message.collectionId !== undefined &&
            (obj.collectionId = (message.collectionId || long_1.default.UZERO).toString());
        message.nftId !== undefined && (obj.nftId = message.nftId);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEventCollectionUnverification();
        message.verifier = (_a = object.verifier) !== null && _a !== void 0 ? _a : "";
        message.collectionId =
            object.collectionId !== undefined && object.collectionId !== null
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO;
        message.nftId = (_b = object.nftId) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function createBaseEventUpdateCollectionAuthority() {
    return { collectionId: long_1.default.UZERO, newAuthority: "" };
}
exports.EventUpdateCollectionAuthority = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.collectionId.isZero()) {
            writer.uint32(8).uint64(message.collectionId);
        }
        if (message.newAuthority !== "") {
            writer.uint32(18).string(message.newAuthority);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEventUpdateCollectionAuthority();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.collectionId = reader.uint64();
                    break;
                case 2:
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
        message.collectionId !== undefined &&
            (obj.collectionId = (message.collectionId || long_1.default.UZERO).toString());
        message.newAuthority !== undefined &&
            (obj.newAuthority = message.newAuthority);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseEventUpdateCollectionAuthority();
        message.collectionId =
            object.collectionId !== undefined && object.collectionId !== null
                ? long_1.default.fromValue(object.collectionId)
                : long_1.default.UZERO;
        message.newAuthority = (_a = object.newAuthority) !== null && _a !== void 0 ? _a : "";
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
//# sourceMappingURL=nft.js.map