import { BluzelleClient } from "./sdk";
import { QueryGetTaxInfoResponse } from "./curium/lib/generated/tax/query";
export declare const waitForContent: (client: BluzelleClient, path: string, waitTime?: number) => Promise<boolean>;
export declare const hasContent: (client: BluzelleClient, cid: string) => Promise<boolean>;
export declare const getAccountBalance: (client: BluzelleClient, address: string) => Promise<number>;
export declare const getTaxInfo: (client: BluzelleClient) => Promise<QueryGetTaxInfoResponse>;
//# sourceMappingURL=query.d.ts.map