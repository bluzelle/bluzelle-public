import {BluzelleClient} from "../../core";
import {QueryGrantsResponse} from "../../curium/lib/generated/cosmos/authz/v1beta1/query";
import {PageRequest} from "../../curium/lib/generated/cosmos/base/query/v1beta1/pagination";
import {msgMapping, MsgType} from "./authzTypes";
import {BluzellePageRequest, defaultPaginationOptions} from "../../shared/pagination";
import { parseNumToLong } from '../../shared/parse';

export type QueryAuthorizationsParams = {
    granter: string,
    grantee: string,
    msg: MsgType
}

export const queryAuthorizations = (
    client: BluzelleClient,
    params: QueryAuthorizationsParams,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<QueryGrantsResponse> =>
    client.queryClient.authz.Grants({
        granter: params.granter,
        grantee: params.grantee,
        msgTypeUrl: msgMapping[params.msg],
        pagination: {
            key: options.key,
            offset: parseNumToLong(options.offset),
            limit: parseNumToLong(options.limit),
            countTotal: options.countTotal,
            reverse: options.reverse
        } as PageRequest
    })
        .catch(() => ({grants: []}) as QueryGrantsResponse);