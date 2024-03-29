package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SetTaxCollector(goCtx context.Context, msg *types.MsgSetTaxCollector) (*types.MsgSetTaxCollectorResponse, error) {
	if !isAdmin(msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "permission denied")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return nil, err
	}
	info.TaxCollector = msg.TaxCollector
	k.SetTaxInfoKeep(ctx, &info)

	return &types.MsgSetTaxCollectorResponse{}, nil
}
