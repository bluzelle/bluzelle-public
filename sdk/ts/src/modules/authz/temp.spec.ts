import {startSwarmWithClient} from '@bluzelle/testing';
import {DaemonConfig, Environment, SwarmConfig, SwarmTypes} from 'daemon-manager/src/SwarmConfig';
import {stopSwarm} from '@bluzelle/testing/src/swarmUtils';
import {getOtherTokenDefaults} from '@bluzelle/testing/src/commonUtils';

describe('staking module', function () {
  this.timeout(2_000_000);

  beforeEach(stopSwarm);
  after(stopSwarm);

  it("should be able to delegate the expected amount", () =>
      startSwarmWithClient({
        config: {...swarmConfig()},
        isE2E: false
      })
  );


});


const swarmConfig = (): SwarmConfig => ({
  denom: 'bnt',
  otherTokens: getOtherTokenDefaults(),
  genesisTokenBalance: 500_000_000,
  monikerBase: 'test',
  chainId: 'my-chain',
  minGasPrice: 0.000000002,
  targetBranch: process.env.BRANCH || 'devel',
  environment: Environment.DEVEL,
  swarmType: SwarmTypes.Docker,
  createMinter: true,
  storageBaseDir: '',
  storageMount: '/home/ubuntu/storage',
  filter: 'server',
  daemons: [{
    host: `local:a.validator`,
    restPort: 1317,
    rpcPort: 26657,
    p2pPort: 26656,
    ipfsP2pPort: 6001,
    ipfsRpcPort: 7001,
    prometheusPort: 26660,
    sentry: ''
  }, {
    host: `local:a.client.sentry`,
    restPort: 1327,
    rpcPort: 26667,
    p2pPort: 26666,
    ipfsP2pPort: 6011,
    ipfsRpcPort: 7011,
    prometheusPort: 26670,
    sentry: 'client'
  }, {
    host: `local:b.validator`,
    restPort: 1337,
    rpcPort: 26677,
    p2pPort: 26676,
    ipfsP2pPort: 6021,
    ipfsRpcPort: 7021,
    prometheusPort: 26680,
    sentry: ''
  }, {
    host: `local:c.validator`,
    restPort: 1347,
    rpcPort: 26687,
    p2pPort: 26686,
    ipfsP2pPort: 6031,
    ipfsRpcPort: 7031,
    prometheusPort: 26690,
    sentry: ''
  }] as DaemonConfig[],
});