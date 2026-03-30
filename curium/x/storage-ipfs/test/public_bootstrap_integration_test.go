//go:build integration
// +build integration

package storage_test

import (
	"context"
	"net"
	"os"
	"testing"
	"time"

	curiumipfs "github.com/bluzelle/bluzelle-public/curium/x/storage-ipfs/ipfs"
	"github.com/bluzelle/ipfs-kubo/config"
	"github.com/stretchr/testify/require"
)

func getFreePort(t *testing.T) int64 {
	t.Helper()
	l, err := net.Listen("tcp", "127.0.0.1:0")
	require.NoError(t, err)
	defer l.Close()
	return int64(l.Addr().(*net.TCPAddr).Port)
}

func TestEmbeddedIPFSPeersWithPublicBootstrap(t *testing.T) {
	if os.Getenv("RUN_PUBLIC_IPFS_TESTS") != "1" {
		t.Skip("set RUN_PUBLIC_IPFS_TESTS=1 to run public peering integration test")
	}

	ctx, cancel := context.WithTimeout(context.Background(), 90*time.Second)
	defer cancel()

	repoPath := "./testrepo-public-bootstrap"
	require.NoError(t, os.RemoveAll(repoPath))

	require.NoError(t, curiumipfs.CreateRepo(repoPath, curiumipfs.CreateRepoOptions{
		SwarmPort:   getFreePort(t),
		ApiPort:     getFreePort(t),
		GatewayPort: getFreePort(t),
		Transformer: func(c *config.Config) error {
			// Keep defaults, including Bootstrap list (dnsaddr bootstrap.libp2p.io).
			return nil
		},
	}))

	node, err := curiumipfs.SpawnStorageIpfsNode(ctx, repoPath)
	require.NoError(t, err)
	defer func() { _ = node.Stop() }()

	// Prove the bootstrap list is present (dynamic from runtime config, not hardcoded).
	cfg, err := node.Repo.Config()
	require.NoError(t, err)
	require.NotEmpty(t, cfg.Bootstrap)

	// Wait until we have at least one swarm connection (public peering without any local daemon).
	deadline := time.Now().Add(75 * time.Second)
	for time.Now().Before(deadline) {
		peers, err := node.IpfsApi.Swarm().Peers(ctx)
		require.NoError(t, err)
		if len(peers) > 0 {
			return
		}
		time.Sleep(2 * time.Second)
	}

	t.Fatalf("expected to peer with at least one public IPFS bootstrap node, got 0 peers")
}
