package gasmeter_test

import (
	"context"
	"math"
	"testing"

	sdkmath "cosmossdk.io/math"
	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	"github.com/bluzelle/bluzelle-public/curium/testutil/simapp"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	taxmoduletypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/runtime"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/stretchr/testify/require"
)

type mockCuriumKeeper struct {
	adminAddress string
}

func (m *mockCuriumKeeper) GetAdminAddress(ctx context.Context) string {
	return m.adminAddress
}

func TestChargingGasMeterWhiteBox(t *testing.T) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	app, ctx, accountKeeper := simapp.CreateTestApp()
	moduleAccountAddresses := app.ModuleAccountAddrs()
	_, _, addr := testdata.KeyTestPubAddr()
	acc := accountKeeper.NewAccountWithAddress(ctx, addr)
	accountKeeper.SetAccount(ctx, acc)
	bankKeeper := bankkeeper.NewBaseKeeper(
		app.AppCodec(),
		runtime.NewKVStoreService(app.GetKey(banktypes.StoreKey)),
		accountKeeper,
		app.BlockedAddresses(moduleAccountAddresses),
		govAuthAddrStr,
		app.Logger(),
	)
	decCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdkmath.NewInt(2)))

	// Create a mock curium keeper for testing
	curiumKeeper := &mockCuriumKeeper{adminAddress: "bluzelle1t95s6zzf58y6nsny9uhdap6ej7ddkga9c4htd6"}
	taxKeeper := *taxmodulekeeper.NewKeeper(
		app.AppCodec(),
		app.GetKey(taxmoduletypes.StoreKey),
		app.GetKey(taxmoduletypes.MemStoreKey),
		app.GetSubspace(taxmoduletypes.ModuleName),
		bankKeeper,
		accountKeeper,
		curiumKeeper)

	t.Run("AddUint64Overflow()", func(t *testing.T) {

		t.Run("should returns sum of 0 if overflows", func(t *testing.T) {
			sum, isOverflown := gasmeter.AddUint64Overflow(math.MaxUint64, 1)
			require.Equal(t, sum, uint64(0))
			require.Equal(t, true, isOverflown)
		})

		t.Run("should return correct sum if not overflow", func(t *testing.T) {
			sum, isOverflown := gasmeter.AddUint64Overflow(10, 10)
			require.Equal(t, sum, uint64(20))
			require.Equal(t, false, isOverflown)
		})

	})

	t.Run("CalculateGasFee() should return correct gas fee", func(t *testing.T) {
		gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 100, addr, decCoins)

		expectedGasFee1 := sdk.NewCoins(sdk.NewCoin(global.Denom, sdkmath.NewInt(0)))
		require.Equal(t, expectedGasFee1, gasmeter.CalculateGasFee(gasMeter))

		gasMeter.ConsumeGas(10, "Consume 10 gas when gas price is 2 ubnt")
		expectedGasFee2 := sdk.NewCoins(sdk.NewCoin(global.Denom, sdkmath.NewInt(20)))
		require.Equal(t, expectedGasFee2, gasmeter.CalculateGasFee(gasMeter))
	})

	t.Run("DeductFees()", func(t *testing.T) {

		t.Run("should not return error if fees are valid", func(t *testing.T) {
			fees := sdk.NewCoins()

			err1 := gasmeter.DeductFees(ctx, bankKeeper, addr, fees)
			require.Nil(t, err1)

			fees.Add(sdk.NewCoin(global.Denom, sdkmath.NewInt(1)))

			err2 := gasmeter.DeductFees(ctx, bankKeeper, addr, fees)
			require.Nil(t, err2)
		})

		t.Run("should make no deduction when address has balance of 0", func(t *testing.T) {
			fees := sdk.NewCoins().Add(sdk.NewCoin(global.Denom, sdkmath.NewInt(10)))
			expectedBalance := sdk.NewCoin(global.Denom, sdkmath.NewInt(0))

			balanceBefore := bankKeeper.BaseViewKeeper.GetBalance(ctx, addr, global.Denom)
			require.Equal(t, expectedBalance, balanceBefore)

			err := gasmeter.DeductFees(ctx, bankKeeper, addr, fees)
			require.NotNil(t, err)

			balanceAfter := bankKeeper.BaseViewKeeper.GetBalance(ctx, addr, global.Denom)
			require.Equal(t, expectedBalance, balanceAfter)
		})

	})

}
