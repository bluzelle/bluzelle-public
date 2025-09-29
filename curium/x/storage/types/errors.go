package types

// DONTCOVER

import (
	sdkerrors "cosmossdk.io/errors"
)

// x/storage module sentinel errors
var (
	ErrSample = sdkerrors.Register(ModuleName, 1100, "sample error")
)
