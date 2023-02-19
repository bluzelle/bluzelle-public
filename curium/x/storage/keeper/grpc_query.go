package keeper

import (
	"github.com/bluzelle/bluzelle-public/curium/x/storage/types"
)

var _ types.QueryServer = Keeper{}
