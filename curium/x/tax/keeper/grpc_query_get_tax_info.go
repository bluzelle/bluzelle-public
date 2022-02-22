package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

func (k Keeper) GetTaxInfo(goCtx context.Context, req *types.QueryGetTaxInfoRequest) (*types.QueryGetTaxInfoResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return nil, status.Error(codes.NotFound, "no tax info")
	}

	return &types.QueryGetTaxInfoResponse{
		GasTaxBp:      info.GasTaxBp,
		TransferTaxBp: info.TransferTaxBp,
		TaxCollector:  info.TaxCollector,
	}, nil
}
