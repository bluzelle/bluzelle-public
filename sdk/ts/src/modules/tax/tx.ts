import {BluzelleClient, BroadcastOptions, sendTx} from "../../core";


export const setGasTaxBp = (client: BluzelleClient, bp: number, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetGasTaxBp', {bp, creator: client.address}, options);

export const setTransferTaxBp = (client: BluzelleClient, bp: number, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetTransferTaxBp', {bp, creator: client.address}, options);

export const setTaxCollector = (client: BluzelleClient, taxCollector: string, options: BroadcastOptions) =>
    sendTx(client, '/bluzelle.curium.tax.MsgSetTaxCollector', {taxCollector, creator: client.address}, options);