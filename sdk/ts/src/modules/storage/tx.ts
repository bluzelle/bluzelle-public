import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";

export const pinCid = (client: BluzelleClient, params: {cid: string, addresses?: string[]}, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.storage.MsgPin', {cid: params.cid, addrs: params.addresses, creator: client.address}, options);