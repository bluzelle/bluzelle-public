import {BluzelleWallet, bluzelleWallet} from "./sdk";

describe('typescript sdk', () => {
    it('should be able to generate a wallet with account', (done) => {
        bluzelleWallet({
            url: 'localhost:26657',
            mnemonic: 'hurdle start noble eyebrow young tuition enlist where erupt runway scissors stone ethics front soup over sign avocado virus tennis receive medal tongue violin'
        })
            .then((x: BluzelleWallet) => x);
    })
})