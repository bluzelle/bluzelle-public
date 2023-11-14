import {BluzelleClient} from "../../core";
import { QueryAllBalancesResponse, QueryDenomsMetadataResponse, QuerySpendableBalancesResponse, QuerySupplyOfResponse, QueryTotalSupplyResponse } from '../../curium/lib/generated/cosmos/bank/v1beta1/query';
import { parseNumToLong } from '../../shared/parse';
import { BluzellePageRequest, defaultPaginationOptions } from "../../shared/pagination";
import { PageRequest } from "../../curium/lib/generated/cosmos/base/query/v1beta1/pagination";
import { Metadata, Params } from "../../curium/lib/generated/cosmos/bank/v1beta1/bank";


export const getAccountBalance = (client: BluzelleClient, address: string, denom: string = "ubnt"): Promise<number> =>
    client.queryClient.bank.Balance({address: address, denom})
        .then(res => Number(res.balance?.amount));


export const getTotalSupply = (client: BluzelleClient): Promise<QueryTotalSupplyResponse> =>
    client.queryClient.bank.TotalSupply({})


export const getAllBalances = (client: BluzelleClient, 
    address: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<QueryAllBalancesResponse> =>
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

export const getSpendableBalances = (client: BluzelleClient,
    address: string,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<QuerySpendableBalancesResponse> => 
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

export const getSupplyOf = (client: BluzelleClient,
    denom: 'ubnt' | 'ug4' | 'uelt'
): Promise<number> => 
    client.queryClient.bank.SupplyOf({
        denom
    })
        .then(res => Number(res.amount?.amount));


export const getParams = (client: BluzelleClient): Promise<Params | null> => 
    client.queryClient.bank.Params({})
        .then((res) => res.params? res.params : null)

export const getDenomMetadata = (client: BluzelleClient,
    denom: 'ubnt' | 'ug4' | 'uelt'
): Promise<Metadata | undefined> =>
    client.queryClient.bank.DenomMetadata({denom})
        .then((res) => res.metadata)

export const getDenomsMetadata = (client: BluzelleClient,
    options: BluzellePageRequest = defaultPaginationOptions()
): Promise<QueryDenomsMetadataResponse> => 
    client.queryClient.bank.DenomsMetadata({})
