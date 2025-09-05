import {BluzelleClient, BluzelleTxResponse, BroadcastOptions, sendTx} from "../../core";
import {MsgGrantAllowance, MsgRevokeAllowance} from "../../curium/lib/generated/cosmos/feegrant/v1beta1/tx";
import {BasicAllowance} from "../../curium/lib/generated/cosmos/feegrant/v1beta1/feegrant";
import {AllowedMsgAllowance, PeriodicAllowance} from "cosmjs-types/cosmos/feegrant/v1beta1/feegrant";
import {Timestamp} from "cosmjs-types/google/protobuf/timestamp";
import {BluzelleCoin} from '../../shared/types';


const dateToTimestamp = (date: Date): Timestamp => ({
    seconds: BigInt(Math.floor(date.getTime() / 1000)),
    nanos: (date.getTime() % 1000) * 1000000
});


const secondsToTimestamp = (seconds: number): Timestamp => ({
    seconds: BigInt(seconds),
    nanos: 0
});


export const grantBasicAllowance = (params: {
    client: BluzelleClient,
    granter: string,
    grantee: string,
    spendLimit: BluzelleCoin[],
    expiration: Date
    options: BroadcastOptions
}): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(params.client, '/cosmos.feegrant.v1beta1.MsgGrantAllowance', {
        granter: params.granter,
        grantee: params.grantee,
        allowance: {
            typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
            value: BasicAllowance.encode({
                spendLimit: params.spendLimit.map(coin => ({
                    denom: coin.denom,
                    amount: coin.amount.toString()
                })),
                expiration: params.expiration
            }).finish()
        }
    } as MsgGrantAllowance, params.options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const grantPeriodicAllowance= (params: {
    client: BluzelleClient,
    granter: string,
    grantee: string,
    spendLimit: BluzelleCoin[],
    periodSpendLimit: BluzelleCoin[],
    periodCanSpend: BluzelleCoin[],
    expiration: Date,
    periodReset: Date,
    periodSeconds: number,
    options: BroadcastOptions
}): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(params.client, '/cosmos.feegrant.v1beta1.MsgGrantAllowance', {
        granter: params.granter,
        grantee: params.grantee,
        allowance: {
            typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
            value: PeriodicAllowance.encode({
                basic: {
                    spendLimit: params.spendLimit.map(coin => ({
                        denom: coin.denom,
                        amount: coin.amount.toString()
                    })),
                    expiration: dateToTimestamp(params.expiration)
                },
                periodSpendLimit: params.periodSpendLimit.map(coin => ({
                    denom: coin.denom,
                    amount: coin.amount.toString()
                })),
                periodCanSpend: params.periodCanSpend.map(coin => ({
                    denom: coin.denom,
                    amount: coin.amount.toString()
                })),
                periodReset: dateToTimestamp(params.periodReset),
                period: secondsToTimestamp(params.periodSeconds)
            }).finish()
        }
    } as MsgGrantAllowance, params.options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);




export const grantAllowedMsgAllowance = (params: {
    client: BluzelleClient,
    granter: string,
    grantee: string,
    spendLimit: BluzelleCoin[],
    expiration: Date,
    allowedMessages: string[],
    options: BroadcastOptions
}): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(params.client, '/cosmos.feegrant.v1beta1.MsgGrantAllowance', {
        granter: params.granter,
        grantee: params.grantee,
        allowance: {
            typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
            value: AllowedMsgAllowance.encode({
                allowance: {
                    typeUrl: '/cosmos.feegrant.v1beta1.BasicAllowance',
                    value: BasicAllowance.encode({
                        spendLimit: params.spendLimit.map(coin => ({
                            denom: coin.denom,
                            amount: coin.amount.toString()
                        })),
                        expiration: params.expiration
                    }).finish()
                },
                allowedMessages: params.allowedMessages
            }).finish()
        }
    } as MsgGrantAllowance, params.options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


export const grantAllowedMsgPeriodicAllowance = (params: {
    client: BluzelleClient,
    granter: string,
    grantee: string,
    spendLimit: BluzelleCoin[],
    periodSpendLimit: BluzelleCoin[],
    periodCanSpend: BluzelleCoin[],
    expiration: Date,
    periodReset: Date,
    periodSeconds: number,
    allowedMessages: string[],
    options: BroadcastOptions
}): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(params.client, '/cosmos.feegrant.v1beta1.MsgGrantAllowance', {
        granter: params.granter,
        grantee: params.grantee,
        allowance: {
            typeUrl: '/cosmos.feegrant.v1beta1.AllowedMsgAllowance',
            value: AllowedMsgAllowance.encode({
                allowance: {
                    typeUrl: '/cosmos.feegrant.v1beta1.PeriodicAllowance',
                    value: PeriodicAllowance.encode({
                        basic: {
                            spendLimit: params.spendLimit.map(coin => ({
                                denom: coin.denom,
                                amount: coin.amount.toString()
                            })),
                            expiration: dateToTimestamp(params.expiration)
                        },
                        periodSpendLimit: params.periodSpendLimit.map(coin => ({
                            denom: coin.denom,
                            amount: coin.amount.toString()
                        })),
                        periodCanSpend: params.periodCanSpend.map(coin => ({
                            denom: coin.denom,
                            amount: coin.amount.toString()
                        })),
                        periodReset: dateToTimestamp(params.periodReset),
                        period: secondsToTimestamp(params.periodSeconds)
                    }).finish()
                },
                allowedMessages: params.allowedMessages
            }).finish()
        }
    } as MsgGrantAllowance, params.options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);



export const revokeAllowance = (params: {
    client: BluzelleClient,
    granter: string,
    grantee: string,
    options: BroadcastOptions
}): Promise<BluzelleTxResponse> =>
    Promise.resolve(sendTx(params.client, '/cosmos.feegrant.v1beta1.MsgRevokeAllowance', {
        granter: params.granter,
        grantee: params.grantee,
    } as MsgRevokeAllowance, params.options))
        .then(res => res ? res as BluzelleTxResponse : {} as BluzelleTxResponse);


