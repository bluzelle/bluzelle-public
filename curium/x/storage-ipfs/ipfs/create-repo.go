package curiumipfs

import (
	"flag"
	"fmt"
	"github.com/tendermint/tendermint/libs/os"
	"io/ioutil"
	"sync"

	"github.com/bluzelle/ipfs-kubo/config"
	"github.com/bluzelle/ipfs-kubo/repo/fsrepo"
)

type CreateRepoOptions struct {
	SwarmPort   int64
	ApiPort     int64
	GatewayPort int64
}

func RepoExists(repoPath string) bool {
	return os.FileExists(repoPath)
}

var onceSetupPlugins = new(sync.Once)

func SetupPlugins() error {
	var err error
	onceSetupPlugins.Do(func() {
		err = setupPlugins("")
	})
	return err
}

func CreateRepo(repoPath string, configOptions CreateRepoOptions) error {
	if err := SetupPlugins(); err != nil {
		return err
	}

	// Create a config with default options and a 2048 bit key
	cfg, err := config.Init(ioutil.Discard, 2048)
	if err != nil {
		return err
	}

	if configOptions.SwarmPort == 0 {
		configOptions.SwarmPort = 4001
	}
	if configOptions.ApiPort == 0 {
		configOptions.ApiPort = 5001
	}
	if configOptions.GatewayPort == 0 {
		configOptions.GatewayPort = 8080
	}

	cfg.API.HTTPHeaders["Access-Control-Allow-Origin"] = []string{"*"}

	cfg.Addresses.Swarm = []string{
		fmt.Sprintf("/ip4/0.0.0.0/tcp/%d", configOptions.SwarmPort),
		fmt.Sprintf("/ip6/::/tcp/%d", configOptions.SwarmPort),
		fmt.Sprintf("/ip4/0.0.0.0/udp/%d/quic", configOptions.SwarmPort),
		fmt.Sprintf("/ip6/::/udp/%d/quic", configOptions.SwarmPort),
	}

	cfg.Addresses.API = []string{fmt.Sprintf("/ip4/0.0.0.0/tcp/%d", configOptions.ApiPort)}
	cfg.Addresses.Gateway = []string{fmt.Sprintf("/ip4/0.0.0.0/tcp/%d", configOptions.GatewayPort)}

	// When creating the repository, you can define custom settings on the repository, such as enabling experimental
	// features (See experimental-features.md) or customizing the gateway endpoint.
	// To do such things, you should modify the variable `cfg`. For example:
	if *flagExp {
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-filestore
		cfg.Experimental.FilestoreEnabled = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-urlstore
		cfg.Experimental.UrlstoreEnabled = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#ipfs-p2p
		cfg.Experimental.Libp2pStreamMounting = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#p2p-http-proxy
		cfg.Experimental.P2pHttpProxy = true
		// https://github.com/ipfs/go-ipfs/blob/master/docs/experimental-features.md#strategic-providing
		cfg.Experimental.StrategicProviding = true
	}

	// Create the repo with the config
	err = fsrepo.Init(repoPath, cfg)
	if err != nil {
		return fmt.Errorf("failed to init ephemeral node: %s", err)
	}

	return nil
}

var flagExp = flag.Bool("experimental", false, "enable experimental features")
