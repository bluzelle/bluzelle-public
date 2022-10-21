package types

import (
	"github.com/cosmos/cosmos-sdk/codec"
	"github.com/cosmos/cosmos-sdk/codec/types"
	cryptocodec "github.com/cosmos/cosmos-sdk/crypto/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/msgservice"
)

var (
	amino     = codec.NewLegacyAmino()
	ModuleCdc = codec.NewAminoCodec(amino)
)

func init() {
	RegisterLegacyAminoCodec(amino)
	cryptocodec.RegisterCrypto(amino)
	amino.Seal()
}

func RegisterLegacyAminoCodec(cdc *codec.LegacyAmino) {
	cdc.RegisterConcrete(&MsgCreateNFT{}, "go-bluzelle/nft/MsgCreateNFT", nil)
	cdc.RegisterConcrete(&MsgTransferNFT{}, "go-bluzelle/nft/MsgTransferNFT", nil)
	cdc.RegisterConcrete(&MsgSignMetadata{}, "go-bluzelle/nft/MsgSignMetadata", nil)
	cdc.RegisterConcrete(&MsgUpdateMetadata{}, "go-bluzelle/nft/MsgUpdateMetadata", nil)
	cdc.RegisterConcrete(&MsgUpdateMetadataAuthority{}, "go-bluzelle/nft/MsgUpdateMetadataAuthority", nil)
	cdc.RegisterConcrete(&MsgUpdateMintAuthority{}, "go-bluzelle/nft/MsgUpdateMintAuthority", nil)
	cdc.RegisterConcrete(&MsgCreateCollection{}, "go-bluzelle/nft/MsgCreateCollection", nil)
	cdc.RegisterConcrete(&MsgUpdateCollectionAuthority{}, "go-bluzelle/nft/MsgUpdateCollectionAuthority", nil)
}

func RegisterInterfaces(registry types.InterfaceRegistry) {
	registry.RegisterImplementations((*sdk.Msg)(nil),
		&MsgCreateNFT{},
		&MsgTransferNFT{},
		&MsgSignMetadata{},
		&MsgUpdateMetadata{},
		&MsgUpdateMetadataAuthority{},
		&MsgUpdateMintAuthority{},
		&MsgCreateCollection{},
		&MsgUpdateCollectionAuthority{},
	)

	msgservice.RegisterMsgServiceDesc(registry, &_Msg_serviceDesc)
}
