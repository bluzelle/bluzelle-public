import { BluzelleClient, newBluzelleClient } from './index';
import { newLocalWallet } from './index';

const wallet = newLocalWallet(
    "pigeon candy flock traffic load viable chaos buyer crystal car guide black candy morning sell letter when airport notice favorite theory dial olive general",
    { coinType: 483 }
);

const blzClient = newBluzelleClient({
    wallet,
    url: "http://localhost:26657"
});

export {
    blzClient
}