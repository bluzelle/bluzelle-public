package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SetGasTaxBp(goCtx context.Context, msg *types.MsgSetGasTaxBp) (*types.MsgSetGasTaxBpResponse, error) {
	if !isAdmin(msg.Creator) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidAddress, "permission denied")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)

	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return nil, err
	}
	info.GasTaxBp = msg.Bp
	k.SetTaxInfoKeep(ctx, &info)

	return &types.MsgSetGasTaxBpResponse{}, nil
}
