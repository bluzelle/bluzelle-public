package ante

import (
	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

// ChargeGasDecorator charges the gas meter after the transaction has been processed.
// This decorator should be placed at the end of the AnteHandler chain.
type ChargeGasDecorator struct {
	gasMeterKeeper *gasmeter.Keeper
}

func NewChargeGasDecorator(gasMeterKeeper *gasmeter.Keeper) ChargeGasDecorator {
	return ChargeGasDecorator{
		gasMeterKeeper: gasMeterKeeper,
	}
}

func (cgd ChargeGasDecorator) AnteHandle(ctx sdk.Context, tx sdk.Tx, simulate bool, next sdk.AnteHandler) (newCtx sdk.Context, err error) {
	// Call the next handler first to process the transaction
	newCtx, err = next(ctx, tx, simulate)
	if err != nil {
		return newCtx, err
	}

	// Only charge during DeliverTx (not CheckTx or simulation)
	if !simulate && !newCtx.IsCheckTx() {
		// Charge all gas meters that were stored in the keeper
		// These were added in SetUpContextDecorator when the gas meter was created
		errors := cgd.gasMeterKeeper.ChargeAll(newCtx)
		if len(errors) > 0 {
			// Log errors but don't fail the transaction as it has already succeeded
			for _, chargeErr := range errors {
				newCtx.Logger().Error("Unable to charge gas after transaction", "error", chargeErr)
			}
		}
		// Clear the gas meters after charging
		cgd.gasMeterKeeper.ClearAll()
	}

	return newCtx, nil
}
