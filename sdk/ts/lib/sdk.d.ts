import { SequenceResponse, SigningStargateClient } from "@cosmjs/stargate";
import { SigningStargateClientOptions } from "@cosmjs/stargate/build/signingstargateclient";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { QueryClientImpl as StorageQueryClientImpl } from "./curium/lib/generated/bluzelle/curium/bluzelle.curium.storage/module/types/storage/query";
import { QueryClientImpl as BankQueryClientImpl } from "./curium/lib/generated/cosmos/cosmos-sdk/cosmos.bank.v1beta1/module/types/cosmos/bank/v1beta1/query";
import { QueryClientImpl as FaucetQueryClientImpl } from './curium/lib/generated/bluzelle/curium/bluzelle.curium.faucet/module/types/faucet/query';
import { BluzelleWallet } from "./wallets/BluzelleWallet";
import { QueryClientImpl as TaxQueryClientImpl } from './curium/lib/generated/bluzelle/curium/bluzelle.curium.tax/module/types/tax/query';
declare type QueryClientImpl = {
    storage: StorageQueryClientImpl;
    bank: BankQueryClientImpl;
    faucet: FaucetQueryClientImpl;
    tax: TaxQueryClientImpl;
};
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
export declare const newBluzelleClient: (config: {
    wallet: () => Promise<BluzelleWallet>;
    url: string;
}) => Promise<BluzelleClient>;
export declare class SigningBluzelleClient extends SigningStargateClient {
    private wallet;
    protected constructor(tmClient: Tendermint34Client | undefined, signer: BluzelleWallet, options: SigningStargateClientOptions);
    getSequenceFromNetwork(address: string): Promise<SequenceResponse>;
    getSequence(address: string): Promise<SequenceResponse>;
    static connectWithSigner(endpoint: string, signer: BluzelleWallet, options?: {}): Promise<SigningBluzelleClient>;
}
export {};
//# sourceMappingURL=sdk.d.ts.map