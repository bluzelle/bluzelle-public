package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/storage/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Pin(goCtx context.Context, msg *types.MsgPin) (*types.MsgPinResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	err := k.PinFile(msg.Cid)
	_ = ctx

	return &types.MsgPinResponse{}, err
}
