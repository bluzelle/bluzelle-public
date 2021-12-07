package keeper

import (
	"context"
	"fmt"
	curiumipfs "github.com/bluzelle/curium/x/storage-ipfs/ipfs"
	"github.com/tendermint/tendermint/libs/log"

	"github.com/bluzelle/curium/x/storage/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

type (
	Keeper struct {
		cdc         codec.BinaryCodec
		storeKey    sdk.StoreKey
		memKey      sdk.StoreKey
		storageDir  string
		storageNode *curiumipfs.StorageIpfsNode
	}
)

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	storageDir string,
	storageNode *curiumipfs.StorageIpfsNode,

) *Keeper {
	return &Keeper{
		cdc:         cdc,
		storeKey:    storeKey,
		memKey:      memKey,
		storageDir:  storageDir,
		storageNode: storageNode,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", types.ModuleName))
}

func CreateRepoIfNotExist(repoPath string, options curiumipfs.CreateRepoOptions) error {
	if curiumipfs.RepoExists(repoPath) == false {
		return curiumipfs.CreateRepo(repoPath, options)
	}
	return nil
}

func StartStorageNode(repoPath string) (*curiumipfs.StorageIpfsNode, error) {
	node, err := curiumipfs.SpawnStorageIpfsNode(context.Background(), repoPath)
	if err != nil {
		return nil, err
	}
	return node, nil
}

func (k Keeper) PinFile(cid string) error {
	return k.storageNode.AddPin(cid)
}
