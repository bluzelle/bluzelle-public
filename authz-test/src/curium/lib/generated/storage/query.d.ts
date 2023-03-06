import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.storage";
export interface QueryHasContentRequest {
    cid: string;
}
export interface QueryHasContentResponse {
    hasContent: boolean;
}
export declare const QueryHasContentRequest: {
    encode(message: QueryHasContentRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryHasContentRequest;
    fromJSON(object: any): QueryHasContentRequest;
    toJSON(message: QueryHasContentRequest): unknown;
    fromPartial<I extends {
        cid?: string;
    } & {
        cid?: string;
    } & Record<Exclude<keyof I, "cid">, never>>(object: I): QueryHasContentRequest;
};
export declare const QueryHasContentResponse: {
    encode(message: QueryHasContentResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): QueryHasContentResponse;
    fromJSON(object: any): QueryHasContentResponse;
    toJSON(message: QueryHasContentResponse): unknown;
    fromPartial<I extends {
        hasContent?: boolean;
    } & {
        hasContent?: boolean;
    } & Record<Exclude<keyof I, "hasContent">, never>>(object: I): QueryHasContentResponse;
};
/** Query defines the gRPC querier service. */
export interface Query {
    HasContent(request: QueryHasContentRequest): Promise<QueryHasContentResponse>;
}
export declare class QueryClientImpl implements Query {
    private readonly rpc;
    constructor(rpc: Rpc);
    HasContent(request: QueryHasContentRequest): Promise<QueryHasContentResponse>;
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
//# sourceMappingURL=query.d.ts.map