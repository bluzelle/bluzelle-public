"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Equivocation = exports.protobufPackage = void 0;
/* eslint-disable */
const timestamp_1 = require("../../../google/protobuf/timestamp");
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "cosmos.evidence.v1beta1";
function createBaseEquivocation() {
    return {
        height: long_1.default.ZERO,
        time: undefined,
        power: long_1.default.ZERO,
        consensusAddress: "",
    };
}
exports.Equivocation = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (!message.height.isZero()) {
            writer.uint32(8).int64(message.height);
        }
        if (message.time !== undefined) {
            timestamp_1.Timestamp.encode(toTimestamp(message.time), writer.uint32(18).fork()).ldelim();
        }
        if (!message.power.isZero()) {
            writer.uint32(24).int64(message.power);
        }
        if (message.consensusAddress !== "") {
            writer.uint32(34).string(message.consensusAddress);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseEquivocation();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.height = reader.int64();
                    break;
                case 2:
                    message.time = fromTimestamp(timestamp_1.Timestamp.decode(reader, reader.uint32()));
                    break;
                case 3:
                    message.power = reader.int64();
                    break;
                case 4:
                    message.consensusAddress = reader.string();
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
            height: isSet(object.height) ? long_1.default.fromValue(object.height) : long_1.default.ZERO,
            time: isSet(object.time) ? fromJsonTimestamp(object.time) : undefined,
            power: isSet(object.power) ? long_1.default.fromValue(object.power) : long_1.default.ZERO,
            consensusAddress: isSet(object.consensusAddress)
                ? String(object.consensusAddress)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.height !== undefined &&
            (obj.height = (message.height || long_1.default.ZERO).toString());
        message.time !== undefined && (obj.time = message.time.toISOString());
        message.power !== undefined &&
            (obj.power = (message.power || long_1.default.ZERO).toString());
        message.consensusAddress !== undefined &&
            (obj.consensusAddress = message.consensusAddress);
        return obj;
    },
    fromPartial(object) {
        var _a, _b;
        const message = createBaseEquivocation();
        message.height =
            object.height !== undefined && object.height !== null
                ? long_1.default.fromValue(object.height)
                : long_1.default.ZERO;
        message.time = (_a = object.time) !== null && _a !== void 0 ? _a : undefined;
        message.power =
            object.power !== undefined && object.power !== null
                ? long_1.default.fromValue(object.power)
                : long_1.default.ZERO;
        message.consensusAddress = (_b = object.consensusAddress) !== null && _b !== void 0 ? _b : "";
        return message;
    },
};
function toTimestamp(date) {
    const seconds = numberToLong(date.getTime() / 1000);
    const nanos = (date.getTime() % 1000) * 1000000;
    return { seconds, nanos };
}
function fromTimestamp(t) {
    let millis = t.seconds.toNumber() * 1000;
    millis += t.nanos / 1000000;
    return new Date(millis);
}
function fromJsonTimestamp(o) {
    if (o instanceof Date) {
        return o;
    }
    else if (typeof o === "string") {
        return new Date(o);
    }
    else {
        return fromTimestamp(timestamp_1.Timestamp.fromJSON(o));
    }
}
function numberToLong(number) {
    return long_1.default.fromNumber(number);
}
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=evidence.js.map