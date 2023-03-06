"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenesisState = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "bluzelle.curium.tax";
function createBaseGenesisState() {
    return { gasTaxBp: long_1.default.ZERO, transferTaxBp: long_1.default.ZERO, taxCollector: "" };
}
exports.GenesisState = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.gasTaxBp.isZero()) {
            writer.uint32(8).int64(message.gasTaxBp);
        }
        if (!message.transferTaxBp.isZero()) {
            writer.uint32(16).int64(message.transferTaxBp);
        }
        if (message.taxCollector !== "") {
            writer.uint32(26).string(message.taxCollector);
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
                    message.gasTaxBp = reader.int64();
                    break;
                case 2:
                    message.transferTaxBp = reader.int64();
                    break;
                case 3:
                    message.taxCollector = reader.string();
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
            gasTaxBp: isSet(object.gasTaxBp)
                ? long_1.default.fromValue(object.gasTaxBp)
                : long_1.default.ZERO,
            transferTaxBp: isSet(object.transferTaxBp)
                ? long_1.default.fromValue(object.transferTaxBp)
                : long_1.default.ZERO,
            taxCollector: isSet(object.taxCollector)
                ? String(object.taxCollector)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.gasTaxBp !== undefined &&
            (obj.gasTaxBp = (message.gasTaxBp || long_1.default.ZERO).toString());
        message.transferTaxBp !== undefined &&
            (obj.transferTaxBp = (message.transferTaxBp || long_1.default.ZERO).toString());
        message.taxCollector !== undefined &&
            (obj.taxCollector = message.taxCollector);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseGenesisState();
        message.gasTaxBp =
            object.gasTaxBp !== undefined && object.gasTaxBp !== null
                ? long_1.default.fromValue(object.gasTaxBp)
                : long_1.default.ZERO;
        message.transferTaxBp =
            object.transferTaxBp !== undefined && object.transferTaxBp !== null
                ? long_1.default.fromValue(object.transferTaxBp)
                : long_1.default.ZERO;
        message.taxCollector = (_a = object.taxCollector) !== null && _a !== void 0 ? _a : "";
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