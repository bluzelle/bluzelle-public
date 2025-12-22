package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SetTaxCollector(goCtx context.Context, msg *types.MsgSetTaxCollector) (*types.MsgSetTaxCollectorResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.isAdmin(goCtx, msg.Creator) {
		return nil, errors.Wrap(sdkerrors.ErrInvalidAddress, "permission denied")
	}

	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return nil, err
	}
	info.TaxCollector = msg.TaxCollector
	k.SetTaxInfoKeep(ctx, &info)

	return &types.MsgSetTaxCollectorResponse{}, nil
}
