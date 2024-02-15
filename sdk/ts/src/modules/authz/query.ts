import {BluzelleClient} from "../../core";
import {QueryGrantsResponse} from "../../curium/lib/generated/cosmos/authz/v1beta1/query";
import {
  PageRequest,
  PageResponse
} from '../../curium/lib/generated/cosmos/base/query/v1beta1/pagination';
import {msgMapping, MsgType} from "./authzTypes";
import {
  BluzellePageRequest,
  defaultPaginationOptions,
  defaultPaginationResponse
} from '../../shared/pagination';
import { parseNumToLong } from '../../shared/parse';
import { Any } from '../../curium/lib/generated/google/protobuf/any';
import { Grant } from '../../curium/lib/generated/cosmos/authz/v1beta1/authz';

export type QueryAuthorizationsParams = {
    granter: string,
    grantee: string,
    msg: MsgType
}

export type BluzelleGrant = {
  authorization: Any,
  expiration: Date
}

export type BluzelleQueryGrantsResponse = {
  grants: BluzelleGrant[],
  pagination: PageResponse
}


export const queryAuthorizations = (
    client: BluzelleClient,
    params: QueryAuthorizationsParams,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleQueryGrantsResponse> =>
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
      .then(parseQueryGrantsResponseToBluzelleQueryGrantsResponse)
      .catch(() => ({
        grants: [],
        pagination: defaultPaginationResponse(),
      }));


const parseQueryGrantsResponseToBluzelleQueryGrantsResponse = (res: QueryGrantsResponse): BluzelleQueryGrantsResponse => ({
  grants: res.grants.map(parseGrantToBluzelleGrant),
  pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
})

const parseGrantToBluzelleGrant = (grant: Grant): BluzelleGrant => ({
  authorization: grant.authorization ? grant.authorization : ({ typeUrl: "", value: new Uint8Array() }),
  expiration: new Date(0)
})