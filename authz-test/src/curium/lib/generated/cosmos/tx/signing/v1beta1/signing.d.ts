import { Any } from "../../../../google/protobuf/any";
import { CompactBitArray } from "../../../crypto/multisig/v1beta1/multisig";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "cosmos.tx.signing.v1beta1";
/** SignMode represents a signing mode with its own security guarantees. */
export declare enum SignMode {
    /**
     * SIGN_MODE_UNSPECIFIED - SIGN_MODE_UNSPECIFIED specifies an unknown signing mode and will be
     * rejected
     */
    SIGN_MODE_UNSPECIFIED = 0,
    /**
     * SIGN_MODE_DIRECT - SIGN_MODE_DIRECT specifies a signing mode which uses SignDoc and is
     * verified with raw bytes from Tx
     */
    SIGN_MODE_DIRECT = 1,
    /**
     * SIGN_MODE_TEXTUAL - SIGN_MODE_TEXTUAL is a future signing mode that will verify some
     * human-readable textual representation on top of the binary representation
     * from SIGN_MODE_DIRECT
     */
    SIGN_MODE_TEXTUAL = 2,
    /**
     * SIGN_MODE_LEGACY_AMINO_JSON - SIGN_MODE_LEGACY_AMINO_JSON is a backwards compatibility mode which uses
     * Amino JSON and will be removed in the future
     */
    SIGN_MODE_LEGACY_AMINO_JSON = 127,
    UNRECOGNIZED = -1
}
export declare function signModeFromJSON(object: any): SignMode;
export declare function signModeToJSON(object: SignMode): string;
/** SignatureDescriptors wraps multiple SignatureDescriptor's. */
export interface SignatureDescriptors {
    /** signatures are the signature descriptors */
    signatures: SignatureDescriptor[];
}
/**
 * SignatureDescriptor is a convenience type which represents the full data for
 * a signature including the public key of the signer, signing modes and the
 * signature itself. It is primarily used for coordinating signatures between
 * clients.
 */
export interface SignatureDescriptor {
    /** public_key is the public key of the signer */
    publicKey?: Any;
    data?: SignatureDescriptor_Data;
    /**
     * sequence is the sequence of the account, which describes the
     * number of committed transactions signed by a given address. It is used to prevent
     * replay attacks.
     */
    sequence: Long;
}
/** Data represents signature data */
export interface SignatureDescriptor_Data {
    /** single represents a single signer */
    single?: SignatureDescriptor_Data_Single | undefined;
    /** multi represents a multisig signer */
    multi?: SignatureDescriptor_Data_Multi | undefined;
}
/** Single is the signature data for a single signer */
export interface SignatureDescriptor_Data_Single {
    /** mode is the signing mode of the single signer */
    mode: SignMode;
    /** signature is the raw signature bytes */
    signature: Uint8Array;
}
/** Multi is the signature data for a multisig public key */
export interface SignatureDescriptor_Data_Multi {
    /** bitarray specifies which keys within the multisig are signing */
    bitarray?: CompactBitArray;
    /** signatures is the signatures of the multi-signature */
    signatures: SignatureDescriptor_Data[];
}
export declare const SignatureDescriptors: {
    encode(message: SignatureDescriptors, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptors;
    fromJSON(object: any): SignatureDescriptors;
    toJSON(message: SignatureDescriptors): unknown;
    fromPartial<I extends {
        signatures?: {
            publicKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            data?: {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                };
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                };
            };
            sequence?: string | number | Long.Long;
        }[];
    } & {
        signatures?: {
            publicKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            data?: {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                };
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                };
            };
            sequence?: string | number | Long.Long;
        }[] & ({
            publicKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            data?: {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                };
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                };
            };
            sequence?: string | number | Long.Long;
        } & {
            publicKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            } & {
                typeUrl?: string;
                value?: Uint8Array;
            } & Record<Exclude<keyof I["signatures"][number]["publicKey"], keyof Any>, never>;
            data?: {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                };
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                };
            } & {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                } & {
                    mode?: SignMode;
                    signature?: Uint8Array;
                } & Record<Exclude<keyof I["signatures"][number]["data"]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                } & {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    } & {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                    signatures?: any[] & ({
                        single?: {
                            mode?: SignMode;
                            signature?: Uint8Array;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            signatures?: any[];
                        };
                    } & {
                        single?: {
                            mode?: SignMode;
                            signature?: Uint8Array;
                        } & {
                            mode?: SignMode;
                            signature?: Uint8Array;
                        } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            signatures?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                            signatures?: any[] & ({
                                single?: {
                                    mode?: SignMode;
                                    signature?: Uint8Array;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    signatures?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: SignMode;
                                    signature?: Uint8Array;
                                } & {
                                    mode?: SignMode;
                                    signature?: Uint8Array;
                                } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    signatures?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                    signatures?: any[] & ({
                                        single?: {
                                            mode?: SignMode;
                                            signature?: Uint8Array;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            signatures?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: SignMode;
                                            signature?: Uint8Array;
                                        } & {
                                            mode?: SignMode;
                                            signature?: Uint8Array;
                                        } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            signatures?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                            signatures?: any[] & ({
                                                single?: {
                                                    mode?: SignMode;
                                                    signature?: Uint8Array;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    signatures?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: SignMode;
                                                    signature?: Uint8Array;
                                                } & any & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    signatures?: any[];
                                                } & any & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                            } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                        } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                    } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                            } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                        } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                    } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["data"]["multi"]["signatures"], keyof any[]>, never>;
                } & Record<Exclude<keyof I["signatures"][number]["data"]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
            } & Record<Exclude<keyof I["signatures"][number]["data"], keyof SignatureDescriptor_Data>, never>;
            sequence?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["signatures"][number]["sequence"], keyof Long.Long>, never>);
        } & Record<Exclude<keyof I["signatures"][number], keyof SignatureDescriptor>, never>)[] & Record<Exclude<keyof I["signatures"], keyof {
            publicKey?: {
                typeUrl?: string;
                value?: Uint8Array;
            };
            data?: {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                };
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                };
            };
            sequence?: string | number | Long.Long;
        }[]>, never>;
    } & Record<Exclude<keyof I, "signatures">, never>>(object: I): SignatureDescriptors;
};
export declare const SignatureDescriptor: {
    encode(message: SignatureDescriptor, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor;
    fromJSON(object: any): SignatureDescriptor;
    toJSON(message: SignatureDescriptor): unknown;
    fromPartial<I extends {
        publicKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        };
        data?: {
            single?: {
                mode?: SignMode;
                signature?: Uint8Array;
            };
            multi?: {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                };
                signatures?: any[];
            };
        };
        sequence?: string | number | Long.Long;
    } & {
        publicKey?: {
            typeUrl?: string;
            value?: Uint8Array;
        } & {
            typeUrl?: string;
            value?: Uint8Array;
        } & Record<Exclude<keyof I["publicKey"], keyof Any>, never>;
        data?: {
            single?: {
                mode?: SignMode;
                signature?: Uint8Array;
            };
            multi?: {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                };
                signatures?: any[];
            };
        } & {
            single?: {
                mode?: SignMode;
                signature?: Uint8Array;
            } & {
                mode?: SignMode;
                signature?: Uint8Array;
            } & Record<Exclude<keyof I["data"]["single"], keyof SignatureDescriptor_Data_Single>, never>;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                };
                signatures?: any[];
            } & {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                } & {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                } & Record<Exclude<keyof I["data"]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                signatures?: any[] & ({
                    single?: {
                        mode?: SignMode;
                        signature?: Uint8Array;
                    };
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        };
                        signatures?: any[];
                    };
                } & {
                    single?: {
                        mode?: SignMode;
                        signature?: Uint8Array;
                    } & {
                        mode?: SignMode;
                        signature?: Uint8Array;
                    } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        };
                        signatures?: any[];
                    } & {
                        bitarray?: {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        } & {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                        signatures?: any[] & ({
                            single?: {
                                mode?: SignMode;
                                signature?: Uint8Array;
                            };
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                };
                                signatures?: any[];
                            };
                        } & {
                            single?: {
                                mode?: SignMode;
                                signature?: Uint8Array;
                            } & {
                                mode?: SignMode;
                                signature?: Uint8Array;
                            } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                };
                                signatures?: any[];
                            } & {
                                bitarray?: {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                } & {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                signatures?: any[] & ({
                                    single?: {
                                        mode?: SignMode;
                                        signature?: Uint8Array;
                                    };
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        };
                                        signatures?: any[];
                                    };
                                } & {
                                    single?: {
                                        mode?: SignMode;
                                        signature?: Uint8Array;
                                    } & {
                                        mode?: SignMode;
                                        signature?: Uint8Array;
                                    } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        };
                                        signatures?: any[];
                                    } & {
                                        bitarray?: {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        } & {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                        signatures?: any[] & ({
                                            single?: {
                                                mode?: SignMode;
                                                signature?: Uint8Array;
                                            };
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number;
                                                    elems?: Uint8Array;
                                                };
                                                signatures?: any[];
                                            };
                                        } & {
                                            single?: {
                                                mode?: SignMode;
                                                signature?: Uint8Array;
                                            } & {
                                                mode?: SignMode;
                                                signature?: Uint8Array;
                                            } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number;
                                                    elems?: Uint8Array;
                                                };
                                                signatures?: any[];
                                            } & {
                                                bitarray?: {
                                                    extraBitsStored?: number;
                                                    elems?: Uint8Array;
                                                } & any & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                                signatures?: any[] & ({
                                                    single?: {
                                                        mode?: SignMode;
                                                        signature?: Uint8Array;
                                                    };
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number;
                                                            elems?: Uint8Array;
                                                        };
                                                        signatures?: any[];
                                                    };
                                                } & any & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                            } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                        } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                    } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                            } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                        } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                    } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                } & Record<Exclude<keyof I["data"]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["data"]["multi"]["signatures"], keyof any[]>, never>;
            } & Record<Exclude<keyof I["data"]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
        } & Record<Exclude<keyof I["data"], keyof SignatureDescriptor_Data>, never>;
        sequence?: string | number | (Long.Long & {
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
        } & Record<Exclude<keyof I["sequence"], keyof Long.Long>, never>);
    } & Record<Exclude<keyof I, keyof SignatureDescriptor>, never>>(object: I): SignatureDescriptor;
};
export declare const SignatureDescriptor_Data: {
    encode(message: SignatureDescriptor_Data, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data;
    fromJSON(object: any): SignatureDescriptor_Data;
    toJSON(message: SignatureDescriptor_Data): unknown;
    fromPartial<I extends {
        single?: {
            mode?: SignMode;
            signature?: Uint8Array;
        };
        multi?: {
            bitarray?: {
                extraBitsStored?: number;
                elems?: Uint8Array;
            };
            signatures?: any[];
        };
    } & {
        single?: {
            mode?: SignMode;
            signature?: Uint8Array;
        } & {
            mode?: SignMode;
            signature?: Uint8Array;
        } & Record<Exclude<keyof I["single"], keyof SignatureDescriptor_Data_Single>, never>;
        multi?: {
            bitarray?: {
                extraBitsStored?: number;
                elems?: Uint8Array;
            };
            signatures?: any[];
        } & {
            bitarray?: {
                extraBitsStored?: number;
                elems?: Uint8Array;
            } & {
                extraBitsStored?: number;
                elems?: Uint8Array;
            } & Record<Exclude<keyof I["multi"]["bitarray"], keyof CompactBitArray>, never>;
            signatures?: any[] & ({
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                };
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                };
            } & {
                single?: {
                    mode?: SignMode;
                    signature?: Uint8Array;
                } & {
                    mode?: SignMode;
                    signature?: Uint8Array;
                } & Record<Exclude<keyof I["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                multi?: {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    };
                    signatures?: any[];
                } & {
                    bitarray?: {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    } & {
                        extraBitsStored?: number;
                        elems?: Uint8Array;
                    } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                    signatures?: any[] & ({
                        single?: {
                            mode?: SignMode;
                            signature?: Uint8Array;
                        };
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            signatures?: any[];
                        };
                    } & {
                        single?: {
                            mode?: SignMode;
                            signature?: Uint8Array;
                        } & {
                            mode?: SignMode;
                            signature?: Uint8Array;
                        } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                        multi?: {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            };
                            signatures?: any[];
                        } & {
                            bitarray?: {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & {
                                extraBitsStored?: number;
                                elems?: Uint8Array;
                            } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                            signatures?: any[] & ({
                                single?: {
                                    mode?: SignMode;
                                    signature?: Uint8Array;
                                };
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    signatures?: any[];
                                };
                            } & {
                                single?: {
                                    mode?: SignMode;
                                    signature?: Uint8Array;
                                } & {
                                    mode?: SignMode;
                                    signature?: Uint8Array;
                                } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                multi?: {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    };
                                    signatures?: any[];
                                } & {
                                    bitarray?: {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & {
                                        extraBitsStored?: number;
                                        elems?: Uint8Array;
                                    } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                    signatures?: any[] & ({
                                        single?: {
                                            mode?: SignMode;
                                            signature?: Uint8Array;
                                        };
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            signatures?: any[];
                                        };
                                    } & {
                                        single?: {
                                            mode?: SignMode;
                                            signature?: Uint8Array;
                                        } & {
                                            mode?: SignMode;
                                            signature?: Uint8Array;
                                        } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                        multi?: {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            };
                                            signatures?: any[];
                                        } & {
                                            bitarray?: {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & {
                                                extraBitsStored?: number;
                                                elems?: Uint8Array;
                                            } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                            signatures?: any[] & ({
                                                single?: {
                                                    mode?: SignMode;
                                                    signature?: Uint8Array;
                                                };
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    signatures?: any[];
                                                };
                                            } & {
                                                single?: {
                                                    mode?: SignMode;
                                                    signature?: Uint8Array;
                                                } & any & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                                multi?: {
                                                    bitarray?: {
                                                        extraBitsStored?: number;
                                                        elems?: Uint8Array;
                                                    };
                                                    signatures?: any[];
                                                } & any & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                            } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                        } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                    } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                            } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                        } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                    } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                } & Record<Exclude<keyof I["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
            } & Record<Exclude<keyof I["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["multi"]["signatures"], keyof any[]>, never>;
        } & Record<Exclude<keyof I["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
    } & Record<Exclude<keyof I, keyof SignatureDescriptor_Data>, never>>(object: I): SignatureDescriptor_Data;
};
export declare const SignatureDescriptor_Data_Single: {
    encode(message: SignatureDescriptor_Data_Single, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data_Single;
    fromJSON(object: any): SignatureDescriptor_Data_Single;
    toJSON(message: SignatureDescriptor_Data_Single): unknown;
    fromPartial<I extends {
        mode?: SignMode;
        signature?: Uint8Array;
    } & {
        mode?: SignMode;
        signature?: Uint8Array;
    } & Record<Exclude<keyof I, keyof SignatureDescriptor_Data_Single>, never>>(object: I): SignatureDescriptor_Data_Single;
};
export declare const SignatureDescriptor_Data_Multi: {
    encode(message: SignatureDescriptor_Data_Multi, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SignatureDescriptor_Data_Multi;
    fromJSON(object: any): SignatureDescriptor_Data_Multi;
    toJSON(message: SignatureDescriptor_Data_Multi): unknown;
    fromPartial<I extends {
        bitarray?: {
            extraBitsStored?: number;
            elems?: Uint8Array;
        };
        signatures?: any[];
    } & {
        bitarray?: {
            extraBitsStored?: number;
            elems?: Uint8Array;
        } & {
            extraBitsStored?: number;
            elems?: Uint8Array;
        } & Record<Exclude<keyof I["bitarray"], keyof CompactBitArray>, never>;
        signatures?: any[] & ({
            single?: {
                mode?: SignMode;
                signature?: Uint8Array;
            };
            multi?: {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                };
                signatures?: any[];
            };
        } & {
            single?: {
                mode?: SignMode;
                signature?: Uint8Array;
            } & {
                mode?: SignMode;
                signature?: Uint8Array;
            } & Record<Exclude<keyof I["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
            multi?: {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                };
                signatures?: any[];
            } & {
                bitarray?: {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                } & {
                    extraBitsStored?: number;
                    elems?: Uint8Array;
                } & Record<Exclude<keyof I["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                signatures?: any[] & ({
                    single?: {
                        mode?: SignMode;
                        signature?: Uint8Array;
                    };
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        };
                        signatures?: any[];
                    };
                } & {
                    single?: {
                        mode?: SignMode;
                        signature?: Uint8Array;
                    } & {
                        mode?: SignMode;
                        signature?: Uint8Array;
                    } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                    multi?: {
                        bitarray?: {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        };
                        signatures?: any[];
                    } & {
                        bitarray?: {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        } & {
                            extraBitsStored?: number;
                            elems?: Uint8Array;
                        } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                        signatures?: any[] & ({
                            single?: {
                                mode?: SignMode;
                                signature?: Uint8Array;
                            };
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                };
                                signatures?: any[];
                            };
                        } & {
                            single?: {
                                mode?: SignMode;
                                signature?: Uint8Array;
                            } & {
                                mode?: SignMode;
                                signature?: Uint8Array;
                            } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                            multi?: {
                                bitarray?: {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                };
                                signatures?: any[];
                            } & {
                                bitarray?: {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                } & {
                                    extraBitsStored?: number;
                                    elems?: Uint8Array;
                                } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                signatures?: any[] & ({
                                    single?: {
                                        mode?: SignMode;
                                        signature?: Uint8Array;
                                    };
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        };
                                        signatures?: any[];
                                    };
                                } & {
                                    single?: {
                                        mode?: SignMode;
                                        signature?: Uint8Array;
                                    } & {
                                        mode?: SignMode;
                                        signature?: Uint8Array;
                                    } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                    multi?: {
                                        bitarray?: {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        };
                                        signatures?: any[];
                                    } & {
                                        bitarray?: {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        } & {
                                            extraBitsStored?: number;
                                            elems?: Uint8Array;
                                        } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                        signatures?: any[] & ({
                                            single?: {
                                                mode?: SignMode;
                                                signature?: Uint8Array;
                                            };
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number;
                                                    elems?: Uint8Array;
                                                };
                                                signatures?: any[];
                                            };
                                        } & {
                                            single?: {
                                                mode?: SignMode;
                                                signature?: Uint8Array;
                                            } & {
                                                mode?: SignMode;
                                                signature?: Uint8Array;
                                            } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["single"], keyof SignatureDescriptor_Data_Single>, never>;
                                            multi?: {
                                                bitarray?: {
                                                    extraBitsStored?: number;
                                                    elems?: Uint8Array;
                                                };
                                                signatures?: any[];
                                            } & {
                                                bitarray?: {
                                                    extraBitsStored?: number;
                                                    elems?: Uint8Array;
                                                } & any & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["bitarray"], keyof CompactBitArray>, never>;
                                                signatures?: any[] & ({
                                                    single?: {
                                                        mode?: SignMode;
                                                        signature?: Uint8Array;
                                                    };
                                                    multi?: {
                                                        bitarray?: {
                                                            extraBitsStored?: number;
                                                            elems?: Uint8Array;
                                                        };
                                                        signatures?: any[];
                                                    };
                                                } & any & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                            } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                        } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                                    } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                                } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                            } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                        } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
                    } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
                } & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"][number]["multi"]["signatures"], keyof any[]>, never>;
            } & Record<Exclude<keyof I["signatures"][number]["multi"], keyof SignatureDescriptor_Data_Multi>, never>;
        } & Record<Exclude<keyof I["signatures"][number], keyof SignatureDescriptor_Data>, never>)[] & Record<Exclude<keyof I["signatures"], keyof any[]>, never>;
    } & Record<Exclude<keyof I, keyof SignatureDescriptor_Data_Multi>, never>>(object: I): SignatureDescriptor_Data_Multi;
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
//# sourceMappingURL=signing.d.ts.map