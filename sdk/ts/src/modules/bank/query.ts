import { BluzelleClient } from '../../core';
import {
  QueryAllBalancesResponse,
  QueryTotalSupplyResponse
} from '../../curium/lib/generated/cosmos/bank/v1beta1/query';
import { parseCoin, parseNumToLong } from '../../shared/parse';
import { BluzellePageRequest, defaultPaginationOptions } from '../../shared/pagination';
import {
  PageRequest,
  PageResponse
} from '../../curium/lib/generated/cosmos/base/query/v1beta1/pagination';
import { Metadata, Params } from '../../curium/lib/generated/cosmos/bank/v1beta1/bank';
import { BluzelleCoin, BluzelleDenom } from '../../shared/types';

type TotalSupply = {
  supply: BluzelleCoin[]
  pagination?: PageResponse
}

type BluzelleBalances = {
  balances: BluzelleCoin[],
  pagination?: PageResponse
}

type DenomsMetadata = {
  metadatas: Metadata[],
  pagination?: PageResponse
}

export const getAccountBalance = (client: BluzelleClient, address: string, denom: string = 'ubnt'): Promise<number> =>
  client.queryClient.bank.Balance({
    address: address,
    denom
  })
    .then(res => Number(res.balance?.amount));

export const getTotalSupply = (client: BluzelleClient): Promise<TotalSupply> =>
  client.queryClient.bank.TotalSupply({})
    .then((res: QueryTotalSupplyResponse) => ({
      supply: res.supply ? res.supply.map(parseCoin) : [],
      pagination: res.pagination
    }));

export const getAllBalances = (client: BluzelleClient,
  address: string,
  options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleBalances> =>
  client.queryClient.bank.AllBalances({
    address,
    pagination: {
      key: options.key,
      offset: parseNumToLong(options.offset),
      limit: parseNumToLong(options.limit),
      countTotal: options.countTotal,
      reverse: options.reverse
    } as PageRequest
  })
    .then((res: QueryAllBalancesResponse) => ({
      balances: res.balances ? res.balances.map(parseCoin) : [],
      pagination: res.pagination
    }));

export const getSpendableBalances = (client: BluzelleClient,
  address: string,
  options: BluzellePageRequest = defaultPaginationOptions()
): Promise<BluzelleBalances> =>
  client.queryClient.bank.SpendableBalances({
    address,
    pagination: {
      key: options.key,
      offset: parseNumToLong(options.offset),
      limit: parseNumToLong(options.limit),
      countTotal: options.countTotal,
      reverse: options.reverse
    } as PageRequest
  })
    .then((res) => ({
      balances: res.balances ? res.balances.map(parseCoin) : [],
      pagination: res.pagination
    }));

export const getSupplyOf = (client: BluzelleClient,
  denom: BluzelleDenom
): Promise<number> =>
  client.queryClient.bank.SupplyOf({
    denom
  })
    .then(res => res.amount ? Number(res.amount?.amount) : 0);

export const getBankParams = (client: BluzelleClient): Promise<Params> =>
  client.queryClient.bank.Params({})
    .then(res => res.params ? res.params : {
      sendEnabled: [],
      defaultSendEnabled: false
    });

export const getDenomMetadata = (client: BluzelleClient,
  denom: BluzelleDenom
): Promise<Metadata> =>
  client.queryClient.bank.DenomMetadata({ denom })
    .then(res => res.metadata ? res.metadata : {
      description: '',
      denomUnits: [],
      base: '',
      display: '',
      name: '',
      symbol: ''
    });

export const getDenomsMetadata = (client: BluzelleClient,
  options: BluzellePageRequest = defaultPaginationOptions()
): Promise<DenomsMetadata> =>
  client.queryClient.bank.DenomsMetadata({
    pagination: {
      key: options.key,
      offset: parseNumToLong(options.offset),
      limit: parseNumToLong(options.limit),
      countTotal: options.countTotal,
      reverse: options.reverse
    } as PageRequest
  })
    .then((res) => ({
      metadatas: res.metadatas ? res.metadatas : [],
      pagination: res.pagination
    }));
