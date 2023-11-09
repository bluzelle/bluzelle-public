import { BluzelleClient } from './sdk';
import { MsgPin } from '../curium/lib/generated/storage/tx';
import { EncodeObject, Registry } from '@cosmjs/proto-signing';
import { Deferred, newDeferred } from '../utils/Deferred';
import { Left, Right, Some } from 'monet';
import { passThrough } from 'promise-passthrough';
import { identity } from 'lodash';
import { MsgSend } from '../curium/lib/generated/cosmos/bank/v1beta1/tx';
import {
    MsgCreateCollection,
    MsgCreateNFT,
    MsgPrintEdition,
    MsgSignMetadata,
    MsgTransferNFT,
    MsgUpdateCollectionMutableUri,
    MsgUpdateCollectionUri,
    MsgUpdateMetadata,
    MsgUpdateMetadataAuthority,
    MsgUpdateMintAuthority
} from '../curium/lib/generated/nft/tx';
import {
    MsgSetGasTaxBp,
    MsgSetTaxCollector,
    MsgSetTransferTaxBp
} from '../curium/lib/generated/tax/tx';
import {
    MsgBeginRedelegate,
    MsgDelegate,
    MsgUndelegate
} from '../curium/lib/generated/cosmos/staking/v1beta1/tx';
import {
    MsgFundCommunityPool,
    MsgSetWithdrawAddress,
    MsgWithdrawDelegatorReward,
    MsgWithdrawValidatorCommission
} from '../curium/lib/generated/cosmos/distribution/v1beta1/tx';
import { MsgExec, MsgGrant, MsgRevoke } from '../curium/lib/generated/cosmos/authz/v1beta1/tx';
import { MsgCreateVestingAccount } from '../curium/lib/generated/cosmos/vesting/v1beta1/tx';
import {
    MsgDeposit,
    MsgSubmitProposal,
    MsgVote,
    MsgVoteWeighted
} from '../curium/lib/generated/cosmos/gov/v1beta1/tx';
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
    registry.register('/cosmos.distribution.v1beta1.MsgFundCommunityPool', MsgFundCommunityPool)
    registry.register('/cosmos.distribution.v1beta1.MsgSetWithdrawAddress', MsgSetWithdrawAddress)
    registry.register('/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission', MsgWithdrawValidatorCommission)
    registry.register('/bluzelle.curium.nft.MsgCreateNFT', MsgCreateNFT)
    registry.register('/bluzelle.curium.nft.MsgCreateCollection', MsgCreateCollection)
    registry.register('/bluzelle.curium.nft.MsgTransferNFT', MsgTransferNFT)
    registry.register('/bluzelle.curium.nft.MsgUpdateMintAuthority', MsgUpdateMintAuthority)
    registry.register('/bluzelle.curium.nft.MsgUpdateMetadata', MsgUpdateMetadata)
    registry.register('/bluzelle.curium.nft.MsgUpdateMetadataAuthority', MsgUpdateMetadataAuthority)
    registry.register('/bluzelle.curium.nft.MsgPrintEdition', MsgPrintEdition)
    registry.register('/bluzelle.curium.nft.MsgSignMetadata', MsgSignMetadata)
    registry.register('/cosmos.authz.v1beta1.MsgGrant', MsgGrant)
    registry.register('/cosmos.authz.v1beta1.MsgExec', MsgExec)
    registry.register('/cosmos.authz.v1beta1.MsgRevoke', MsgRevoke)
    registry.register('/bluzelle.curium.nft.MsgUpdateCollectionUri', MsgUpdateCollectionUri)
    registry.register('/bluzelle.curium.nft.MsgUpdateCollectionMutableUri', MsgUpdateCollectionMutableUri)
    registry.register('/cosmos.vesting.v1beta1.MsgCreateVestingAccount', MsgCreateVestingAccount)
    registry.register('/cosmos.gov.v1beta1.MsgSubmitProposal', MsgSubmitProposal)
    registry.register('/cosmos.gov.v1beta1.MsgVote', MsgVote)
    registry.register('/cosmos.gov.v1beta1.MsgVoteWeighted', MsgVoteWeighted)
    registry.register('/cosmos.gov.v1beta1.MsgDeposit', MsgDeposit)

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
                tx: txBytes
            }))
        .then(({hash}) => toHex(hash).toUpperCase());

const tryJson = (s: string = '') => {
    try {
        return JSON.parse(s)
    } catch (e) {
        return s
    }
};
