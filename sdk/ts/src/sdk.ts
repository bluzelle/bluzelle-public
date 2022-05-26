import {createProtobufRpcClient, QueryClient, SequenceResponse, SigningStargateClient} from "@cosmjs/stargate";
import {getRegistry} from "./registry";
import {SigningStargateClientOptions} from "@cosmjs/stargate/build/signingstargateclient";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";
import {
    QueryClientImpl as StorageQueryClientImpl
} from "./curium/lib/generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import {
    QueryClientImpl as BankQueryClientImpl
} from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/query";
import {
    QueryClientImpl as FaucetQueryClientImpl
} from './curium/lib/generated/bluzelle/curium/bluzelle.curium.faucet/module/types/faucet/query'
import {BluzelleWallet} from "./wallets/BluzelleWallet";

import {
    QueryClientImpl as TaxQueryClientImpl
} from './curium/lib/generated/bluzelle/curium/bluzelle.curium.tax/module/types/tax/query'

type QueryClientImpl = {
    storage: StorageQueryClientImpl;
    bank: BankQueryClientImpl;
    faucet: FaucetQueryClientImpl;
    tax: TaxQueryClientImpl;
}

export interface BluzelleConfig {
    url: string;
    wallet: () => Promise<BluzelleWallet>;
}

export interface BluzelleClient {
    url: string;
    address: string;
    sgClient: SigningStargateClient;
    queryClient: QueryClientImpl;
    tmClient: Tendermint34Client;
}


export const newBluzelleClient = (config: { wallet: () => Promise<BluzelleWallet>; url: string }): Promise<BluzelleClient> =>
    config.wallet()
        .then(wallet =>
            SigningBluzelleClient.connectWithSigner(config.url, wallet, {prefix: 'bluzelle', registry: getRegistry()})
                .then(sgClient => Promise.all([
                    getRpcClient(config.url),
                    sgClient,
                    wallet.getAccounts().then(acc => acc[0].address),
                    Tendermint34Client.connect(config.url)
                ])))
        .then(([queryClient, sgClient, address, tmClient]) => ({
            url: config.url,
            queryClient,
            sgClient,
            address,
            tmClient
        }));

const getRpcClient = (url: string): Promise<QueryClientImpl> =>
    Tendermint34Client.connect(url)
        .then(tendermintClient => new QueryClient(tendermintClient))
        .then(createProtobufRpcClient)
        .then(rpcClient => Promise.resolve({
            storage: new StorageQueryClientImpl(rpcClient),
            bank: new BankQueryClientImpl(rpcClient),
            faucet: new FaucetQueryClientImpl(rpcClient),
            tax: new TaxQueryClientImpl(rpcClient)
        }));

export class SigningBluzelleClient extends SigningStargateClient {

    private wallet: BluzelleWallet

    protected constructor(tmClient: Tendermint34Client | undefined, signer: BluzelleWallet, options: SigningStargateClientOptions) {
        super(tmClient, signer, options);
        this.wallet = signer
    }

    getSequenceFromNetwork(address: string): Promise<SequenceResponse> {
        return super.getSequence(address)
    }


    getSequence(address: string): Promise<SequenceResponse> {
        return this.wallet.getSequence(this, address)
    }

    static async connectWithSigner(endpoint: string, signer: BluzelleWallet, options = {}) {
        return Tendermint34Client.connect(endpoint)
            .then(tmClient => new SigningBluzelleClient(tmClient, signer, options))
    }
}


