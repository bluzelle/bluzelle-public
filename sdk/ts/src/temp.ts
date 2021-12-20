import {newBluzelleClient} from "./sdk";
import {pinCid} from "./tx";
import {newLocalWallet} from "./wallets/localWallet";


newBluzelleClient({
    url: 'localhost:26667',
    wallet: newLocalWallet('prevent desert dawn vast debris discover accident crumble case design craft morning eight produce liar diesel enact jump drop vast curtain parrot option depart')
})
    .then(client => Promise.all([
        pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
        // pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0, maxGas: 200000}),
    ]))
    .then(x => console.log('good', x))
    .catch(e => console.log('evil', e))






