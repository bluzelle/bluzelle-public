package gasmeter

import (
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"math"
	"testing"
)

const DENOM string = "ubnt"

func TestChargingGasMeter(t *testing.T) {

	app := simapp.Setup(false)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})
	_, _, addr := testdata.KeyTestPubAddr()
	accountKeeper := app.AccountKeeper
	acc := accountKeeper.NewAccountWithAddress(ctx, addr)
	accountKeeper.SetAccount(ctx, acc)
	bankKeeper := bankkeeper.NewBaseKeeper(
		app.AppCodec(),
		app.GetKey(banktypes.StoreKey),
		accountKeeper,
		app.GetSubspace(banktypes.ModuleName),
		app.ModuleAccountAddrs())
	decCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(DENOM, sdk.NewInt(2)))

	t.Run("NewChargingGasMeter() should create a gas meter", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 0, addr, decCoins)
		require.NotNil(t, gasMeter)
	})

	t.Run("GasConsumed() should return correct result when gas is consumed", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 100, addr, decCoins)
		require.Equal(t, uint64(0), gasMeter.GasConsumed())
		gasMeter.ConsumeGas(10, "Consume 10 gas")
		require.Equal(t, uint64(10), gasMeter.GasConsumed())
	})

	t.Run("IsOutOfGas()", func(t *testing.T) {

		t.Run("should return false if there is gas", func(t *testing.T) {
			gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 100, addr, decCoins)
			require.Equal(t, false, gasMeter.IsOutOfGas())
		})

		t.Run("should return true if there no gas", func(t *testing.T) {
			gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 0, addr, decCoins)
			require.Equal(t, true, gasMeter.IsOutOfGas())
		})

	})

	t.Run("Limit() should return the correct limit of the gas meter", func(t *testing.T) {
		gasMeter1 := NewChargingGasMeter(bankKeeper, accountKeeper, 0, addr, decCoins)
		limit1 := gasMeter1.Limit()
		require.Equal(t, uint64(0), limit1)

		gasMeter2 := NewChargingGasMeter(bankKeeper, accountKeeper, 100, addr, decCoins)
		limit2 := gasMeter2.Limit()
		require.Equal(t, uint64(100), limit2)
	})

	t.Run("GasConsumedToLimit should return the amount of gas consumed up to the limit", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 100, addr, decCoins)
		require.Equal(t, uint64(0), gasMeter.GasConsumedToLimit())
		gasMeter.ConsumeGas(20, "Consume 20 gas")
		require.Equal(t, uint64(20), gasMeter.GasConsumedToLimit())
		gasMeter.ConsumeGas(80, "Consume 80 gas")
		require.Equal(t, uint64(100), gasMeter.GasConsumedToLimit())
	})

	t.Run("addUint64Overflow()", func(t *testing.T) {

		t.Run("should returns sum of 0 if overflows", func(t *testing.T) {
			sum, isOverflown := addUint64Overflow(math.MaxUint64, 1)
			require.Equal(t, sum, uint64(0))
			require.Equal(t, true, isOverflown)
		})

		t.Run("should return correct sum if not overflow", func(t *testing.T) {
			sum, isOverflown := addUint64Overflow(10, 10)
			require.Equal(t, sum, uint64(20))
			require.Equal(t, false, isOverflown)
		})

	})

	t.Run("IsPastLimit() should return true if gas consumed is past limit", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 10, addr, decCoins)
		gasMeter.ConsumeGas(0, "consume 0 gas")
		require.Equal(t, false, gasMeter.IsPastLimit())
		gasMeter.ConsumeGas(10, "consume 10 gas")
		require.Equal(t, false, gasMeter.IsPastLimit())
		require.Panics(t, func() {
			gasMeter.ConsumeGas(10, "consume 10 gas")
		}, "failed: must not consume past limit")
	})

	t.Run("GetGasPrice() should get gas price", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 10, addr, decCoins)
		require.Equal(t, decCoins, gasMeter.GetGasPrice())
	})

	t.Run("calculateGasFee() should return correct gas fee", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 100, addr, decCoins)

		expectedGasFee1 := sdk.NewCoins(sdk.NewCoin(DENOM, sdk.NewInt(0)))
		require.Equal(t, expectedGasFee1, calculateGasFee(gasMeter))

		gasMeter.ConsumeGas(10, "Consume 10 gas when gas price is 2 ubnt")
		expectedGasFee2 := sdk.NewCoins(sdk.NewCoin(DENOM, sdk.NewInt(20)))
		require.Equal(t, expectedGasFee2, calculateGasFee(gasMeter))
	})

	t.Run("deductFees()", func(t *testing.T) {

		t.Run("should not return error if fees are valid", func(t *testing.T) {
			fees := sdk.NewCoins()

			err1 := deductFees(ctx, bankKeeper, addr, fees)
			require.Nil(t, err1)

			fees.Add(sdk.NewCoin("ubnt", sdk.NewInt(1)))

			err2 := deductFees(ctx, bankKeeper, addr, fees)
			require.Nil(t, err2)
		})

		t.Run("should make no deduction when address has balance of 0", func(t *testing.T) {
			fees := sdk.NewCoins().Add(sdk.NewCoin(DENOM, sdk.NewInt(10)))
			expectedBalance := sdk.NewCoin(DENOM, sdk.NewInt(0))

			balanceBefore := bankKeeper.BaseViewKeeper.GetBalance(ctx, addr, DENOM)
			require.Equal(t, expectedBalance, balanceBefore)

			deductFees(ctx, bankKeeper, addr, fees)

			balanceAfter := bankKeeper.BaseViewKeeper.GetBalance(ctx, addr, DENOM)
			require.Equal(t, expectedBalance, balanceAfter)
		})

	})

	t.Run("Charge() should not return err or panic if gasmeter and ctx is valid", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, 100, addr, decCoins)
		err := gasMeter.Charge(ctx)
		require.Nil(t, err)
	})

}
