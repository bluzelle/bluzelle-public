package types

import sdk "github.com/cosmos/cosmos-sdk/types"

const (
	AccountAddressPrefix = "bluzelle"
	Denom                = "ubnt"
	KeyGasTaxBp          = "gas_tax_bp"
	KeyTransferTaxBp     = "transfer_tax_bp"
	KeyTaxCollector      = "tax_collector"
	KeyTaxInfo           = "taxinfo"
)

type TaxInfo struct {
	GasTaxBp      int64
	TransferTaxBp int64
	Collector     sdk.AccAddress
}
