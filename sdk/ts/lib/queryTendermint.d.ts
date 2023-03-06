import { BluzelleClient } from "./sdk";
interface NodeStatusResponse {
    nodeId: string;
    chainId: string;
    moniker: string;
    blockHeight: number;
    caughtUp: boolean;
}
interface ValidatorResponse {
    address: string;
    votingPower: number;
}
export declare const getStatus: (client: BluzelleClient) => Promise<NodeStatusResponse>;
export declare const getValidators: (client: BluzelleClient) => Promise<ValidatorResponse[]>;
export {};
//# sourceMappingURL=queryTendermint.d.ts.map