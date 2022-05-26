import { Reader, Writer } from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.storage";
export interface QueryHasContentRequest {
    cid: string;
}
export interface QueryHasContentResponse {
    hasContent: boolean;
}
export declare const QueryHasContentRequest: {
    encode(message: QueryHasContentRequest, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): QueryHasContentRequest;
    fromJSON(object: any): QueryHasContentRequest;
    toJSON(message: QueryHasContentRequest): unknown;
    fromPartial(object: DeepPartial<QueryHasContentRequest>): QueryHasContentRequest;
};
export declare const QueryHasContentResponse: {
    encode(message: QueryHasContentResponse, writer?: Writer): Writer;
    decode(input: Reader | Uint8Array, length?: number | undefined): QueryHasContentResponse;
    fromJSON(object: any): QueryHasContentResponse;
    toJSON(message: QueryHasContentResponse): unknown;
    fromPartial(object: DeepPartial<QueryHasContentResponse>): QueryHasContentResponse;
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
declare type Builtin = Date | Function | Uint8Array | string | number | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
export {};
//# sourceMappingURL=query.d.ts.map