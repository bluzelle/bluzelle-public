import {
    QueryClientImpl as StorageQueryClientImpl,
} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import {
    QueryClientImpl as BankQueryClientImpl,
} from "./generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/query";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import waitUntil from "async-wait-until";

type QueryClientImpl = {
    storage: StorageQueryClientImpl;
    bank: BankQueryClientImpl;
}

export const waitForContent = (curiumUrl: string, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(curiumUrl, path),
        { timeout: waitTime },
    );

export const hasContent = (curiumUrl: string, cid: string) =>
    getRpcClient(curiumUrl)
        .then(queryClient => queryClient.storage.HasContent({cid}))
        .then(x => x.hasContent);

export const getAccountBalance = (curiumUrl: string, address: string) =>
    getRpcClient(curiumUrl)
        .then(queryClient => queryClient.bank.Balance({address: address, denom: "ubnt"}))

const getRpcClient = (url: string): Promise<QueryClientImpl> =>
    Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => Promise.resolve({
            storage: new StorageQueryClientImpl(rpcClient),
            bank: new BankQueryClientImpl(rpcClient),
        }));