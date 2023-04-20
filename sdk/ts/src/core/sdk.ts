import {createProtobufRpcClient, QueryClient, SequenceResponse, SigningStargateClient} from "@cosmjs/stargate";
import {getRegistry} from "./registry";
import {SigningStargateClientOptions} from "@cosmjs/stargate/build/signingstargateclient";
import {
    QueryClientImpl as StorageQueryClientImpl
} from "../curium/lib/generated/storage/query";
import {
    QueryClientImpl as BankQueryClientImpl
} from "../curium/lib/generated/cosmos/bank/v1beta1/query";
import {
    QueryClientImpl as FaucetQueryClientImpl
} from '../curium/lib/generated/faucet/query'
import {BluzelleWallet} from "../wallets/BluzelleWallet";
import {
    QueryClientImpl as TaxQueryClientImpl
} from '../curium/lib/generated/tax/query';
import {
    QueryClientImpl as StakingQueryClientImpl
} from "../curium/lib/generated/cosmos/staking/v1beta1/query";
import {
    QueryClientImpl as DistributionQueryClientImpl
} from "../curium/lib/generated/cosmos/distribution/v1beta1/query";
import {
    QueryClientImpl as NftQueryClientImpl
} from "../curium/lib/generated/nft/query";
import {
    QueryClientImpl as AuthzQueryClientImpl
} from "../curium/lib/generated/cosmos/authz/v1beta1/query"
import {
    ServiceClientImpl
} from "../curium/lib/generated/cosmos/tx/v1beta1/service";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";


type QueryClientImpl = {
    storage: StorageQueryClientImpl;
    bank: BankQueryClientImpl;
    faucet: FaucetQueryClientImpl;
    tax: TaxQueryClientImpl;
    staking: StakingQueryClientImpl;
    distribution: DistributionQueryClientImpl;
    tx: ServiceClientImpl;
    nft: NftQueryClientImpl;
    authz: AuthzQueryClientImpl;
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
            tax: new TaxQueryClientImpl(rpcClient),
            staking: new StakingQueryClientImpl(rpcClient),
            distribution: new DistributionQueryClientImpl(rpcClient),
            tx: new ServiceClientImpl(rpcClient),
            nft: new NftQueryClientImpl(rpcClient),
            authz: new AuthzQueryClientImpl(rpcClient)
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


