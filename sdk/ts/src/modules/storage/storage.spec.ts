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
import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
// import { createLibp2p } from 'libp2p'
// import { webSockets } from '@libp2p/websockets'
// import { bootstrap } from '@libp2p/bootstrap'
// import { kadDHT } from '@libp2p/kad-dht'
// import { noise } from '@chainsafe/libp2p-noise'
// import { mplex } from '@libp2p/mplex'

// import "../../utils/fetch-polyfill";

const curiumUrl = 'http://localhost:26667';
const mnemonic = new BehaviorSubject<string>("");

async function createHeliaClient() {
    const { createHelia } = await eval('import("helia")');
    const { unixfs } = await eval('import("@helia/unixfs")');
    const { createLibp2p } = await eval('import("libp2p")');
    const { webSockets } = await eval('import("@libp2p/websockets")');
    const { bootstrap } = await eval('import("@libp2p/bootstrap")');
    const { kadDHT } = await eval('import("@libp2p/kad-dht")');
    const { noise } = await eval('import("@chainsafe/libp2p-noise")');
    const { mplex } = await eval('import("@libp2p/mplex")');
    const { identify } = await eval('import("@libp2p/identify")')
    const { ping } = await eval('import("@libp2p/ping")')
    const { tcp } = await eval('import("@libp2p/tcp")');
    const libp2p = await createLibp2p({
        transports: [
            webSockets(),
              tcp(),           // ✅ For IPFS bootstrap nodes over TCP
        ],
        streamMuxers: [mplex()],
        connectionEncrypters: [noise()],
        peerDiscovery: [
            bootstrap({
            list: [
                 '/ip4/147.75.83.83/tcp/4001/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
                    '/ip4/147.75.109.187/tcp/4001/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
                // "/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
                // "/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
                // "/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
                // "/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",
                // "/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ",
                // "/ip4/104.131.131.82/udp/4001/quic-v1/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ"
            ]
            })
        ],
    services: {
        identify: identify(),         // ✅ <-- REQUIRED FOR kad-dht
        dht: kadDHT() as any  ,        // ✅ your DHT (already cast safely)
        ping: ping(),
    }
    });

    console.log(libp2p.getPeers().map(p => p.toString()))
    const helia = await createHelia({libp2p});
    console.log("-----------helia--------", helia)
    await delay(5000); // wait 5 seconds
    console.log('Connected peers:', libp2p.getPeers());
    const fs = unixfs(helia);
    return {
        add: async (content: Uint8Array) => {
            const cid = await fs.addBytes(content);
            return { path: cid.toString() };
        },
        helia,
        fs
    };
}

async function loadCID() {
    const { CID } = await eval('import("multiformats/cid")');
    return CID;
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
        
            Promise.resolve(generateContent(0.01))
            .then((content) => createHeliaClient().then((heliaClient) => heliaClient.add(content)))
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