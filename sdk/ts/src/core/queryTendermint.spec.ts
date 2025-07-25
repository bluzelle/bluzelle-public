import { startSwarmWithClient } from '@bluzelle/testing/src/swarmUtils';
import { defaultSwarmConfig } from '@bluzelle/testing/src/defaultConfigs';
import { getStatus, getValidators } from './queryTendermint';
import { expect } from 'chai';
import { Swarm } from 'daemon-manager/src';
import {isE2E} from '@bluzelle/testing/src/e2eUtils'

describe('tendermint queries', function () {
    this.timeout(800_000)
    beforeEach(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );

    after(() =>
        Swarm.stopDaemons({...defaultSwarmConfig})
    );
    it('should get the status of a node', function() {
        isE2E() && this.skip();
        return startSwarmWithClient({
            config: {...defaultSwarmConfig},
            isE2E: isE2E()
        })
            .then(({bzSdk}) => getStatus(bzSdk))
            .then(response => {
                expect(response.nodeId.length).to.equal(40)
                expect(response.caughtUp).to.be.true
                expect(response.chainId).to.equal('bluzelle-9')
                expect(response.blockHeight).to.be.greaterThan(0)
                expect(response.moniker).to.equal('a.client.sentry')
            })
    });

    it('should return the validators on a network', function() {
        isE2E() && this.skip();
        return startSwarmWithClient({
            config: {...defaultSwarmConfig}
        })
            .then(({bzSdk}) => getValidators(bzSdk))
            .then(response => {
                console.log(response)
                expect(response[0].address.length).to.equal(40)
                expect(response[0].votingPower).to.equal(defaultSwarmConfig.genesisTokenBalance ? defaultSwarmConfig.genesisTokenBalance / 10 : 0)
            })
    });
});
