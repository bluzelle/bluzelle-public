package types

// DONTCOVER

import (
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

// x/tax module sentinel errors
var (
	ErrSample = sdkerrors.Register(ModuleName, 1100, "sample error")

	ErrInvalidGasTaxBp = sdkerrors.Register(ModuleName, 1101, "invalid gas tax bp")

	ErrInvalidTransferTaxBp = sdkerrors.Register(ModuleName, 1102, "invalid transfer tax bp")

	ErrInvalidTaxCollector = sdkerrors.Register(ModuleName, 1103, "invalid tax collector")
)
