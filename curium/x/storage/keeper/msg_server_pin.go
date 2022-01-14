package keeper

import (
	"context"

	"github.com/bluzelle/curium/x/storage/types"
)

func (k msgServer) Pin(goCtx context.Context, msg *types.MsgPin) (*types.MsgPinResponse, error) {
	//		ctx := sdk.UnwrapSDKContext(goCtx)
	go (func() {
		k.PinFile(msg.Cid)
	})()
	//		_ = ctx

	return &types.MsgPinResponse{}, nil
}
