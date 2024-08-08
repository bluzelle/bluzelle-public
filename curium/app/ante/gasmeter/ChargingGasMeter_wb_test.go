package gasmeter

import (
	"math"
	"testing"

	"cosmossdk.io/simapp"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	taxmoduletypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	tmproto "github.com/cometbft/cometbft/proto/tendermint/types"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/stretchr/testify/require"
)

func TestChargingGasMeterWhiteBox(t *testing.T) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	app := simapp.Setup(t, false)
	ctx := app.BaseApp.NewContext(false, tmproto.Header{})
	_, _, addr := testdata.KeyTestPubAddr()
	accountKeeper := app.AccountKeeper
	acc := accountKeeper.NewAccountWithAddress(ctx, addr)
	accountKeeper.SetAccount(ctx, acc)
	bankKeeper := bankkeeper.NewBaseKeeper(
		app.AppCodec(),
		app.GetKey(banktypes.StoreKey),
		accountKeeper,
		simapp.BlockedAddresses(),
		govAuthAddrStr,
	)
	decCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdk.NewInt(2)))

	taxKeeper := *taxmodulekeeper.NewKeeper(
		app.AppCodec(),
		app.GetKey(taxmoduletypes.StoreKey),
		app.GetKey(taxmoduletypes.MemStoreKey),
		app.GetSubspace(taxmoduletypes.ModuleName),
		bankKeeper,
		accountKeeper)

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

	t.Run("calculateGasFee() should return correct gas fee", func(t *testing.T) {
		gasMeter := NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 100, addr, decCoins)

		expectedGasFee1 := sdk.NewCoins(sdk.NewCoin(global.Denom, sdk.NewInt(0)))
		require.Equal(t, expectedGasFee1, calculateGasFee(gasMeter))

		gasMeter.ConsumeGas(10, "Consume 10 gas when gas price is 2 ubnt")
		expectedGasFee2 := sdk.NewCoins(sdk.NewCoin(global.Denom, sdk.NewInt(20)))
		require.Equal(t, expectedGasFee2, calculateGasFee(gasMeter))
	})

	t.Run("deductFees()", func(t *testing.T) {

		t.Run("should not return error if fees are valid", func(t *testing.T) {
			fees := sdk.NewCoins()

			err1 := deductFees(ctx, bankKeeper, addr, fees)
			require.Nil(t, err1)

			fees.Add(sdk.NewCoin(global.Denom, sdk.NewInt(1)))

			err2 := deductFees(ctx, bankKeeper, addr, fees)
			require.Nil(t, err2)
		})

		t.Run("should make no deduction when address has balance of 0", func(t *testing.T) {
			fees := sdk.NewCoins().Add(sdk.NewCoin(global.Denom, sdk.NewInt(10)))
			expectedBalance := sdk.NewCoin(global.Denom, sdk.NewInt(0))

			balanceBefore := bankKeeper.BaseViewKeeper.GetBalance(ctx, addr, global.Denom)
			require.Equal(t, expectedBalance, balanceBefore)

			err := deductFees(ctx, bankKeeper, addr, fees)
			require.NotNil(t, err)

			balanceAfter := bankKeeper.BaseViewKeeper.GetBalance(ctx, addr, global.Denom)
			require.Equal(t, expectedBalance, balanceAfter)
		})

	})

}
