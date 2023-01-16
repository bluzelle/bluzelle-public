package keeper

import (
	"github.com/bluzelle/bluzelle/curium/x/curium/types"
)

var _ types.QueryServer = Keeper{}
