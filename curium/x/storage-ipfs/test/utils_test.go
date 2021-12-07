package storage_test

import (
	"context"
	"fmt"
	"github.com/bluzelle/curium/x/storage-ipfs/ipfs"
	"github.com/ipfs/go-ipfs-files"
	"github.com/ipfs/interface-go-ipfs-core/path"
	"io"
	"net"
	"os"
	"time"
)

func getFile(ctx context.Context, node *curiumipfs.StorageIpfsNode, cid path.Resolved) ([]byte, error) {
	file, err := node.IpfsApi.Unixfs().Get(ctx, cid)
	if err != nil {
		return nil, err
	}
	content, err := io.ReadAll(files.ToFile(file))
	if err != nil {
		return nil, err
	}
	return content, nil

}

func uploadFile(ctx context.Context, inputFile string, node *curiumipfs.StorageIpfsNode) (path.Resolved, error) {
	someFile, err := getUnixfsNode(inputFile)
	if err != nil {
		panic(fmt.Errorf("could not get File: %s", err))
	}

	cidPath, err := node.IpfsApi.Unixfs().Add(ctx, someFile)
	if err != nil {
		panic(fmt.Errorf("could not add File: %s", err))
	}

	return cidPath, nil
}

func checkPortOpen(host string, port string) bool {
	_, err := net.DialTimeout("tcp", net.JoinHostPort(host, port), time.Second)
	return err == nil
}

func withIpfsNodes(fn func(context.Context, []*curiumipfs.StorageIpfsNode) error) error {

	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()

	err := os.RemoveAll("./testrepo1")
	if err != nil {
		return err
	}
	err = os.RemoveAll("./testrepo2")
	if err != nil {
		return err
	}

	err = curiumipfs.CreateRepo("./testrepo1", curiumipfs.CreateRepoOptions{})
	if err != nil {
		return err
	}
	err = curiumipfs.CreateRepo("./testrepo2", curiumipfs.CreateRepoOptions{
		GatewayPort: 8082,
		ApiPort:     5002,
		SwarmPort:   4002,
	})
	if err != nil {
		return err
	}

	node1, err := curiumipfs.SpawnStorageIpfsNode(ctx, "./testrepo1")
	if err != nil {
		return err
	}

	node2, err := curiumipfs.SpawnStorageIpfsNode(ctx, "./testrepo2")
	if err != nil {
		return err
	}

	if err = fn(ctx, []*curiumipfs.StorageIpfsNode{node1, node2}); err != nil {
		return err
	}

	if err = node1.Stop(); err != nil {
		return err
	}

	if err = node2.Stop(); err != nil {
		return err
	}

	return nil
}

func getUnixfsNode(path string) (files.Node, error) {
	st, err := os.Stat(path)
	if err != nil {
		return nil, err
	}

	f, err := files.NewSerialFile(path, false, st)
	if err != nil {
		return nil, err
	}

	return f, nil
}
