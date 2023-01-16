package ante

import (
	"fmt"
	"github.com/bluzelle/bluzelle/curium/app/ante/gasmeter"
	appTypes "github.com/bluzelle/bluzelle/curium/app/types"
	"github.com/bluzelle/bluzelle/curium/app/types/global"
	taxmodulekeeper "github.com/bluzelle/bluzelle/curium/x/tax/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

type SetGasMeterOptions struct {
	Simulate         bool
	Ctx              sdk.Context
	GasLimit         uint64
	Tx               sdk.Tx
	GasMeterKeeper   *gasmeter.Keeper
	BankKeeper       bankkeeper.Keeper
	AccountKeeper    acctypes.AccountKeeper
	TaxKeeper        taxmodulekeeper.Keeper
	MinGasPriceCoins sdk.DecCoins
}

// SetUpContextDecorator sets the GasMeter in the Context and wraps the next AnteHandler with a defer clause
// to recover from any downstream OutOfGas panics in the AnteHandler chain to return an error with information
// on gas provided and gas used.
// CONTRACT: Must be first decorator in the chain
// CONTRACT: Tx must implement GasTx interface
type SetUpContextDecorator struct {
	gasMeterKeeper   *gasmeter.Keeper
	bankKeeper       bankkeeper.Keeper
	accountKeeper    acctypes.AccountKeeper
	taxKeeper        taxmodulekeeper.Keeper
	minGasPriceCoins sdk.DecCoins
}

func NewSetUpContextDecorator(gasMeterKeeper *gasmeter.Keeper, bankKeeper bankkeeper.Keeper, accountKeeper acctypes.AccountKeeper, taxKeeper taxmodulekeeper.Keeper, minGasPriceCoins sdk.DecCoins) SetUpContextDecorator {
	return SetUpContextDecorator{
		gasMeterKeeper:   gasMeterKeeper,
		bankKeeper:       bankKeeper,
		accountKeeper:    accountKeeper,
		taxKeeper:        taxKeeper,
		minGasPriceCoins: minGasPriceCoins,
	}
}

func (sud SetUpContextDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	// all transactions must implement GasTx
	gasTx, ok := tx.(appTypes.GasTx)
	if !ok {
		// Set a gas meter with limit 0 as to prevent an infinite gas meter attack
		// during runTx.
		gasMeterOptions := SetGasMeterOptions{
			Simulate:         simulate,
			Ctx:              ctx,
			GasLimit:         0,
			Tx:               tx,
			GasMeterKeeper:   sud.gasMeterKeeper,
			BankKeeper:       sud.bankKeeper,
			AccountKeeper:    sud.accountKeeper,
			TaxKeeper:        sud.taxKeeper,
			MinGasPriceCoins: sud.minGasPriceCoins,
		}
		newCtx, _ = SetGasMeter(gasMeterOptions)
		return newCtx, sdkerrors.Wrap(sdkerrors.ErrTxDecode, appTypes.ErrGasTxParseError)
	}

	gasMeterOptions := SetGasMeterOptions{
		Simulate:         simulate,
		Ctx:              ctx,
		GasLimit:         gasTx.GetGas(),
		Tx:               tx,
		GasMeterKeeper:   sud.gasMeterKeeper,
		BankKeeper:       sud.bankKeeper,
		AccountKeeper:    sud.accountKeeper,
		TaxKeeper:        sud.taxKeeper,
		MinGasPriceCoins: sud.minGasPriceCoins,
	}
	newCtx, _ = SetGasMeter(gasMeterOptions)

	// Decorator will catch an OutOfGasPanic caused in the next antehandler
	// AnteHandlers must have their own defer/recover in order for the BaseApp
	// to know how much gas was used! This is because the GasMeter is created in
	// the AnteHandler, but if it panics the context won't be set properly in
	// runTx's recover call.
	defer func() {
		if r := recover(); r != nil {
			switch rType := r.(type) {
			case sdk.ErrorOutOfGas:
				log := fmt.Sprintf(
					"out of gas in location: %v; gasWanted: %d, gasUsed: %d",
					rType.Descriptor, gasTx.GetGas(), newCtx.GasMeter().GasConsumed())

				err = sdkerrors.Wrap(sdkerrors.ErrOutOfGas, log)
			default:
				panic(r)
			}
		}
	}()

	return next(newCtx, tx, simulate)
}

// SetGasMeter returns a new context with a gas meter set from a given context.
func SetGasMeter(options SetGasMeterOptions) (sdk.Context, error) {
	// In various cases such as simulation and during the genesis block, we do not
	// meter any gas utilization.
	if options.Simulate || options.Ctx.BlockHeight() == 0 {
		return options.Ctx.WithGasMeter(sdk.NewInfiniteGasMeter()), nil
	}

	feeTx := options.Tx.(sdk.FeeTx)
	maxGas := feeTx.GetGas()

	maxGasInt := sdk.NewIntFromUint64(maxGas).ToDec()
	feeInt := feeTx.GetFee().AmountOf(global.Denom).ToDec()

	gasPrice := feeInt.Quo(maxGasInt)
	gasPriceCoin := sdk.NewDecCoinFromDec(global.Denom, gasPrice)
	gasPriceCoins := sdk.NewDecCoins(gasPriceCoin)

	feePayer := feeTx.FeePayer()

	if gasPriceCoins.AmountOf(global.Denom).LT(options.MinGasPriceCoins.AmountOf(global.Denom)) {
		return options.Ctx, sdkerrors.New(appTypes.Name, 2, appTypes.ErrLowGasPrice)
	}

	gm := gasmeter.NewChargingGasMeter(options.BankKeeper, options.AccountKeeper, options.TaxKeeper, options.GasLimit, feePayer, gasPriceCoins)
	if !options.Ctx.IsCheckTx() {
		options.GasMeterKeeper.AddGasMeter(gm)
	}
	return options.Ctx.WithGasMeter(gm), nil
}
