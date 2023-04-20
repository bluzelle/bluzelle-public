import {BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx} from "../../core";
import {MsgBeginRedelegate, MsgDelegate, MsgUndelegate} from "../../curium/lib/generated/cosmos/staking/v1beta1/tx";

export const delegate = (
    client: BluzelleClient,
    delegatorAddress: string,
    validatorAddress: string,
    amount: number, options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(client, '/cosmos.staking.v1beta1.MsgDelegate', {
        delegatorAddress,
        validatorAddress,
        amount: {denom: 'ubnt', amount: amount.toString()},
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
        amount: {denom: 'ubnt', amount: amount.toString()},
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
        amount: {denom: 'ubnt', amount: amount.toString()},
    } as MsgBeginRedelegate, options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);

