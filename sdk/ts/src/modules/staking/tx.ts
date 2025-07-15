import { BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx } from "../../core";
import { MsgBeginRedelegate, MsgDelegate, MsgEditValidator, MsgUndelegate } from "../../curium/lib/generated/cosmos/staking/v1beta1/tx";

export const delegate = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string,
    amount: number, options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgDelegate', {
        delegatorAddress,
        validatorAddress,
        amount: { denom: 'ubnt', amount: amount.toString() },
    } as MsgDelegate, options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

export const undelegate = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string,
    amount: number,
    options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgUndelegate', {
        delegatorAddress,
        validatorAddress,
        amount: { denom: 'ubnt', amount: amount.toString() },
    } as MsgUndelegate, options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

export const redelegate = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorSrcAddress: string,
    validatorDstAddress: string,
    amount: number,
    options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgBeginRedelegate', {
        delegatorAddress,
        validatorSrcAddress,
        validatorDstAddress,
        amount: { denom: 'ubnt', amount: amount.toString() },
    } as MsgBeginRedelegate, options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

export const editValidator = (params: {
    client: BluzelleClient,
    validatorAddress: string,
    commissionRate: number,
    minSelfDelegation: number,
    description: {
        moniker: string;
        identity: string;
        website: string;
        securityContact: string;
        details: string;
    },
    options: BroadcastOptions,
}): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(params.client, '/cosmos.staking.v1beta1.MsgEditValidator', {
        description: params.description,
        validatorAddress: params.validatorAddress,
        commissionRate: Math.floor(params.commissionRate).toString(),
        minSelfDelegation: Math.floor(params.minSelfDelegation).toString()
    } as MsgEditValidator, params.options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);