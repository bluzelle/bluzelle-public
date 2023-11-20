package keeper

import (
	"context"
	curiumipfs "github.com/bluzelle/bluzelle-public/curium/x/storage-ipfs/ipfs"
	"github.com/libp2p/go-libp2p/core/peer"
	"github.com/multiformats/go-multiaddr"
	"log"
	"sync"
)

func AttemptConnections(ctx context.Context, node *curiumipfs.StorageIpfsNode, peers []string) error {
	var wg sync.WaitGroup
	peerInfos := make(map[peer.ID]*peer.AddrInfo, len(peers))
	for _, peerStr := range peers {
		addr, err := multiaddr.NewMultiaddr(peerStr)
		if err != nil {
			return err
		}
		pii, err := peer.AddrInfoFromP2pAddr(addr)
		if err != nil {
			return err
		}
		pi, ok := peerInfos[pii.ID]
		if !ok {
			pi = &peer.AddrInfo{ID: pii.ID}
			peerInfos[pi.ID] = pi
		}
		pi.Addrs = append(pi.Addrs, pii.Addrs...)
	}

	wg.Add(len(peerInfos))
	for _, peerInfo := range peerInfos {
		go func(peerInfo *peer.AddrInfo) {
			defer wg.Done()
			err := node.IpfsApi.Swarm().Connect(ctx, *peerInfo)
			if err != nil {
				log.Printf("failed to connect to %s: %s", peerInfo.ID, err)
			}
			log.Printf("Successfully connected to %s", peerInfo.ID)
		}(peerInfo)
	}
	wg.Wait()
	return nil
}
