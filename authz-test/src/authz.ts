import { BluzelleClient, newBluzelleClient } from './index';
import { newLocalWallet } from './index';

const wallet = newLocalWallet(
    "double clock match tag extra picture hen become pause moon dove remain crater damp clutch pretty cabbage wheel fantasy perfect already retreat live cherry",
    { coinType: 483 }
);

const blzClient = newBluzelleClient({
    wallet,
    url: "http://localhost:26657"
});

export {
    blzClient
}