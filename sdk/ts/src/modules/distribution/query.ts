import {
  QueryDelegationTotalRewardsResponse
} from '../../curium/lib/generated/cosmos/distribution/v1beta1/query';
import {
  DelegationDelegatorReward
} from '../../curium/lib/generated/cosmos/distribution/v1beta1/distribution';
import { BluzelleClient } from '../../core';
import { BluzelleCoin } from '../../shared/types';
import { parseLongCoin, sumBluzelleCoins } from '../../shared/parse';

export type BluzelleDelegationTotalRewardsResponse = {
    rewards: BluzelleDelegationDelegatorReward[],
    total: BluzelleCoin[]
}


export type BluzelleDelegationDelegatorReward = {
    reward: BluzelleCoin[],
    validatorAddress: string,
    totalReward: BluzelleCoin
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


