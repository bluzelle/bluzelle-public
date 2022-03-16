import {startSwarmWithClient} from "@bluzelle/testing/src/swarmUtils";
import {defaultSwarmConfig} from "@bluzelle/testing/src/defaultConfigs";
import {getStatus, getValidators} from "./queryTendermint";
import {expect} from "chai";


describe('tendermint queries', () => {

    it('should get the status of a node', () =>
        startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => getStatus(bzSdk))
            .then(response => {
                expect(response.nodeId.length).to.equal(40)
                expect(response.caughtUp).to.be.true
                expect(response.chainId).to.equal('my-chain')
                expect(response.blockHeight).to.be.greaterThan(0)
                expect(response.moniker).to.equal('test-sentry-client-0')
            })
    )

    it('should return the validators on a network', () =>
        startSwarmWithClient({...defaultSwarmConfig, bluzelleFaucet: true})
            .then(({bzSdk}) => getValidators(bzSdk))
            .then(response => {
                expect(response[0].address.length).to.equal(40)
                expect(response[0].votingPower).to.equal(100000000)
            })
    )
})
