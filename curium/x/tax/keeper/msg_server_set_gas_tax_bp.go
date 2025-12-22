package keeper

import (
	"context"

	"cosmossdk.io/errors"
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

func (k msgServer) SetGasTaxBp(goCtx context.Context, msg *types.MsgSetGasTaxBp) (*types.MsgSetGasTaxBpResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.isAdmin(goCtx, msg.Creator) {
		return nil, errors.Wrap(sdkerrors.ErrInvalidAddress, "permission denied")
	}

	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return nil, err
	}
	info.GasTaxBp = msg.Bp
	k.SetTaxInfoKeep(ctx, &info)

	return &types.MsgSetGasTaxBpResponse{}, nil
}
