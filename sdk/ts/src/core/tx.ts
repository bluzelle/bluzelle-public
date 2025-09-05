import { BluzelleClient } from './sdk';
import { EncodeObject } from '@cosmjs/proto-signing';
import { Deferred, newDeferred } from '../utils/Deferred';
import { Left, Right, Some } from 'monet';
import { passThrough } from 'promise-passthrough';
import { identity } from 'lodash';
import { DeliverTxResponse } from '@cosmjs/stargate';
import { toHex } from '@cosmjs/encoding';
import { TxRaw } from '../curium/lib/generated/cosmos/tx/v1beta1/tx';

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
            it.deferred.resolve({ ...response, rawLog: response.rawLog?.[idx] })
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
        }), { maxGas: 0 } as BroadcastOptions)
    }
};

export interface BroadcastOptions {
    gasPrice: number,
    maxGas: number,
    mode?: 'async' | 'sync',
    memo?: string,
    feeGranter?: string
}

const queueMessage = (msg: EncodeObject, options: BroadcastOptions) =>
    Some<MsgQueueItem<unknown>>({
        msg, options, deferred: newDeferred()
    })
        .map(passThrough(item => msgQueue?.push(item)));


export const sendTx = <T>(client: BluzelleClient, type: string, msg: T, options: BroadcastOptions, mode: BroadcastMode = getDefaultBroadcastMode()) =>
    Right(msg)
        .map(msg => ({
            typeUrl: type,
            value: msg
        } as EncodeObject))
        .bind(msg => msgQueue ? Left(msg) : Right(msg))
        .map(msg => options.mode ? mode[options.mode](client, [msg as EncodeObject], options) : mode['sync'](client, [msg as EncodeObject], options))
        .leftMap(msg => queueMessage(msg as EncodeObject, options))
        .cata(identity, identity);

const broadcastTx = <T>(client: BluzelleClient, msgs: EncodeObject[], options: BroadcastOptions): Promise<DeliverTxResponse> =>
    client.sgClient.signAndBroadcast(
        client.address,
        msgs,
        {
            gas: options.maxGas.toFixed(0), 
            amount: [{
                denom: 'ubnt',
                amount: (options.gasPrice * options.maxGas).toFixed(0)
            }],
            granter: options.feeGranter
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
            gas: options.maxGas.toFixed(0), 
            amount: [{
                denom: 'ubnt',
                amount: (options.gasPrice * options.maxGas).toFixed(0)
            }],
            granter: options.feeGranter
        },
        options.memo || ""
    )
        .then(txRaw => TxRaw.encode(txRaw).finish())
        .then(txBytes =>
            client.tmClient.broadcastTxAsync({
                tx: txBytes
            }))
        .then(({ hash }) => toHex(hash).toUpperCase());

const tryJson = (s: string = '') => {
    try {
        return JSON.parse(s)
    } catch (e) {
        return s
    }
};
