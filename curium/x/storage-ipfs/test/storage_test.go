package storage_test

import (
	"context"
	"os"
	"testing"

	curiumipfs "github.com/bluzelle/bluzelle-public/curium/x/storage-ipfs/ipfs"
	"github.com/bluzelle/ipfs-kubo/config"
	"github.com/ipfs/go-cid"
	"github.com/stretchr/testify/assert"
)

func Test(t *testing.T) {
	t.Run("should start up a node", func(t *testing.T) {

		err := withIpfsNodes(func(_ context.Context, _ []*curiumipfs.StorageIpfsNode) error {
			assert.True(t, checkPortOpen("127.0.0.1", "4001"))
			assert.True(t, checkPortOpen("127.0.0.1", "4002"))
			return nil
		})

		if err != nil {
			t.Fatal(err)
		}
	})

	t.Run("should be able to know if repo exists before starting", func(t *testing.T) {
		os.RemoveAll("./testrepo1")
		assert.False(t, curiumipfs.RepoExists("./testrepo1"))
		curiumipfs.CreateRepo("./testrepo1", curiumipfs.CreateRepoOptions{
			Transformer: func(c *config.Config) error {
				return nil
			},
		})
		assert.True(t, curiumipfs.RepoExists("./testrepo1"))
	})

	t.Run("should be able to know if a properly intialized ipfs repo exists", func(t *testing.T) {
		os.RemoveAll("./testrepo3")
		assert.False(t, curiumipfs.RepoExists("./testrepo3"))
		d1 := []byte("hello\ngo\n")
		_ = os.Mkdir("./testrepo3", 0777)
		_ = os.WriteFile("./testrepo3/lost+found", d1, 0644)
		assert.False(t, curiumipfs.RepoExists("./testrepo3"))
	})

	t.Run("should replicate between nodes", func(t *testing.T) {
		err := withIpfsNodes(func(ctx context.Context, nodes []*curiumipfs.StorageIpfsNode) error {

			cidPath, err := uploadFile(ctx, "./testfile.txt", nodes[0])
			if err != nil {
				return err
			}
			mCid, err := cid.Decode(cidPath.String())

			if err != nil {
				return err
			}
			isLocal, err := nodes[0].HasLocal(ctx, mCid)
			if err != nil {
				return err
			}
			assert.True(t, isLocal)

			if isLocal, err = nodes[1].HasLocal(ctx, mCid); err != nil {
				return err
			}
			assert.False(t, isLocal)

			if err = nodes[1].AddPin(cidPath.String()); err != nil {
				return err
			}

			if err = nodes[0].Stop(); err != nil {
				return err
			}

			if isLocal, err = nodes[1].HasLocal(ctx, mCid); err != nil {
				return err
			}
			assert.True(t, isLocal)

			content, err := getFile(ctx, nodes[1], cidPath)
			if err != nil {
				return err
			}

			fileContent, err := os.ReadFile("./testfile.txt")

			assert.Equal(t, content, fileContent)

			return nil
		})
		if err != nil {
			t.Fatal(err)
		}

	})
}
