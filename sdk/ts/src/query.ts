import waitUntil from "async-wait-until";
import {BluzelleClient} from "./sdk";
import {QueryGetTaxInfoResponse} from "./generated/bluzelle/curium/bluzelle.curium.tax/module/types/tax/query";

export const waitForContent = (client: BluzelleClient, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(client, path),
        { timeout: waitTime },
    );

export const hasContent = (client: BluzelleClient, cid: string) =>
    client.queryClient.storage.HasContent({cid})
        .then(x => x.hasContent);

export const getAccountBalance = (client: BluzelleClient, address: string): Promise<number> =>
    client.queryClient.bank.Balance({address: address, denom: "ubnt"})
        .then(res => Number(res.balance?.amount))

export const getTaxInfo = (client: BluzelleClient): Promise<QueryGetTaxInfoResponse> =>
    client.queryClient.tax.GetTaxInfo({})

