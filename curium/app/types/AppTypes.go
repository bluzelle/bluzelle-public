package types

import (
	"github.com/cosmos/cosmos-sdk/store/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/tx/signing"
	"github.com/cosmos/cosmos-sdk/x/auth/ante"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	authsigning "github.com/cosmos/cosmos-sdk/x/auth/signing"
	auth "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

const (
	AccountAddressPrefix = "bluzelle"
	Name                 = "curium"
	Denom                = "ubnt"
	ErrLowGasPrice       = "Specified gas price too low"
	ErrGasTxParseError   = "Tx must be GasTx"
)

// GasTx defines a Tx with a GetGas() method which is needed to use SetUpContextDecorator
type GasTx interface {
	sdk.Tx
	GetGas() uint64
}

//type GasMeterOptions struct {
//	Simulate         bool
//	Ctx              sdk.Context
//	GasLimit         uint64
//	Tx               sdk.Tx
//	GasMeterKeeper   *gasmeter.Keeper
//	BankKeeper       bankkeeper.BaseKeeper
//	AccountKeeper    acctypes.AccountKeeper
//	MinGasPriceCoins sdk.DecCoins
//}

type AnteHandlerOptions struct {
	AccountKeeper   acctypes.AccountKeeper
	BankKeeper      bankkeeper.BaseKeeper
	FeegrantKeeper  ante.FeegrantKeeper
	SignModeHandler authsigning.SignModeHandler
	SigGasConsumer  func(meter types.GasMeter, sig signing.SignatureV2, params auth.Params) error
}
