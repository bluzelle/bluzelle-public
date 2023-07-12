import { startSwarmWithClient } from '@bluzelle/testing';
import { stopSwarm } from '@bluzelle/testing/src/swarmUtils';
import { BluzelleClient } from '../../core';
import { expect } from 'chai';
import { Creator } from '../../curium/lib/generated/nft/nft';
import { createCollection, createNft } from './tx';
import { getNftInfo } from './query';

describe('nft supply overflow', function () {
  this.timeout(10_800_000)

  let client: BluzelleClient;
  beforeEach(() =>
    stopSwarm()
      .then(() => startSwarmWithClient())
      .then(({bzSdk}) => client = bzSdk)
      .then(sdk => client = sdk)
  );

  it('should accept supply and maxSupply of Number.MAX_VALUE', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => createNft(client, {
        collId: 1,
        metadata: defaultMetadataProps('TMPMeta', true, client.address, {
          supply: 1,
          maxSupply: 9223372036854776000
        })
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then(x => getNftInfo(client, '1:1:0'))
      .then(info => {
        expect(info.metadata?.masterEdition?.supply).to.equal(1);
        expect(info.metadata?.masterEdition?.maxSupply).to.equal(9223372036854776000);
      })
  );

});

export const defaultCreators = (address: string): Creator => ({
  address,
  verified: true,
  share: 10,
});

export const defaultMetadataProps = (
  name: string,
  isMutable: boolean,
  address: string,
  masterEdition: {
    supply: number,
    maxSupply: number
  }
) => ({
  name,
  uri: 'https://tmp.com',
  mutableUri: 'http://starloopDatabase.com',
  sellerFeeBasisPoints: 100,
  primarySaleHappened: false,
  isMutable,
  creators: [defaultCreators(address)],
  metadataAuthority: address,
  mintAuthority: address,
  masterEdition
});
