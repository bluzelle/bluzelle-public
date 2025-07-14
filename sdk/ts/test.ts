import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'
import { createLibp2p } from 'libp2p'
import { webSockets } from '@libp2p/websockets'
import { bootstrap } from '@libp2p/bootstrap'
import { kadDHT } from '@libp2p/kad-dht'
import { noise } from '@chainsafe/libp2p-noise'
import { mplex } from '@libp2p/mplex'
import { identify } from '@libp2p/identify'
import { ping } from '@libp2p/ping'


async function uploadToPinata(): Promise<string> {
 const libp2p = await createLibp2p({
  transports: [webSockets()],
  streamMuxers: [mplex()],
  connectionEncrypters: [noise()],
  peerDiscovery: [
    bootstrap({
      list: [
        '/ip4/104.131.131.82/tcp/4001/p2p/QmaCpDMGvV2BGHeYERUEnRQAwe3N8SzbUtfsmvsqQLuvuJ',
        '/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN',
        '/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa'
      ]
    })
  ],
  services: {
    identify: identify(),  // Required by DHT
    ping: ping(), 
    dht: kadDHT()          // Enables public IPFS routing
    
  }
})
  setInterval(() => {
    console.log('Peers:', libp2p.getPeers().map(p => p.toString()))
    console.log('Listening on:', libp2p.getMultiaddrs().map(ma => ma.toString()))
  }, 10000)
  // const helia = await createHelia({ libp2p })
  // const fs = unixfs(helia)

  // // 👇 Your content
  // const content = new TextEncoder().encode('Hello from Helia + public IPFS!')

  // // 👇 Add content to IPFS
  // const cid = await fs.addBytes(content)
  // await helia.routing.provide(cid)
  // console.log('helia:', helia)
  // console.log(`✅ CID: ${cid.toString()}`)
  // return cid.toString();
  return "";
}

uploadToPinata();