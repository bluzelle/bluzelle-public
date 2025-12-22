package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) SetTransferTaxBp(goCtx context.Context, msg *types.MsgSetTransferTaxBp) (*types.MsgSetTransferTaxBpResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	if !k.isAdmin(goCtx, msg.Creator) {
		return nil, errors.Wrap(sdkerrors.ErrInvalidAddress, "permission denied")
	}

	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return nil, err
	}
	info.TransferTaxBp = msg.Bp
	k.SetTaxInfoKeep(ctx, &info)

	return &types.MsgSetTransferTaxBpResponse{}, nil
}
