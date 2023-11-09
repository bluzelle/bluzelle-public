import {
  QueryDelegationTotalRewardsResponse, QueryDelegatorWithdrawAddressResponse, QueryValidatorSlashesResponse
} from '../../curium/lib/generated/cosmos/distribution/v1beta1/query';
import {
  DelegationDelegatorReward
} from '../../curium/lib/generated/cosmos/distribution/v1beta1/distribution';
import { BluzelleClient } from '../../core';
import { BluzelleCoin } from '../../shared/types';
import { parseLongCoin, parseNumToLong, sumBluzelleCoins } from '../../shared/parse';
import { QueryParamsResponse } from '../../curium/lib/generated/faucet/query';
import { BluzellePageRequest, defaultPaginationOptions } from '../../shared/pagination';
import { PageRequest } from '../../curium/lib/generated/cosmos/base/query/v1beta1/pagination';
import { QueryDelegatorValidatorsResponse } from '../../curium/lib/generated/cosmos/distribution/v1beta1/query';

export type BluzelleDelegationTotalRewardsResponse = {
    rewards: BluzelleDelegationDelegatorReward[],
    total: BluzelleCoin[]
}


export type BluzelleDelegationDelegatorReward = {
    reward: BluzelleCoin[],
    validatorAddress: string,
    totalReward: BluzelleCoin
}

export type DistributionParamsType = {
    communityTax: string;
    baseProposerReward: string;
    bonusProposerReward: string;
    withdrawAddrEnabled: boolean;
}

export const getDelegationRewards = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string
): Promise<BluzelleCoin[]> =>
    client.queryClient.distribution.DelegationRewards({
        delegatorAddress,
        validatorAddress
    })
        .then(res => res.rewards ? res.rewards.map(parseLongCoin) : []);


export const getDelegationTotalRewards = (
    client: BluzelleClient,
    delegatorAddress: string
): Promise<BluzelleDelegationTotalRewardsResponse> =>
    client.queryClient.distribution.DelegationTotalRewards({
        delegatorAddress
    })
        .then(parseQueryDelegationTotalRewardsResponse);

export const getParams = (client: BluzelleClient) : Promise<DistributionParamsType> => 
    client.queryClient.distribution.Params({})
        .then((result) => result.params as DistributionParamsType);

export const getCommission = (client: BluzelleClient, validatorAddress: string): Promise<BluzelleCoin[]> => 
    client.queryClient.distribution.ValidatorCommission({
        validatorAddress
    })
        .then((result) => result.commission? result.commission.commission.map(parseLongCoin): [])

export const getOutstandingRewards = (client: BluzelleClient, validatorAddress: string) : Promise<BluzelleCoin[]> =>
    client.queryClient.distribution.ValidatorOutstandingRewards({validatorAddress})
        .then(res => res.rewards ? res.rewards.rewards.map(parseLongCoin) : []);

export const getSlashes = (client: BluzelleClient, 
    validatorAddress: string, 
    startingHeight: number, 
    endingHeight: number,
    options: BluzellePageRequest = defaultPaginationOptions()
) : Promise<QueryValidatorSlashesResponse> => 
    client.queryClient.distribution.ValidatorSlashes({
        validatorAddress,
        startingHeight: parseNumToLong(startingHeight),
        endingHeight: parseNumToLong(endingHeight),
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })

export const getDelegatorValidators = (client: BluzelleClient, delegatorAddress: string): Promise<QueryDelegatorValidatorsResponse> => 
    client.queryClient.distribution.DelegatorValidators({
        delegatorAddress
    })
        
export const getWithdrawAddress = (client: BluzelleClient, delegatorAddress: string): Promise<string> =>
    client.queryClient.distribution.DelegatorWithdrawAddress({
        delegatorAddress
    })
    .then((result) => result.withdrawAddress)

export const getCommunityPoolBalances = (client: BluzelleClient) : Promise<BluzelleCoin[]> =>
    client.queryClient.distribution.CommunityPool({})
        .then (result => result.pool? result.pool.map(parseLongCoin): [] );

const parseQueryDelegationTotalRewardsResponse = (res: QueryDelegationTotalRewardsResponse): Promise<BluzelleDelegationTotalRewardsResponse> =>
    Promise.all(res.rewards.map(parseDelegationDelegatorReward))
        .then(rewards => ({
            rewards,
            total: res.total.map(parseLongCoin)
        }));


const parseDelegationDelegatorReward = (delegatorReward: DelegationDelegatorReward): Promise<BluzelleDelegationDelegatorReward> =>
    Promise.resolve(delegatorReward.reward.map(parseLongCoin))
        .then(reward => ({
            reward: reward,
            validatorAddress: delegatorReward.validatorAddress,
            totalReward: sumBluzelleCoins(reward)
        }));


