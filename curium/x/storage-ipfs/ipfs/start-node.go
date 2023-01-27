package curiumipfs

import (
	"context"
	"fmt"
	"github.com/ipfs/go-cid"
	"github.com/ipfs/interface-go-ipfs-core"
	"github.com/ipfs/interface-go-ipfs-core/path"
	"github.com/libp2p/go-libp2p-core/peer"
	"github.com/multiformats/go-multiaddr"
	"log"
	"path/filepath"
	"sync"

	"github.com/bluzelle/ipfs-kubo/commands"
	"github.com/bluzelle/ipfs-kubo/core"
	"github.com/bluzelle/ipfs-kubo/core/coreapi"
	"github.com/bluzelle/ipfs-kubo/core/corehttp"
	"github.com/bluzelle/ipfs-kubo/core/node/libp2p"
	"github.com/bluzelle/ipfs-kubo/plugin/loader"
	"github.com/bluzelle/ipfs-kubo/repo"
	"github.com/bluzelle/ipfs-kubo/repo/fsrepo"
)

var setupRun = false

func setupPlugins(externalPluginsPath string) error {
	if setupRun == true {
		return nil
	}
	setupRun = true

	// Load any external plugins if available on externalPluginsPath
	plugins, err := loader.NewPluginLoader(filepath.Join(externalPluginsPath, "plugins"))
	if err != nil {
		return fmt.Errorf("error loading plugins: %s", err)
	}

	// Load preloaded and external plugins
	if err := plugins.Initialize(); err != nil {
		return fmt.Errorf("error initializing plugins: %s", err)
	}

	if err := plugins.Inject(); err != nil {
		return fmt.Errorf("error initializing plugins: %s", err)
	}

	return nil
}

func createNode(ctx context.Context, repo repo.Repo) (*core.IpfsNode, error) {

	nodeOptions := &core.BuildCfg{
		Online:  true,
		Routing: libp2p.DHTOption, // This option sets the node to be a full DHT node (both fetching and storing DHT Records)
		// Routing: libp2p.DHTClientOption, // This option sets the node to be a client DHT node (only fetching records)
		Repo:      repo,
		Permanent: false,
	}

	return core.NewNode(ctx, nodeOptions)
}

type StorageIpfsNode struct {
	IpfsApi  iface.CoreAPI
	Context  context.Context
	Repo     repo.Repo
	IpfsNode *core.IpfsNode
	RepoPath string
}

func (storageNode *StorageIpfsNode) AddPin(pathString string) error {
	return storageNode.IpfsApi.Pin().Add(storageNode.Context, path.New(pathString))
}

func (storageNode *StorageIpfsNode) Stop() error {
	err := storageNode.IpfsNode.Close()
	if err != nil {
		return err
	}

	return storageNode.Repo.Close()
}

func (storageNode *StorageIpfsNode) HasLocal(ctx context.Context, cid cid.Cid) (bool, error) {
	return storageNode.IpfsNode.Blockstore.Has(ctx, cid)
}

func cmdCtx(node *StorageIpfsNode) commands.Context {
	return commands.Context{
		ConfigRoot: node.RepoPath,
		//LoadConfig: func(path string) (*config.Config, error) {
		//	return node.Repo.Config()
		//},
		ConstructNode: func() (*core.IpfsNode, error) {
			return node.IpfsNode, nil
		},
		ReqLog: &commands.ReqLog{
			Requests: []*commands.ReqLogEntry{},
		},
	}
}

func SpawnStorageIpfsNode(ctx context.Context, repoPath string) (*StorageIpfsNode, error) {
	if err := setupPlugins(""); err != nil {
		return nil, err
	}

	ipfsRepo, err := fsrepo.Open(repoPath)
	if err != nil {
		return nil, err
	}

	node, err := createNode(ctx, ipfsRepo)
	if err != nil {
		return nil, err
	}

	api, err := coreapi.NewCoreAPI(node)
	if err != nil {
		return nil, err
	}

	bootstrapNodes := []string{
		// IPFS Bootstrapper nodes.
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmNnooDu7bfjPFoTZYxMNLWUQJyrVwtbZg5gBMjTezGAJN",
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmQCU2EcMqAqQPR2i9bChDtGNJchTbq5TbXJJ16u19uLTa",
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmbLHAnMoJPWSCR5Zhtx6BHJX9KiKNN6tpvbUcqanj75Nb",
		"/dnsaddr/bootstrap.libp2p.io/p2p/QmcZf59bWwK5XFi76CZX8cbJ4BhTzzA3gU1ZjYZcYW3dwt",

		// IPFS Cluster Pinning nodes
		"/ip4/138.201.67.219/tcp/4001/p2p/QmUd6zHcbkbcs7SMxwLs48qZVX3vpcM8errYS7xEczwRMA",
		"/ip4/138.201.67.219/udp/4001/quic/p2p/QmUd6zHcbkbcs7SMxwLs48qZVX3vpcM8errYS7xEczwRMA",
		"/ip4/138.201.67.220/tcp/4001/p2p/QmNSYxZAiJHeLdkBg38roksAR9So7Y5eojks1yjEcUtZ7i",
		"/ip4/138.201.67.220/udp/4001/quic/p2p/QmNSYxZAiJHeLdkBg38roksAR9So7Y5eojks1yjEcUtZ7i",
		"/ip4/138.201.68.74/tcp/4001/p2p/QmdnXwLrC8p1ueiq2Qya8joNvk3TVVDAut7PrikmZwubtR",
		"/ip4/138.201.68.74/udp/4001/quic/p2p/QmdnXwLrC8p1ueiq2Qya8joNvk3TVVDAut7PrikmZwubtR",
		"/ip4/94.130.135.167/tcp/4001/p2p/QmUEMvxS2e7iDrereVYc5SWPauXPyNwxcy9BXZrC1QTcHE",
		"/ip4/94.130.135.167/udp/4001/quic/p2p/QmUEMvxS2e7iDrereVYc5SWPauXPyNwxcy9BXZrC1QTcHE",

		// You can add more nodes here, for example, another IPFS node you might have running locally, mine was:
		// "/ip4/127.0.0.1/tcp/4010/p2p/QmZp2fhDLxjYue2RiUvLwT9MWdnbDxam32qYFnGmxZDh5L",
		// "/ip4/127.0.0.1/udp/4010/quic/p2p/QmZp2fhDLxjYue2RiUvLwT9MWdnbDxam32qYFnGmxZDh5L",
		"/ip4/52.204.207.70/tcp/4001/p2p/12D3KooWCp6VFUtssr9JiJGCamzNmctDYPjVEicAW1EpY2aDNhnr",
	}

	go func() {
		err := connectToPeers(ctx, api, bootstrapNodes)
		if err != nil {
			log.Printf("failed connect to peers: %s", err)
		}
	}()

	storageNode := &StorageIpfsNode{
		IpfsApi:  api,
		Context:  ctx,
		Repo:     ipfsRepo,
		IpfsNode: node,
		RepoPath: repoPath,
	}

	go func() {
		if err = startApiServer(storageNode); err != nil {
			fmt.Println("error starting api server", storageNode.RepoPath)
			fmt.Println(err)
		}
	}()

	return storageNode, nil
}

func startApiServer(node *StorageIpfsNode) error {

	repoConfig, err := node.Repo.Config()
	if err != nil {
		return err
	}

	addr := repoConfig.Addresses.API[0]
	var opts = []corehttp.ServeOption{
		corehttp.GatewayOption(true, "/ipfs", "/ipns"),
		corehttp.WebUIOption,
		corehttp.CommandsOption(cmdCtx(node)),
	}

	if err := corehttp.ListenAndServe(node.IpfsNode, addr, opts...); err != nil {
		fmt.Println("***** Error starting api server", err)
	}
	return nil
}

func connectToPeers(ctx context.Context, ipfs iface.CoreAPI, peers []string) error {
	var wg sync.WaitGroup
	peerInfos := make(map[peer.ID]*peer.AddrInfo, len(peers))
	for _, addrStr := range peers {
		addr, err := multiaddr.NewMultiaddr(addrStr)
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
			err := ipfs.Swarm().Connect(ctx, *peerInfo)
			if err != nil {
				log.Printf("failed to connect to %s: %s", peerInfo.ID, err)
			}
		}(peerInfo)
	}
	wg.Wait()
	return nil
}
