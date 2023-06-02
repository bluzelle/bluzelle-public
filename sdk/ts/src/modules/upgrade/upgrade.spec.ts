import { expect } from 'chai';
import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { getCurrentPlan, getModuleVersions } from './query';
import { Swarm } from 'daemon-manager/src';

describe('Upgrade', () => {

  beforeEach(() =>
    Swarm.stopDaemons({ ...defaultSwarmConfig })
  );

  it('should get current plan', () =>
    startSwarmWithClient()
      .then(client => getCurrentPlan(client.bzSdk))
  );

  it('should get module version', () =>
    startSwarmWithClient()
      .then(client => getModuleVersions(client.bzSdk, 'nft'))
      .then(version => expect(version[0].name).to.equal('nft'))
  );


});
