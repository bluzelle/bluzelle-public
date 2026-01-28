package keeper

import (
	"context"

	"cosmossdk.io/errors"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) ChangeAdmin(goCtx context.Context, msg *types.MsgChangeAdmin) (*types.MsgChangeAdminResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	// Get the current admin address
	currentAdmin := k.GetAdminAddressString(goCtx)
	if currentAdmin == "" {
		return nil, errors.Wrap(sdkerrors.ErrInvalidRequest, "admin address not set")
	}

	// Verify that the creator is the current admin
	if msg.Creator != currentAdmin {
		return nil, errors.Wrap(sdkerrors.ErrUnauthorized, "only the current admin can change the admin address")
	}

	// Set the new admin address
	k.SetAdminAddress(ctx, msg.NewAdmin)

	return &types.MsgChangeAdminResponse{}, nil
}













