import { startSwarmWithClient } from '@bluzelle/testing';
import { stopSwarm } from '@bluzelle/testing/src/swarmUtils';
import { BluzelleClient } from '../../core';
import { expect } from 'chai';
import { Creator, MultiSendNFTOutput } from '../../curium/lib/generated/nft/nft';
import { createAddress } from '../faucet';
import { passThroughAwait } from 'promise-passthrough';
import {
  burnNFT,
  createCollection,
  createNft,
  multiSendNft,
  printNftEdition,
  transferNft,
  updateCollectionMutableUri,
  updateCollectionUri,
  updateMetadata,
  updateMetadataAuthority,
  updateMintAuthority
} from './tx';
import {
  getCollectionInfo,
  getLastCollectionId,
  getNftByOwner,
  getNftInfo,
  getNftMetadata
} from './query';
import { createCtx, withCtxAwait } from 'with-context';
import { isE2E } from '@bluzelle/testing/src/e2eUtils';
import {decodeFns} from '../../utils/responseDecode'


export function getMsgResponse(res:any): Uint8Array {
  return res.msgResponses[0].value
}

describe('nft module', function () {

  const testAddresses = [
    'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj',
    'bluzelle1kaxu3n8tmtzsmg3zvlfwa7gs04tr07du554h40',
    'bluzelle1daqsqhtdldrpt68qauf5wvtyanen2fmfjww7dl',
    'bluzelle14gren5katxznytnhqjl6zt3u0asg2erqgngjzk',
    'bluzelle1kq7tqye24lr6muyvdgjwk3vv90ad90z2mrsgcm',
  ];
  const nfts: string[] = []
  const testMultiSendNFTParams = (nfts: string[]): MultiSendNFTOutput[] => testAddresses.map((addr: string, idx: number) => ({
    receiver: addr,
    nftId: nfts[idx]
  } as MultiSendNFTOutput));

  this.timeout(10_800_000)
  let client: BluzelleClient;
  beforeEach(() =>
    stopSwarm()
      .then(() => startSwarmWithClient({
          isE2E: isE2E()
      }))
      .then(({bzSdk}) => client = bzSdk)
      .then(sdk => client = sdk)
  );

  after(stopSwarm);

  it('should throw an error when querying an invalid nft', () =>
    getNftInfo(client, '1')
      .then(() => expect(true).to.be.false)
      .catch(err => expect(err.message).to.contain('invalid nft id'))
  );

  it('should create a collection and last collection id should be oldID + 1', () =>
    getLastCollectionId(client)
      .then(result => createCtx("oldInfo", () => result))
      .then(passThroughAwait(() =>
        createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
          maxGas: 100000000,
          gasPrice: 0.002
      })))
      .then(withCtxAwait("updatedInfo", ()=> getLastCollectionId(client)))
      .then((ctx) =>expect(ctx.oldInfo.id).to.be.equal(ctx.updatedInfo.id -1 ) )
  );

  it('should create an empty collection', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getCollectionInfo(client, 1))
      .then(({nfts}) => expect(nfts).to.be.empty)
  );

  it('should get the info of a collection', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((result) => getCollectionInfo(client, result.id))
      .then(resp => {
        expect(resp.collection?.uri).to.deep.equal('http://temp.com');
        expect(resp.collection?.name).to.deep.equal('Temp');
        expect(resp.collection?.symbol).to.deep.equal("TMP");
      })
  );

  it('should get the info of an nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((result) => createNft(client, {
        collId: result.id,
        metadata: defaultMetadataProps('TMPMeta', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then((result) => decodeFns['createNFT'](getMsgResponse(result)))
      .then(result => getNftInfo(client, (result as unknown as {id: string}).id))
      .then(info => {
        expect(info.nft?.owner).to.deep.equal(client.address);
        expect(info.metadata?.name).to.deep.equal('TMPMeta');
        expect(info.metadata?.uri).to.deep.equal('https://tmp.com');
        expect(info.metadata?.creators[0].address).to.deep.equal(client.address);
      })
  );

  it('should create an nft without metadata', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => createNft(client, {collId: 1}, {maxGas: 1000000, gasPrice: 0.002}))
      .then((result) => decodeFns['createNFT'](getMsgResponse(result)) as unknown as {metadataId: Long.Long, id: string })
      .then(res => getNftInfo(client, res.id))
      .then(info => {
        expect(info.nft?.owner).to.deep.equal(client.address);
      })
  )

  it('should update the metadata of an nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((result) => createNft(client, {
        collId: result.id,
        metadata: defaultMetadataProps('TMPMeta', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then((result) => decodeFns['createNFT'](getMsgResponse(result)))
      .then((result) =>createCtx("createdNFTInfo", ()=> result as unknown as {metadataId: Long.Long, id: string }))
      .then(passThroughAwait((ctx) => updateMetadata(client, {
        name: 'TMP2',
        uri: 'http://temp2.com',
        creators: [defaultCreators(client.address)],
        sellerFeeBasisPoints: 80,
        sender: client.address,
        metadataId: Number(ctx.createdNFTInfo.metadataId),
      }, {maxGas: 1000000, gasPrice: 0.002})))
      .then((ctx) => getNftInfo(client, ctx.createdNFTInfo.id))
      .then(nftInfo => {
        expect(nftInfo.metadata?.uri).to.equal('http://temp2.com');
        expect(nftInfo.metadata?.name).to.equal('TMP2');
      })
  );

  it('should update the metadata authority of an nft', () => {
      let newAuthority = createAddress().address;
      return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
        maxGas: 100000000,
        gasPrice: 0.002
      })
        .then(() => getLastCollectionId(client))
        .then((res) => createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002}))
        .then((result) => decodeFns['createNFT'](getMsgResponse(result)))
        .then((result) =>createCtx("createdNFTInfo", ()=> result as unknown as {metadataId: Long.Long, id: string }))
        .then(passThroughAwait((ctx) => updateMetadataAuthority(client, Number(ctx.createdNFTInfo.metadataId), newAuthority, {maxGas: 1000000, gasPrice: 0.002})))
        .then((ctx) => getNftMetadata(client, Number(ctx.createdNFTInfo.metadataId)))
        .then(resp => {
          expect(resp.metadata?.metadataAuthority).to.deep.equal(newAuthority)
        })
    }
  );

  it('should update the mint authority of an nft', () => {
      let newAuthority = createAddress().address;
      return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
        maxGas: 100000000,
        gasPrice: 0.002
      })
      .then(() => getLastCollectionId(client))
        .then((res) => createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002}))
        .then((result) => decodeFns['createNFT'](getMsgResponse(result)))
        .then((result) =>createCtx("createdNFTInfo", ()=> result as unknown as {metadataId: Long.Long, id: string }))
        .then(passThroughAwait((ctx) => updateMintAuthority(client, Number(ctx.createdNFTInfo.metadataId), newAuthority, {maxGas: 1000000, gasPrice: 0.002})))
        .then((ctx) => getNftMetadata(client, Number(ctx.createdNFTInfo.metadataId)))
        .then(resp => {
          expect(resp.metadata?.mintAuthority).to.deep.equal(newAuthority)
        })
    }
  );

  it('should print an edition of an nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address}, {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then((res) => decodeFns['createCollection']((res as any).msgResponses[0].value))
      .then((res) =>createCtx("collInfo", ()=> res as unknown as {id: Long}))
      .then(withCtxAwait("createNFTRes", (ctx) => createNft(client, {
        collId: Number(ctx.collInfo.id),
        metadata: defaultMetadataProps('TMPMeta', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002})))
      .then(withCtxAwait("createdNFTInfo", (ctx) => Promise.resolve(decodeFns['createNFT'](getMsgResponse(ctx.createNFTRes))) ))
      .then(passThroughAwait((ctx) => printNftEdition(client, Number((ctx.createdNFTInfo as unknown as {metadataId: Long.Long}).metadataId), Number(ctx.collInfo.id), client.address, {maxGas: 1000000, gasPrice: 0.002})))
      .then(ctx => getCollectionInfo(client, Number(ctx.collInfo.id)))
      .then(info => {
        expect(info.nfts).to.have.length(2);
        expect(info.nfts[1].seq).to.equal(1)
      })
  );

  it('should transfer an nft from one user to another', () => {
    let newUser = createAddress().address;
    return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address}, {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((res) => createNft(client, {
        collId: res.id,
        metadata: defaultMetadataProps('TMPMeta', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then((result) => decodeFns['createNFT'](getMsgResponse(result)))
      .then((result) =>createCtx("createdNFTInfo", ()=> result as unknown as {metadataId: Long.Long, id: string }))
      .then(passThroughAwait((ctx) => transferNft(client, ctx.createdNFTInfo.id, newUser, {
        maxGas: 1000000,
        gasPrice: 0.002
      })))
      .then((ctx) =>
        getNftInfo(client, ctx.createdNFTInfo.id)
      )
      .then((info) => {
        expect(info.nft?.owner).to.deep.equal(newUser);
        expect(info.metadata?.creators[0].address).to.deep.equal(client.address);
      })

  });

  it('should query the nfts owned by given address', () => {
    return createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then(passThroughAwait((res) => createNft(client, {
        collId: res.id,
        metadata: defaultMetadataProps('NFT1', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002})))
      .then((res) => createNft(client, {
        collId: res.id,
        metadata: defaultMetadataProps('NFT2', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then(() => getNftByOwner(client, client.address))
      .then(resp => {
          expect(resp.nfts.length).to.greaterThan(1);
          expect(resp.nfts[resp.nfts.length-2].owner).to.deep.equal(client.address);
          expect(resp.nfts[resp.nfts.length-1].owner).to.deep.equal(client.address);
          expect(resp.metadata[resp.nfts.length-2].name).to.deep.equal('NFT1');
          expect(resp.metadata[resp.nfts.length-1].name).to.deep.equal('NFT2');
        }
      )
  });

  it('should be able to add a mutableUri to an nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((res) => createNft(client, {collId: res.id, metadata: defaultMetadataProps('NFT1', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
      .then((result) => decodeFns['createNFT'](getMsgResponse(result)) as unknown as {metadataId: Long.Long, id: string })
      .then((res) => getNftMetadata(client, Number(res.metadataId)))
      .then(info => {
        expect(info.metadata?.mutableUri).to.deep.equal(defaultMetadataProps('NFT1', true, client.address).mutableUri)
      })
  )

  it('should be able to update a mutableUri of an nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((res) => createNft(client, {collId: res.id, metadata: defaultMetadataProps('NFT1', true, client.address)}, {maxGas: 1000000, gasPrice: 0.002}))
      .then((res) => decodeFns['createNFT'](getMsgResponse(res)) as unknown as {metadataId: Long.Long, id: string })
      .then(passThroughAwait((res) => updateMetadata(client, {
        name: 'NFT2',
        uri: 'http://temp2.com',
        mutableUri: 'http://updatedStarloopDatabase.com',
        creators: [defaultCreators(client.address)],
        sellerFeeBasisPoints: 80,
        sender: client.address,
        metadataId: Number(res.metadataId)
      }, {maxGas: 1000000, gasPrice: 0.002})))
      .then((res) => getNftInfo(client, res.id))
      .then(nftInfo => {
        expect(nftInfo.metadata?.mutableUri).to.deep.equal('http://updatedStarloopDatabase.com');
      })
  )


  it('should update the collection uri', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then(passThroughAwait((res) => updateCollectionUri(client, res.id, 'http://updatedTemp.com', {
        maxGas: 100000000,
        gasPrice: 0.002
      })))
      .then((res) => getCollectionInfo(client, res.id))
      .then(resp => {
        expect(resp.collection?.uri).to.deep.equal('http://updatedTemp.com')
      })
  )

  it('should update the collection mutable uri', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then(passThroughAwait((res) => updateCollectionMutableUri(client, res.id, 'http://updatedTemp.com', {
        maxGas: 100000000,
        gasPrice: 0.002
      })))
      .then((res) => getCollectionInfo(client, res.id))
      .then(resp => {
        expect(resp.collection?.mutableUri).to.deep.equal('http://updatedTemp.com')
      })
  )

  it('should fail an update if the collection is immutable', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: false, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((res) => updateCollectionMutableUri(client, res.id, 'http://updatedTemp.com', {
        maxGas: 100000000,
        gasPrice: 0.002
      }))
      .then(res => expect((res as any).rawLog).to.contains('failed'))
  )

  it('should send multiple nfts into several accounts', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      )
      .then(() => multiSendNft(client, testMultiSendNFTParams(nfts), {maxGas: 1000000, gasPrice: 0.002}))
      .then(() => getNftInfo(client, nfts[0]))
      .then(resp => {
        expect(resp.nft?.owner).to.equal(testAddresses[0])
      })
  )

  it('multiSendNft should use less gas than several individual gas.', () =>
      createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then(passThroughAwait((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      ))
      .then((res) => 
        createNft(client, {
          collId: res.id,
          metadata: defaultMetadataProps('TMPMeta', true, client.address)
        }, {maxGas: 1000000, gasPrice: 0.002})
        .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
        .then((nftRes) => nfts.push(nftRes.id))
      )
      .then(() => multiSendNft(client, testMultiSendNFTParams(nfts), {maxGas: 1000000, gasPrice: 0.002}))
      .then((multiSendNftResponse) => createCtx("multiSendResult", () => multiSendNftResponse))
      .then(withCtxAwait('singleSendResult', () => transferNft(client, nfts[5], 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', 
        {maxGas: 1000000, gasPrice: 0.002})))
      .then((ctx) => {
        expect((ctx.multiSendResult as unknown as { gasUsed: number }).gasUsed)
          .to
          .be
          .lessThan((ctx.singleSendResult as unknown as { gasUsed: number }).gasUsed * 5);
      })
  )

  it('should burn the nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => getLastCollectionId(client))
      .then((res) => createNft(client, {
        collId: res.id,
        metadata: defaultMetadataProps('TMPMeta', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
      .then(passThroughAwait((nftRes) => burnNFT(client, nftRes.id, {maxGas: 1000000, gasPrice: 0.002})))
      .then((nftRes) => getNftInfo(client, nftRes.id))
      .then(resp => {
        console.log(resp);
        expect(resp.nft?.owner).to.equal('bluzelle1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxmrapv')
      })
  )

  it('should fail to burn the nft', () =>
    createCollection(client, {sender: client.address, symbol: 'TMP', name: 'Temp', uri: 'http://temp.com', isMutable: true, updateAuthority: client.address},  {
      maxGas: 100000000,
      gasPrice: 0.002
    })
      .then(() => createNft(client, {
        collId: 1,
        metadata: defaultMetadataProps('TMPMeta', true, client.address)
      }, {maxGas: 1000000, gasPrice: 0.002}))
      .then((nftRes) => decodeFns['createNFT'](getMsgResponse(nftRes)) as unknown as {metadataId: Long.Long, id: string })
      .then(passThroughAwait((nftRes) => transferNft(client, nftRes.id, 'bluzelle1ahtwerncxwadjzntry5n7pzypzwt220hu2ghfj', {maxGas: 1000000, gasPrice: 0.002})))
      .then((nftRes) => burnNFT(client, nftRes.id, {maxGas: 1000000, gasPrice: 0.002}))
      .then(resp => {
        expect((resp as unknown as { rawLog: string })?.rawLog).to.contains('not the owner of nft');
      })
  )


});

export const defaultCreators = (address: string): Creator => ({
  address,
  verified: true,
  share: 10,
});

export const defaultMasterEditionProps = ({
  supply: 100_000,
  maxSupply: 1_000_000
});

export const defaultMetadataProps = (name: string, isMutable: boolean, address: string) => ({
  name,
  uri: 'https://tmp.com',
  mutableUri: 'http://starloopDatabase.com',
  sellerFeeBasisPoints: 100,
  primarySaleHappened: false,
  isMutable,
  creators: [defaultCreators(address)],
  metadataAuthority: address,
  mintAuthority: address,
  masterEdition: defaultMasterEditionProps
});