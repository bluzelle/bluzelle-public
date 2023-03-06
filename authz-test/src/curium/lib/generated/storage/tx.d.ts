import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.storage";
export interface MsgPin {
    creator: string;
    cid: string;
}
export interface MsgPinResponse {
}
export declare const MsgPin: {
    encode(message: MsgPin, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPin;
    fromJSON(object: any): MsgPin;
    toJSON(message: MsgPin): unknown;
    fromPartial<I extends {
        creator?: string;
        cid?: string;
    } & {
        creator?: string;
        cid?: string;
    } & Record<Exclude<keyof I, keyof MsgPin>, never>>(object: I): MsgPin;
};
export declare const MsgPinResponse: {
    encode(_: MsgPinResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgPinResponse;
    fromJSON(_: any): MsgPinResponse;
    toJSON(_: MsgPinResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgPinResponse;
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
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
//# sourceMappingURL=tx.d.ts.map