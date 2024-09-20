package gasmeter

import (
	"fmt"
	"math"

	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
)

type ChargingGasMeter struct {
	limit         sdk.Gas
	consumed      sdk.Gas
	PayerAccount  sdk.AccAddress
	gasPrice      sdk.DecCoins
	bankKeeper    bankkeeper.Keeper
	accountKeeper acctypes.AccountKeeper
	taxKeeper     taxmodulekeeper.Keeper
}

func NewChargingGasMeter(bankKeeper bankkeeper.Keeper, accountKeeper acctypes.AccountKeeper, taxKeeper taxmodulekeeper.Keeper, limit sdk.Gas, payerAccount sdk.AccAddress, gasPrice sdk.DecCoins) *ChargingGasMeter {
	return &ChargingGasMeter{
		limit:         limit,
		consumed:      0,
		PayerAccount:  payerAccount,
		gasPrice:      gasPrice,
		bankKeeper:    bankKeeper,
		accountKeeper: accountKeeper,
		taxKeeper:     taxKeeper,
	}
}

func (g *ChargingGasMeter) GasConsumed() sdk.Gas {
	return g.consumed
}

func (g *ChargingGasMeter) Limit() sdk.Gas {
	return g.limit
}

func (g *ChargingGasMeter) GasConsumedToLimit() sdk.Gas {
	if g.IsPastLimit() {
		return g.limit
	}
	return g.consumed
}

func (g *ChargingGasMeter) ConsumeGas(amount sdk.Gas, descriptor string) {
	var overflow bool
	// TODO: Should we set the consumed field after overflow checking?
	g.consumed, overflow = addUint64Overflow(g.consumed, amount)
	if overflow && g.limit != 0 {
		panic(sdk.ErrorGasOverflow{Descriptor: descriptor})
	}

	if g.consumed > g.limit && g.limit != 0 {
		panic(sdk.ErrorOutOfGas{Descriptor: descriptor})
	}
}

func (g *ChargingGasMeter) GasRemaining() sdk.Gas {
	if g.IsPastLimit() {
		return 0
	}
	return g.limit - g.consumed
}

// addUint64Overflow performs the addition operation on two uint64 integers and
// returns a boolean on whether or not the result overflows.
func addUint64Overflow(a, b uint64) (uint64, bool) {
	if math.MaxUint64-a < b {
		return 0, true
	}

	return a + b, false
}

func (g *ChargingGasMeter) RefundGas(_ sdk.Gas, _ string) {
}

func (g *ChargingGasMeter) IsPastLimit() bool {
	return g.consumed > g.limit && g.limit != 0
}

func (g *ChargingGasMeter) IsOutOfGas() bool {
	return g.consumed >= g.limit
}

func (g *ChargingGasMeter) String() string {
	return fmt.Sprintf("BluzelleGasMeter:\n  limit: %d\n  consumed: %d", g.limit, g.consumed)
}

func (g *ChargingGasMeter) Charge(ctx sdk.Context) error {
	acc := g.accountKeeper.GetAccount(ctx, g.PayerAccount)
	addr := acc.GetAddress()

	gasFee := calculateGasFee(g)
	feeErr := deductFees(ctx, g.bankKeeper, addr, gasFee)
	if feeErr != nil {
		return feeErr
	}

	taxErr := g.taxKeeper.ChargeGasTax(ctx, addr, gasFee)
	if taxErr != nil {
		return taxErr
	}

	return nil
}

func (g *ChargingGasMeter) GetGasPrice() sdk.DecCoins {
	return g.gasPrice
}

func deductFees(ctx sdk.Context, bankKeeper bankkeeper.Keeper, addr sdk.AccAddress, fees sdk.Coins) error {

	if !fees.IsValid() {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFee, "invalid fee amount: %s", fees)
	}

	err := bankKeeper.SendCoinsFromAccountToModule(ctx, addr, types.FeeCollectorName, fees)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
	}

	return nil
}

func calculateGasFee(gm *ChargingGasMeter) sdk.Coins {

	gasPrice := gm.gasPrice

	gasPriceAmount := gasPrice.AmountOf(global.Denom)

	gasConsumed := gm.GasConsumed()

	gasFee := gasPriceAmount.MulInt64(int64(gasConsumed)).RoundInt64()
	return sdk.NewCoins(sdk.NewCoin(global.Denom, sdk.NewInt(gasFee)))
}
