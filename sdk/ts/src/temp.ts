import {newLocalWallet, newBluzelleClient, pinCid} from "./sdk";


newBluzelleClient({
    url: 'localhost:26657',
    wallet: newLocalWallet('wisdom true tornado idea fun mail jump round primary perfect broken cycle gaze chuckle announce verify public black captain plug metal orchard orchard bachelor')
})
    .then(client => pinCid(client, 'cid2'))
    .then(x => x)






