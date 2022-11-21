package keeper_test

import "github.com/bluzelle/curium/x/nft/types"

func (suite *KeeperTestSuite) TestLastMetadataIdGetSet() {
	// get default last metadata id
	lastMetadataId := suite.NFTKeeper.GetLastMetadataId(suite.ctx)
	suite.Require().Equal(lastMetadataId, uint64(0))

	// set last metadata id to new value
	newMetadataId := uint64(2)
	suite.NFTKeeper.SetLastMetadataId(suite.ctx, newMetadataId)

	// check last metadata id update
	lastMetadataId = suite.NFTKeeper.GetLastMetadataId(suite.ctx)
	suite.Require().Equal(lastMetadataId, newMetadataId)
}

func (suite *KeeperTestSuite) TestMetadataGetSet() {
	// get metadata by not available id
	_, err := suite.NFTKeeper.GetMetadataById(suite.ctx, 0)
	suite.Require().Error(err)

	// get all metadata when not available
	allMetadata := suite.NFTKeeper.GetAllMetadata(suite.ctx)
	suite.Require().Len(allMetadata, 0)

	// create new metadata
	creators := []types.Creator{
		{
			Address:  "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
			Verified: false,
			Share:    1,
		},
	}
	metadata := []types.Metadata{
		{
			Id:                   1,
			MetadataAuthority:    "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
			MintAuthority:        "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
			Name:                 "meta1",
			Uri:                  "uri1",
			SellerFeeBasisPoints: 10,
			Creators:             creators,
			PrimarySaleHappened:  false,
			IsMutable:            true,
		},
		{
			Id:                   2,
			MetadataAuthority:    "",
			MintAuthority:        "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
			Name:                 "meta1",
			Uri:                  "uri1",
			SellerFeeBasisPoints: 10,
			Creators:             creators,
			PrimarySaleHappened:  false,
			IsMutable:            true,
		},
		{
			Id:                   3,
			MetadataAuthority:    "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
			MintAuthority:        "",
			Name:                 "meta1",
			Uri:                  "uri1",
			SellerFeeBasisPoints: 10,
			Creators:             creators,
			PrimarySaleHappened:  false,
			IsMutable:            true,
		},
		{
			Id:                   4,
			MetadataAuthority:    "",
			MintAuthority:        "",
			Name:                 "meta1",
			Uri:                  "uri1",
			SellerFeeBasisPoints: 10,
			Creators:             creators,
			PrimarySaleHappened:  false,
			IsMutable:            true,
		},
	}

	for _, meta := range metadata {
		suite.NFTKeeper.SetMetadata(suite.ctx, meta)
	}

	for _, meta := range metadata {
		m, err := suite.NFTKeeper.GetMetadataById(suite.ctx, meta.Id)
		suite.Require().NoError(err)
		suite.Require().Equal(meta, m)
	}

	allMetadata = suite.NFTKeeper.GetAllMetadata(suite.ctx)
	suite.Require().Len(allMetadata, 4)
	suite.Require().Equal(metadata, allMetadata)
}
