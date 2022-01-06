import {newBluzelleClient} from "./sdk";
import {newLocalWallet} from "./wallets/localWallet";
import {pinCid, withTransaction} from "./tx";
import {expect} from "chai";
import {BroadcastTxSuccess} from "@cosmjs/stargate";

describe('sending transactions', () => {

    it('should have a withTransaction that can bundle messages', () => {
        return newBluzelleClient({
            url: 'localhost:26657',
            wallet: newLocalWallet('shy eight short hire stomach dragon dance grace sauce actress future together save scorpion palace verb gravity habit catalog galaxy explain faith enjoy device')
        })
            .then(client => withTransaction(client, () => {
                pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
                pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
                pinCid(client, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', {gasPrice: 0.002, maxGas: 200000});
            }))
            .then(x  => x);
    })
})