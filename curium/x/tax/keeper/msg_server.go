package keeper

import (
	"github.com/bluzelle/bluzelle/curium/app/types/global"
	"github.com/bluzelle/bluzelle/curium/x/tax/types"
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

func isAdmin(creator string) bool {
	if creator == global.AdminAddress {
		return true
	}
	return false
}
