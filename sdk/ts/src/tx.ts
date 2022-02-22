import {BluzelleClient} from "./sdk";
import {MsgPin} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/tx";
import {EncodeObject, Registry} from "@cosmjs/proto-signing";
import {Deferred, newDeferred} from 'deferred/src/Deferred'
import {Left, Right, Some} from "monet";
import {passThrough} from "promise-passthrough";
import {identity} from "lodash";
import {BroadcastTxResponse} from "@cosmjs/stargate/build/stargateclient";
import {MsgSend} from "./generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/tx";
import {Coin} from "./generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/base/v1beta1/coin";
import {
    MsgSetGasTaxBp,
    MsgSetTaxCollector,
    MsgSetTransferTaxBp
} from "./generated/bluzelle/curium/bluzelle.curium.tax/module/types/tax/tx";

interface MsgQueueItem<T> {
    msg: EncodeObject;
    options: BroadcastOptions;
    deferred: Deferred<T>;
}

type MsgQueue = MsgQueueItem<unknown>[] | undefined;

let msgQueue: MsgQueue;

export const withTransaction = (client: BluzelleClient, fn: () => unknown) => {
    startTransaction();
    fn();
    const queue: MsgQueue = msgQueue || [];
    msgQueue = undefined;
    return endTransaction(queue, client)
        .then(passThrough(response => queue.map((it, idx) =>
            it.deferred.resolve({...response, rawLog: response.rawLog?.[idx]})
        )))

}

const startTransaction = () => msgQueue = [];
const endTransaction = (queue: MsgQueue, client: BluzelleClient) => {
    return broadcastTx(client, (queue || []).map(it => it.msg), combineOptions(queue))


    function combineOptions(queue: MsgQueue) {
        return (queue || []).reduce((options, item) => ({
            ...options,
            maxGas: options.maxGas + item.options.maxGas,
            gasPrice: item.options.gasPrice
        }), {maxGas: 0} as BroadcastOptions)
    }
}


export const registerMessages = (registry: Registry) => {
    registry.register('/bluzelle.curium.storage.MsgPin', MsgPin);
    registry.register('/cosmos.bank.v1beta1.MsgSend', MsgSend)
    registry.register('/bluzelle.curium.tax.MsgSetGasTaxBp', MsgSetGasTaxBp)
    registry.register('/bluzelle.curium.tax.MsgSetTransferTaxBp', MsgSetTransferTaxBp)
    registry.register('/bluzelle.curium.tax.MsgSetTaxCollector', MsgSetTaxCollector)
    return registry
}

export interface BroadcastOptions {
    gasPrice: number,
    maxGas: number,
    memo?: string
}

const queueMessage = (msg: EncodeObject, options: BroadcastOptions) =>
    Some<MsgQueueItem<unknown>>({
        msg, options, deferred: newDeferred()
    })
        .map(passThrough(item => msgQueue?.push(item)))


export const pinCid = (client: BluzelleClient, cid: string, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.storage.MsgPin', {cid, creator: client.address}, options);

export const send = (client: BluzelleClient, toAddress: string, amount: Coin[], options: BroadcastOptions) =>
    sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {toAddress, amount, fromAddress: client.address}, options);

export const setGasTaxBp = (client: BluzelleClient, bp: number, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetGasTaxBp', {bp, creator: client.address}, options)

export const setTransferTaxBp = (client: BluzelleClient, bp: number, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetTransferTaxBp', {bp, creator: client.address}, options)

export const setTaxCollector = (client: BluzelleClient, taxCollector: string, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetTaxCollector', {taxCollector, creator: client.address}, options)

const sendTx = <T>(client: BluzelleClient, type: string, msg: T, options: BroadcastOptions) =>
    Right(msg)
        .map(msg => ({
            typeUrl: type,
            value: msg
        } as EncodeObject))
        .bind(msg => msgQueue ? Left(msg) : Right(msg))
        .map(msg => broadcastTx(client, [msg as EncodeObject], options))
        .leftMap(msg => queueMessage(msg as EncodeObject, options))
        .cata(identity, identity);

const broadcastTx = <T>(client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions): Promise<BroadcastTxResponse> =>
    client.sgClient.signAndBroadcast(
        client.address,
        msgs,
        {
            gas: options.maxGas.toFixed(0), amount: [{
                denom: 'ubnt',
                amount: (options.gasPrice * options.maxGas).toFixed(0)
            }]
        },
        options.memo)
        .then(response => ({
            ...response,
            rawLog: typeof response.rawLog === "string" ? response.rawLog : JSON.parse(response.rawLog || '[]')
        }))
