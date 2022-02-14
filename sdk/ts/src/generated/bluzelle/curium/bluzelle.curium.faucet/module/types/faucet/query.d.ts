import { Reader, Writer } from "protobufjs/minimal";
import { Params } from "../faucet/params";
export declare const protobufPackage = "bluzelle.curium.faucet";
/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {
}
/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
    /** params holds all the parameters of this module. */
    params: Params | undefined;
}
export interface QueryMintRequest {
    address: string;
}
export interface QueryMintResponse {
    address: string;
    mnemonic: string;
}
export declare const QueryParamsRequest: {
    encode(_: QueryParamsRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest;
    fromJSON(_: any): QueryParamsRequest;
    toJSON(_: QueryParamsRequest): unknown;
    fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest;
};
export declare const QueryParamsResponse: {
    encode(message: QueryParamsResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse;
    fromJSON(object: any): QueryParamsResponse;
    toJSON(message: QueryParamsResponse): unknown;
    fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse;
};
export declare const QueryMintRequest: {
    encode(message: QueryMintRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryMintRequest;
    fromJSON(object: any): QueryMintRequest;
    toJSON(message: QueryMintRequest): unknown;
    fromPartial(object: DeepPartial<QueryMintRequest>): QueryMintRequest;
};
export declare const QueryMintResponse: {
    encode(message: QueryMintResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number): QueryMintResponse;
    fromJSON(object: any): QueryMintResponse;
    toJSON(message: QueryMintResponse): unknown;
    fromPartial(object: DeepPartial<QueryMintResponse>): QueryMintResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    /** Parameters queries the parameters of the module. */
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    /** Queries a list of Mint items. */
    Mint(request: QueryMintRequest): Promise<QueryMintResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    Params(request: QueryParamsRequest): Promise<QueryParamsResponse>;
    Mint(request: QueryMintRequest): Promise<QueryMintResponse>;
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
