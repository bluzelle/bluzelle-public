package app

import (
	abci "github.com/cometbft/cometbft/abci/types"
	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/server/api"
	"github.com/cosmos/cosmos-sdk/server/config"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/gogo/protobuf/grpc"
)

type ServerApplication interface {
	abci.Application

	RegisterAPIRoutes(*api.Server, config.APIConfig)

	// RegisterGRPCServer registers gRPC services directly with the gRPC
	// server.
	RegisterGRPCServer(grpc.Server)

	// RegisterTxService registers the gRPC Query service for tx (such as tx
	// simulation, fetching txs by hash...).
	RegisterTxService(client.Context)

	// RegisterTendermintService registers the gRPC Query service for tendermint queries.
	RegisterTendermintService(client.Context)

	// CommitMultiStore Returns the multistore instance
	CommitMultiStore() sdk.CommitMultiStore
}
