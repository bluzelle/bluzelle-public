package keeper

import (
	"github.com/bluzelle/bluzelle-public/curium/x/tax/types"
)

var _ types.QueryServer = Keeper{}
