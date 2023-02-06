module github.com/bluzelle/bluzelle/curium

go 1.16

require (
	github.com/bluzelle/ipfs-kubo v0.18.1-0.20230127160642-b64709676940
	github.com/cosmos/cosmos-sdk v0.45.4
	github.com/cosmos/ibc-go v1.5.0
	github.com/gogo/protobuf v1.3.3
	github.com/golang/protobuf v1.5.2
	github.com/gorilla/mux v1.8.0
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/ipfs/go-cid v0.3.2
	github.com/ipfs/go-ipfs-files v0.0.8
	github.com/ipfs/interface-go-ipfs-core v0.8.2
	github.com/libp2p/go-libp2p-core v0.19.0
	github.com/multiformats/go-multiaddr v0.8.0
	github.com/spf13/cast v1.5.0
	github.com/spf13/cobra v1.5.0
	github.com/spf13/pflag v1.0.5
	github.com/stretchr/testify v1.8.1
	github.com/tendermint/tendermint v0.34.22
	github.com/tendermint/tm-db v0.6.7
	google.golang.org/genproto v0.0.0-20220725144611-272f38e5d71b
	google.golang.org/grpc v1.51.0
	gopkg.in/yaml.v2 v2.4.0
)

require github.com/armon/go-metrics v0.4.0 // indirect

replace (
	github.com/99designs/keyring => github.com/cosmos/keyring v1.1.7-0.20210622111912-ef00f8ac3d76
	github.com/gin-gonic/gin => github.com/gin-gonic/gin v1.7.0
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
