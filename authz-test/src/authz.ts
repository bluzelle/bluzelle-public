import { BluzelleClient } from "./sdk"
import { msgMapping, MsgType } from "./authzMappings"
import { QueryGrantsResponse } from "./curium/lib/generated/cosmos/authz/v1beta1/query"

export interface GrantQueryParams {
    granter: string,
    grantee: string,
    msg: MsgType
}

export const queryGrant = async (client: BluzelleClient, params: GrantQueryParams): Promise<QueryGrantsResponse | undefined> => {
    let queryResult: QueryGrantsResponse;
    try {
        queryResult = await client.queryClient.authz.Grants({
            granter: params.granter,
            grantee: params.grantee,
            msgTypeUrl: msgMapping[params.msg]
        })
        return queryResult;
    } catch (e: any) {
        return e.message;
    }
}