package keeper

import (
	"context"
	"github.com/ipfs/go-cid"
	"github.com/multiformats/go-multihash"

	"github.com/bluzelle/curium/x/storage/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) HasContent(goCtx context.Context, req *types.QueryHasContentRequest) (*types.QueryHasContentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	mh, err := multihash.FromB58String(req.Cid)
	if err != nil {
		return nil, err
	}

	c := cid.NewCidV0(mh)
	has, err := k.storageNode.IpfsNode.Blockstore.Has(c)
	if err != nil {
		return nil, err
	}

	_ = ctx

	return &types.QueryHasContentResponse{
		HasContent: has,
	}, nil
}
