package keeper

import (
	"context"

	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

var _ types.QueryServer = Keeper{}

func (k Keeper) GetAdminAddress(goCtx context.Context, req *types.QueryGetAdminAddressRequest) (*types.QueryGetAdminAddressResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	adminAddress := k.GetAdminAddress(ctx)

	return &types.QueryGetAdminAddressResponse{
		AdminAddress: adminAddress,
	}, nil
}
