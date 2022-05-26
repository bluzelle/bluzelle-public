import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.tax";
export interface MsgSetGasTaxBp {
    creator: string;
    bp: number;
}
export interface MsgSetGasTaxBpResponse {
}
export interface MsgSetTransferTaxBp {
    creator: string;
    bp: number;
}
export interface MsgSetTransferTaxBpResponse {
}
export interface MsgSetTaxCollector {
    creator: string;
    taxCollector: string;
}
export interface MsgSetTaxCollectorResponse {
}
export declare const MsgSetGasTaxBp: {
    encode(message: MsgSetGasTaxBp, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgSetGasTaxBp;
    fromJSON(object: any): MsgSetGasTaxBp;
    toJSON(message: MsgSetGasTaxBp): unknown;
    fromPartial(object: DeepPartial<MsgSetGasTaxBp>): MsgSetGasTaxBp;
};
export declare const MsgSetGasTaxBpResponse: {
    encode(_: MsgSetGasTaxBpResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgSetGasTaxBpResponse;
    fromJSON(_: any): MsgSetGasTaxBpResponse;
    toJSON(_: MsgSetGasTaxBpResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetGasTaxBpResponse>): MsgSetGasTaxBpResponse;
};
export declare const MsgSetTransferTaxBp: {
    encode(message: MsgSetTransferTaxBp, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgSetTransferTaxBp;
    fromJSON(object: any): MsgSetTransferTaxBp;
    toJSON(message: MsgSetTransferTaxBp): unknown;
    fromPartial(object: DeepPartial<MsgSetTransferTaxBp>): MsgSetTransferTaxBp;
};
export declare const MsgSetTransferTaxBpResponse: {
    encode(_: MsgSetTransferTaxBpResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgSetTransferTaxBpResponse;
    fromJSON(_: any): MsgSetTransferTaxBpResponse;
    toJSON(_: MsgSetTransferTaxBpResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetTransferTaxBpResponse>): MsgSetTransferTaxBpResponse;
};
export declare const MsgSetTaxCollector: {
    encode(message: MsgSetTaxCollector, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgSetTaxCollector;
    fromJSON(object: any): MsgSetTaxCollector;
    toJSON(message: MsgSetTaxCollector): unknown;
    fromPartial(object: DeepPartial<MsgSetTaxCollector>): MsgSetTaxCollector;
};
export declare const MsgSetTaxCollectorResponse: {
    encode(_: MsgSetTaxCollectorResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): MsgSetTaxCollectorResponse;
    fromJSON(_: any): MsgSetTaxCollectorResponse;
    toJSON(_: MsgSetTaxCollectorResponse): unknown;
    fromPartial(_: DeepPartial<MsgSetTaxCollectorResponse>): MsgSetTaxCollectorResponse;
};
/** Msg defines the Msg service. */
export interface Msg {
    SetGasTaxBp(request: MsgSetGasTaxBp): Promise<MsgSetGasTaxBpResponse>;
    SetTransferTaxBp(request: MsgSetTransferTaxBp): Promise<MsgSetTransferTaxBpResponse>;
    /** this line is used by starport scaffolding # proto/tx/rpc */
    SetTaxCollector(request: MsgSetTaxCollector): Promise<MsgSetTaxCollectorResponse>;
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
    SetGasTaxBp(request: MsgSetGasTaxBp): Promise<MsgSetGasTaxBpResponse>;
    SetTransferTaxBp(request: MsgSetTransferTaxBp): Promise<MsgSetTransferTaxBpResponse>;
    SetTaxCollector(request: MsgSetTaxCollector): Promise<MsgSetTaxCollectorResponse>;
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