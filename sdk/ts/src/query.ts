import {
    QueryClientImpl as StorageQueryClientImpl,
} from "./generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import {
    QueryClientImpl as BankQueryClientImpl,
} from "./generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/query";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {createProtobufRpcClient, QueryClient} from "@cosmjs/stargate";
import waitUntil from "async-wait-until";

export const waitForContent = (curiumUrl: string, path: string, waitTime: number = 5000) =>
    waitUntil(
        () => hasContent(curiumUrl, path),
        { timeout: waitTime },
    );

export const hasContent = (curiumUrl: string, cid: string) =>
    getStorageRpcClient(curiumUrl)
        .then(queryClient => queryClient.HasContent({cid}))
        .then(x => x.hasContent);

export const getAccountBalance = (curiumUrl: string, address: string) =>
    getBankRpcClient(curiumUrl)
        .then(queryClient => queryClient.Balance({address: address, denom: "ubnt"}))

const getStorageRpcClient = (url: string): Promise<StorageQueryClientImpl> =>
    Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => new StorageQueryClientImpl(rpcClient));

const getBankRpcClient = (url: string): Promise<BankQueryClientImpl> =>
    Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => new BankQueryClientImpl(rpcClient));