import {generateContent} from "@bluzelle/testing/src/fileUtils";
import {BehaviorSubject, of} from "rxjs";
import {passThroughAwait} from "promise-passthrough";
import { withCtxAwait} from "@scottburch/with-context";
import {expect} from "chai";
import delay from "delay";
import {defaultSwarmConfig} from "@bluzelle/testing";
import {hasContent} from "./query";
import {pinCid} from "./tx";
import {getTx} from "../../core";
import { startSwarmWithClient, stopSwarm } from "@bluzelle/testing/src/swarmUtils";
import axios from 'axios'
import FormData from 'form-data'

async function loadCID() {
    const { CID } = await eval('import("multiformats/cid")');
    return CID;
}


async function uploadToIpfs(contentObj) {
  const form = new FormData()
  
  // Example 1: Upload a file
  form.append('file', contentObj,  {
        filename: 'upload.txt',
        contentType: 'application/octet-stream',
    })

  // OR Example 2: Upload raw buffer
  // const buffer = Buffer.from('Hello from Axios + IPFS!')
  // form.append('file', buffer, 'hello.txt')

  const res = await axios.post('http://54.227.217.212:5001/api/v0/add', form, {
    headers: form.getHeaders()
  })
  console.log('✅ Uploaded CID:', res.data.Hash)
  return {
    path: res.data.Hash
  }

}

describe('storage module', function () {
    this.timeout(600_000);

    after(() =>
        stopSwarm({...defaultSwarmConfig})
    );

    it('hasContent should return true if content is pinned', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig
        })
        .then(withCtxAwait('addResult', ()=> uploadToIpfs(generateContent(0.01))))
        .then(passThroughAwait(()=> delay(20_000)))
        .then(passThroughAwait((ctx) =>
            pinCid(ctx.bzSdk, { cid: ctx.addResult.path }, { maxGas: 200000, gasPrice: 0.002, mode: 'sync' })
            // .then(() => console.log)
          )
        )
        .then(passThroughAwait(()=> delay(20_000)))
        .then(ctx => 
            hasContent(ctx.bzSdk, ctx.addResult.path)
        )
        .then((confirm) => expect(confirm).to.be.true)
      )

    it('hasContent should return false if content is NOT pinned', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig
        })
        .then(withCtxAwait('addResult', ()=> uploadToIpfs(generateContent(0.01))))
        .then(passThroughAwait(()=> delay(20_000)))
        .then(ctx => 
            hasContent(ctx.bzSdk, ctx.addResult.path)
        )
        .then((confirm) => expect(confirm).to.be.false)
    );


    it('should query for v1 cids', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig
        })
        .then(passThroughAwait(ctx =>
                pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
        ))
        .then(passThroughAwait(() => delay(6_000)))
        .then(ctx => hasContent(ctx.bzSdk, 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'))
        .then(resp => expect(resp).to.be.true)
    );


    it('should query for the same cid with either v0 or v1', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig
        })
        .then(passThroughAwait(ctx =>
                pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
        ))
        .then(passThroughAwait(() => delay(6_000)))
        .then(ctx => hasContent(ctx.bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'))
        .then(resp => expect(resp).to.be.true)
    );


    it('should query for the same cid with either v0 or v1 other direction', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig
        })
        .then(passThroughAwait(ctx =>
                pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
        ))
            .then(passThroughAwait(() => delay(12_000)))
            .then(ctx => loadCID().then(CID => 
                hasContent(ctx.bzSdk, CID.parse('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi').toV0().toString())
            ))
            .then(resp => expect(resp).to.be.true)
    );


    it('should query a transaction by hash', () => {
      return startSwarmWithClient({
                config: defaultSwarmConfig
              })
              .then(ctx =>
                      (pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                          maxGas: 10000000,
                          gasPrice: 0.002,
                          mode: 'sync'
                      }) as any)
                      .then((resp: any) => ({
                        resp,
                        bzSdk: ctx.bzSdk
                      }))
              )
            .then(({resp, bzSdk}) => getTx(bzSdk, resp.transactionHash))
    });

});