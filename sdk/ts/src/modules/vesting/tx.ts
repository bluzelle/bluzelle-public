import {BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx} from "../../core";
import {MsgCreateVestingAccount} from "../../curium/lib/generated/cosmos/vesting/v1beta1/tx";
import {Some} from "monet";

const Long = require('long');

type BluzelleCreateVestingAccountParams = {
        fromAddress: string,
        toAddress: string,
        amount: {denom: 'ubnt' | 'uelt' | 'ug4', amount: number | string}[],
        endTime: number | string,
        delayed: boolean,
}

export const createVestingAccount = (
    client: BluzelleClient,
    params: BluzelleCreateVestingAccountParams,
    options: BroadcastOptions
): Promise<BluzelleTxResponse> =>
    Promise.resolve(
        sendTx(
            client,
            '/cosmos.vesting.v1beta1.MsgCreateVestingAccount',
            parseBluzelleCreateVestingAccountParamsToMsgCreateVestingAccount(params),
            options
        ))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


const parseBluzelleCreateVestingAccountParamsToMsgCreateVestingAccount = (params: BluzelleCreateVestingAccountParams): MsgCreateVestingAccount =>
    Some(
        params.amount.reduce<{ denom: string; amount: string }[]>(
            (acc, cur) => {
                    acc.push({ denom: cur.denom, amount: cur.amount.toString() });
                    return acc;
            },
            []
        )
    )
        .map((amount) => ({
                fromAddress: params.fromAddress,
                toAddress: params.toAddress,
                amount: amount,
                endTime: new Long(params.endTime),
                delayed: params.delayed,
        }))
        .join();
