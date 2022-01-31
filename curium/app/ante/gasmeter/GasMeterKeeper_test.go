package gasmeter_test

import (
	"github.com/bluzelle/curium/app/ante/gasmeter"
	appTypes "github.com/bluzelle/curium/app/types"
	"github.com/cosmos/cosmos-sdk/simapp"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestGasMeterKeeper(t *testing.T) {

	app := simapp.Setup(false)
	accountKeeper := app.AccountKeeper
	bankKeeper := bankkeeper.NewBaseKeeper(
		app.AppCodec(),
		app.GetKey(banktypes.StoreKey),
		accountKeeper,
		app.GetSubspace(banktypes.ModuleName),
		app.ModuleAccountAddrs())
	_, _, addr := testdata.KeyTestPubAddr()
	decCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(appTypes.Denom, sdk.NewInt(2)))

	t.Run("NewGasMeterKeeper should return a new gas meter keeper", func(t *testing.T) {
		gasMeterKeeper := gasmeter.NewGasMeterKeeper()
		require.NotNil(t, gasMeterKeeper)
	})

	t.Run("Gas Meter Keeper", func(t *testing.T) {

		t.Run("should contain no gas meters if none are added", func(t *testing.T) {
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeterKeeper.GetAllGasMeters()
			require.Empty(t, gasMeterKeeper.GetAllGasMeters())
		})

		t.Run("should contain gas meter if it is added", func(t *testing.T) {
			gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, 0, addr, decCoins)
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeterKeeper.AddGasMeter(gasMeter)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter)
		})

		t.Run("should contain all the gas meters that were added", func(t *testing.T) {
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeter1 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, 0, addr, decCoins)
			gasMeter2 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, 10, addr, decCoins)
			gasMeter3 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, 50, addr, decCoins)
			gasMeterKeeper.AddGasMeter(gasMeter1)
			gasMeterKeeper.AddGasMeter(gasMeter2)
			gasMeterKeeper.AddGasMeter(gasMeter3)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter1)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter2)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter3)
		})

		t.Run("should contain no gas meters is the gas meter keeper is cleared", func(t *testing.T) {
			gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, 0, addr, decCoins)
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeterKeeper.AddGasMeter(gasMeter)
			gasMeterKeeper.ClearAll()
			require.Empty(t, gasMeterKeeper.GetAllGasMeters())
		})

	})

}
