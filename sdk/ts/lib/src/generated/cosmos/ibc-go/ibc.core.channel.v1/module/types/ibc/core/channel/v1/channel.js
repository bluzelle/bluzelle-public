"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acknowledgement = exports.PacketState = exports.Packet = exports.Counterparty = exports.IdentifiedChannel = exports.Channel = exports.orderToJSON = exports.orderFromJSON = exports.Order = exports.stateToJSON = exports.stateFromJSON = exports.State = exports.protobufPackage = void 0;
/* eslint-disable */
const Long = require("long");
const minimal_1 = require("protobufjs/minimal");
const client_1 = require("../../../../ibc/core/client/v1/client");
exports.protobufPackage = "ibc.core.channel.v1";
/**
 * State defines if a channel is in one of the following states:
 * CLOSED, INIT, TRYOPEN, OPEN or UNINITIALIZED.
 */
var State;
(function (State) {
    /** STATE_UNINITIALIZED_UNSPECIFIED - Default State */
    State[State["STATE_UNINITIALIZED_UNSPECIFIED"] = 0] = "STATE_UNINITIALIZED_UNSPECIFIED";
    /** STATE_INIT - A channel has just started the opening handshake. */
    State[State["STATE_INIT"] = 1] = "STATE_INIT";
    /** STATE_TRYOPEN - A channel has acknowledged the handshake step on the counterparty chain. */
    State[State["STATE_TRYOPEN"] = 2] = "STATE_TRYOPEN";
    /**
     * STATE_OPEN - A channel has completed the handshake. Open channels are
     * ready to send and receive packets.
     */
    State[State["STATE_OPEN"] = 3] = "STATE_OPEN";
    /**
     * STATE_CLOSED - A channel has been closed and can no longer be used to send or receive
     * packets.
     */
    State[State["STATE_CLOSED"] = 4] = "STATE_CLOSED";
    State[State["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(State = exports.State || (exports.State = {}));
function stateFromJSON(object) {
    switch (object) {
        case 0:
        case "STATE_UNINITIALIZED_UNSPECIFIED":
            return State.STATE_UNINITIALIZED_UNSPECIFIED;
        case 1:
        case "STATE_INIT":
            return State.STATE_INIT;
        case 2:
        case "STATE_TRYOPEN":
            return State.STATE_TRYOPEN;
        case 3:
        case "STATE_OPEN":
            return State.STATE_OPEN;
        case 4:
        case "STATE_CLOSED":
            return State.STATE_CLOSED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return State.UNRECOGNIZED;
    }
}
exports.stateFromJSON = stateFromJSON;
function stateToJSON(object) {
    switch (object) {
        case State.STATE_UNINITIALIZED_UNSPECIFIED:
            return "STATE_UNINITIALIZED_UNSPECIFIED";
        case State.STATE_INIT:
            return "STATE_INIT";
        case State.STATE_TRYOPEN:
            return "STATE_TRYOPEN";
        case State.STATE_OPEN:
            return "STATE_OPEN";
        case State.STATE_CLOSED:
            return "STATE_CLOSED";
        default:
            return "UNKNOWN";
    }
}
exports.stateToJSON = stateToJSON;
/** Order defines if a channel is ORDERED or UNORDERED */
var Order;
(function (Order) {
    /** ORDER_NONE_UNSPECIFIED - zero-value for channel ordering */
    Order[Order["ORDER_NONE_UNSPECIFIED"] = 0] = "ORDER_NONE_UNSPECIFIED";
    /**
     * ORDER_UNORDERED - packets can be delivered in any order, which may differ from the order in
     * which they were sent.
     */
    Order[Order["ORDER_UNORDERED"] = 1] = "ORDER_UNORDERED";
    /** ORDER_ORDERED - packets are delivered exactly in the order which they were sent */
    Order[Order["ORDER_ORDERED"] = 2] = "ORDER_ORDERED";
    Order[Order["UNRECOGNIZED"] = -1] = "UNRECOGNIZED";
})(Order = exports.Order || (exports.Order = {}));
function orderFromJSON(object) {
    switch (object) {
        case 0:
        case "ORDER_NONE_UNSPECIFIED":
            return Order.ORDER_NONE_UNSPECIFIED;
        case 1:
        case "ORDER_UNORDERED":
            return Order.ORDER_UNORDERED;
        case 2:
        case "ORDER_ORDERED":
            return Order.ORDER_ORDERED;
        case -1:
        case "UNRECOGNIZED":
        default:
            return Order.UNRECOGNIZED;
    }
}
exports.orderFromJSON = orderFromJSON;
function orderToJSON(object) {
    switch (object) {
        case Order.ORDER_NONE_UNSPECIFIED:
            return "ORDER_NONE_UNSPECIFIED";
        case Order.ORDER_UNORDERED:
            return "ORDER_UNORDERED";
        case Order.ORDER_ORDERED:
            return "ORDER_ORDERED";
        default:
            return "UNKNOWN";
    }
}
exports.orderToJSON = orderToJSON;
const baseChannel = {
    state: 0,
    ordering: 0,
    connection_hops: "",
    version: "",
};
exports.Channel = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
        }
        if (message.counterparty !== undefined) {
            exports.Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.connection_hops) {
            writer.uint32(34).string(v);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseChannel);
        message.connection_hops = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                case 2:
                    message.ordering = reader.int32();
                    break;
                case 3:
                    message.counterparty = exports.Counterparty.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.connection_hops.push(reader.string());
                    break;
                case 5:
                    message.version = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseChannel);
        message.connection_hops = [];
        if (object.state !== undefined && object.state !== null) {
            message.state = stateFromJSON(object.state);
        }
        else {
            message.state = 0;
        }
        if (object.ordering !== undefined && object.ordering !== null) {
            message.ordering = orderFromJSON(object.ordering);
        }
        else {
            message.ordering = 0;
        }
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromJSON(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        if (object.connection_hops !== undefined &&
            object.connection_hops !== null) {
            for (const e of object.connection_hops) {
                message.connection_hops.push(String(e));
            }
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = String(object.version);
        }
        else {
            message.version = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.state !== undefined && (obj.state = stateToJSON(message.state));
        message.ordering !== undefined &&
            (obj.ordering = orderToJSON(message.ordering));
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty
                ? exports.Counterparty.toJSON(message.counterparty)
                : undefined);
        if (message.connection_hops) {
            obj.connection_hops = message.connection_hops.map((e) => e);
        }
        else {
            obj.connection_hops = [];
        }
        message.version !== undefined && (obj.version = message.version);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseChannel);
        message.connection_hops = [];
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = 0;
        }
        if (object.ordering !== undefined && object.ordering !== null) {
            message.ordering = object.ordering;
        }
        else {
            message.ordering = 0;
        }
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromPartial(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        if (object.connection_hops !== undefined &&
            object.connection_hops !== null) {
            for (const e of object.connection_hops) {
                message.connection_hops.push(e);
            }
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        else {
            message.version = "";
        }
        return message;
    },
};
const baseIdentifiedChannel = {
    state: 0,
    ordering: 0,
    connection_hops: "",
    version: "",
    port_id: "",
    channel_id: "",
};
exports.IdentifiedChannel = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.state !== 0) {
            writer.uint32(8).int32(message.state);
        }
        if (message.ordering !== 0) {
            writer.uint32(16).int32(message.ordering);
        }
        if (message.counterparty !== undefined) {
            exports.Counterparty.encode(message.counterparty, writer.uint32(26).fork()).ldelim();
        }
        for (const v of message.connection_hops) {
            writer.uint32(34).string(v);
        }
        if (message.version !== "") {
            writer.uint32(42).string(message.version);
        }
        if (message.port_id !== "") {
            writer.uint32(50).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(58).string(message.channel_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseIdentifiedChannel);
        message.connection_hops = [];
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.state = reader.int32();
                    break;
                case 2:
                    message.ordering = reader.int32();
                    break;
                case 3:
                    message.counterparty = exports.Counterparty.decode(reader, reader.uint32());
                    break;
                case 4:
                    message.connection_hops.push(reader.string());
                    break;
                case 5:
                    message.version = reader.string();
                    break;
                case 6:
                    message.port_id = reader.string();
                    break;
                case 7:
                    message.channel_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseIdentifiedChannel);
        message.connection_hops = [];
        if (object.state !== undefined && object.state !== null) {
            message.state = stateFromJSON(object.state);
        }
        else {
            message.state = 0;
        }
        if (object.ordering !== undefined && object.ordering !== null) {
            message.ordering = orderFromJSON(object.ordering);
        }
        else {
            message.ordering = 0;
        }
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromJSON(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        if (object.connection_hops !== undefined &&
            object.connection_hops !== null) {
            for (const e of object.connection_hops) {
                message.connection_hops.push(String(e));
            }
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = String(object.version);
        }
        else {
            message.version = "";
        }
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = String(object.port_id);
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = String(object.channel_id);
        }
        else {
            message.channel_id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.state !== undefined && (obj.state = stateToJSON(message.state));
        message.ordering !== undefined &&
            (obj.ordering = orderToJSON(message.ordering));
        message.counterparty !== undefined &&
            (obj.counterparty = message.counterparty
                ? exports.Counterparty.toJSON(message.counterparty)
                : undefined);
        if (message.connection_hops) {
            obj.connection_hops = message.connection_hops.map((e) => e);
        }
        else {
            obj.connection_hops = [];
        }
        message.version !== undefined && (obj.version = message.version);
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseIdentifiedChannel);
        message.connection_hops = [];
        if (object.state !== undefined && object.state !== null) {
            message.state = object.state;
        }
        else {
            message.state = 0;
        }
        if (object.ordering !== undefined && object.ordering !== null) {
            message.ordering = object.ordering;
        }
        else {
            message.ordering = 0;
        }
        if (object.counterparty !== undefined && object.counterparty !== null) {
            message.counterparty = exports.Counterparty.fromPartial(object.counterparty);
        }
        else {
            message.counterparty = undefined;
        }
        if (object.connection_hops !== undefined &&
            object.connection_hops !== null) {
            for (const e of object.connection_hops) {
                message.connection_hops.push(e);
            }
        }
        if (object.version !== undefined && object.version !== null) {
            message.version = object.version;
        }
        else {
            message.version = "";
        }
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = object.port_id;
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = object.channel_id;
        }
        else {
            message.channel_id = "";
        }
        return message;
    },
};
const baseCounterparty = { port_id: "", channel_id: "" };
exports.Counterparty = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseCounterparty);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel_id = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseCounterparty);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = String(object.port_id);
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = String(object.channel_id);
        }
        else {
            message.channel_id = "";
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseCounterparty);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = object.port_id;
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = object.channel_id;
        }
        else {
            message.channel_id = "";
        }
        return message;
    },
};
const basePacket = {
    sequence: 0,
    source_port: "",
    source_channel: "",
    destination_port: "",
    destination_channel: "",
    timeout_timestamp: 0,
};
exports.Packet = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.sequence !== 0) {
            writer.uint32(8).uint64(message.sequence);
        }
        if (message.source_port !== "") {
            writer.uint32(18).string(message.source_port);
        }
        if (message.source_channel !== "") {
            writer.uint32(26).string(message.source_channel);
        }
        if (message.destination_port !== "") {
            writer.uint32(34).string(message.destination_port);
        }
        if (message.destination_channel !== "") {
            writer.uint32(42).string(message.destination_channel);
        }
        if (message.data.length !== 0) {
            writer.uint32(50).bytes(message.data);
        }
        if (message.timeout_height !== undefined) {
            client_1.Height.encode(message.timeout_height, writer.uint32(58).fork()).ldelim();
        }
        if (message.timeout_timestamp !== 0) {
            writer.uint32(64).uint64(message.timeout_timestamp);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, basePacket);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.sequence = longToNumber(reader.uint64());
                    break;
                case 2:
                    message.source_port = reader.string();
                    break;
                case 3:
                    message.source_channel = reader.string();
                    break;
                case 4:
                    message.destination_port = reader.string();
                    break;
                case 5:
                    message.destination_channel = reader.string();
                    break;
                case 6:
                    message.data = reader.bytes();
                    break;
                case 7:
                    message.timeout_height = client_1.Height.decode(reader, reader.uint32());
                    break;
                case 8:
                    message.timeout_timestamp = longToNumber(reader.uint64());
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, basePacket);
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = Number(object.sequence);
        }
        else {
            message.sequence = 0;
        }
        if (object.source_port !== undefined && object.source_port !== null) {
            message.source_port = String(object.source_port);
        }
        else {
            message.source_port = "";
        }
        if (object.source_channel !== undefined && object.source_channel !== null) {
            message.source_channel = String(object.source_channel);
        }
        else {
            message.source_channel = "";
        }
        if (object.destination_port !== undefined &&
            object.destination_port !== null) {
            message.destination_port = String(object.destination_port);
        }
        else {
            message.destination_port = "";
        }
        if (object.destination_channel !== undefined &&
            object.destination_channel !== null) {
            message.destination_channel = String(object.destination_channel);
        }
        else {
            message.destination_channel = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        if (object.timeout_height !== undefined && object.timeout_height !== null) {
            message.timeout_height = client_1.Height.fromJSON(object.timeout_height);
        }
        else {
            message.timeout_height = undefined;
        }
        if (object.timeout_timestamp !== undefined &&
            object.timeout_timestamp !== null) {
            message.timeout_timestamp = Number(object.timeout_timestamp);
        }
        else {
            message.timeout_timestamp = 0;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.sequence !== undefined && (obj.sequence = message.sequence);
        message.source_port !== undefined &&
            (obj.source_port = message.source_port);
        message.source_channel !== undefined &&
            (obj.source_channel = message.source_channel);
        message.destination_port !== undefined &&
            (obj.destination_port = message.destination_port);
        message.destination_channel !== undefined &&
            (obj.destination_channel = message.destination_channel);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        message.timeout_height !== undefined &&
            (obj.timeout_height = message.timeout_height
                ? client_1.Height.toJSON(message.timeout_height)
                : undefined);
        message.timeout_timestamp !== undefined &&
            (obj.timeout_timestamp = message.timeout_timestamp);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, basePacket);
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = 0;
        }
        if (object.source_port !== undefined && object.source_port !== null) {
            message.source_port = object.source_port;
        }
        else {
            message.source_port = "";
        }
        if (object.source_channel !== undefined && object.source_channel !== null) {
            message.source_channel = object.source_channel;
        }
        else {
            message.source_channel = "";
        }
        if (object.destination_port !== undefined &&
            object.destination_port !== null) {
            message.destination_port = object.destination_port;
        }
        else {
            message.destination_port = "";
        }
        if (object.destination_channel !== undefined &&
            object.destination_channel !== null) {
            message.destination_channel = object.destination_channel;
        }
        else {
            message.destination_channel = "";
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        if (object.timeout_height !== undefined && object.timeout_height !== null) {
            message.timeout_height = client_1.Height.fromPartial(object.timeout_height);
        }
        else {
            message.timeout_height = undefined;
        }
        if (object.timeout_timestamp !== undefined &&
            object.timeout_timestamp !== null) {
            message.timeout_timestamp = object.timeout_timestamp;
        }
        else {
            message.timeout_timestamp = 0;
        }
        return message;
    },
};
const basePacketState = { port_id: "", channel_id: "", sequence: 0 };
exports.PacketState = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.port_id !== "") {
            writer.uint32(10).string(message.port_id);
        }
        if (message.channel_id !== "") {
            writer.uint32(18).string(message.channel_id);
        }
        if (message.sequence !== 0) {
            writer.uint32(24).uint64(message.sequence);
        }
        if (message.data.length !== 0) {
            writer.uint32(34).bytes(message.data);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, basePacketState);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.port_id = reader.string();
                    break;
                case 2:
                    message.channel_id = reader.string();
                    break;
                case 3:
                    message.sequence = longToNumber(reader.uint64());
                    break;
                case 4:
                    message.data = reader.bytes();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, basePacketState);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = String(object.port_id);
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = String(object.channel_id);
        }
        else {
            message.channel_id = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = Number(object.sequence);
        }
        else {
            message.sequence = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = bytesFromBase64(object.data);
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.port_id !== undefined && (obj.port_id = message.port_id);
        message.channel_id !== undefined && (obj.channel_id = message.channel_id);
        message.sequence !== undefined && (obj.sequence = message.sequence);
        message.data !== undefined &&
            (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, basePacketState);
        if (object.port_id !== undefined && object.port_id !== null) {
            message.port_id = object.port_id;
        }
        else {
            message.port_id = "";
        }
        if (object.channel_id !== undefined && object.channel_id !== null) {
            message.channel_id = object.channel_id;
        }
        else {
            message.channel_id = "";
        }
        if (object.sequence !== undefined && object.sequence !== null) {
            message.sequence = object.sequence;
        }
        else {
            message.sequence = 0;
        }
        if (object.data !== undefined && object.data !== null) {
            message.data = object.data;
        }
        else {
            message.data = new Uint8Array();
        }
        return message;
    },
};
const baseAcknowledgement = {};
exports.Acknowledgement = {
    encode(message, writer = minimal_1.Writer.create()) {
        if (message.result !== undefined) {
            writer.uint32(170).bytes(message.result);
        }
        if (message.error !== undefined) {
            writer.uint32(178).string(message.error);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof Uint8Array ? new minimal_1.Reader(input) : input;
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = Object.assign({}, baseAcknowledgement);
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 21:
                    message.result = reader.bytes();
                    break;
                case 22:
                    message.error = reader.string();
                    break;
                default:
                    reader.skipType(tag & 7);
                    break;
            }
        }
        return message;
    },
    fromJSON(object) {
        const message = Object.assign({}, baseAcknowledgement);
        if (object.result !== undefined && object.result !== null) {
            message.result = bytesFromBase64(object.result);
        }
        if (object.error !== undefined && object.error !== null) {
            message.error = String(object.error);
        }
        else {
            message.error = undefined;
        }
        return message;
    },
    toJSON(message) {
        const obj = {};
        message.result !== undefined &&
            (obj.result =
                message.result !== undefined
                    ? base64FromBytes(message.result)
                    : undefined);
        message.error !== undefined && (obj.error = message.error);
        return obj;
    },
    fromPartial(object) {
        const message = Object.assign({}, baseAcknowledgement);
        if (object.result !== undefined && object.result !== null) {
            message.result = object.result;
        }
        else {
            message.result = undefined;
        }
        if (object.error !== undefined && object.error !== null) {
            message.error = object.error;
        }
        else {
            message.error = undefined;
        }
        return message;
    },
};
var globalThis = (() => {
    if (typeof globalThis !== "undefined")
        return globalThis;
    if (typeof self !== "undefined")
        return self;
    if (typeof window !== "undefined")
        return window;
    if (typeof global !== "undefined")
        return global;
    throw "Unable to locate global object";
})();
const atob = globalThis.atob ||
    ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64) {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
        arr[i] = bin.charCodeAt(i);
    }
    return arr;
}
const btoa = globalThis.btoa ||
    ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr) {
    const bin = [];
    for (let i = 0; i < arr.byteLength; ++i) {
        bin.push(String.fromCharCode(arr[i]));
    }
    return btoa(bin.join(""));
}
function longToNumber(long) {
    if (long.gt(Number.MAX_SAFE_INTEGER)) {
        throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    }
    return long.toNumber();
}
if (minimal_1.util.Long !== Long) {
    minimal_1.util.Long = Long;
    (0, minimal_1.configure)();
}
//# sourceMappingURL=channel.js.map