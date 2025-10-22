package keeper_test

import (
	"testing"

	"cosmossdk.io/math"
	"github.com/bluzelle/bluzelle-public/curium/app"
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	testkeeper "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/simapp"

	"github.com/bluzelle/bluzelle-public/curium/x/nft/keeper"
	"github.com/cometbft/cometbft/crypto/tmhash"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"

	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	"github.com/stretchr/testify/suite"
)

const (
	isCheckTx = false
)

var (
	owner    = sdk.AccAddress(tmhash.SumTruncated([]byte("tokenTest")))
	uri      = "ipfs://"
	initAmt  = math.NewInt(100000000)
	initCoin = sdk.Coins{sdk.NewCoin(sdk.DefaultBondDenom, initAmt)}
	symbol   = "btc"
	name     = "Bitcoin Network"

	maxSupply = math.NewInt(200000000)
)

type KeeperTestSuite struct {
	suite.Suite
	legacyAmino   *codec.LegacyAmino
	NFTKeeper     *keeper.Keeper
	BankKeeper    *bankkeeper.BaseKeeper
	AccountKeeper *acctypes.AccountKeeper
	ctx           sdk.Context
	app           *app.App
}

func (suite *KeeperTestSuite) SetupTest() {
	config := sdk.GetConfig()
	config.SetCoinType(appTypes.CoinType)
	config.SetBech32PrefixForAccount("bluzelle", "bluzellepub")
	suite.app, _, _ = testutil.CreateTestApp()

	suite.legacyAmino = codec.NewLegacyAmino()
	suite.NFTKeeper, suite.BankKeeper, suite.AccountKeeper, suite.ctx = testkeeper.NftKeeper(suite.T())

	suite.T().Log("AccountKeeper set up")

	moduleAcc := suite.AccountKeeper.GetModuleAccount(suite.ctx, types.ModuleName)
	suite.Require().NotNil(moduleAcc, "NFT module account should exist")

	suite.NFTKeeper.SetParamSet(suite.ctx, types.NewParams(sdk.NewCoin(sdk.DefaultBondDenom, math.NewInt(1_000_000_000))))

	err := suite.BankKeeper.MintCoins(suite.ctx, types.ModuleName, initCoin)
	suite.NoError(err)

	suite.T().Logf("Owner address: %s", owner.String())
}

// SetupSubTest creates a fresh context for each sub-test to avoid database conflicts
func (suite *KeeperTestSuite) SetupSubTest() {
	// Create a fresh context for each sub-test
	suite.NFTKeeper, suite.BankKeeper, suite.AccountKeeper, suite.ctx = testkeeper.NftKeeper(suite.T())

	// Re-setup the module account and parameters
	moduleAcc := suite.AccountKeeper.GetModuleAccount(suite.ctx, types.ModuleName)
	suite.Require().NotNil(moduleAcc, "NFT module account should exist")

	suite.NFTKeeper.SetParamSet(suite.ctx, types.NewParams(sdk.NewCoin(sdk.DefaultBondDenom, math.NewInt(1_000_000_000))))

	err := suite.BankKeeper.MintCoins(suite.ctx, types.ModuleName, initCoin)
	suite.NoError(err)
}

func TestKeeperSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

func (suite *KeeperTestSuite) FundAccount(addr sdk.AccAddress, amount int64) error {
	// Check if account already exists
	account := suite.AccountKeeper.GetAccount(suite.ctx, addr)
	if account == nil {
		// Create account if it doesn't exist
		account = suite.AccountKeeper.NewAccountWithAddress(suite.ctx, addr)
		suite.AccountKeeper.SetAccount(suite.ctx, account)
	}

	sendAmount := sdk.NewInt64Coin("stake", amount)

	err := suite.BankKeeper.SendCoinsFromModuleToAccount(suite.ctx, types.ModuleName, addr, sdk.Coins{sendAmount})

	if err != nil {
		return err
	}

	return nil
}
