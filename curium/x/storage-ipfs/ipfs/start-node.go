package curiumipfs

import (
	"context"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"
	"sync"

	"github.com/bluzelle/ipfs-kubo/commands"
	"github.com/bluzelle/ipfs-kubo/core"
	"github.com/bluzelle/ipfs-kubo/core/coreapi"
	"github.com/bluzelle/ipfs-kubo/core/corehttp"
	coreiface "github.com/bluzelle/ipfs-kubo/core/coreiface"
	"github.com/bluzelle/ipfs-kubo/core/node/libp2p"
	"github.com/bluzelle/ipfs-kubo/plugin/loader"
	"github.com/bluzelle/ipfs-kubo/repo"
	"github.com/bluzelle/ipfs-kubo/repo/fsrepo"
	"github.com/ipfs/go-cid"
	ipfscid "github.com/ipfs/go-cid"

	// "github.com/ipfs/interface-go-ipfs-core/path"
	"github.com/ipfs/boxo/path"
	"github.com/libp2p/go-libp2p/core/peer"
	"github.com/multiformats/go-multiaddr"
)

var setupRun = false

// ConfigureStorageLogging aligns embedded IPFS logging with curiumd's log directive.
//
// Kubo (and friends) use github.com/ipfs/go-log which is configured via env vars.
// Setting these before node construction ensures IPFS/libp2p subsystems inherit it.
func ConfigureStorageLogging(curiumdDirective string) {
	directive := strings.TrimSpace(curiumdDirective)
	if directive == "" {
		directive = "info"
	}

	// Apply to IPFS internal loggers.
	_ = os.Setenv("GOLOG_LOG_LEVEL", directive)
	// Keep output readable when running in a terminal.
	_ = os.Setenv("GOLOG_LOG_FMT", "color")

	// Keep stdlib logger aligned for log.Printf usage in this package.
	log.SetOutput(os.Stderr)
}

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
	IpfsApi  coreiface.CoreAPI
	Context  context.Context
	Repo     repo.Repo
	IpfsNode *core.IpfsNode
	RepoPath string
}

func (storageNode *StorageIpfsNode) AddPin(cid string) error {
	ipfsCid, _ := ipfscid.Decode(cid)
	ipfsPath := path.FromCid(ipfsCid)
	return storageNode.IpfsApi.Pin().Add(storageNode.Context, ipfsPath)
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

	// Some tests use repo fixtures that include a config file but omit datastore directories.
	// Kubo expects these to exist (or it will fail writing blocks).
	for _, dir := range []string{
		repoPath,
		filepath.Join(repoPath, "blocks"),
		filepath.Join(repoPath, "blocks", ".temp"),
		filepath.Join(repoPath, "datastore"),
		filepath.Join(repoPath, "keystore"),
	} {
		if err := os.MkdirAll(dir, 0o755); err != nil {
			return nil, err
		}
	}

	// flatfs requires a SHARDING file in the blocks directory. Some repo fixtures omit it.
	// Default to the standard next-to-last/2 sharding used by kubo repo init.
	shardingPath := filepath.Join(repoPath, "blocks", "SHARDING")
	if _, err := os.Stat(shardingPath); err != nil {
		if os.IsNotExist(err) {
			if err := os.WriteFile(shardingPath, []byte("/repo/flatfs/shard/v1/next-to-last/2\n"), 0o644); err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	ipfsRepo, err := fsrepo.Open(repoPath)
	if err != nil {
		return nil, err
	}

	repoConfig, err := ipfsRepo.Config()
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

	go func() {
		bootstrapPeers := append([]string(nil), repoConfig.Bootstrap...)
		if len(bootstrapPeers) == 0 {
			log.Printf("ipfs bootstrap list is empty; skipping auto-connect")
			return
		}

		if err := connectToPeers(ctx, api, bootstrapPeers); err != nil {
			log.Printf("failed connect to bootstrap peers: %s", err)
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
		corehttp.GatewayOption("/ipfs", "/ipns"),
		corehttp.WebUIOption,
		corehttp.CommandsOption(cmdCtx(node)),
	}

	if err := corehttp.ListenAndServe(node.IpfsNode, addr, opts...); err != nil {
		fmt.Println("***** Error starting api server", err)
	}
	return nil
}

func connectToPeers(ctx context.Context, ipfs coreiface.CoreAPI, peers []string) error {
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
