import { throwError } from "rxjs";
import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";
import {MsgMultiSend, MsgSend} from "../../curium/lib/generated/cosmos/bank/v1beta1/tx";
import { Input, Output } from "../../curium/lib/generated/cosmos/bank/v1beta1/bank";

export const send = (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions, denom: string = "ubnt") =>
    sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
        toAddress: toAddress,
        amount: [{denom, amount: amount.toString()}],
        fromAddress: client.address
    } as MsgSend, options);

export const multiSend = ( client: BluzelleClient, 
    outputAddresses: string[], 
    amounts: number[], 
    denoms: string[], 
    options: BroadcastOptions 
) => {
    if(outputAddresses.length == amounts.length && outputAddresses.length == denoms.length){
        const inputs: Input[] = [];
        const outputs: Output[] = [];
        outputAddresses.map((addr, idx) => {
            inputs.push({
                address: client.address,
                coins: [{
                    amount: amounts[idx].toString(),
                    denom: denoms[idx]
                }]
            });
            outputs.push({
                address: addr,
                coins: [{
                    amount: amounts[idx].toString(),
                    denom: denoms[idx]
                }]
            })
        });
        return sendTx(client, '/cosmos.bank.v1beta1.MsgMultiSend', {
            inputs, 
            outputs
        } as MsgMultiSend, options)
    }
    else{
        throwError('Inputs are invalid. outputAddresses, amounts, denoms should have same length.');
    }
}