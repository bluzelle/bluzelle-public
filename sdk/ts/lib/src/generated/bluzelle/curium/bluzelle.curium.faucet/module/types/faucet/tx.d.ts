import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.faucet";
export interface MsgMint {
    creator: string;
    address: string;
}
export interface MsgMintResponse {
    address: string;
}
export declare const MsgMint: {
    encode(message: MsgMint, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgMint;
    fromJSON(object: any): MsgMint;
    toJSON(message: MsgMint): unknown;
    fromPartial(object: DeepPartial<MsgMint>): MsgMint;
};
export declare const MsgMintResponse: {
    encode(message: MsgMintResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgMintResponse;
    fromJSON(object: any): MsgMintResponse;
    toJSON(message: MsgMintResponse): unknown;
    fromPartial(object: DeepPartial<MsgMintResponse>): MsgMintResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    /** this line is used by starport scaffolding # proto/tx/rpc */
    Mint(request: MsgMint): Promise<MsgMintResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    Mint(request: MsgMint): Promise<MsgMintResponse>;
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