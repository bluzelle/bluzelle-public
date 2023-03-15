import { BluzelleClient } from "./sdk"
import { BluzelleTxResponse, executeGrant, grant, revoke } from "./tx"
import { GenericAuthorization } from "./curium/lib/generated/cosmos/authz/v1beta1/authz"
import { SendAuthorization } from "./curium/lib/generated/cosmos/bank/v1beta1/authz"
import { Coin } from "./curium/lib/generated/cosmos/base/v1beta1/coin"
import { StakeAuthorization, StakeAuthorization_Validators, AuthorizationType } from "./curium/lib/generated/cosmos/staking/v1beta1/authz"
import { Any } from "./curium/lib/generated/google/protobuf/any"
import { MsgMapping, MsgType } from "./msg"
import { QueryGrantsResponse } from "./curium/lib/generated/cosmos/authz/v1beta1/query"
export interface GenericAuthorizationParams {
    granter: string,
    grantee: string,
    msg: MsgType,
    expiration: Date
}

export interface SendAuthorizationParams {
    granter: string,
    grantee: string,
    spendLimit: Coin[]
    expiration: Date
}

export interface StakeAuthorizationParams {
    granter: string,
    grantee: string,
    maxTokens?: Coin,
    allowList?: StakeAuthorization_Validators,
    denyList?: StakeAuthorization_Validators,
    authorizationType: AuthorizationType,
    expiration: Date
}

export interface RevokeAuthorizationParams {
    granter: string,
    grantee: string,
    msg: MsgType
}

export interface ExecuteAuthorizationParams {
    grantee: string,
    msgs: Any[]
}

export interface GrantQueryParams {
    granter: string,
    grantee: string,
    msg: MsgType
}
export const genericAuthorizationTx = async (client: BluzelleClient, params: GenericAuthorizationParams): Promise<BluzelleTxResponse | undefined> => {
    let txResult: BluzelleTxResponse;
    try {
        txResult = await grant(client, params.granter, params.grantee, {
            "authorization": {
                "typeUrl": "/cosmos.authz.v1beta1.GenericAuthorization",
                "value": GenericAuthorization.encode(
                    {
                        msg: MsgMapping[params.msg]
                    }
                ).finish()
            },
            expiration: params.expiration
        }, {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    } catch (e: any) {
        console.log(e.message);
    }
}

export const sendAuthorizationTx = async (client: BluzelleClient, params: SendAuthorizationParams): Promise<BluzelleTxResponse | undefined> => {
    let txResult: BluzelleTxResponse;
    try {
        txResult = await grant(client, params.granter, params.grantee, {
            "authorization": {
                "typeUrl": "/cosmos.bank.v1beta1.SendAuthorization",
                "value": SendAuthorization.encode(
                    {
                        spendLimit: params.spendLimit
                    }
                ).finish()
            },
            expiration: params.expiration
        }, {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    } catch (e: any) {
        console.log(e.message);
    }
}

export const stakeAuthorizationTx = async (client: BluzelleClient, params: StakeAuthorizationParams): Promise<BluzelleTxResponse | undefined> => {
    let txResult: BluzelleTxResponse;
    try {
        txResult = await grant(client, params.granter, params.grantee, {
            "authorization": {
                "typeUrl": "/cosmos.staking.v1beta1.StakeAuthorization",
                "value": StakeAuthorization.encode(
                    {
                        maxTokens: params.maxTokens,
                        allowList: params.allowList,
                        denyList: params.denyList,
                        authorizationType: params.authorizationType
                    }
                ).finish()
            },
            expiration: params.expiration
        }, {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    } catch (e: any) {
        console.log(e.message);
    }
}

export const revokeAuthorizationTx = async (client: BluzelleClient, params: RevokeAuthorizationParams): Promise<BluzelleTxResponse | undefined> => {
    let txResult: BluzelleTxResponse;
    try {
        txResult = await revoke(client, params.granter, params.grantee,
            MsgMapping[params.msg], {
            gasPrice: 0.002,
            maxGas: 200000,
            mode: 'sync'
        });
        return txResult;
    } catch (e: any) {
        console.log(e.message);
    }
}

export const executeAuthorizationTx = async (client: BluzelleClient, params: ExecuteAuthorizationParams): Promise<BluzelleTxResponse | undefined> => {
    let txResult: BluzelleTxResponse;
    try {
        txResult = await executeGrant(client, params.grantee,
            params.msgs
            , {
                gasPrice: 0.002,
                maxGas: 200000,
                mode: 'sync'
            });
        return txResult;
    } catch (e: any) {
        console.log(e.message);
    }
}

export const queryGrant = async (client: BluzelleClient, params: GrantQueryParams): Promise<QueryGrantsResponse | undefined> => {
    let queryResult: QueryGrantsResponse;
    try {
        queryResult = await client.queryClient.authz.Grants({
            granter: params.granter,
            grantee: params.grantee,
            msgTypeUrl: MsgMapping[params.msg]
        })
        return queryResult;
    } catch (e: any) {
        return e.message;
    }
}