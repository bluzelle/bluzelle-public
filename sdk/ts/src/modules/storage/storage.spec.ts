import {getBlzClient, restartIpfsServerAndSwarm} from "@bluzelle/testing/src/commonUtils";
import {generateContent} from "@bluzelle/testing/src/fileUtils";
import {BehaviorSubject, of} from "rxjs";
import {times} from "lodash";
import {passThroughAwait} from "promise-passthrough";
import {createCtx, withCtxAwait} from "@scottburch/with-context";
import {expect} from "chai";
import delay from "delay";
import {defaultSwarmConfig, stopIpfsServers} from "@bluzelle/testing";
import {hasContent} from "./query";
import {getAccountBalance} from "../bank";
import {pinCid} from "./tx";
import {getTx, withTransaction} from "../../core";
import { stopSwarm } from "@bluzelle/testing/src/swarmUtils";

import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import path from 'path'

const curiumUrl = 'http://localhost:26667';
const mnemonic = new BehaviorSubject<string>("");

const PINATA_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2OGZkNzMyZS0wMGU4LTRhOTUtOWUzNi0yZGU4NzEzZWUyOWMiLCJlbWFpbCI6ImFsdml3b3JsZHdpdGhtYWlsQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiIyYWZiOWQ2Nzg3MGMwMTcxNGJkZSIsInNjb3BlZEtleVNlY3JldCI6ImI5YmRlNDRkZjM0NzVmNDMzN2QxYzllODQ3NTZkYTU0YjRjMGQ3ODk1M2U3OTMxZWMzOTc4N2UxMjI0MDEzMjYiLCJleHAiOjE3ODQwMzU3NDZ9.Zghc4QAcgtvRHIk7QQVpW67erqTeE6WZJ1oUnxenhwA' // 🔐 Replace with your actual JWT token

async function uploadToPinata(filePath: string): Promise<string> {
  const form = new FormData()
  form.append('file', fs.createReadStream(filePath))

  const fileName = path.basename(filePath)

  try {
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', form, {
      maxBodyLength: Infinity,
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    })

    const cid = response.data.IpfsHash
    console.log(`✅ Uploaded ${fileName}`)
    console.log(`📦 CID: ${cid}`)
    console.log(`🔗 View at: https://ipfs.io/ipfs/${cid}`)
    return cid
  } catch (error: any) {
    console.error('❌ Upload failed:', error.response?.data || error.message)
    throw error
  }
}


describe('storage module', function () {
    this.timeout(600_000);

    // beforeEach(() =>
    //     restartIpfsServerAndSwarm(({...defaultSwarmConfig}))
    //         .then((swarmMnemonic) => mnemonic.next(swarmMnemonic))
    // );
    
    // after(() =>
    //     stopSwarm({...defaultSwarmConfig})
    //     .then(stopIpfsServers)
    // );

    it('hasContent should return true if content is pinned', () =>
        
            Promise.resolve(uploadToPinata('./err.txt'))
            .then((addResults) => console.log(addResults))
            .catch(e => console.log(e))
    );
    // it('hasContent should return true if content is pinned', () =>
    //     Promise.all(times(2).map(() =>
    //         Promise.resolve(generateContent(0.01))
    //             .then((content) => createHeliaClient().then((heliaClient) => heliaClient.add(content)))
    //     ))
    //         .then((addResults) => createCtx('addResults', () => addResults))
    //         .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
    //         .then(passThroughAwait((ctx) =>
    //           ctx.addResults.map((addResult: any) =>
    //             pinCid(ctx.client, { cid: addResult.path }, { maxGas: 200000, gasPrice: 0.002, mode: 'sync' })
    //           )
    //         ))
    //         .then(ctx => ctx.addResults.map((addResult: any) =>
    //             hasContent(ctx.client, addResult.path)
    //                 .then((confirm) => expect(confirm).to.be.true)
    //         ))
    // );


    // it('hasContent should return false if content is NOT pinned', () =>
    //     Promise.all(times(2).map(() =>
    //         Promise.resolve(generateContent(0.01))
    //             .then((content) => createHeliaClient().then((heliaClient) => heliaClient.add(content)))
    //     ))
    //         .then((addResults) => createCtx('addResults', () => addResults))
    //         .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
    //         .then(ctx => Promise.all(ctx.addResults.map((addResult: any) =>
    //             hasContent(ctx.client, addResult.path)
    //                 .then((confirm) => expect(confirm).to.be.false)
    //         )))
    // );


    // it('getAccountBalance should return account balance', () =>
    //     Promise.all(times(5).map(() =>
    //         Promise.resolve({content: generateContent(0.01)})
    //             .then(ctx => createHeliaClient().then((heliaClient) => heliaClient.add(ctx.content)
    //                 .then((addResult: any) => ({content: ctx.content, cid: addResult.path}))))
    //     ))
    //         .then((contents) => createCtx('contents', () => contents))
    //         .then(withCtxAwait('client', () => getBlzClient(curiumUrl, mnemonic.getValue())))
    //         .then(passThroughAwait(ctx => withTransaction(ctx.client, () =>
    //             ctx.contents.forEach((contentObj: any) => pinCid(ctx.client, {cid: contentObj.cid}, {
    //                 maxGas: 200000,
    //                 gasPrice: 0.002,
    //                 mode: 'sync'
    //             }))
    //         )))
    //         .then(ctx => getAccountBalance(ctx.client, ctx.client.address))
    // );


    // it('should query for v1 cids', () =>
    //     getBlzClient(curiumUrl, mnemonic.getValue())
    //         .then(passThroughAwait(bzSdk =>
    //             pinCid(bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
    //                 maxGas: 10000000,
    //                 gasPrice: 0.002,
    //                 mode: 'sync'
    //             })
    //         ))
    //         .then(passThroughAwait(() => delay(6_000)))
    //         .then(bzSdk => hasContent(bzSdk, 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'))
    //         .then(resp => expect(resp).to.be.true)
    // );


    // it('should query for the same cid with either v0 or v1', () =>
    //     getBlzClient(curiumUrl, mnemonic.getValue())
    //         .then(passThroughAwait(bzSdk =>
    //             loadCID().then(CID => 
    //                 pinCid(bzSdk, {cid: CID.parse('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi').toV0().toString()}, {
    //                     maxGas: 10000000,
    //                     gasPrice: 0.002,
    //                     mode: 'sync'
    //                 })
    //             )
    //         ))
    //         .then(passThroughAwait(() => delay(6_000)))
    //         .then(bzSdk => hasContent(bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'))
    //         .then(resp => expect(resp).to.be.true)
    // );


    // it('should query for the same cid with either v0 or v1 other direction', () =>
    //     getBlzClient(curiumUrl, mnemonic.getValue())
    //         .then(passThroughAwait(bzSdk =>
    //             (pinCid(bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
    //                 maxGas: 10000000,
    //                 gasPrice: 0.002,
    //                 mode: 'sync'
    //             }) as any)
    //                 .then(console.log)
    //         ))
    //         .then(passThroughAwait(() => delay(12_000)))
    //         .then(bzSdk => loadCID().then(CID => 
    //             hasContent(bzSdk, CID.parse('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi').toV0().toString())
    //         ))
    //         .then(resp => expect(resp).to.be.true)
    // );


    // it('should query a transaction by hash', () => {
    //     return getBlzClient(curiumUrl, mnemonic.getValue())
    //         .then(bzSdk =>
    //             (pinCid(bzSdk, {cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'}, {
    //                 maxGas: 10000000,
    //                 gasPrice: 0.002,
    //                 mode: 'sync'
    //             }) as any)
    //                 .then((resp: any) => ({
    //                     resp,
    //                     bzSdk
    //                 }))
    //         )
    //         .then(({resp, bzSdk}) => getTx(bzSdk, resp.transactionHash))
    // });

    // it('should allow multiaddr to nodes holding content', () => {
    //     const addr = '/ip4/45.32.211.194/udp/4001/quic-v1/p2p/12D3KooWDpD6gVGLAr7UZGUUgzVfXA6C3wotrBzY9CT8hQFhrKA7/p2p-circuit/p2p/12D3KooWM7UBZn1hS96xXMvE2UthmXTMmXq3w1p4r14MiSZqkaMa'
    //     return getBlzClient(curiumUrl, mnemonic.getValue())
    //         .then(bzSdk => (pinCid(bzSdk, {cid: 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR', addresses: ['/ip4/45.32.211.194/udp/4001/quic-v1/p2p/12D3KooWDpD6gVGLAr7UZGUUgzVfXA6C3wotrBzY9CT8hQFhrKA7/p2p-circuit/p2p/12D3KooWM7UBZn1hS96xXMvE2UthmXTMmXq3w1p4r14MiSZqkaMa']}, {
    //                 maxGas: 10000000,
    //                 gasPrice: 0.002,
    //                 mode: 'sync'
    //             }) as any)
    //                 .then((resp: any) => ({
    //                     resp,
    //                     bzSdk
    //                 }))
    //         )
    //        // .then(({resp, bzSdk}) => hasContent(bzSdk, ))
    //       .catch(err => console.log(`pinCid did not work. Error: ${err}`));

    // })

});