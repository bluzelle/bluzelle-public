import {BluzelleClient} from "./sdk";

export const getTx = (client: BluzelleClient, hash: string) =>
    client.queryClient.tx.GetTx({hash});


