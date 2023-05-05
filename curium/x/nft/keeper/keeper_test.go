package keeper_test

import (
	"github.com/bluzelle/bluzelle-public/curium/app"
	appTypes "github.com/bluzelle/bluzelle-public/curium/app/types"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/keeper"
	"github.com/cosmos/cosmos-sdk/simapp"
	bankkeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	"github.com/tendermint/spm/cosmoscmd"
	"github.com/tendermint/tendermint/crypto/tmhash"
	"testing"

	testkeeper "github.com/bluzelle/bluzelle-public/curium/testutil/keeper"
	testutil "github.com/bluzelle/bluzelle-public/curium/testutil/simapp"
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
	initAmt  = sdk.NewIntWithDecimal(100000000, int(6))
	initCoin = sdk.Coins{sdk.NewCoin(sdk.DefaultBondDenom, initAmt)}
	symbol   = "btc"
	name     = "Bitcoin Network"

	maxSupply = sdk.NewInt(200000000)
)

type KeeperTestSuite struct {
	suite.Suite
	legacyAmino   *codec.LegacyAmino
	NFTKeeper     *keeper.Keeper
	BankKeeper    *bankkeeper.BaseKeeper
	AccountKeeper *acctypes.AccountKeeper
	ctx           sdk.Context
	app           *simapp.SimApp
}

func (suite *KeeperTestSuite) SetupTest() {

	config := sdk.GetConfig()
	config.SetCoinType(appTypes.CoinType)
	config.SetBech32PrefixForAccount("bluzelle", "bluzellepub")
	//config.SetAddressVerifier(func(addr []byte) error {
	//	bech32Addr := string(addr)
	//	_, _, err := bech32.Decode(bech32Addr, 1023)
	//	return err
	//})
	suite.app, _, _ = testutil.CreateTestApp(false)
	suite.legacyAmino = cosmoscmd.MakeEncodingConfig(app.ModuleBasics).Amino
	suite.NFTKeeper, suite.BankKeeper, suite.AccountKeeper, suite.ctx = testkeeper.NftKeeper()
	suite.NFTKeeper.SetParamSet(suite.ctx, types.NewParams(sdk.NewCoin(sdk.DefaultBondDenom, sdk.NewInt(1_000_000_000))))

	err := suite.BankKeeper.MintCoins(suite.ctx, types.ModuleName, initCoin)
	suite.NoError(err)

}

func TestKeeperSuite(t *testing.T) {
	suite.Run(t, new(KeeperTestSuite))
}

func (suite *KeeperTestSuite) FundAccount(addr sdk.AccAddress, amount int64) error {

	sendAmount := sdk.NewInt64Coin("stake", amount)

	err := suite.BankKeeper.SendCoinsFromModuleToAccount(suite.ctx, types.ModuleName, addr, sdk.Coins{sendAmount})

	if err != nil {
		return err
	}

	return nil
}
