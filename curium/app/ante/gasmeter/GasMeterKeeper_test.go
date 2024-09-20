package gasmeter_test

import (
	"testing"

	"github.com/bluzelle/bluzelle-public/curium/app/ante/gasmeter"
	"github.com/bluzelle/bluzelle-public/curium/app/types/global"
	taxmodulekeeper "github.com/bluzelle/bluzelle-public/curium/x/tax/keeper"
	taxmoduletypes "github.com/bluzelle/bluzelle-public/curium/x/tax/types"
	"github.com/bluzelle/simapp"
	"github.com/cosmos/cosmos-sdk/testutil/testdata"
	sdk "github.com/cosmos/cosmos-sdk/types"
	authtypes "github.com/cosmos/cosmos-sdk/x/auth/types"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	govtypes "github.com/cosmos/cosmos-sdk/x/gov/types"
	"github.com/stretchr/testify/require"
)

func TestGasMeterKeeper(t *testing.T) {
	govAuthAddr := authtypes.NewModuleAddress(govtypes.ModuleName)
	govAuthAddrStr := govAuthAddr.String()
	app := simapp.Setup(t, false)
	accountKeeper := app.AccountKeeper
	bankKeeper := bankkeeper.NewBaseKeeper(
		app.AppCodec(),
		app.GetKey(banktypes.StoreKey),
		accountKeeper,
		simapp.BlockedAddresses(),
		govAuthAddrStr,
	)
	_, _, addr := testdata.KeyTestPubAddr()
	decCoins := sdk.NewDecCoins().Add(sdk.NewDecCoin(global.Denom, sdk.NewInt(2)))

	taxKeeper := *taxmodulekeeper.NewKeeper(
		app.AppCodec(),
		app.GetKey(taxmoduletypes.StoreKey),
		app.GetKey(taxmoduletypes.MemStoreKey),
		app.GetSubspace(taxmoduletypes.ModuleName),
		bankKeeper,
		accountKeeper,
	)

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
			gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 0, addr, decCoins)
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeterKeeper.AddGasMeter(gasMeter)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter)
		})

		t.Run("should contain all the gas meters that were added", func(t *testing.T) {
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeter1 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 0, addr, decCoins)
			gasMeter2 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 10, addr, decCoins)
			gasMeter3 := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 50, addr, decCoins)
			gasMeterKeeper.AddGasMeter(gasMeter1)
			gasMeterKeeper.AddGasMeter(gasMeter2)
			gasMeterKeeper.AddGasMeter(gasMeter3)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter1)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter2)
			require.Contains(t, gasMeterKeeper.GetAllGasMeters(), gasMeter3)
		})

		t.Run("should contain no gas meters when the gas meter keeper is cleared", func(t *testing.T) {
			gasMeter := gasmeter.NewChargingGasMeter(bankKeeper, accountKeeper, taxKeeper, 0, addr, decCoins)
			gasMeterKeeper := gasmeter.NewGasMeterKeeper()
			gasMeterKeeper.AddGasMeter(gasMeter)
			gasMeterKeeper.ClearAll()
			require.Empty(t, gasMeterKeeper.GetAllGasMeters())
		})

	})

}
