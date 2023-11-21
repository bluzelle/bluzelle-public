import { throwError } from "rxjs";
import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";
import {MsgMultiSend, MsgSend} from "../../curium/lib/generated/cosmos/bank/v1beta1/tx";
import { Input, Output } from "../../curium/lib/generated/cosmos/bank/v1beta1/bank";
import { Coin } from "@cosmjs/proto-signing";


export type MultiSendParam = {
    outputAddress: string,
    coins: Coin[]
}

export const send = (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions, denom: string = "ubnt") =>
    sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
        toAddress: toAddress,
        amount: [{denom, amount: amount.toString()}],
        fromAddress: client.address
    } as MsgSend, options);

export const multiSend = ( client: BluzelleClient, 
    params: MultiSendParam[], 
    options: BroadcastOptions 
) => {
        const inputs: Input[] = [];
        const outputs: Output[] = [];
        params.map((param, idx) => {
            inputs.push({
                address: client.address,
                coins: param.coins
            });
            outputs.push({
                address: param.outputAddress,
                coins: param.coins
            })
        });
        return sendTx(client, '/cosmos.bank.v1beta1.MsgMultiSend', {
            inputs, 
            outputs
        } as MsgMultiSend, options)
    }