import {BluzelleClient} from "../../core";
import { QueryTotalSupplyResponse } from '../../curium/lib/generated/cosmos/bank/v1beta1/query';
import {BluzelleCoin} from "../../shared/types";
import { parseLongCoin } from '../../shared/parse';


type BluzelleTotalSupply = {
  supply: BluzelleCoin[]
}


export const getAccountBalance = (client: BluzelleClient, address: string, denom: string = "ubnt"): Promise<number> =>
    client.queryClient.bank.Balance({address: address, denom})
        .then(res => Number(res.balance?.amount));


export const getTotalSupply = (client: BluzelleClient): Promise<BluzelleTotalSupply> =>
    client.queryClient.bank.TotalSupply({})
        .then(parseQueryTotalSupplyResponseToBluzelleTotalSupply);


const parseQueryTotalSupplyResponseToBluzelleTotalSupply = (res: QueryTotalSupplyResponse): Promise<BluzelleTotalSupply> =>
    Promise.resolve(res.supply.map(parseLongCoin))
        .then(supply => ({
            supply
        }));
