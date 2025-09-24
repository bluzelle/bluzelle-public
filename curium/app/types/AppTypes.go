package types

import (
	"cosmossdk.io/store/types"
	txsigning "cosmossdk.io/x/tx/signing"
	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

const (
	AccountAddressPrefix = "bluzelle"
	Name                 = "curium"
	ErrLowGasPrice       = "Specified gas price too low"
	ErrGasTxParseError   = "Tx must be GasTx"
	CoinType             = 483
)

// GasTx defines a Tx with a GetGas() method which is needed to use SetUpContextDecorator
type GasTx interface {
	sdk.Tx
	GetGas() uint64
}

type AnteHandlerOptions struct {
	AccountKeeper   acctypes.AccountKeeper
	BankKeeper      bankkeeper.BaseKeeper
	FeegrantKeeper  ante.FeegrantKeeper
	TaxKeeper       taxmodulekeeper.Keeper
	SignModeHandler *txsigning.HandlerMap
	SigGasConsumer  func(meter types.GasMeter, sig signing.SignatureV2, params auth.Params) error
	GasMeterKeeper  *gasmeter.Keeper
}
