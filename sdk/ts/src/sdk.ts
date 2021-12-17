import {SequenceResponse, SigningStargateClient} from "@cosmjs/stargate";
import {OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {getRegistry} from "./registry";
import {SigningStargateClientOptions} from "@cosmjs/stargate/build/signingstargateclient";
import {Tendermint34Client} from "@cosmjs/tendermint-rpc";

export interface BluzelleConfig {
    url: string;
    wallet: () => Promise<BluzelleWallet>;
}

export interface BluzelleClient {
    url: string;
    address: string;
    sgClient: SigningStargateClient;
}

export interface BluzelleWallet extends OfflineDirectSigner {
    getSequence: (client: SigningBluzelleClient,signerAddress: string) => Promise<SequenceResponse>
}

export const newBluzelleClient = (config: { wallet: () => Promise<BluzelleWallet>; url: string }) =>
    config.wallet()
        .then(wallet =>
            SigningBluzelleClient.connectWithSigner(config.url, wallet, {prefix: 'bluzelle', registry: getRegistry()})
                .then(sgClient => Promise.all([
                    sgClient,
                    wallet.getAccounts().then(acc => acc[0].address),
                ])))
        .then(([sgClient, address]) => ({
            url: config.url,
            sgClient,
            address,
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


