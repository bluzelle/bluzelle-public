import {newBluzelleClient} from "./sdk";
import {newLocalWallet} from "./wallets/localWallet";
import {pinCid} from "./tx";

describe('faucet', () => {
    it('should mint tokens', () =>
        newBluzelleClient({
            wallet: newLocalWallet('drastic rule silk shaft web length patient toss topple series problem file record floor once best review require volcano hip lyrics afford enough budget'),
            url: 'localhost:26657'
        }).then(client => {
            client.queryClient.faucet.Mint({address: 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'})
        })
    )
})