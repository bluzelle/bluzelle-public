import { BluzelleClient } from "./sdk";
export declare function createAddress(mnemonic?: string): ({
    address: string;
    mnemonic: string;
});
export declare function mint(client: BluzelleClient, address?: string): any;
export declare function waitUntilFunded(client: BluzelleClient, address: string): Promise<unknown>;
//# sourceMappingURL=faucet.d.ts.map