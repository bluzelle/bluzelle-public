import {newLocalWallet, newBluzelleClient, pinCid} from "./sdk";


newBluzelleClient({
    url: 'localhost:26657',
    wallet: newLocalWallet('shop devote actress where cave torch airport knife tiny scissors tool vapor maid bid once river mean taste fold slide clown butter language later')
})
    .then(client => pinCid(client, 'cid2', {gasPrice: 1, maxGas: 200000}))
    .then(x => x)






