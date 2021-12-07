package keeper

import (
	"github.com/bluzelle/curium/x/storage/types"
)

var _ types.QueryServer = Keeper{}
