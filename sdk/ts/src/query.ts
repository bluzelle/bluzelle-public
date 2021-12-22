import {BluzelleClient} from "./sdk";
import {
    QueryClientImpl,
} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";

export const hasContent = (client: BluzelleClient, cid: string) =>
    getRpcClient('http://localhost:26657')
        .then(queryClient => queryClient.HasContent({cid}))
        .then(x =>
            x.hasContent
        )

const getRpcClient = (url: string): Promise<QueryClientImpl> => {
    return Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => new QueryClientImpl(rpcClient))
}

hasContent({} as BluzelleClient, Buffer.from('QmVGAxSSXTQUk5dR4hbmSeU5qRu6dZcNgJbri3Rb5LPgvg').toString('hex'));

// export const hasContent = (client: BluzelleClient, cid: string) =>
//     new QueryClientImpl(rpc).HasContent({cid})
//         .then(x =>
//             x.hasContent
//         );

// const rpc = {
//     request: (
//         service: string,
//         method: string,
//         data: Uint8Array
//     ) =>{
//         return Tendermint34Client.connect('http://localhost:26657')
//             .then(tc => tc.abciQuery({
//                 path: `${service}/${method}`,
//                 data
//             }))
//             .then(response => response.value)
//
//     }
// }


