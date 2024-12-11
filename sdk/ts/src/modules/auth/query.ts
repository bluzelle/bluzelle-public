import {BluzelleClient} from "../../core";

import {
  QueryAccountsRequest,
  QueryAccountRequest,
  QueryAccountInfoRequest,
  QueryParamsRequest,
  QueryModuleAccountsRequest,
  QueryModuleAccountByNameRequest,
  QueryAccountAddressByIDRequest,

  QueryAccountsResponse,
  QueryAccountResponse,
  QueryAccountInfoResponse,
  QueryParamsResponse,
  QueryModuleAccountsResponse,
  QueryModuleAccountByNameResponse,
  QueryAccountAddressByIDResponse
 } from "../../curium/lib/generated/cosmos/auth/v1beta1/query";

import { defaultPaginationOptions } from "../../shared/pagination";
import { BluzellePageRequest } from "../../shared/pagination";
import { parseNumToLong } from "../../shared/parse";
import { PageRequest, PageResponse } from "../../curium/lib/generated/cosmos/base/query/v1beta1/pagination";
import { BaseAccount, ModuleAccount } from "../../curium/lib/generated/cosmos/auth/v1beta1/auth";
import { Any } from "../../curium/lib/generated/google/protobuf/any";



type BluzelleAccount = {
  typeURL: string;
  account: BaseAccount | ModuleAccount;
}

type BluzelleQueryAccountsResponse = {
  accounts: BluzelleAccount[],
  pagination?: PageResponse
}

export const getAccount = (client: BluzelleClient, address: string): Promise<BluzelleAccount | undefined> =>
  client.queryClient.auth.Account({
    address: address
  } as QueryAccountRequest)
  .then(res => res.account ? parseAnyTypeIntoBluzelleAccount(res.account) : undefined)


export const getAccountInfo = (client: BluzelleClient, address: string): Promise<QueryAccountInfoResponse> =>
  client.queryClient.auth.AccountInfo({
    address: address
  } as QueryAccountInfoRequest)

export const getAccounts = (
  client: BluzelleClient, 
  options: BluzellePageRequest = defaultPaginationOptions()
  ): Promise<BluzelleQueryAccountsResponse> =>
    client.queryClient.auth.Accounts({
      pagination: {
        key: options.key,
        offset: parseNumToLong(options.offset),
        limit: parseNumToLong(options.limit),
        countTotal: options.countTotal,
        reverse: options.reverse
    } as PageRequest} as QueryAccountsRequest)
    .then(res => res.accounts ? 
      {
        accounts: res.accounts.map(parseAnyTypeIntoBluzelleAccount),
        pagination: res.pagination
      }
        : {
          accounts: [],
        })

export const getModuleAccounts = (
  client: BluzelleClient, 
  options: BluzellePageRequest = defaultPaginationOptions()
  ): Promise<BluzelleAccount[]> =>
    client.queryClient.auth.ModuleAccounts({} as QueryModuleAccountsRequest)
    .then(res => res.accounts ? res.accounts.map(parseAnyTypeIntoBluzelleAccount) : [])


export const getModuleAccountByName = (
  client: BluzelleClient, 
  name: string,
  ): Promise<ModuleAccount| undefined> =>
    client.queryClient.auth.ModuleAccountByName({
      name: name
    } as QueryModuleAccountByNameRequest)
  .then(res => res.account ? ModuleAccount.decode(res.account.value) : undefined)

export const getParams = (
  client: BluzelleClient, 
  ): Promise<QueryParamsResponse> =>
    client.queryClient.auth.Params({} as QueryParamsRequest)

// export const getAccountByID = (
//   client: BluzelleClient, 
//   id: number
//   ): Promise<QueryAccountAddressByIDResponse> =>
//     client.queryClient.auth.AccountAddressByID({
//       accountId: parseNumToLong(id)
//     } as QueryAccountAddressByIDRequest)

const parseAnyTypeIntoBluzelleAccount = (data: Any ): BluzelleAccount => {
  return {
    typeURL: data.typeUrl,
    account: data.typeUrl == "/cosmos.auth.v1beta1.BaseAccount" ? BaseAccount.decode(data.value) : ModuleAccount.decode(data.value)
  }
}
