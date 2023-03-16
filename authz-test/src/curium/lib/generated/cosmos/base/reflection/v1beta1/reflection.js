"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReflectionServiceClientImpl = exports.ListImplementationsResponse = exports.ListImplementationsRequest = exports.ListAllInterfacesResponse = exports.ListAllInterfacesRequest = exports.protobufPackage = void 0;
/* eslint-disable */
const long_1 = __importDefault(require("long"));
const minimal_1 = __importDefault(require("protobufjs/minimal"));
exports.protobufPackage = "cosmos.base.reflection.v1beta1";
function createBaseListAllInterfacesRequest() {
    return {};
}
exports.ListAllInterfacesRequest = {
    encode(_, writer = minimal_1.default.Writer.create()) {
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListAllInterfacesRequest();
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
        const message = createBaseListAllInterfacesRequest();
        return message;
    },
};
function createBaseListAllInterfacesResponse() {
    return { interfaceNames: [] };
}
exports.ListAllInterfacesResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.interfaceNames) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListAllInterfacesResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.interfaceNames.push(reader.string());
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
            interfaceNames: Array.isArray(object === null || object === void 0 ? void 0 : object.interfaceNames)
                ? object.interfaceNames.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.interfaceNames) {
            obj.interfaceNames = message.interfaceNames.map((e) => e);
        }
        else {
            obj.interfaceNames = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseListAllInterfacesResponse();
        message.interfaceNames = ((_a = object.interfaceNames) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
function createBaseListImplementationsRequest() {
    return { interfaceName: "" };
}
exports.ListImplementationsRequest = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        if (message.interfaceName !== "") {
            writer.uint32(10).string(message.interfaceName);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListImplementationsRequest();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.interfaceName = reader.string();
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
            interfaceName: isSet(object.interfaceName)
                ? String(object.interfaceName)
                : "",
        };
    },
    toJSON(message) {
        const obj = {};
        message.interfaceName !== undefined &&
            (obj.interfaceName = message.interfaceName);
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseListImplementationsRequest();
        message.interfaceName = (_a = object.interfaceName) !== null && _a !== void 0 ? _a : "";
        return message;
    },
};
function createBaseListImplementationsResponse() {
    return { implementationMessageNames: [] };
}
exports.ListImplementationsResponse = {
    encode(message, writer = minimal_1.default.Writer.create()) {
        for (const v of message.implementationMessageNames) {
            writer.uint32(10).string(v);
        }
        return writer;
    },
    decode(input, length) {
        const reader = input instanceof minimal_1.default.Reader ? input : new minimal_1.default.Reader(input);
        let end = length === undefined ? reader.len : reader.pos + length;
        const message = createBaseListImplementationsResponse();
        while (reader.pos < end) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
                case 1:
                    message.implementationMessageNames.push(reader.string());
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
            implementationMessageNames: Array.isArray(object === null || object === void 0 ? void 0 : object.implementationMessageNames)
                ? object.implementationMessageNames.map((e) => String(e))
                : [],
        };
    },
    toJSON(message) {
        const obj = {};
        if (message.implementationMessageNames) {
            obj.implementationMessageNames = message.implementationMessageNames.map((e) => e);
        }
        else {
            obj.implementationMessageNames = [];
        }
        return obj;
    },
    fromPartial(object) {
        var _a;
        const message = createBaseListImplementationsResponse();
        message.implementationMessageNames =
            ((_a = object.implementationMessageNames) === null || _a === void 0 ? void 0 : _a.map((e) => e)) || [];
        return message;
    },
};
class ReflectionServiceClientImpl {
    constructor(rpc) {
        this.rpc = rpc;
        this.ListAllInterfaces = this.ListAllInterfaces.bind(this);
        this.ListImplementations = this.ListImplementations.bind(this);
    }
    ListAllInterfaces(request) {
        const data = exports.ListAllInterfacesRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.base.reflection.v1beta1.ReflectionService", "ListAllInterfaces", data);
        return promise.then((data) => exports.ListAllInterfacesResponse.decode(new minimal_1.default.Reader(data)));
    }
    ListImplementations(request) {
        const data = exports.ListImplementationsRequest.encode(request).finish();
        const promise = this.rpc.request("cosmos.base.reflection.v1beta1.ReflectionService", "ListImplementations", data);
        return promise.then((data) => exports.ListImplementationsResponse.decode(new minimal_1.default.Reader(data)));
    }
}
exports.ReflectionServiceClientImpl = ReflectionServiceClientImpl;
if (minimal_1.default.util.Long !== long_1.default) {
    minimal_1.default.util.Long = long_1.default;
    minimal_1.default.configure();
}
function isSet(value) {
    return value !== null && value !== undefined;
}
//# sourceMappingURL=reflection.js.map