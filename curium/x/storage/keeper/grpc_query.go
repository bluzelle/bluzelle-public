package keeper

import (
	"github.com/bluzelle/bluzelle/curium/x/storage/types"
)

var _ types.QueryServer = Keeper{}
