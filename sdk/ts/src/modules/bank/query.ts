import {BluzelleClient} from "../../core";

export const getAccountBalance = (client: BluzelleClient, address: string, denom: string = "ubnt"): Promise<number> =>
    client.queryClient.bank.Balance({address: address, denom})
        .then(res => Number(res.balance?.amount));