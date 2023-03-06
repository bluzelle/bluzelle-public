import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.tax";
export interface MsgSetGasTaxBp {
    creator: string;
    bp: Long;
}
export interface MsgSetGasTaxBpResponse {
}
export interface MsgSetTransferTaxBp {
    creator: string;
    bp: Long;
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
    encode(message: MsgSetGasTaxBp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetGasTaxBp;
    fromJSON(object: any): MsgSetGasTaxBp;
    toJSON(message: MsgSetGasTaxBp): unknown;
    fromPartial<I extends {
        creator?: string;
        bp?: string | number | Long.Long;
    } & {
        creator?: string;
        bp?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & Record<Exclude<keyof I["bp"], keyof Long.Long>, never>);
    } & Record<Exclude<keyof I, keyof MsgSetGasTaxBp>, never>>(object: I): MsgSetGasTaxBp;
};
export declare const MsgSetGasTaxBpResponse: {
    encode(_: MsgSetGasTaxBpResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetGasTaxBpResponse;
    fromJSON(_: any): MsgSetGasTaxBpResponse;
    toJSON(_: MsgSetGasTaxBpResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgSetGasTaxBpResponse;
};
export declare const MsgSetTransferTaxBp: {
    encode(message: MsgSetTransferTaxBp, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTransferTaxBp;
    fromJSON(object: any): MsgSetTransferTaxBp;
    toJSON(message: MsgSetTransferTaxBp): unknown;
    fromPartial<I extends {
        creator?: string;
        bp?: string | number | Long.Long;
    } & {
        creator?: string;
        bp?: string | number | (Long.Long & {
            high: number;
            low: number;
            unsigned: boolean;
            add: (addend: string | number | Long.Long) => Long.Long;
            and: (other: string | number | Long.Long) => Long.Long;
            compare: (other: string | number | Long.Long) => number;
            comp: (other: string | number | Long.Long) => number;
            divide: (divisor: string | number | Long.Long) => Long.Long;
            div: (divisor: string | number | Long.Long) => Long.Long;
            equals: (other: string | number | Long.Long) => boolean;
            eq: (other: string | number | Long.Long) => boolean;
            getHighBits: () => number;
            getHighBitsUnsigned: () => number;
            getLowBits: () => number;
            getLowBitsUnsigned: () => number;
            getNumBitsAbs: () => number;
            greaterThan: (other: string | number | Long.Long) => boolean;
            gt: (other: string | number | Long.Long) => boolean;
            greaterThanOrEqual: (other: string | number | Long.Long) => boolean;
            gte: (other: string | number | Long.Long) => boolean;
            isEven: () => boolean;
            isNegative: () => boolean;
            isOdd: () => boolean;
            isPositive: () => boolean;
            isZero: () => boolean;
            lessThan: (other: string | number | Long.Long) => boolean;
            lt: (other: string | number | Long.Long) => boolean;
            lessThanOrEqual: (other: string | number | Long.Long) => boolean;
            lte: (other: string | number | Long.Long) => boolean;
            modulo: (other: string | number | Long.Long) => Long.Long;
            mod: (other: string | number | Long.Long) => Long.Long;
            multiply: (multiplier: string | number | Long.Long) => Long.Long;
            mul: (multiplier: string | number | Long.Long) => Long.Long;
            negate: () => Long.Long;
            neg: () => Long.Long;
            not: () => Long.Long;
            notEquals: (other: string | number | Long.Long) => boolean;
            neq: (other: string | number | Long.Long) => boolean;
            or: (other: string | number | Long.Long) => Long.Long;
            shiftLeft: (numBits: number | Long.Long) => Long.Long;
            shl: (numBits: number | Long.Long) => Long.Long;
            shiftRight: (numBits: number | Long.Long) => Long.Long;
            shr: (numBits: number | Long.Long) => Long.Long;
            shiftRightUnsigned: (numBits: number | Long.Long) => Long.Long;
            shru: (numBits: number | Long.Long) => Long.Long;
            subtract: (subtrahend: string | number | Long.Long) => Long.Long;
            sub: (subtrahend: string | number | Long.Long) => Long.Long;
            toInt: () => number;
            toNumber: () => number;
            toBytes: (le?: boolean) => number[];
            toBytesLE: () => number[];
            toBytesBE: () => number[];
            toSigned: () => Long.Long;
            toString: (radix?: number) => string;
            toUnsigned: () => Long.Long;
            xor: (other: string | number | Long.Long) => Long.Long;
        } & Record<Exclude<keyof I["bp"], keyof Long.Long>, never>);
    } & Record<Exclude<keyof I, keyof MsgSetTransferTaxBp>, never>>(object: I): MsgSetTransferTaxBp;
};
export declare const MsgSetTransferTaxBpResponse: {
    encode(_: MsgSetTransferTaxBpResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTransferTaxBpResponse;
    fromJSON(_: any): MsgSetTransferTaxBpResponse;
    toJSON(_: MsgSetTransferTaxBpResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgSetTransferTaxBpResponse;
};
export declare const MsgSetTaxCollector: {
    encode(message: MsgSetTaxCollector, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTaxCollector;
    fromJSON(object: any): MsgSetTaxCollector;
    toJSON(message: MsgSetTaxCollector): unknown;
    fromPartial<I extends {
        creator?: string;
        taxCollector?: string;
    } & {
        creator?: string;
        taxCollector?: string;
    } & Record<Exclude<keyof I, keyof MsgSetTaxCollector>, never>>(object: I): MsgSetTaxCollector;
};
export declare const MsgSetTaxCollectorResponse: {
    encode(_: MsgSetTaxCollectorResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTaxCollectorResponse;
    fromJSON(_: any): MsgSetTaxCollectorResponse;
    toJSON(_: MsgSetTaxCollectorResponse): unknown;
    fromPartial<I extends {} & {} & Record<Exclude<keyof I, never>, never>>(_: I): MsgSetTaxCollectorResponse;
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