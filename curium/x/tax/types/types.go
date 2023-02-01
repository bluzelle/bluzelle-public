package types

import sdk "github.com/cosmos/cosmos-sdk/types"

const (
	AccountAddressPrefix = "bluzelle"
	Denom                = "ubnt"
	DenomUg4             = "ug4"
	DenomUelt            = "uelt"
	KeyTaxInfo           = "taxinfo"
)

type TaxInfo struct {
	GasTaxBp      int64
	TransferTaxBp int64
	Collector     sdk.AccAddress
}
