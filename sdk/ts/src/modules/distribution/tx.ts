import {BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx} from "../../core";
import {MsgWithdrawDelegatorReward, MsgFundCommunityPool, MsgSetWithdrawAddress, MsgWithdrawValidatorCommission} from "../../curium/lib/generated/cosmos/distribution/v1beta1/tx";

export const withdrawDelegatorReward = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string,
    options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(client, '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', {
        delegatorAddress,
        validatorAddress,
    } as MsgWithdrawDelegatorReward, options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

export const fundCommunityPool = (
    client: BluzelleClient,
    params: {
        depositor: string,
        amount: { amount: number, denom: 'ubnt' }[],
    },
    options: BroadcastOptions
) =>
  Promise.resolve(sendTx(client, '/cosmos.distribution.v1beta1.MsgFundCommunityPool', {
    amount: params.amount.map(({amount, denom}) => ({amount: amount.toString(), denom})),
    depositor: params.depositor,
  } as MsgFundCommunityPool, options))
    .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

export const setWithdrawAddress = (
    client: BluzelleClient,
    delegatorAddress: string,
    withdrawAddress: string,
    options: BroadcastOptions
) => Promise.resolve(sendTx(client, '/cosmos.distribution.v1beta1.MsgSetWithdrawAddress', {
        delegatorAddress,
        withdrawAddress
    } as MsgSetWithdrawAddress, options ))
        .then(res => res? res as BluzelleTxResponse: {} as BluzelleTxResponse)

export const withdrawValidatorCommission = (
    client: BluzelleClient,
    validatorAddress: string,
    options: BroadcastOptions
) => Promise.resolve(sendTx(client, '/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission', {
    validatorAddress
    } as MsgWithdrawValidatorCommission, options))
        .then(res => res? res as BluzelleTxResponse: {} as BluzelleTxResponse)
