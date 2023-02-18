module github.com/bluzelle/bluzelle/curium

go 1.16

require (
	github.com/armon/go-metrics v0.3.9
	github.com/cosmos/cosmos-sdk v0.44.3
	github.com/cosmos/ibc-go v1.2.2
	github.com/gogo/protobuf v1.3.3
	github.com/golang/protobuf v1.5.2
	github.com/gorilla/mux v1.8.0
	github.com/grpc-ecosystem/grpc-gateway v1.16.0
	github.com/ipfs/go-cid v0.0.7
	github.com/ipfs/go-ipfs v0.10.0
	github.com/ipfs/go-ipfs-config v0.16.0
	github.com/ipfs/go-ipfs-files v0.0.8
	github.com/ipfs/interface-go-ipfs-core v0.5.1
	github.com/libp2p/go-libp2p-core v0.9.0
	github.com/multiformats/go-multiaddr v0.4.0
	github.com/regen-network/cosmos-proto v0.3.1
	github.com/spf13/cast v1.3.1
	github.com/spf13/cobra v1.2.1
	github.com/spf13/pflag v1.0.5
	github.com/stretchr/testify v1.8.1
	github.com/tendermint/spm v0.1.8
	github.com/tendermint/tendermint v0.34.14
	github.com/tendermint/tm-db v0.6.4
	golang.org/x/oauth2 v0.3.0 // indirect
	google.golang.org/genproto v0.0.0-20221207170731-23e4bf6bdc37
	google.golang.org/grpc v1.51.0
	google.golang.org/protobuf v1.28.1
	gopkg.in/yaml.v2 v2.4.0
)

replace (
	github.com/gogo/protobuf => github.com/regen-network/protobuf v1.3.3-alpha.regen.1
	github.com/keybase/go-keychain => github.com/99designs/go-keychain v0.0.0-20191008050251-8e49817e8af4
	google.golang.org/grpc => google.golang.org/grpc v1.33.2
)
