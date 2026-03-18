import {generateContent} from "@bluzelle/testing/src/fileUtils";
import {passThroughAwait} from "promise-passthrough";
import { withCtxAwait} from "@scottburch/with-context";
import {expect} from "chai";
import { delayWithLog } from '../../utils/delayWithLog';
import {defaultSwarmConfig} from "@bluzelle/testing";
import {hasContent} from "./query";
import {pinCid} from "./tx";
import {getTx} from "../../core";
import { startSwarmWithClient, stopSwarm } from "@bluzelle/testing/src/swarmUtils";
import { isE2E } from "@bluzelle/testing/src/e2eUtils";

import FormData from "form-data";
import axios from "axios";
const uploadToIpfs = async (contentObj: any) => {
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

async function loadCID() {
    const { CID } = await eval('import("multiformats/cid")');
    return CID;
}

describe('storage module', function () {
    this.timeout(6_000_000);

    beforeEach(() =>
        stopSwarm({...defaultSwarmConfig})
    );

    it('hasContent should return true if content is pinned', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig,
          isE2E: isE2E()
        })
        .then(withCtxAwait('addResult', ()=> uploadToIpfs(generateContent(0.01))))
        .then(passThroughAwait(()=> delayWithLog(20_000, 'wait for the pinned IPFS content to be indexed before checking hasContent=true')))
        .then(passThroughAwait((ctx) =>
            pinCid(ctx.bzSdk, { cid: ctx.addResult.path }, { maxGas: 200000, gasPrice: 0.002, mode: 'sync' })
            // .then(() => console.log)
          )
        )
        .then(passThroughAwait(()=> delayWithLog(20_000, 'wait after pinning so hasContent reflects the newly pinned CID')))
        .then(ctx => 
            hasContent(ctx.bzSdk, ctx.addResult.path)
        )
        .then((confirm) => expect(confirm).to.be.true)
      )

    it('hasContent should return false if content is NOT pinned', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig,
          isE2E: isE2E()
        })
        .then(withCtxAwait('addResult', ()=> uploadToIpfs(generateContent(0.01))))
        .then(passThroughAwait(()=> delayWithLog(20_000, 'wait for the network to settle before checking hasContent=false (content not pinned)')))
        .then(ctx => 
            hasContent(ctx.bzSdk, ctx.addResult.path)
        )
        .then((confirm) => expect(confirm).to.be.false)
    );


    it('should query for v1 cids', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig,
          isE2E: isE2E()
        })
        .then(passThroughAwait(ctx =>
                pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
        ))
        .then(passThroughAwait(() => delayWithLog(6_000, 'wait briefly after pinning a V1 CID before checking hasContent')))
        .then(ctx => hasContent(ctx.bzSdk, 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'))
        .then(resp => expect(resp).to.be.true)
    );


    it('should query for the same cid with either v0 or v1', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig,
          isE2E: isE2E()

        })
        .then(passThroughAwait(ctx =>
                pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
        ))
        .then(passThroughAwait(() => delayWithLog(6_000, 'wait briefly after pinning to allow hasContent to become queryable for V0/V1 comparison')))
        .then(ctx => hasContent(ctx.bzSdk, 'QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'))
        .then(resp => expect(resp).to.be.true)
    );


    it('should query for the same cid with either v0 or v1 other direction', () =>
        startSwarmWithClient({
          config: defaultSwarmConfig,
          isE2E: isE2E()

        })
        .then(passThroughAwait(ctx =>
                pinCid(ctx.bzSdk, {cid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi'}, {
                    maxGas: 10000000,
                    gasPrice: 0.002,
                    mode: 'sync'
                })
        ))
            .then(passThroughAwait(() => delayWithLog(12_000, 'wait long enough for hasContent to settle before checking V0/V1 other-direction')))
            .then(ctx => loadCID().then(CID => 
                hasContent(ctx.bzSdk, CID.parse('bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi').toV0().toString())
            ))
            .then(resp => expect(resp).to.be.true)
    );


    it('should query a transaction by hash', () => {
      return startSwarmWithClient({
                config: defaultSwarmConfig,
                isE2E: isE2E()

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
            .then((res) => expect(res.tx?.body?.messages[0].typeUrl).to.equals('/storage.MsgPin'))
    });

});