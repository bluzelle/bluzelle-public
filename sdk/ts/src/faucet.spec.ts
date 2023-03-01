import {startSwarmWithClient} from "@bluzelle/testing/src/swarmUtils";
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {expect} from "chai";
import {createAddress, mint} from "./faucet";
import {Swarm} from "daemon-manager";
import {BluzelleClient} from "./sdk";
import {getAccountBalance} from "./query";

describe('faucet', function () {

    this.timeout(1_800_000);

    beforeEach(() =>
        Swarm.stopDaemons(({...defaultSwarmConfig}))
    );

    it('should create an address', () => {
        return Promise.resolve(createAddress())
            .then(result => {
                expect(result.address).to.match(/^bluzelle/)
                expect(result.address).to.have.length(47)
                expect(result.mnemonic.split(' ')).to.have.length(24)
            })
    });

    it('should mint tokens to a given address', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => mint(bzSdk, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(response => {
                expect(response.mnemonic).to.be.empty
                expect(response.address).to.equal('bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd')
            })
    });

    it('should mint tokens with no given address', () => {
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => mint(bzSdk))
            .then(response => {
                expect(response.mnemonic.split(' ')).to.have.length(24)
                expect(response.address).to.match(/^bluzelle/)
                expect(response.address).to.have.length(47)
            })
    });

    it('should not be able to mint tokens when faucet is off', () => {
        let client: BluzelleClient;
        return startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: false})
            .then(({bzSdk}) => client = bzSdk)
            .then(() => mint(client, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(resp => expect(true).to.be.false)
            .catch(err => expect(err.stack).to.contain('invalid request'))
            .then(() => getAccountBalance(client, 'bluzelle1qst08g0f6hyr7z6a7xpgye3nv4ngtnxzz457zd'))
            .then(bal => expect(bal).to.equal(0))
    });
});
