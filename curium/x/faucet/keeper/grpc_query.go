package keeper

import (
	"github.com/bluzelle/bluzelle-public/curium/x/faucet/types"
)

var _ types.QueryServer = Keeper{}
