import {BluzelleClient} from "./sdk";
import {MsgPin} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/tx";
import {Registry} from "@cosmjs/proto-signing";

export const registerMessages = (registry: Registry) => {
    registry.register('/bluzelle.curium.storage.MsgPin', MsgPin);
    return registry
}

export interface BroadcastOptions {
    gasPrice: number,
    maxGas: number,
    memo?: string
}

export const pinCid = (client: BluzelleClient, cid: string, options: BroadcastOptions) =>
    sendTx(client, 'storage.MsgPin', {cid, creator: client.address}, options);

const sendTx = <T>(client: BluzelleClient, type: string, msg: T, options: BroadcastOptions) =>
    Promise.resolve(msg)
        .then(msg => ({
            typeUrl: `/bluzelle.curium.${type}`,
            value: msg
        }))
        .then(msg => client.sgClient.signAndBroadcast(
            client.address,
            [msg],
            {
                gas: options.maxGas.toFixed(0), amount: [{
                    denom: 'ubnt',
                    amount: (options.gasPrice * options.maxGas).toFixed(0)
                }]
            },
            options.memo,
        ))