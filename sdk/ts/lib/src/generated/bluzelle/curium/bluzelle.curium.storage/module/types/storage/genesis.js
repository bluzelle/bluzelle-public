"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const tx_1 = require("../storage/tx");
const minimal_1 = require("protobufjs/minimal");
exports.protobufPackage = "bluzelle.curium.storage";
const baseGenesisState = {};
exports.GenesisState = {
    encode(message, writer = minimal_1.Writer.create()) {
        for (const v of message.pins) {
            tx_1.MsgPin.encode(v, writer.uint32(10).fork()).ldelim();
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseGenesisState);
        message.pins = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.pins.push(tx_1.MsgPin.decode(reader, reader.uint32()));
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseGenesisState);
        message.pins = [];
        if (object.pins !== undefined && object.pins !== null) {
            for (const e of object.pins) {
                message.pins.push(tx_1.MsgPin.fromJSON(e));
            }
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        if (message.pins) {
            obj.pins = message.pins.map((e) => (e ? tx_1.MsgPin.toJSON(e) : undefined));
        }
        else {
            obj.pins = [];
        }
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseGenesisState);
        message.pins = [];
        if (object.pins !== undefined && object.pins !== null) {
            for (const e of object.pins) {
                message.pins.push(tx_1.MsgPin.fromPartial(e));
            }
        }
        return message;
    },
};
//# sourceMappingURL=genesis.js.map