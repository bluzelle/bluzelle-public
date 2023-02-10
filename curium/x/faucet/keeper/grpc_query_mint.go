package keeper

import (
	"context"
	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) Mint(goCtx context.Context, req *types.QueryMintRequest) (*types.QueryMintResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	addr, err := k.keyringReader.GetAddress("minter")
	if err != nil {
		return nil, err
	}

	msg := types.MsgMint{
		Creator: addr.String(),
		Address: req.Address,
	}

	k.broadcastMsg(ctx, []sdk.Msg{&msg}, "minter")

	return &types.QueryMintResponse{}, nil

}
