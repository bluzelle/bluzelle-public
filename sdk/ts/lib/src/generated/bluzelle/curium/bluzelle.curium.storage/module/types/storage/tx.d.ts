import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.storage";
export interface MsgPin {
    creator: string;
    cid: string;
}
export interface MsgPinResponse {
}
export declare const MsgPin: {
    encode(message: MsgPin, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgPin;
    fromJSON(object: any): MsgPin;
    toJSON(message: MsgPin): unknown;
    fromPartial(object: DeepPartial<MsgPin>): MsgPin;
};
export declare const MsgPinResponse: {
    encode(_: MsgPinResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgPinResponse;
    fromJSON(_: any): MsgPinResponse;
    toJSON(_: MsgPinResponse): unknown;
    fromPartial(_: DeepPartial<MsgPinResponse>): MsgPinResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    Pin(request: MsgPin): Promise<MsgPinResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Pin(request: MsgPin): Promise<MsgPinResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=tx.d.ts.map