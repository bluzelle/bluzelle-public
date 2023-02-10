package gasmeter_test

import (
	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	taxmoduletypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"
	"testing"
)

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
	decCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdk.NewInt(2)))

	taxKeeper := *taxmodulekeeper.NewKeeper(
		app.AppCodec(),
		app.GetKey(taxmoduletypes.StoreKey),
		app.GetKey(taxmoduletypes.MemStoreKey),
		app.GetSubspace(taxmoduletypes.ModuleName),
		bankKeeper,
		accountKeeper)

	t.Run("NewChargingGasMeter() should create a gas meter", func(t *testing.T) {
		gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 0, addr, decCoins)
		require.NotNil(t, gasMeter)
	})

	t.Run("GasConsumed() should return correct result when gas is consumed", func(t *testing.T) {
		gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 100, addr, decCoins)
		require.Equal(t, uint64(0), gasMeter.GasConsumed())
		gasMeter.ConsumeGas(10, "Consume 10 gas")
		require.Equal(t, uint64(10), gasMeter.GasConsumed())
	})

	t.Run("IsOutOfGas()", func(t *testing.T) {

		t.Run("should return false if there is gas", func(t *testing.T) {
			gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 100, addr, decCoins)
			require.Equal(t, false, gasMeter.IsOutOfGas())
		})

		t.Run("should return true if there no gas", func(t *testing.T) {
			gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 0, addr, decCoins)
			require.Equal(t, true, gasMeter.IsOutOfGas())
		})

	})

	t.Run("Limit() should return the correct limit of the gas meter", func(t *testing.T) {
		gasMeter1 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 0, addr, decCoins)
		limit1 := gasMeter1.Limit()
		require.Equal(t, uint64(0), limit1)

		gasMeter2 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 100, addr, decCoins)
		limit2 := gasMeter2.Limit()
		require.Equal(t, uint64(100), limit2)
	})

	t.Run("GasConsumedToLimit should return the amount of gas consumed up to the limit", func(t *testing.T) {
		gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 100, addr, decCoins)
		require.Equal(t, uint64(0), gasMeter.GasConsumedToLimit())
		gasMeter.ConsumeGas(20, "Consume 20 gas")
		require.Equal(t, uint64(20), gasMeter.GasConsumedToLimit())
		gasMeter.ConsumeGas(80, "Consume 80 gas")
		require.Equal(t, uint64(100), gasMeter.GasConsumedToLimit())
	})

	t.Run("IsPastLimit() should return true if gas consumed is past limit", func(t *testing.T) {
		gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 10, addr, decCoins)
		gasMeter.ConsumeGas(0, "consume 0 gas")
		require.Equal(t, false, gasMeter.IsPastLimit())
		gasMeter.ConsumeGas(10, "consume 10 gas")
		require.Equal(t, false, gasMeter.IsPastLimit())
		require.Panics(t, func() {
			gasMeter.ConsumeGas(10, "consume 10 gas")
		}, "failed: must not consume past limit")
	})

	t.Run("GetGasPrice() should get gas price", func(t *testing.T) {
		gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 10, addr, decCoins)
		require.Equal(t, decCoins, gasMeter.GetGasPrice())
	})

	//t.Run("Charge() should not return err or panic if gasmeter and ctx is valid", func(t *testing.T) {
	//
	//	taxKeeper, bankKeeper, accountKeeper, ctx := keeper.GetKeepers(t)
	//	//addr, _ := sdk.AccAddressFromBech32("toAddr")
	//	_, _, addr := testdata.KeyTestPubAddr()
	//	acc := accountKeeper.NewAccountWithAddress(ctx, addr)
	//	acc.SetAccountNumber(uint64(0))
	//	accountKeeper.SetAccount(ctx, acc)
	//	//getAcc := accountKeeper.GetAccount(ctx, addr)
	//	//require.Equal(t, acc, getAcc)
	//
	//	genesisState := taxmoduletypes.GenesisState{
	//		GasTaxBp:      10,
	//		TransferTaxBp: 15,
	//		TaxCollector:  taxmoduletypes.TaxCollector,
	//	}
	//	tax.InitGenesis(ctx, *taxKeeper, genesisState)
	//
	//	taxKeeper.SetTaxInfo(ctx, genesisState)
	//
	//	gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, *taxKeeper, 100, addr, decCoins)
	//	err := gasMeter.Charge(ctx)
	//	require.Nil(t, err)
	//})

}
