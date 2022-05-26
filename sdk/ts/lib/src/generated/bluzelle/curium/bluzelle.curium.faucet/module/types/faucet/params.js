"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Params = exports.protobufPackage = void 0;
/* eslint-disable */
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "bluzelle.curium.faucet";
const baseParams = { testnet: "" };
exports.Params = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.testnet !== "") {
            writer.uint32(10).string(message.testnet);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseParams);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.testnet = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseParams);
        if (object.testnet !== undefined && object.testnet !== null) {
            message.testnet = String(object.testnet);
        }
        else {
            message.testnet = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.testnet !== undefined && (obj.testnet = message.testnet);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseParams);
        if (object.testnet !== undefined && object.testnet !== null) {
            message.testnet = object.testnet;
        }
        else {
            message.testnet = "";
        }
        return message;
    },
};
//# sourceMappingURL=params.js.map