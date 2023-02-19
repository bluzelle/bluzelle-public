package keeper

import (
	"github.com/bluzelle/bluzelle-public/curium/x/curium/types"
)

var _ types.QueryServer = Keeper{}
