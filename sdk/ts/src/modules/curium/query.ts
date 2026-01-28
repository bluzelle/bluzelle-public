import {BluzelleClient} from "../../core";
import {QueryGetAdminAddressResponse} from "../../curium/lib/generated/curium/query";


export const getAdminAddress = (client: BluzelleClient): Promise<QueryGetAdminAddressResponse> =>
    client.queryClient.curium.GetAdminAddress({});
