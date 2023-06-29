import {expect} from 'chai';
import { Swarm } from 'daemon-manager/src';
import { defaultSwarmConfig, startSwarmWithClient } from '@bluzelle/testing';
import { getParamValue } from './query';

describe('params module', () => {

  beforeEach(() =>
    Swarm.stopDaemons({ ...defaultSwarmConfig })
  );

  it('should get params value', () =>
    startSwarmWithClient()
      .then(client => getParamValue(client.bzSdk, {
        subspace: 'staking',
        key: 'MaxValidators'
      }))
      .then(res => expect(res.param?.value).to.equal('100'))
  );

});
