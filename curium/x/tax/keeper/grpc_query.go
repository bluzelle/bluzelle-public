package keeper

import (
	"github.com/bluzelle/bluzelle/curium/x/tax/types"
)

var _ types.QueryServer = Keeper{}
