import {BluzelleClient} from "./sdk";
import {MsgPin} from "./curium/lib/generated/storage/tx";
import {EncodeObject, Registry} from "@cosmjs/proto-signing";
import {Deferred, newDeferred} from './utils/Deferred'
import {Left, Right, Some} from "monet";
import {passThrough} from "promise-passthrough";
import {identity} from "lodash";
import {MsgSend} from "./curium/lib/generated/cosmos/bank/v1beta1/tx";
import {
    MsgSetGasTaxBp,
    MsgSetTaxCollector,
    MsgSetTransferTaxBp
} from "./curium/lib/generated/tax/tx";
import {MsgDelegate, MsgUndelegate, MsgBeginRedelegate} from "./curium/lib/generated/cosmos/staking/v1beta1/tx";
import {MsgWithdrawDelegatorReward} from "./curium/lib/generated/cosmos/distribution/v1beta1/tx";
import {DeliverTxResponse} from "@cosmjs/stargate";
import {toHex} from '@cosmjs/encoding'
import {TxRaw} from "./curium/lib/generated/cosmos/tx/v1beta1/tx"
interface MsgQueueItem<T> {
    msg: EncodeObject;
    options: BroadcastOptions;
    deferred: Deferred<T>;
}

type MsgQueue = MsgQueueItem<unknown>[] | undefined;

let msgQueue: MsgQueue;

export interface BroadcastMode {
    async: (client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions) => Promise<string>
    sync: (client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions) => Promise<DeliverTxResponse>
}

const getDefaultBroadcastMode = () => ({
    async: broadcastTxAsync,
    sync: broadcastTx
})

export type BluzelleTxResponse = DeliverTxResponse;

export const withTransaction = (client: BluzelleClient, fn: () => unknown) => {
    startTransaction();
    fn();
    const queue: MsgQueue = msgQueue || [];
    msgQueue = undefined;
    return endTransaction(queue, client)
        .then(passThrough(response => queue.map((it, idx) =>
            it.deferred.resolve({...response, rawLog: response.rawLog?.[idx]})
        )))

};

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
};


export const registerMessages = (registry: Registry) => {
    registry.register('/bluzelle.curium.storage.MsgPin', MsgPin);
    registry.register('/cosmos.bank.v1beta1.MsgSend', MsgSend)
    registry.register('/bluzelle.curium.tax.MsgSetGasTaxBp', MsgSetGasTaxBp)
    registry.register('/bluzelle.curium.tax.MsgSetTransferTaxBp', MsgSetTransferTaxBp)
    registry.register('/bluzelle.curium.tax.MsgSetTaxCollector', MsgSetTaxCollector)
    registry.register('/cosmos.staking.v1beta1.MsgDelegate', MsgDelegate)
    registry.register('/cosmos.staking.v1beta1.MsgUndelegate', MsgUndelegate)
    registry.register('/cosmos.staking.v1beta1.MsgBeginRedelegate', MsgBeginRedelegate)
    registry.register('/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward', MsgWithdrawDelegatorReward)
    return registry
};

 export interface BroadcastOptions {
    gasPrice: number,
    maxGas: number,
    mode?: 'async' | 'sync',
    memo?: string
}

const queueMessage = (msg: EncodeObject, options: BroadcastOptions) =>
    Some<MsgQueueItem<unknown>>({
        msg, options, deferred: newDeferred()
    })
        .map(passThrough(item => msgQueue?.push(item)));


export const pinCid = (client: BluzelleClient, cid: string, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.storage.MsgPin', {cid, creator: client.address}, options);

export const send = (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions, denom: string = "ubnt") =>
    sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
        toAddress: toAddress,
        amount: [{denom, amount: amount.toString()}],
        fromAddress: client.address
    } as MsgSend, options);

export const setGasTaxBp = (client: BluzelleClient, bp: number, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetGasTaxBp', {bp, creator: client.address}, options);

export const setTransferTaxBp = (client: BluzelleClient, bp: number, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetTransferTaxBp', {bp, creator: client.address}, options);

export const setTaxCollector = (client: BluzelleClient, taxCollector: string, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetTaxCollector', {taxCollector, creator: client.address}, options);

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

const sendTx = <T>(client: BluzelleClient, type: string, msg: T, options: BroadcastOptions, mode: BroadcastMode = getDefaultBroadcastMode()) =>
    Right(msg)
        .map(msg => ({
            typeUrl: type,
            value: msg
        } as EncodeObject))
        .bind(msg => msgQueue ? Left(msg) : Right(msg))
        .map(msg => options.mode? mode[options.mode](client, [msg as EncodeObject], options): mode['sync'](client, [msg as EncodeObject], options))
        .leftMap(msg => queueMessage(msg as EncodeObject, options))
        .cata(identity, identity);

const broadcastTx = <T>(client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions): Promise<DeliverTxResponse> =>
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
            rawLog: tryJson(response.rawLog)
        }));

const broadcastTxAsync = <T>(client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions): Promise<string> =>
    client.sgClient.sign(
        client.address,
        msgs,
        {
            gas: options.maxGas.toFixed(0), amount: [{
                denom: 'ubnt',
                amount: (options.gasPrice * options.maxGas).toFixed(0)
            }]
        },
        options.memo || ""
        )
        .then(txRaw => TxRaw.encode(txRaw).finish())
        .then(txBytes =>
            client.tmClient.broadcastTxAsync({
            tx: txBytes}))
        .then(({hash}) => toHex(hash).toUpperCase());

const tryJson = (s: string = '') => {
    try {
        return JSON.parse(s)
    } catch(e) {return s}
};
