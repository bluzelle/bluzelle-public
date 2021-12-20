import {newBluzelleClient} from "./sdk";
import {pinCid} from "./tx";
import {newLocalWallet} from "./wallets/localWallet";


newBluzelleClient({
    url: 'localhost:26667',
    wallet: newLocalWallet('increase job chest series bottom pony task skull holiday because pretty worth brain day divide fruit alpha phrase rude essay chimney govern oxygen visual')
})
    .then(client => Promise.all([
        pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000}),
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






