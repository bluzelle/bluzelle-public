import {BluzelleClient} from "../../core";
import { QueryParamsResponse } from '../../curium/lib/generated/cosmos/params/v1beta1/query';


export const getParamValue = (
  client: BluzelleClient,
  params: {
    subspace: string;
    key: string;
  }
): Promise<QueryParamsResponse> =>
  client.queryClient.params.Params(params);
