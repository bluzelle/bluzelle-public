import {BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx} from "../../core";
import {MsgWithdrawDelegatorReward} from "../../curium/lib/generated/cosmos/distribution/v1beta1/tx";

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