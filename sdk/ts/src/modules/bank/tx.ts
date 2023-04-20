import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";
import {MsgSend} from "../../curium/lib/generated/cosmos/bank/v1beta1/tx";

export const send = (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions, denom: string = "ubnt") =>
    sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
        toAddress: toAddress,
        amount: [{denom, amount: amount.toString()}],
        fromAddress: client.address
    } as MsgSend, options);