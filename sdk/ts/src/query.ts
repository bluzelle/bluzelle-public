import {BluzelleClient, newBluzelleClient} from "./sdk";
import {
    QueryClientImpl,
} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import {pinCid} from "./tx";
import {newLocalWallet} from "./wallets/localWallet";
import {memoize, times} from "lodash";
import {passThroughAwait} from "promise-passthrough";
import {withCtxAwait} from "with-context";
import {generateContentSlow} from "@bluzelle/testing/src/fileUtils";
import waitUntil from "async-wait-until";
import {create} from 'ipfs-http-client';

const ipfsClient = create({host: '127.0.0.1', port: 5009, protocol: 'http'})

const curiumUrl = 'localhost:26657';
const mnemonic = 'media betray inquiry marble wish hurry scrap quick submit section ozone suffer rhythm crack medal inflict birth cable engine hotel dose fan globe smile';

// times(20).map(() =>
//     Promise.resolve({content: generateContentSlow(0.01)})
//         .then(withCtxAwait('addResult', ctx => ipfsClient.add(ctx.content)))
//         .then(withCtxAwait(('client'), () => getBlzClient(curiumUrl, mnemonic)))
//         .then(passThroughAwait((ctx) => pinCid(ctx.client, ctx.addResult.path, {maxGas: 200000, gasPrice: 0.002})))
//         .then((ctx) => waitForContent(ctx.client, ctx.addResult.path))
//         .then((a) => console.log(a))
// )

export const waitForContent = (client: BluzelleClient, path: string) =>
    waitUntil(() => hasContent(client, path));


export const hasContent = (client: BluzelleClient, cid: string) =>
    getRpcClient('http://localhost:26657')
        .then(queryClient => queryClient.HasContent({cid}))
        .then(x => x.hasContent);

const getRpcClient = (url: string): Promise<QueryClientImpl> =>
    Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => new QueryClientImpl(rpcClient));


// const getBlzClient = memoize((curiumUrl: string, mnemonic: string) =>
//     newBluzelleClient({
//         url: curiumUrl,
//         wallet: newLocalWallet(mnemonic)
//     })
// )