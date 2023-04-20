import {BluzelleClient} from "../../core";
import {QueryGetTaxInfoResponse} from "../../curium/lib/generated/tax/query";


export const getTaxInfo = (client: BluzelleClient): Promise<QueryGetTaxInfoResponse> =>
    client.queryClient.tax.GetTaxInfo({});