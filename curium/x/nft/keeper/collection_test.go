package keeper_test

import "github.com/bluzelle/bluzelle-public/curium/x/nft/types"

func (suite *KeeperTestSuite) TestLastCollectionIdGetSet() {
	// get default last collection id
	lastCollectionId := suite.NFTKeeper.GetLastCollectionId(suite.ctx)
	suite.Require().Equal(lastCollectionId, uint64(0))

	// set last collection id to new value
	newCollectionId := uint64(2)
	suite.NFTKeeper.SetLastCollectionId(suite.ctx, newCollectionId)

	// check last collection id update
	lastCollectionId = suite.NFTKeeper.GetLastCollectionId(suite.ctx)
	suite.Require().Equal(lastCollectionId, newCollectionId)
}

func (suite *KeeperTestSuite) TestCollectionGetSet() {
	// get collection by not available id
	_, err := suite.NFTKeeper.GetCollectionById(suite.ctx, 0)
	suite.Require().Error(err)

	// get all collections when not available
	allCollections := suite.NFTKeeper.GetAllCollections(suite.ctx)
	suite.Require().Len(allCollections, 0)

	// create a new collection
	collections := []types.Collection{
		{
			Id:              1,
			Name:            "name1",
			Uri:             "uri1",
			UpdateAuthority: "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
		},
		{
			Id:              2,
			Name:            "name2",
			Uri:             "",
			UpdateAuthority: "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
		},
		{
			Id:              3,
			Name:            "",
			Uri:             "uri2",
			UpdateAuthority: "bluzelle13m350fvnk3s6y5n8ugxhmka277r0t7cw48ru47",
		},
		{
			Id:              4,
			Name:            "",
			Uri:             "uri2",
			UpdateAuthority: "",
		},
		{
			Id:              5,
			Name:            "",
			Uri:             "",
			UpdateAuthority: "",
		},
	}

	for _, collection := range collections {
		suite.NFTKeeper.SetCollection(suite.ctx, collection)
	}

	for _, collection := range collections {
		c, err := suite.NFTKeeper.GetCollectionById(suite.ctx, collection.Id)
		suite.Require().NoError(err)
		suite.Require().Equal(collection, c)
	}

	allCollections = suite.NFTKeeper.GetAllCollections(suite.ctx)
	suite.Require().Len(allCollections, 5)
	suite.Require().Equal(collections, allCollections)
}

func (suite *KeeperTestSuite) TestCollectionNftsCreationAndQuery() {
	collectionId := uint64(1)

	// check nft ids by collection id query
	nftIds := suite.NFTKeeper.GetCollectionNfts(suite.ctx, collectionId)
	suite.Require().Len(nftIds, 0)

	// TODO: add further tests on GetCollectionNftIds
}
