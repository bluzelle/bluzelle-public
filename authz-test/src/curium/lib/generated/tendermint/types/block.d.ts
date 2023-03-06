import { Header, Data, Commit } from "./types";
import { EvidenceList } from "./evidence";
import Long from "long";
import _m0 from "protobufjs/minimal";
export declare const protobufPackage = "tendermint.types";
export interface Block {
    header?: Header;
    data?: Data;
    evidence?: EvidenceList;
    lastCommit?: Commit;
}
export declare const Block: {
    encode(message: Block, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Block;
    fromJSON(object: any): Block;
    toJSON(message: Block): unknown;
    fromPartial<I extends {
        header?: {
            version?: {
                block?: string | number | Long.Long;
                app?: string | number | Long.Long;
            };
            chainId?: string;
            height?: string | number | Long.Long;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        };
        data?: {
            txs?: Uint8Array[];
        };
        evidence?: {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    totalVotingPower?: string | number | Long.Long;
                    validatorPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    };
                    commonHeight?: string | number | Long.Long;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[];
                    totalVotingPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
            }[];
        };
        lastCommit?: {
            height?: string | number | Long.Long;
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            signatures?: {
                blockIdFlag?: import("./types").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[];
        };
    } & {
        header?: {
            version?: {
                block?: string | number | Long.Long;
                app?: string | number | Long.Long;
            };
            chainId?: string;
            height?: string | number | Long.Long;
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & {
            version?: {
                block?: string | number | Long.Long;
                app?: string | number | Long.Long;
            } & {
                block?: string | number | (Long.Long & {
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
                } & Record<Exclude<keyof I["header"]["version"]["block"], keyof Long.Long>, never>);
                app?: string | number | (Long.Long & {
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
                } & Record<Exclude<keyof I["header"]["version"]["app"], keyof Long.Long>, never>);
            } & Record<Exclude<keyof I["header"]["version"], keyof import("../version/types").Consensus>, never>;
            chainId?: string;
            height?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["header"]["height"], keyof Long.Long>, never>);
            time?: Date;
            lastBlockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            } & {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                } & {
                    total?: number;
                    hash?: Uint8Array;
                } & Record<Exclude<keyof I["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>, never>;
            } & Record<Exclude<keyof I["header"]["lastBlockId"], keyof import("./types").BlockID>, never>;
            lastCommitHash?: Uint8Array;
            dataHash?: Uint8Array;
            validatorsHash?: Uint8Array;
            nextValidatorsHash?: Uint8Array;
            consensusHash?: Uint8Array;
            appHash?: Uint8Array;
            lastResultsHash?: Uint8Array;
            evidenceHash?: Uint8Array;
            proposerAddress?: Uint8Array;
        } & Record<Exclude<keyof I["header"], keyof Header>, never>;
        data?: {
            txs?: Uint8Array[];
        } & {
            txs?: Uint8Array[] & Uint8Array[] & Record<Exclude<keyof I["data"]["txs"], keyof Uint8Array[]>, never>;
        } & Record<Exclude<keyof I["data"], "txs">, never>;
        evidence?: {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    totalVotingPower?: string | number | Long.Long;
                    validatorPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    };
                    commonHeight?: string | number | Long.Long;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[];
                    totalVotingPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
            }[];
        } & {
            evidence?: {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    totalVotingPower?: string | number | Long.Long;
                    validatorPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    };
                    commonHeight?: string | number | Long.Long;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[];
                    totalVotingPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
            }[] & ({
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    totalVotingPower?: string | number | Long.Long;
                    validatorPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    };
                    commonHeight?: string | number | Long.Long;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[];
                    totalVotingPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
            } & {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    totalVotingPower?: string | number | Long.Long;
                    validatorPower?: string | number | Long.Long;
                    timestamp?: Date;
                } & {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    } & {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | (Long.Long & {
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
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["height"], keyof Long.Long>, never>);
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        } & {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            } & {
                                total?: number;
                                hash?: Uint8Array;
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>, never>;
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"]["blockId"], keyof import("./types").BlockID>, never>;
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteA"], keyof import("./types").Vote>, never>;
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    } & {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | (Long.Long & {
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
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["height"], keyof Long.Long>, never>);
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        } & {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            } & {
                                total?: number;
                                hash?: Uint8Array;
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>, never>;
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"]["blockId"], keyof import("./types").BlockID>, never>;
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["voteB"], keyof import("./types").Vote>, never>;
                    totalVotingPower?: string | number | (Long.Long & {
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
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["totalVotingPower"], keyof Long.Long>, never>);
                    validatorPower?: string | number | (Long.Long & {
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
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"]["validatorPower"], keyof Long.Long>, never>);
                    timestamp?: Date;
                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["duplicateVoteEvidence"], keyof import("./evidence").DuplicateVoteEvidence>, never>;
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    };
                    commonHeight?: string | number | Long.Long;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[];
                    totalVotingPower?: string | number | Long.Long;
                    timestamp?: Date;
                } & {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    } & {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        } & {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            } & {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                } & {
                                    block?: string | number | (Long.Long & {
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
                                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"]["block"], keyof Long.Long>, never>);
                                    app?: string | number | (Long.Long & {
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
                                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"]["app"], keyof Long.Long>, never>);
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["version"], keyof import("../version/types").Consensus>, never>;
                                chainId?: string;
                                height?: string | number | (Long.Long & {
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
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["height"], keyof Long.Long>, never>);
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                } & {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    } & {
                                        total?: number;
                                        hash?: Uint8Array;
                                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"]["partSetHeader"], keyof import("./types").PartSetHeader>, never>;
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"]["lastBlockId"], keyof import("./types").BlockID>, never>;
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["header"], keyof Header>, never>;
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            } & {
                                height?: string | number | (Long.Long & {
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
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["height"], keyof Long.Long>, never>);
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                } & {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    } & {
                                        total?: number;
                                        hash?: Uint8Array;
                                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>, never>;
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["blockId"], keyof import("./types").BlockID>, never>;
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[] & ({
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                } & {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"][number], keyof import("./types").CommitSig>, never>)[] & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"]["signatures"], keyof {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[]>, never>;
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"]["commit"], keyof Commit>, never>;
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["signedHeader"], keyof import("./types").SignedHeader>, never>;
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        } & {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[] & ({
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            } & {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>, never>;
                                votingPower?: string | number | (Long.Long & {
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
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["votingPower"], keyof Long.Long>, never>);
                                proposerPriority?: string | number | (Long.Long & {
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
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number]["proposerPriority"], keyof Long.Long>, never>);
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"][number], keyof import("./validator").Validator>, never>)[] & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["validators"], keyof {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[]>, never>;
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            } & {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["pubKey"], keyof import("../crypto/keys").PublicKey>, never>;
                                votingPower?: string | number | (Long.Long & {
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
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["votingPower"], keyof Long.Long>, never>);
                                proposerPriority?: string | number | (Long.Long & {
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
                                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"]["proposerPriority"], keyof Long.Long>, never>);
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["proposer"], keyof import("./validator").Validator>, never>;
                            totalVotingPower?: string | number | (Long.Long & {
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
                            } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"]["totalVotingPower"], keyof Long.Long>, never>);
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"]["validatorSet"], keyof import("./validator").ValidatorSet>, never>;
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["conflictingBlock"], keyof import("./types").LightBlock>, never>;
                    commonHeight?: string | number | (Long.Long & {
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
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["commonHeight"], keyof Long.Long>, never>);
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[] & ({
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    } & {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        } & {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["pubKey"], keyof import("../crypto/keys").PublicKey>, never>;
                        votingPower?: string | number | (Long.Long & {
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
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["votingPower"], keyof Long.Long>, never>);
                        proposerPriority?: string | number | (Long.Long & {
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
                        } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number]["proposerPriority"], keyof Long.Long>, never>);
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"][number], keyof import("./validator").Validator>, never>)[] & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["byzantineValidators"], keyof {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[]>, never>;
                    totalVotingPower?: string | number | (Long.Long & {
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
                    } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"]["totalVotingPower"], keyof Long.Long>, never>);
                    timestamp?: Date;
                } & Record<Exclude<keyof I["evidence"]["evidence"][number]["lightClientAttackEvidence"], keyof import("./evidence").LightClientAttackEvidence>, never>;
            } & Record<Exclude<keyof I["evidence"]["evidence"][number], keyof import("./evidence").Evidence>, never>)[] & Record<Exclude<keyof I["evidence"]["evidence"], keyof {
                duplicateVoteEvidence?: {
                    voteA?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    voteB?: {
                        type?: import("./types").SignedMsgType;
                        height?: string | number | Long.Long;
                        round?: number;
                        blockId?: {
                            hash?: Uint8Array;
                            partSetHeader?: {
                                total?: number;
                                hash?: Uint8Array;
                            };
                        };
                        timestamp?: Date;
                        validatorAddress?: Uint8Array;
                        validatorIndex?: number;
                        signature?: Uint8Array;
                    };
                    totalVotingPower?: string | number | Long.Long;
                    validatorPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
                lightClientAttackEvidence?: {
                    conflictingBlock?: {
                        signedHeader?: {
                            header?: {
                                version?: {
                                    block?: string | number | Long.Long;
                                    app?: string | number | Long.Long;
                                };
                                chainId?: string;
                                height?: string | number | Long.Long;
                                time?: Date;
                                lastBlockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                lastCommitHash?: Uint8Array;
                                dataHash?: Uint8Array;
                                validatorsHash?: Uint8Array;
                                nextValidatorsHash?: Uint8Array;
                                consensusHash?: Uint8Array;
                                appHash?: Uint8Array;
                                lastResultsHash?: Uint8Array;
                                evidenceHash?: Uint8Array;
                                proposerAddress?: Uint8Array;
                            };
                            commit?: {
                                height?: string | number | Long.Long;
                                round?: number;
                                blockId?: {
                                    hash?: Uint8Array;
                                    partSetHeader?: {
                                        total?: number;
                                        hash?: Uint8Array;
                                    };
                                };
                                signatures?: {
                                    blockIdFlag?: import("./types").BlockIDFlag;
                                    validatorAddress?: Uint8Array;
                                    timestamp?: Date;
                                    signature?: Uint8Array;
                                }[];
                            };
                        };
                        validatorSet?: {
                            validators?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            }[];
                            proposer?: {
                                address?: Uint8Array;
                                pubKey?: {
                                    ed25519?: Uint8Array;
                                    secp256k1?: Uint8Array;
                                };
                                votingPower?: string | number | Long.Long;
                                proposerPriority?: string | number | Long.Long;
                            };
                            totalVotingPower?: string | number | Long.Long;
                        };
                    };
                    commonHeight?: string | number | Long.Long;
                    byzantineValidators?: {
                        address?: Uint8Array;
                        pubKey?: {
                            ed25519?: Uint8Array;
                            secp256k1?: Uint8Array;
                        };
                        votingPower?: string | number | Long.Long;
                        proposerPriority?: string | number | Long.Long;
                    }[];
                    totalVotingPower?: string | number | Long.Long;
                    timestamp?: Date;
                };
            }[]>, never>;
        } & Record<Exclude<keyof I["evidence"], "evidence">, never>;
        lastCommit?: {
            height?: string | number | Long.Long;
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            };
            signatures?: {
                blockIdFlag?: import("./types").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[];
        } & {
            height?: string | number | (Long.Long & {
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
            } & Record<Exclude<keyof I["lastCommit"]["height"], keyof Long.Long>, never>);
            round?: number;
            blockId?: {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                };
            } & {
                hash?: Uint8Array;
                partSetHeader?: {
                    total?: number;
                    hash?: Uint8Array;
                } & {
                    total?: number;
                    hash?: Uint8Array;
                } & Record<Exclude<keyof I["lastCommit"]["blockId"]["partSetHeader"], keyof import("./types").PartSetHeader>, never>;
            } & Record<Exclude<keyof I["lastCommit"]["blockId"], keyof import("./types").BlockID>, never>;
            signatures?: {
                blockIdFlag?: import("./types").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[] & ({
                blockIdFlag?: import("./types").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            } & {
                blockIdFlag?: import("./types").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            } & Record<Exclude<keyof I["lastCommit"]["signatures"][number], keyof import("./types").CommitSig>, never>)[] & Record<Exclude<keyof I["lastCommit"]["signatures"], keyof {
                blockIdFlag?: import("./types").BlockIDFlag;
                validatorAddress?: Uint8Array;
                timestamp?: Date;
                signature?: Uint8Array;
            }[]>, never>;
        } & Record<Exclude<keyof I["lastCommit"], keyof Commit>, never>;
    } & Record<Exclude<keyof I, keyof Block>, never>>(object: I): Block;
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
//# sourceMappingURL=block.d.ts.map