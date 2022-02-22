import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.tax";
export interface QueryGetTaxInfoRequest {
}
export interface QueryGetTaxInfoResponse {
    gasTaxBp: number;
    transferTaxBp: number;
    taxCollector: string;
}
export declare const QueryGetTaxInfoRequest: {
    encode(_: QueryGetTaxInfoRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetTaxInfoRequest;
    fromJSON(_: any): QueryGetTaxInfoRequest;
    toJSON(_: QueryGetTaxInfoRequest): unknown;
    fromPartial(_: DeepPartial<QueryGetTaxInfoRequest>): QueryGetTaxInfoRequest;
};
export declare const QueryGetTaxInfoResponse: {
    encode(message: QueryGetTaxInfoResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryGetTaxInfoResponse;
    fromJSON(object: any): QueryGetTaxInfoResponse;
    toJSON(message: QueryGetTaxInfoResponse): unknown;
    fromPartial(object: DeepPartial<QueryGetTaxInfoResponse>): QueryGetTaxInfoResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Queries a list of GetTaxInfo items. */
    GetTaxInfo(request: QueryGetTaxInfoRequest): Promise<QueryGetTaxInfoResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    GetTaxInfo(request: QueryGetTaxInfoRequest): Promise<QueryGetTaxInfoResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
