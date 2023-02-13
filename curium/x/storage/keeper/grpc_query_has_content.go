package keeper

import (
	"context"
	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/ipfs/go-cid"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) HasContent(goCtx context.Context, req *types.QueryHasContentRequest) (*types.QueryHasContentResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	c, err := cid.Decode(req.Cid)

	if err != nil {
		return nil, err
	}

	has, err := k.storageNode.IpfsNode.Blockstore.Has(c)
	if err != nil {
		return nil, err
	}

	_ = ctx

	return &types.QueryHasContentResponse{
		HasContent: has,
	}, nil
}
