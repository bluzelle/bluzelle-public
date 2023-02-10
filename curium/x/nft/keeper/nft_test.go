package keeper_test

import (
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	"github.com/cosmos/cosmos-sdk/crypto/keys/ed25519"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (suite *KeeperTestSuite) TestNftGetSet() {
	addr := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())
	addr2 := sdk.AccAddress(ed25519.GenPrivKey().PubKey().Address().Bytes())

	// get nft by not available id
	_, err := suite.NFTKeeper.GetNFTById(suite.ctx, "")
	suite.Require().Error(err)

	// get nfts by owner when there's nothing
	nftsByOwner := suite.NFTKeeper.GetNFTsByOwner(suite.ctx, addr)
	suite.Require().Len(nftsByOwner, 0)

	// get all nfts when not available; no store available
	//allNfts := suite.NFTKeeper.GetAllNFTs(suite.ctx)
	//suite.Require().Len(allNfts, 0)

	// create a new nft
	nfts := []types.NFT{
		{
			CollId:     1,
			MetadataId: 1,
			Seq:        0,
			Owner:      addr.String(),
		},
		{
			CollId:     1,
			MetadataId: 2,
			Seq:        0,
			Owner:      addr.String(),
		},
		{
			CollId:     1,
			MetadataId: 3,
			Seq:        0,
			Owner:      addr2.String(),
		},
		{
			CollId:     1,
			MetadataId: 4,
			Seq:        0,
			Owner:      addr2.String(),
		},
	}

	for _, nft := range nfts {
		suite.NFTKeeper.SetNFT(suite.ctx, nft)
	}

	// check nfts existance by id
	for _, nft := range nfts {
		n, err := suite.NFTKeeper.GetNFTById(suite.ctx, nft.Id())
		suite.Require().NoError(err)
		suite.Require().Equal(nft, n)
	}

	// check nfts by owner after set
	nftsByOwner = suite.NFTKeeper.GetNFTsByOwner(suite.ctx, addr)
	suite.Require().Len(nftsByOwner, 2)

	// check nfts for whole export
	//allNfts := suite.NFTKeeper.GetAllNFTs(suite.ctx)
	//suite.Require().Len(allNfts, 4)
	//suite.Require().Equal(nfts, allNfts)
}
