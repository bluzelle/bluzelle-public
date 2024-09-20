package keeper_test

import (
	"github.com/bluzelle/bluzelle-public/curium/x/nft/keeper"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (suite *KeeperTestSuite) CreateNFT(creator sdk.AccAddress, collectionId uint64) *types.MsgCreateNFTResponse {
	msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
	resp, err := msgServer.CreateNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgCreateNFT(
		creator, collectionId, creator.String(), "Punk", "punk.com", "http://starloopDatabase.com", 0, false, false, []types.Creator{}, 1,
	))
	suite.Require().NoError(err)
	return resp
}

func (suite *KeeperTestSuite) CreateMutableNFT(creator sdk.AccAddress, collectionId uint64) *types.MsgCreateNFTResponse {
	msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
	resp, err := msgServer.CreateNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgCreateNFT(
		creator, collectionId, creator.String(), "Punk", "punk.com", "http://starloopDatabase.com", 0, false, true, []types.Creator{}, 1,
	))
	suite.Require().NoError(err)
	return resp
}

func (suite *KeeperTestSuite) CreateNFTWithCreators(creator sdk.AccAddress, collectionId uint64, creatorAccs []sdk.AccAddress) *types.MsgCreateNFTResponse {
	creators := []types.Creator{}
	for _, creatorAcc := range creatorAccs {
		creators = append(creators, types.Creator{
			Address:  creatorAcc.String(),
			Verified: false,
			Share:    100,
		})
	}
	msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
	resp, err := msgServer.CreateNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgCreateNFT(
		creator, collectionId, creator.String(), "Punk", "punk.com", "http://starloopDatabase.com", 0, false, false, creators, 1,
	))
	suite.Require().NoError(err)
	return resp
}

func (suite *KeeperTestSuite) CreateCollection(creator sdk.AccAddress, isMutable bool) *types.MsgCreateCollectionResponse {
	msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
	resp, err := msgServer.CreateCollection(sdk.WrapSDKContext(suite.ctx), types.NewMsgCreateCollection(
		creator, "PUNK", "Punk Collection", "punk.com", "", creator.String(), isMutable,
	))
	suite.Require().NoError(err)
	return resp
}

func (suite *KeeperTestSuite) TestMsgServerCreateNFT() {
	tests := []struct {
		testCase           string
		nftId              uint64
		expectPass         bool
		expectedNFTId      string
		expectedMetadataId uint64
	}{
		{
			"create an nft",
			0,
			true,
			"1:1:0",
			1,
		},
	}

	for _, tc := range tests {
		creator := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

		// set params for issue fee
		issuePrice := sdk.NewInt64Coin("stake", 1000000)
		suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
			IssuePrice: issuePrice,
		})

		// mint coins for issue fee
		// suite.BankKeeper.MintCoins(suite.ctx, minttypes.ModuleName, sdk.Coins{issuePrice})
		// suite.BankKeeper.SendCoinsFromModuleToAccount(suite.ctx, minttypes.ModuleName, creator, sdk.Coins{issuePrice})
		suite.FundAccount(creator, 1000000)

		collInfo := suite.CreateCollection(creator, true)

		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		resp, err := msgServer.CreateNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgCreateNFT(
			creator, collInfo.Id, creator.String(), "Punk", "punk.com", "http://starloopDatabase.com", 0, false, false, []types.Creator{
				{
					Address:  creator.String(),
					Verified: true,
					Share:    1,
				},
			}, 1,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// test response is correct
			suite.Require().Equal(resp.MetadataId, tc.expectedMetadataId)
			suite.Require().Equal(resp.Id, tc.expectedNFTId)

			// test lastmetadataId and lastNftId are updated correctly
			lastMetadataId := suite.NFTKeeper.GetLastMetadataId(suite.ctx)
			suite.Require().Equal(lastMetadataId, tc.expectedMetadataId)

			// test Verified field false
			metadata, err := suite.NFTKeeper.GetMetadataById(suite.ctx, resp.MetadataId)
			suite.Require().NoError(err)
			suite.Require().Equal(len(metadata.Creators), 1)
			suite.Require().Equal(metadata.Creators[0].Verified, false)

			// test metadataId and nftId to set correctly
			nft, err := suite.NFTKeeper.GetNFTById(suite.ctx, resp.Id)
			suite.Require().NoError(err)
			suite.Require().Equal(nft.Id(), tc.expectedNFTId)
			suite.Require().Equal(nft.MetadataId, tc.expectedMetadataId)

			// test fees are paid correctly
			balances := suite.BankKeeper.GetAllBalances(suite.ctx, creator)
			suite.Require().Equal(balances, sdk.Coins{})
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerPrintEdition() {
	metadataAuthority := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	editionOwner := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	tests := []struct {
		testCase      string
		collId        uint64
		metadataId    uint64
		sender        sdk.AccAddress
		editionOwner  string
		masterEdition *types.MasterEdition
		expectPass    bool
	}{
		{
			"metadata does not exist",
			1,
			0,
			metadataAuthority,
			editionOwner.String(),
			&types.MasterEdition{
				Supply:    1,
				MaxSupply: 2,
			},
			false,
		},
		{
			"not metadata authority",
			1,
			1,
			editionOwner,
			editionOwner.String(),
			&types.MasterEdition{
				Supply:    1,
				MaxSupply: 2,
			},
			false,
		},
		{
			"empty master edition",
			1,
			1,
			metadataAuthority,
			editionOwner.String(),
			nil,
			false,
		},
		{
			"exceed max supply",
			1,
			1,
			metadataAuthority,
			editionOwner.String(),
			&types.MasterEdition{
				Supply:    2,
				MaxSupply: 2,
			},
			false,
		},
		{
			"master edition nft check",
			0,
			1,
			metadataAuthority,
			editionOwner.String(),
			&types.MasterEdition{
				Supply:    1,
				MaxSupply: 2,
			},
			false,
		},
		{
			"successful printing",
			1,
			1,
			metadataAuthority,
			editionOwner.String(),
			&types.MasterEdition{
				Supply:    1,
				MaxSupply: 2,
			},
			true,
		},
	}

	for _, tc := range tests {
		suite.NFTKeeper.SetMetadata(suite.ctx, types.Metadata{
			Id:                   1,
			MetadataAuthority:    metadataAuthority.String(),
			MintAuthority:        metadataAuthority.String(),
			Name:                 "meta1",
			Uri:                  "uri1",
			SellerFeeBasisPoints: 10,
			Creators: []types.Creator{
				{
					Address:  metadataAuthority.String(),
					Verified: false,
					Share:    1,
				},
			},
			PrimarySaleHappened: false,
			IsMutable:           true,
			MasterEdition:       tc.masterEdition,
		})
		suite.NFTKeeper.SetNFT(suite.ctx, types.NFT{
			CollId:     1,
			MetadataId: 1,
			Seq:        0,
			Owner:      metadataAuthority.String(),
		})

		// set params for issue fee
		issuePrice := sdk.NewInt64Coin("stake", 1000000)
		suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
			IssuePrice: issuePrice,
		})

		// mint coins for issue fee
		// suite.BankKeeper.MintCoins(suite.ctx, minttypes.ModuleName, sdk.Coins{issuePrice})
		// suite.BankKeeper.SendCoinsFromModuleToAccount(suite.ctx, minttypes.ModuleName, tc.sender, sdk.Coins{issuePrice})

		suite.FundAccount(tc.sender, 1000000)
		// get old balance for future check
		oldBalance := suite.BankKeeper.GetBalance(suite.ctx, tc.sender, "stake")

		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		resp, err := msgServer.PrintEdition(sdk.WrapSDKContext(suite.ctx), types.NewMsgPrintEdition(
			tc.sender, tc.collId, tc.metadataId, tc.editionOwner,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// metadata supply change check
			meta, err := suite.NFTKeeper.GetMetadataById(suite.ctx, tc.metadataId)
			suite.Require().NoError(err)
			suite.Require().Equal(meta.MasterEdition.Supply, tc.masterEdition.Supply+1)

			// nft data check (edition, id)
			nft, err := suite.NFTKeeper.GetNFTById(suite.ctx, resp.Id)
			suite.Require().NoError(err)
			suite.Require().Equal(nft.Id(), resp.Id)
			suite.Require().Equal(nft.Seq, tc.masterEdition.Supply)

			// nft issue fee check
			newBalance := suite.BankKeeper.GetBalance(suite.ctx, tc.sender, "stake")
			suite.Require().Equal(newBalance.Amount.Int64()+1000000, oldBalance.Amount.Int64())
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerTransferNFT() {

	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator3 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err := suite.FundAccount(creator1, 1000000000)
	if err != nil {
		return
	}
	err = suite.FundAccount(creator2, 1000000000)

	if err != nil {
		return
	}
	err = suite.FundAccount(creator3, 1000000000)
	if err != nil {
		return
	}

	suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
		IssuePrice: sdk.NewInt64Coin("stake", 1000),
	})

	collInfo1 := suite.CreateCollection(creator1, true)
	collInfo2 := suite.CreateCollection(creator2, true)
	nftInfo1 := suite.CreateNFT(creator1, collInfo1.Id)
	nftInfo2 := suite.CreateNFT(creator1, collInfo1.Id)
	nftInfo3 := suite.CreateNFT(creator2, collInfo2.Id)

	tests := []struct {
		testCase   string
		nftId      string
		sender     sdk.AccAddress
		target     string
		expectPass bool
	}{
		{
			"transfer not existing nft",
			"",
			creator3,
			creator1.String(),
			false,
		},
		{
			"transfer my nft to other",
			nftInfo1.Id,
			creator1,
			creator3.String(),
			true,
		},
		{
			"transfer other's nft",
			nftInfo2.Id,
			creator3,
			creator1.String(),
			false,
		},
		{
			"transfer nft to original address",
			nftInfo2.Id,
			creator1,
			creator1.String(),
			true,
		},
		{
			"transfer nft to empty address",
			nftInfo3.Id,
			creator2,
			creator2.String(),
			true,
		},
	}

	for _, tc := range tests {
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.TransferNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgTransferNFT(
			tc.sender, tc.nftId, tc.target,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			nft, err := suite.NFTKeeper.GetNFTById(suite.ctx, tc.nftId)
			suite.Require().NoError(err)
			suite.Require().Equal(nft.Id(), tc.nftId)
			suite.Require().Equal(nft.Owner, tc.target)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerSignMetadata() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator3 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err := suite.FundAccount(creator1, 1000000000)
	if err != nil {
		return
	}
	err = suite.FundAccount(creator2, 1000000000)

	if err != nil {
		return
	}
	err = suite.FundAccount(creator3, 1000000000)
	if err != nil {
		return
	}

	suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
		IssuePrice: sdk.NewInt64Coin("stake", 1000),
	})

	collInfo1 := suite.CreateCollection(creator1, true)
	nftInfo := suite.CreateNFTWithCreators(creator1, collInfo1.Id, []sdk.AccAddress{creator1, creator2})

	tests := []struct {
		testCase   string
		metadataId uint64
		sender     sdk.AccAddress
		expectPass bool
	}{
		{
			"not existing metadata",
			0,
			creator3,
			false,
		},
		{
			"sign correct metadata",
			nftInfo.MetadataId,
			creator1,
			true,
		},
		{
			"try sign metadata - not mine",
			nftInfo.MetadataId,
			creator3,
			false,
		},
	}

	for _, tc := range tests {
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.SignMetadata(sdk.WrapSDKContext(suite.ctx), types.NewMsgSignMetadata(
			tc.sender, tc.metadataId,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			metadata, err := suite.NFTKeeper.GetMetadataById(suite.ctx, tc.metadataId)
			suite.Require().NoError(err)
			suite.Require().Equal(metadata.Id, tc.metadataId)

			for _, creator := range metadata.Creators {
				if creator.Address == tc.sender.String() {
					suite.Require().Equal(creator.Verified, true)
				}
			}
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerUpdateMetadata() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator3 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err := suite.FundAccount(creator1, 1000000000)
	if err != nil {
		return
	}
	err = suite.FundAccount(creator2, 1000000000)

	if err != nil {
		return
	}
	err = suite.FundAccount(creator3, 1000000000)
	if err != nil {
		return
	}

	suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
		IssuePrice: sdk.NewInt64Coin("stake", 1000),
	})

	collInfo1 := suite.CreateCollection(creator1, true)
	immutableNft := suite.CreateNFT(creator1, collInfo1.Id)
	collInfo2 := suite.CreateCollection(creator2, true)
	mutableNft := suite.CreateMutableNFT(creator2, collInfo2.Id)

	tests := []struct {
		testCase   string
		metadataId uint64
		sender     sdk.AccAddress
		expectPass bool
	}{
		{
			"not existing metadata",
			0,
			creator3,
			false,
		},
		{
			"try updating not mutable metadata",
			immutableNft.MetadataId,
			creator1,
			false,
		},
		{
			"try updating not owned metadata",
			mutableNft.MetadataId,
			creator3,
			false,
		},
		{
			"update with correct values",
			mutableNft.MetadataId,
			creator2,
			true,
		},
	}

	for _, tc := range tests {
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.UpdateMetadata(sdk.WrapSDKContext(suite.ctx), types.NewMsgUpdateMetadata(
			tc.sender, tc.metadataId, "NewPUNK", "NewURI", "http://starloopDatabase.com", 10, []types.Creator{
				{Address: creator1.String(), Verified: true, Share: 100},
			},
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			metadata, err := suite.NFTKeeper.GetMetadataById(suite.ctx, tc.metadataId)
			suite.Require().NoError(err)
			suite.Require().Equal(metadata.Id, tc.metadataId)

			suite.Require().Equal(len(metadata.Creators), 1)
			suite.Require().Equal(metadata.Creators[0].Verified, false)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerUpdateMetadataAuthority() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator3 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err := suite.FundAccount(creator1, 1000000000)
	if err != nil {
		return
	}
	err = suite.FundAccount(creator2, 1000000000)

	if err != nil {
		return
	}
	err = suite.FundAccount(creator3, 1000000000)
	if err != nil {
		return
	}

	suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
		IssuePrice: sdk.NewInt64Coin("stake", 1000),
	})

	collInfo1 := suite.CreateCollection(creator1, true)
	immutableNft := suite.CreateNFT(creator1, collInfo1.Id)
	collInfo2 := suite.CreateCollection(creator2, true)
	mutableNft := suite.CreateMutableNFT(creator2, collInfo2.Id)

	tests := []struct {
		testCase   string
		metadataId uint64
		sender     sdk.AccAddress
		newOwner   string
		expectPass bool
	}{
		{
			"not existing metadata",
			0,
			creator3,
			creator3.String(),
			false,
		},
		{
			"try updating not owned metadata",
			mutableNft.MetadataId,
			creator3,
			creator3.String(),
			false,
		},
		{
			"update with correct value",
			mutableNft.MetadataId,
			creator2,
			creator3.String(),
			true,
		},
		{
			"update with original value",
			immutableNft.MetadataId,
			creator1,
			creator1.String(),
			true,
		},
	}

	for _, tc := range tests {
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.UpdateMetadataAuthority(sdk.WrapSDKContext(suite.ctx), types.NewMsgUpdateMetadataAuthority(
			tc.sender, tc.metadataId, tc.newOwner),
		)
		if tc.expectPass {
			suite.Require().NoError(err)

			metadata, err := suite.NFTKeeper.GetMetadataById(suite.ctx, tc.metadataId)
			suite.Require().NoError(err)
			suite.Require().Equal(metadata.Id, tc.metadataId)
			suite.Require().Equal(metadata.MetadataAuthority, tc.newOwner)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerCreateCollection() {

	tests := []struct {
		testCase             string
		expectPass           bool
		expectedCollectionId uint64
		updateAuthority      string
	}{
		{
			"create a collection",
			true,
			1,
			sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes()).String(),
		},
		{
			"create a collection with invalid creator address",
			false,
			2,
			"bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
		},
	}

	for _, tc := range tests {
		creator := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		resp, err := msgServer.CreateCollection(sdk.WrapSDKContext(suite.ctx), types.NewMsgCreateCollection(
			creator, "PUNK", "Punk Collection", "punk.com", "", tc.updateAuthority, false,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// test response is correct
			suite.Require().Equal(resp.Id, tc.expectedCollectionId)

			// test last collectionId id updated correctly
			lastCollectionId := suite.NFTKeeper.GetLastCollectionId(suite.ctx)
			suite.Require().Equal(lastCollectionId, tc.expectedCollectionId)

			// test collection is set correctly
			collection, err := suite.NFTKeeper.GetCollectionById(suite.ctx, resp.Id)
			suite.Require().NoError(err)
			suite.Require().Equal(collection.Id, tc.expectedCollectionId)
			suite.Require().Equal(collection.UpdateAuthority, tc.updateAuthority)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerUpdateCollectionAuthority() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	collectionInfo1 := suite.CreateCollection(creator1, true)
	collectionInfo2 := suite.CreateCollection(creator2, true)

	tests := []struct {
		testCase     string
		sender       sdk.AccAddress
		targetOwner  string
		collectionId uint64
		expectPass   bool
	}{
		{
			"update collection authority with owner",
			creator1,
			creator2.String(),
			collectionInfo1.Id,
			true,
		},
		{
			"try updating collection authority with non-owner",
			creator1,
			creator2.String(),
			collectionInfo2.Id,
			false,
		},
	}

	for _, tc := range tests {

		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.UpdateCollectionAuthority(sdk.WrapSDKContext(suite.ctx), types.NewMsgUpdateCollectionAuthority(
			tc.sender, tc.collectionId, tc.targetOwner,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// test authority is updated correctly
			collection, err := suite.NFTKeeper.GetCollectionById(suite.ctx, tc.collectionId)
			suite.Require().NoError(err)
			suite.Require().Equal(collection.Id, tc.collectionId)
			suite.Require().Equal(collection.UpdateAuthority, tc.targetOwner)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerUpdateCollectionUri() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	collectionInfo1 := suite.CreateCollection(creator1, true)
	collectionInfo2 := suite.CreateCollection(creator2, true)

	tests := []struct {
		testCase     string
		sender       sdk.AccAddress
		targetOwner  string
		collectionId uint64
		newUri       string
		expectPass   bool
	}{
		{
			"update collection uri with owner",
			creator1,
			creator2.String(),
			collectionInfo1.Id,
			"http://updatedLink.com",
			true,
		},
		{
			"try updating collection uri with non-owner",
			creator1,
			creator2.String(),
			collectionInfo2.Id,
			"http://updatedLink.com",
			false,
		},
	}

	for _, tc := range tests {

		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.UpdateCollectionUri(sdk.WrapSDKContext(suite.ctx), types.NewMsgUpdateCollectionUri(
			tc.sender, tc.collectionId, tc.newUri,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// test uri was updated correctly
			collection, err := suite.NFTKeeper.GetCollectionById(suite.ctx, tc.collectionId)
			suite.Require().NoError(err)
			suite.Require().Equal(collection.Id, tc.collectionId)
			suite.Require().Equal(collection.Uri, tc.newUri)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerUpdateCollectionMutableUri() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	collectionInfo1 := suite.CreateCollection(creator1, true)
	collectionInfo2 := suite.CreateCollection(creator2, true)

	tests := []struct {
		testCase     string
		sender       sdk.AccAddress
		targetOwner  string
		collectionId uint64
		newUri       string
		expectPass   bool
	}{
		{
			"update collection mutable uri with owner",
			creator1,
			creator2.String(),
			collectionInfo1.Id,
			"http://updatedLink.com",
			true,
		},
		{
			"try updating collection mutable uri with non-owner",
			creator1,
			creator2.String(),
			collectionInfo2.Id,
			"http://updatedLink.com",
			false,
		},
	}

	for _, tc := range tests {

		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.UpdateCollectionMutableUri(sdk.WrapSDKContext(suite.ctx), types.NewMsgUpdateCollectionMutableUri(
			tc.sender, tc.collectionId, tc.newUri,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// test uri was updated correctly
			collection, err := suite.NFTKeeper.GetCollectionById(suite.ctx, tc.collectionId)
			suite.Require().NoError(err)
			suite.Require().Equal(collection.Id, tc.collectionId)
			suite.Require().Equal(collection.MutableUri, tc.newUri)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerImmutableCollection() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	collectionInfo1 := suite.CreateCollection(creator1, false)

	tests := []struct {
		testCase     string
		sender       sdk.AccAddress
		targetOwner  string
		collectionId uint64
		newUri       string
		expectPass   bool
	}{
		{
			"fail to update immutable collection",
			creator1,
			creator2.String(),
			collectionInfo1.Id,
			"http://updatedLink.com",
			false,
		},
	}

	for _, tc := range tests {

		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.UpdateCollectionMutableUri(sdk.WrapSDKContext(suite.ctx), types.NewMsgUpdateCollectionMutableUri(
			tc.sender, tc.collectionId, tc.newUri,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			// test uri was updated correctly
			collection, err := suite.NFTKeeper.GetCollectionById(suite.ctx, tc.collectionId)
			suite.Require().NoError(err)
			suite.Require().Equal(collection.Id, tc.collectionId)
			suite.Require().Equal(collection.MutableUri, tc.newUri)
		} else {
			suite.Require().Error(err)
		}
	}
}

func (suite *KeeperTestSuite) TestMsgServerMultiSendNFT() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	creator3 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err := suite.FundAccount(creator1, 1000000000)
	if err != nil {
		return
	}
	err = suite.FundAccount(creator2, 1000000000)

	if err != nil {
		return
	}
	err = suite.FundAccount(creator3, 1000000000)
	if err != nil {
		return
	}

	suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
		IssuePrice: sdk.NewInt64Coin("stake", 1000),
	})

	collInfo1 := suite.CreateCollection(creator1, true)
	collInfo2 := suite.CreateCollection(creator1, true)
	nftInfo1 := suite.CreateNFT(creator1, collInfo1.Id)
	nftInfo2 := suite.CreateNFT(creator1, collInfo1.Id)
	nftInfo3 := suite.CreateNFT(creator1, collInfo2.Id)

	var multiSendOutput []*types.MultiSendNFTOutput
	multiSendOutput = append(multiSendOutput, &types.MultiSendNFTOutput{
		Receiver: creator2.String(),
		NftId:    nftInfo1.Id,
	})
	multiSendOutput = append(multiSendOutput, &types.MultiSendNFTOutput{
		Receiver: creator2.String(),
		NftId:    nftInfo2.Id,
	})
	multiSendOutput = append(multiSendOutput, &types.MultiSendNFTOutput{
		Receiver: creator2.String(),
		NftId:    nftInfo3.Id,
	})

	tests := []struct {
		testCase         string
		sender           sdk.AccAddress
		multiSendOutputs []*types.MultiSendNFTOutput
		expectPass       bool
	}{
		{
			"3 nfts should be successfully sent",
			creator1,
			multiSendOutput,
			true,
		},
	}

	for _, tc := range tests {
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.MultiSendNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgMultiSendNFT(
			tc.sender, tc.multiSendOutputs,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			nft, err := suite.NFTKeeper.GetNFTById(suite.ctx, nftInfo1.Id)
			suite.Require().NoError(err)
			suite.Require().Equal(nft.Owner, creator2.String())
		} else {
			suite.Require().Error(err)
		}
	}

}

func (suite *KeeperTestSuite) TestMsgServerBurnNFT() {
	creator1 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err := suite.FundAccount(creator1, 1000000000)
	if err != nil {
		return
	}

	creator2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	err = suite.FundAccount(creator2, 1000000000)

	if err != nil {
		return
	}

	suite.NFTKeeper.SetParamSet(suite.ctx, types.Params{
		IssuePrice: sdk.NewInt64Coin("stake", 1000),
	})

	collInfo1 := suite.CreateCollection(creator1, true)
	nftInfo1 := suite.CreateNFT(creator1, collInfo1.Id)

	collInfo2 := suite.CreateCollection(creator2, true)
	nftInfo2 := suite.CreateNFT(creator2, collInfo2.Id)

	tests := []struct {
		testCase   string
		sender     sdk.AccAddress
		nftId      string
		expectPass bool
	}{
		{
			"nft should be burnt.",
			creator1,
			nftInfo1.Id,
			true,
		},
		{
			"should not burn the nft of others",
			creator1,
			nftInfo2.Id,
			false,
		},
		{
			"wrong nft id",
			creator1,
			"2:2:0",
			false,
		},
	}

	for _, tc := range tests {
		msgServer := keeper.NewMsgServerImpl(*suite.NFTKeeper)
		_, err := msgServer.BurnNFT(sdk.WrapSDKContext(suite.ctx), types.NewMsgBurnNFT(
			tc.sender, tc.nftId,
		))
		if tc.expectPass {
			suite.Require().NoError(err)

			nft, err := suite.NFTKeeper.GetNFTById(suite.ctx, tc.nftId)
			suite.Require().NoError(err)
			suite.Require().Equal(nft.Owner, "bluzelle1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqxmrapv")
		} else {
			suite.Require().Error(err)
		}
	}

}
