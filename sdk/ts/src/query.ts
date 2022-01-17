import {BluzelleClient} from "./sdk";
import {
    QueryClientImpl,
} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import waitUntil from "async-wait-until";

export const waitForContent = (client: BluzelleClient, curiumUrl: string, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(client, curiumUrl, path),
        { timeout: waitTime },
    );

export const hasContent = (client: BluzelleClient, curiumUrl: string, cid: string) =>
    getRpcClient(curiumUrl)
        .then(queryClient => queryClient.HasContent({cid}))
        .then(x => x.hasContent);

const getRpcClient = (url: string): Promise<QueryClientImpl> =>
    Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => new QueryClientImpl(rpcClient));