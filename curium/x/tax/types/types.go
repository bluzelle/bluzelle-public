package types

import sdk "github.com/cosmos/cosmos-sdk/types"

const (
	AccountAddressPrefix = "bluzelle"
	Denom                = "ubnt"
	KeyTaxInfo           = "taxinfo"
	AdminAddress         = "bluzelle1dvc2u4l84hyfeem5fmfm9eyjlndpsycwwfhtln"
)

type TaxInfo struct {
	GasTaxBp      int64
	TransferTaxBp int64
	Collector     sdk.AccAddress
}
