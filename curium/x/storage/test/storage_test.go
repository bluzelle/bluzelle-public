package storage_test

import (
	"context"
	curiumipfs "github.com/bluzelle/curium/x/storage/ipfs"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
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

	t.Run("should replicate between nodes", func(t *testing.T) {
		err := withIpfsNodes(func(ctx context.Context, nodes []*curiumipfs.StorageIpfsNode) error {

			path, err := uploadFile(ctx, "./testfile.txt", nodes[0])
			if err != nil {
				return err
			}

			isLocal, err := nodes[0].HasLocal(path.Cid())
			if err != nil {
				return err
			}
			assert.True(t, isLocal)

			isLocal, err = nodes[1].HasLocal(path.Cid())
			if err != nil {
				return err
			}
			assert.False(t, isLocal)

			err = nodes[1].AddPin(path)
			if err != nil {
				return err
			}

			err = nodes[0].Stop()
			if err != nil {
				return err
			}

			isLocal, err = nodes[1].HasLocal(path.Cid())
			if err != nil {
				return err
			}
			assert.True(t, isLocal)

			content, err := getFile(ctx, nodes[1], path)
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
