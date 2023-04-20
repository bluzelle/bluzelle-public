import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";

export const pinCid = (client: BluzelleClient, cid: string, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.storage.MsgPin', {cid, creator: client.address}, options);