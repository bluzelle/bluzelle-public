package keeper

import (
	"context"

	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
)

type msgServer struct {
	Keeper
}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

var _ types.MsgServer = msgServer{}

func (k msgServer) isAdmin(ctx context.Context, creator string) bool {
	adminAddress := k.CuriumKeeper.GetAdminAddress(ctx)
	return creator == adminAddress
}
