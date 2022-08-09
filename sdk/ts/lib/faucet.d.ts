import { BluzelleClient } from "./sdk";
export declare function createAddress(): Promise<{
    mnemonic: string;
    address: string;
}>;
export declare function mint(client: BluzelleClient, address?: string): Promise<{
    mnemonic: string;
    address: string;
}>;
export declare function waitUntilFunded(client: BluzelleClient, address: string): Promise<unknown>;
//# sourceMappingURL=faucet.d.ts.map