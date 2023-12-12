import { BluzelleClient } from '../../core';
import {
    PageRequest,
    PageResponse
} from '../../curium/lib/generated/cosmos/base/query/v1beta1/pagination';
import {
    Delegation,
    DelegationResponse,
    HistoricalInfo,
    Params,
    Pool,
    Redelegation,
    RedelegationEntry,
    RedelegationEntryResponse,
    RedelegationResponse,
    UnbondingDelegation,
    UnbondingDelegationEntry,
    Validator
} from '../../curium/lib/generated/cosmos/staking/v1beta1/staking';

import {
    QueryDelegatorDelegationsResponse,
    QueryDelegatorUnbondingDelegationsResponse,
    QueryValidatorsResponse
} from '../../curium/lib/generated/cosmos/staking/v1beta1/query';
import {
    BluzellePageRequest,
    defaultPaginationOptions,
    defaultPaginationResponse
} from '../../shared/pagination';
import { BluzelleCoin } from '../../shared/types';
import { parseCoin, parseDecTypeToNumber, parseNumToLong } from '../../shared/parse';
import { cli } from 'webpack';

/************************Bluzelle Type Definitions for staking query*/
export type BluzelleDelegatorUnbondingDelegationsResponse = {
    unbondingDelegations: BluzelleUnbondingDelegation[],
    pagination: PageResponse,
}

export type BluzelleValidatorUnbondingDelegationsResponse = {
    unbondingDelegations: BluzelleUnbondingDelegation[],
    pagination: PageResponse,
}

export type BluzelleUnbondingDelegation = {
    delegatorAddress: string,
    validatorAddress: string,
    entries: BluzelleUnbondingDelegationEntry[],
    totalBalance: number
}

export type BluzelleUnbondingDelegationEntry = {
    creationHeight: number,
    completionTime: Date,
    initialBalance: number,
    balance: number
}


export type BluzelleDelegatorDelegationsResponse = {
    pagination: PageResponse,
    delegations: BluzelleDelegationResponse[]
}

export type BluzelleDelegationResponse = {
    delegation: BluzelleDelegation,
    balance: BluzelleCoin
}

export type BluzelleDelegation = {
    validatorAddress: string,
    delegatorAddress: string,
    shares: number
}

export type BluzelleValidatorsResponse = {
    pagination: PageResponse,
    validators: BluzelleValidator[]
}

export type BluzelleValidator = {
    operatorAddress: string,
    description: {
        moniker: string,
        details: string,
        website: string,
        securityContact: string,
    },
    commission: {
        commissionRates: {
            rate: number,
            maxRate: number,
            maxChangeRate: number,
        },
        updateTime: Date
    },
    minSelfDelegation: number,
    delegatorShares: number,
    jailed: boolean
}

export type BluzelleValidatorResponse = {
    validator: BluzelleValidator
}

export type BluzelleValidatorDelegationsResponse = {
    delegationResponses: BluzelleDelegation[],
    pagination: PageResponse
}

export type BluzelleQueryRedelegationResponse = {
    redelegation: BluzelleRedelegationResponse[],
    pagination: PageResponse
}

export type BluzelleRedelegationResponse = {
    redelegation: BluzelleRedelegation,
    entries: BluzelleRedelegationEntryResponse[]
}

export type BluzelleRedelegation = {
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    entries: BluzelleRedelegationEntry[]
}

export type BluzelleRedelegationEntryResponse = {
    redelegationEntry: BluzelleRedelegationEntry,
    balance: number
}

export type BluzelleRedelegationEntry = {
    creationHeight: Number;
    completionTime: Date;
    initialBalance: number;
    sharesDst: number;
}

export type BluzelleDelegatorValidatorsResponse = {
    validators: BluzelleValidator[],
    pagination: PageResponse
}

export type BluzelleHistoricalInfo = {
    header: {
        version: {
            block: number,
            app: number
        };
        chainId: string;
        height: number;
        time: Date;
        lastBlockId: string;
        lastCommitHash: string;
        dataHash: string;
        validatorsHash: string;
        nextValidatorsHash: string;
        consensusHash: string;
        appHash: string;
        lastResultsHash: string;
        evidenceHash: string;
        proposerAddress: string;
    },
    valSet: BluzelleValidator[]
}

export type BluzellePool = {
    notBondedTokens: number,
    bondedTokens: number
}

export type BluzelleStakingParams = {
    unbondingTime: {
        seconds: number,
        nanos: number
    },
    maxValidators: number;
    maxEntries: number;
    historicalEntries: number;
    bondDenom: string;
}

/*************************Query interface funtions */

export const getValidatorsInfo = (
    client: BluzelleClient,
    status: 'BOND_STATUS_UNBONDED' | 'BOND_STATUS_UNBONDING' | 'BOND_STATUS_BONDED' = 'BOND_STATUS_BONDED',
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleValidatorsResponse> =>
    client.queryClient.staking.Validators({
        status,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then(parseQueryValidatorsResponse);

export const getValidatorInfo = (client: BluzelleClient, validatorAddr: string): Promise<BluzelleValidatorResponse> =>
    client.queryClient.staking.Validator({ validatorAddr })
        .then((res) => ({ validator: res.validator ? parseValidator(res.validator) : null } as BluzelleValidatorResponse));

export const getValidatorDelegations = (
    client: BluzelleClient,
    validatorAddr: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleValidatorDelegationsResponse> =>
    client.queryClient.staking.ValidatorDelegations({
        validatorAddr,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then((res) => ({
            delegationResponses: res.delegationResponses,
            pagination: res.pagination ? res.pagination : defaultPaginationResponse()
        } as BluzelleValidatorDelegationsResponse))


export const getValiatorUnbondingDelegations = (
    client: BluzelleClient,
    validatorAddr: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleValidatorUnbondingDelegationsResponse> =>
    client.queryClient.staking.ValidatorUnbondingDelegations({
        validatorAddr,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then((res) => ({
            unbondingDelegations: res.unbondingResponses ? res.unbondingResponses.map(parseUnbondingDelegation) : [],
            pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
        } as BluzelleDelegatorUnbondingDelegationsResponse))

export const getDelegation = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleDelegationResponse> =>
    client.queryClient.staking.Delegation({
        delegatorAddr: delegatorAddress,
        validatorAddr: validatorAddress
    })
        .then(res => res.delegationResponse ? parseDelegationResponse(res.delegationResponse) : {
            delegation: {
                validatorAddress,
                delegatorAddress,
                shares: 0
            },
            balance: {
                denom: 'ubnt',
                amount: 0
            }
        } as BluzelleDelegationResponse)
        .catch(() => ({
            delegation: {
                validatorAddress,
                delegatorAddress,
                shares: 0
            },
            balance: {
                denom: 'ubnt',
                amount: 0
            }
        }) as BluzelleDelegationResponse);

export const getUnbondingDelegation = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleUnbondingDelegation> =>
    client.queryClient.staking.UnbondingDelegation({
        delegatorAddr: delegatorAddress,
        validatorAddr: validatorAddress
    })
        .then(res => res.unbond ? parseUnbondingDelegation(res.unbond) : {
            delegatorAddress: '',
            validatorAddress: '',
            entries: [],
            totalBalance: 0
        } as BluzelleUnbondingDelegation)

export const getDelegatorDelegations = (
    client: BluzelleClient,
    delegatorAddress: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleDelegatorDelegationsResponse> =>
    client.queryClient.staking.DelegatorDelegations({
        delegatorAddr: delegatorAddress,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then(parseQueryDelegatorDelegationsResponse);

export const getDelegatorUnbondingDelegations = (
    client: BluzelleClient,
    delegatorAddress: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleDelegatorUnbondingDelegationsResponse> =>
    client.queryClient.staking.DelegatorUnbondingDelegations({
        delegatorAddr: delegatorAddress,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then(parseQueryDelegatorUnbondingDelegationsResponse);

export const getRedelegations = (
    client: BluzelleClient,
    delegatorAddr: string,
    srcValidatorAddr: string,
    dstValidatorAddr: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleQueryRedelegationResponse> =>
    client.queryClient.staking.Redelegations({
        delegatorAddr,
        srcValidatorAddr,
        dstValidatorAddr,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then((res) => ({
            redelegation: res.redelegationResponses.map(parseRedelegationResponse),
            pagination: res.pagination ? res.pagination : defaultPaginationResponse()
        }))

export const getDelegatorValidators = (
    client: BluzelleClient,
    delegatorAddr: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleDelegatorValidatorsResponse> =>
    client.queryClient.staking.DelegatorValidators({
        delegatorAddr,
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .then((res) => ({
            validators: res.validators.map(parseValidator),
            pagination: res.pagination ? res.pagination : defaultPaginationResponse()
        }))

export const getDelegatorValidator = (
    client: BluzelleClient,
    delegatorAddr: string,
    validatorAddr: string
): Promise<BluzelleValidator> =>
    client.queryClient.staking.DelegatorValidator({
        delegatorAddr,
        validatorAddr
    })
        .then((res) => (
            res.validator ? parseValidator(res.validator) : {
                operatorAddress: '',
                description: {
                    moniker: '',
                    details: '',
                    website: '',
                    securityContact: '',
                },
                commission: {
                    commissionRates: {
                        rate: 0,
                        maxRate: 0,
                        maxChangeRate: 0,
                    },
                    updateTime: new Date(0)
                },
                minSelfDelegation: 0,
                delegatorShares: 0,
                jailed: false
            }
        ))

export const getHistoricalInfo = (
    client: BluzelleClient,
    height: number
): Promise<BluzelleHistoricalInfo> =>
    client.queryClient.staking.HistoricalInfo({
        height: parseNumToLong(height)
    })
        .then(res => res.hist ? parseHistoricalInfo(res.hist) : {
            valSet: [],
            header: {
                version: {
                    block: 0,
                    app: 0
                },
                chainId: '',
                height: 0,
                time: new Date(0),
                lastBlockId: '',
                lastCommitHash: '',
                dataHash: '',
                validatorsHash: '',
                nextValidatorsHash: '',
                consensusHash: '',
                appHash: '',
                lastResultsHash: '',
                evidenceHash: '',
                proposerAddress: '',
            }
        });

export const getPoolInfo = (
    client: BluzelleClient,
): Promise<BluzellePool> =>
    client.queryClient.staking.Pool({})
        .then(res => res.pool ? parsePool(res.pool) : {
            notBondedTokens: 0,
            bondedTokens: 0,
        })

export const getStakingParams = (
    client: BluzelleClient
): Promise<BluzelleStakingParams> =>
    client.queryClient.staking.Params({})
        .then(res => res.params ? parseParams(res.params) : {
            unbondingTime: {
                seconds: 0,
                nanos: 0
            },
            maxValidators: 0,
            maxEntries: 0,
            historicalEntries: 0,
            bondDenom: 'ubnt'
        })
/******************* parse functions ********************/
const parseQueryDelegatorDelegationsResponse = (res: QueryDelegatorDelegationsResponse): Promise<BluzelleDelegatorDelegationsResponse> =>
    Promise.resolve(res.delegationResponses.map(parseDelegationResponse))
        .then(delegations => ({
            pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
            delegations,
        }));

const parseDelegationResponse = (res: DelegationResponse): BluzelleDelegationResponse => ({
    delegation: res.delegation ? parseDelegation(res.delegation) : {
        validatorAddress: '',
        delegatorAddress: '',
        shares: 0
    },
    balance: res.balance ? parseCoin(res.balance) : { denom: 'ubnt', amount: 0 }
});

const parseDelegation = (delegation: Delegation): BluzelleDelegation => ({
    validatorAddress: delegation.validatorAddress,
    delegatorAddress: delegation.delegatorAddress,
    shares: parseDecTypeToNumber(delegation.shares)
});

const parseQueryValidatorsResponse = (res: QueryValidatorsResponse): BluzelleValidatorsResponse => ({
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
    validators: res.validators ? res.validators.map(parseValidator) : []
});

const parseValidator = (validator: Validator) => ({
    operatorAddress: validator.operatorAddress,
    description: {
        moniker: validator.description?.moniker || '',
        details: validator.description?.details || '',
        website: validator.description?.website || '',
        securityContact: validator.description?.securityContact || '',
    },
    commission: {
        commissionRates: {
            rate: parseDecTypeToNumber(validator.commission?.commissionRates?.rate || '0'),
            maxRate: parseDecTypeToNumber(validator.commission?.commissionRates?.maxRate || '0'),
            maxChangeRate: parseDecTypeToNumber(validator.commission?.commissionRates?.maxChangeRate || '0'),
        },
        updateTime: validator.commission?.updateTime || new Date(0)
    },
    minSelfDelegation: Number(validator.minSelfDelegation),
    delegatorShares: parseDecTypeToNumber(validator.delegatorShares),
    jailed: validator.jailed
});

const parseQueryDelegatorUnbondingDelegationsResponse = (
    res: QueryDelegatorUnbondingDelegationsResponse
): BluzelleDelegatorUnbondingDelegationsResponse => ({
    unbondingDelegations: res.unbondingResponses.map(parseUnbondingDelegation),
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
});

const parseUnbondingDelegation = (res: UnbondingDelegation): BluzelleUnbondingDelegation => ({
    delegatorAddress: res.delegatorAddress,
    validatorAddress: res.validatorAddress,
    entries: res.entries.map(parseUnbondingDelegationEntry),
    totalBalance: getTotalUnbondingDelegationBalance(res.entries)
});

const getTotalUnbondingDelegationBalance = (entries: UnbondingDelegationEntry[]): number =>
    entries.map(parseUnbondingDelegationEntry).reduce((total, entry) => total + entry.balance, 0);

const parseUnbondingDelegationEntry = (res: UnbondingDelegationEntry): BluzelleUnbondingDelegationEntry => ({
    creationHeight: Number(res.creationHeight),
    completionTime: res.completionTime || new Date(0),
    initialBalance: Number(res.initialBalance),
    balance: Number(res.balance)
});

const parseRedelegationResponse = (redelegationResponse: RedelegationResponse): BluzelleRedelegationResponse => ({
    redelegation: redelegationResponse.redelegation ? parseRedelegation(redelegationResponse.redelegation) :
        {
            delegatorAddress: '',
            validatorDstAddress: '',
            validatorSrcAddress: '',
            entries: []
        },
    entries: redelegationResponse.entries.map(parseRedelegationEntryResponse)
});

const parseRedelegation = (redelegation: Redelegation): BluzelleRedelegation => ({
    delegatorAddress: redelegation.delegatorAddress,
    validatorDstAddress: redelegation.validatorDstAddress,
    validatorSrcAddress: redelegation.validatorSrcAddress,
    entries: redelegation.entries.map(parseRedelegationEntry)
})

const parseRedelegationEntry = (redeletgationEntry: RedelegationEntry): BluzelleRedelegationEntry => ({
    creationHeight: Number(redeletgationEntry.creationHeight),
    completionTime: redeletgationEntry.completionTime || new Date(0),
    initialBalance: Number(redeletgationEntry.initialBalance),
    sharesDst: Number(redeletgationEntry.sharesDst)
});

const parseRedelegationEntryResponse = (res: RedelegationEntryResponse): BluzelleRedelegationEntryResponse => ({
    redelegationEntry: res.redelegationEntry ? parseRedelegationEntry(res.redelegationEntry) : {
        creationHeight: 0,
        completionTime: new Date(0),
        initialBalance: 0,
        sharesDst: 0
    },
    balance: Number(res.balance)

})

const parseHistoricalInfo = (hist: HistoricalInfo): BluzelleHistoricalInfo => ({
    valSet: hist.valset.map(parseValidator),
    header: hist.header ? {
        version: {
            block: hist.header.version ? Number(hist.header.version.block) : 0,
            app: hist.header.version ? Number(hist.header.version.app) : 0
        },
        chainId: hist.header.chainId,
        height: Number(hist.header.height),
        time: hist.header.time ? hist.header.time : new Date(0),
        lastBlockId: hist.header.lastBlockId ? parseUint8ArrayToStr(hist.header.lastBlockId.hash) : '',
        lastCommitHash: parseUint8ArrayToStr(hist.header.lastCommitHash),
        dataHash: parseUint8ArrayToStr(hist.header.dataHash),
        validatorsHash: parseUint8ArrayToStr(hist.header.validatorsHash),
        nextValidatorsHash: parseUint8ArrayToStr(hist.header.nextValidatorsHash),
        consensusHash: parseUint8ArrayToStr(hist.header.consensusHash),
        appHash: parseUint8ArrayToStr(hist.header.appHash),
        lastResultsHash: parseUint8ArrayToStr(hist.header.lastResultsHash),
        evidenceHash: parseUint8ArrayToStr(hist.header.evidenceHash),
        proposerAddress: parseUint8ArrayToStr(hist.header.proposerAddress),
    } : {
        version: {
            block: 0,
            app: 0
        },
        chainId: '',
        height: 0,
        time: new Date(0),
        lastBlockId: '',
        lastCommitHash: '',
        dataHash: '',
        validatorsHash: '',
        nextValidatorsHash: '',
        consensusHash: '',
        appHash: '',
        lastResultsHash: '',
        evidenceHash: '',
        proposerAddress: '',
    }
})

const parseUint8ArrayToStr = (val: Uint8Array): string => {
    const decoder = new TextDecoder();
    return decoder.decode(val);
}

const parsePool = (pool: Pool): BluzellePool => ({
    notBondedTokens: Number(pool.notBondedTokens),
    bondedTokens: Number(pool.bondedTokens)
})

const parseParams = (params: Params): BluzelleStakingParams => ({
    unbondingTime: params.unbondingTime ? {
        seconds: Number(params.unbondingTime.seconds),
        nanos: Number(params.unbondingTime.nanos)
    } : {
        seconds: 0,
        nanos: 0
    },
    maxValidators: params.maxValidators,
    maxEntries: params.maxEntries,
    historicalEntries: params.historicalEntries,
    bondDenom: params.bondDenom
})