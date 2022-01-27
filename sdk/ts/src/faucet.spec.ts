import {newBluzelleClient} from "./sdk";
import {newLocalWallet} from "./wallets/localWallet";
import {startSwarmWithClient} from "@bluzelle/testing/src/swarmUtils";
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {expect} from "chai";
import {createAddress, mint} from "./faucet";

describe('faucet', () => {

    it('should create an address', () => {
        return Promise.resolve(createAddress())
            .then(result => {
                expect(result.address).to.match(/^bluzelle/)
                expect(result.address).to.have.length(47)
                expect(result.mnemonic.split(' ')).to.have.length(24)
            })
    })

    it('should mint tokens to a given address', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => mint(bzSdk, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(response => {
                expect(response.mnemonic).to.be.empty
                expect(response.address).to.equal('bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd')
            })
    })

    it('should mint tokens with no given address', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => mint(bzSdk))
            .then(response => {
                expect(response.mnemonic.split(' ')).to.have.length(24)
                expect(response.address).to.match(/^bluzelle/)
                expect(response.address).to.have.length(47)
            })
    })
})
