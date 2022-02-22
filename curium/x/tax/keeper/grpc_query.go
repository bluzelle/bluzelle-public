package keeper

import (
	"github.com/bluzelle/curium/x/tax/types"
)

var _ types.QueryServer = Keeper{}
