import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";
import {Grant} from "../../curium/lib/generated/cosmos/authz/v1beta1/authz";
import {MsgExec, MsgGrant, MsgRevoke} from "../../curium/lib/generated/cosmos/authz/v1beta1/tx";
import {
    EncodeFn,
    ExecuteAuthzMsg,
    grantMapping,
    GrantParam,
    grantTypeToEncodeFnMap,
    msgMapping,
    MsgType,
    msgTypeToEncodeFnMap,
    MsgTypeToMsgMap
} from "./authzTypes";

export const grantAuthorization = (client: BluzelleClient, granter: string, grantee: string, grantParam: GrantParam, broadcastOptions: BroadcastOptions): any => {
    const encodingFn = grantTypeToEncodeFnMap[grantParam.grantType] as EncodeFn<typeof grantParam>;
    return Promise.resolve({
        "authorization": {
            "typeUrl": grantMapping[grantParam.grantType],
            "value": encodingFn(grantParam)
        },
        "expiration": grantParam.expiration
    } as Grant)
        .then((grant) => sendTx<MsgGrant>(client, '/cosmos.authz.v1beta1.MsgGrant', {
            granter,
            grantee,
            grant,
        }, broadcastOptions))
};

export const revokeAuthorization = (
    client: BluzelleClient,
    granter: string,
    grantee: string,
    msgType: MsgType,
    broadcastOptions: BroadcastOptions
) =>
    Promise.resolve(sendTx<MsgRevoke>(client, '/cosmos.authz.v1beta1.MsgRevoke', {
        granter,
        grantee,
        msgTypeUrl: msgMapping[msgType],
    }, broadcastOptions));

export const executeAuthorization = (
    client: BluzelleClient,
    grantee: string,
    msgs: ExecuteAuthzMsg[],
    broadcastOptions: BroadcastOptions
) =>
    Promise.resolve(
        msgs.map(({msgType, params}) => {
            const encodingFn = msgTypeToEncodeFnMap[msgType] as (msg: MsgTypeToMsgMap[typeof msgType]) => Uint8Array;
            return {
                typeUrl: msgMapping[msgType],
                value: encodingFn(params),
            };
        })
    ).then((msgs) =>
        sendTx<MsgExec>(client, "/cosmos.authz.v1beta1.MsgExec", {grantee, msgs}, broadcastOptions)
    );