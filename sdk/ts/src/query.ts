import waitUntil from "async-wait-until";
import {BluzelleClient} from "./sdk";

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