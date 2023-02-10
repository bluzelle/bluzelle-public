package keeper

import (
	"context"
	sdk "github.com/cosmos/cosmos-sdk/types"

	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
)

func (k msgServer) Pin(goCtx context.Context, msg *types.MsgPin) (*types.MsgPinResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	k.PinFile(ctx, msg)

	return &types.MsgPinResponse{}, nil
}
