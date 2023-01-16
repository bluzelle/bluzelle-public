package keeper

import (
	"github.com/bluzelle/bluzelle/curium/x/faucet/types"
)

var _ types.QueryServer = Keeper{}
