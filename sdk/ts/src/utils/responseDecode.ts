import { MsgCreateCollectionResponse, MsgCreateNFTResponse } from "../curium/lib/generated/nft/tx";


export const decodeFns: Record<string, (
  value: Uint8Array
) => unknown> = {
  'createNFT': (value) => MsgCreateNFTResponse.decode(value),
  'createCollection': (value) => MsgCreateCollectionResponse.decode(value)
};