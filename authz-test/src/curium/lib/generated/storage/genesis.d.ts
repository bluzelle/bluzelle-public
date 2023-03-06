import Long from "long";
import { MsgPin } from "./tx";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "bluzelle.curium.storage";
/** GenesisState defines the storage module's genesis state. */
export interface GenesisState {
    /** this line is used by starport scaffolding # genesis/proto/state */
    pins: MsgPin[];
}
export declare const GenesisState: {
    encode(message: GenesisState, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState;
    fromJSON(object: any): GenesisState;
    toJSON(message: GenesisState): unknown;
    fromPartial<I extends {
        pins?: {
            creator?: string;
            cid?: string;
        }[];
    } & {
        pins?: {
            creator?: string;
            cid?: string;
        }[] & ({
            creator?: string;
            cid?: string;
        } & {
            creator?: string;
            cid?: string;
        } & Record<Exclude<keyof I["pins"][number], keyof MsgPin>, never>)[] & Record<Exclude<keyof I["pins"], keyof {
            creator?: string;
            cid?: string;
        }[]>, never>;
    } & Record<Exclude<keyof I, "pins">, never>>(object: I): GenesisState;
};
declare type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export declare type DeepPartial<T> = T extends Builtin ? T : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
declare type KeysOfUnion<T> = T extends T ? keyof T : never;
export declare type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;
export {};
//# sourceMappingURL=genesis.d.ts.map