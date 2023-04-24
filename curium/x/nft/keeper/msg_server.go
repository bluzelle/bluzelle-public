package keeper

import (
	"context"
	"github.com/bluzelle/bluzelle-public/curium/x/nft/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"strconv"
)

type msgServer struct {
	Keeper
}

var _ types.MsgServer = msgServer{}

// NewMsgServerImpl returns an implementation of the MsgServer interface
// for the provided Keeper.
func NewMsgServerImpl(keeper Keeper) types.MsgServer {
	return &msgServer{Keeper: keeper}
}

func (m msgServer) CreateNFT(goCtx context.Context, msg *types.MsgCreateNFT) (*types.MsgCreateNFTResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(msg.Metadata.MetadataAuthority))
	if err != nil {
		return nil, err
	}

	err = sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(msg.Metadata.MintAuthority))
	if err != nil {
		return nil, err
	}

	for _, creator := range msg.Metadata.Creators {
		err = sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(creator.GetAddress()))
		if err != nil {
			return nil, err
		}
	}

	metadataId, nftId, err := m.Keeper.CreateNFT(ctx, msg)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitTypedEvent(&types.EventNFTCreation{
		Creator: msg.Sender,
		NftId:   nftId,
	})

	return &types.MsgCreateNFTResponse{
		Id:         nftId,
		MetadataId: metadataId,
	}, nil
}

func (m msgServer) PrintEdition(goCtx context.Context, msg *types.MsgPrintEdition) (*types.MsgPrintEditionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	nftId, err := m.Keeper.PrintEdition(ctx, msg)
	if err != nil {
		return nil, err
	}

	return &types.MsgPrintEditionResponse{
		Id:         nftId,
		MetadataId: msg.MetadataId,
	}, nil
}

func (m msgServer) TransferNFT(goCtx context.Context, msg *types.MsgTransferNFT) (*types.MsgTransferNFTResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := m.Keeper.TransferNFT(ctx, msg)
	if err != nil {
		return nil, err
	}

	ctx.EventManager().EmitTypedEvent(&types.EventNFTTransfer{
		NftId:    msg.Id,
		Sender:   msg.Sender,
		Receiver: msg.NewOwner,
	})

	return &types.MsgTransferNFTResponse{}, nil
}

func (m msgServer) SignMetadata(goCtx context.Context, msg *types.MsgSignMetadata) (*types.MsgSignMetadataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	metadata, err := m.Keeper.GetMetadataById(ctx, msg.MetadataId)
	if err != nil {
		return nil, err
	}

	isCreator := false
	for index, creator := range metadata.Creators {
		if creator.Address == msg.Sender {
			metadata.Creators[index].Verified = true
			isCreator = true
		}
	}

	if isCreator == false {
		return nil, types.ErrNotEnoughPermission
	}

	m.Keeper.SetMetadata(ctx, metadata)
	ctx.EventManager().EmitTypedEvent(&types.EventMetadataSign{
		Signer:     msg.Sender,
		MetadataId: msg.MetadataId,
	})

	return &types.MsgSignMetadataResponse{}, nil
}

func (m msgServer) UpdateMetadata(goCtx context.Context, msg *types.MsgUpdateMetadata) (*types.MsgUpdateMetadataResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	metadata, err := m.Keeper.GetMetadataById(ctx, msg.MetadataId)
	if err != nil {
		return nil, err
	}

	if !metadata.IsMutable {
		return nil, types.ErrMetadataImmutable
	}

	if metadata.MetadataAuthority != msg.Sender {
		return nil, types.ErrNotEnoughPermission
	}

	for _, creator := range msg.Creators {
		err = sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(creator.GetAddress()))
		if err != nil {
			return nil, err
		}
	}

	metadata.Name = msg.Name
	metadata.Uri = msg.Uri
	metadata.MutableUri = msg.MutableUri
	metadata.SellerFeeBasisPoints = msg.SellerFeeBasisPoints
	metadata.Creators = msg.Creators

	for index := range metadata.Creators {
		metadata.Creators[index].Verified = false
	}
	m.Keeper.SetMetadata(ctx, metadata)
	ctx.EventManager().EmitTypedEvent(&types.EventMetadataUpdate{
		Updater:    msg.Sender,
		MetadataId: metadata.Id,
	})

	return &types.MsgUpdateMetadataResponse{}, nil
}

func (m msgServer) UpdateMetadataAuthority(goCtx context.Context, msg *types.MsgUpdateMetadataAuthority) (*types.MsgUpdateMetadataAuthorityResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(msg.NewAuthority))
	if err != nil {
		return nil, err
	}

	err = m.Keeper.UpdateMetadataAuthority(ctx, msg)
	if err != nil {
		return nil, err
	}
	return &types.MsgUpdateMetadataAuthorityResponse{}, nil
}

func (m msgServer) UpdateMintAuthority(goCtx context.Context, msg *types.MsgUpdateMintAuthority) (*types.MsgUpdateMintAuthorityResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	err := sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(msg.NewAuthority))
	err = m.Keeper.UpdateMintAuthority(ctx, msg)
	if err != nil {
		return nil, err
	}
	return &types.MsgUpdateMintAuthorityResponse{}, nil
}

func (m msgServer) CreateCollection(goCtx context.Context, msg *types.MsgCreateCollection) (*types.MsgCreateCollectionResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	err := sdk.GetConfig().GetAddressVerifier()(sdk.AccAddress(msg.UpdateAuthority))
	if err != nil {
		return nil, err
	}

	collectionId := m.Keeper.GetLastCollectionId(ctx) + 1
	m.Keeper.SetLastCollectionId(ctx, collectionId)

	collection := types.Collection{
		Id:              collectionId,
		Symbol:          msg.Symbol,
		Name:            msg.Name,
		Uri:             msg.Uri,
		MutableUri:      msg.MutableUri,
		IsMutable:       msg.IsMutable,
		UpdateAuthority: msg.UpdateAuthority,
	}
	m.Keeper.SetCollection(ctx, collection)
	ctx.EventManager().EmitTypedEvent(&types.EventCollectionCreation{
		Creator:      msg.Sender,
		CollectionId: collection.Id,
	})

	ctx.EventManager().EmitEvent(
		sdk.NewEvent(
			types.EventTypeNftCollectionCreation,
			sdk.NewAttribute(types.AttributeKeyNftCollId, strconv.FormatUint(collection.Id, 10)),
		),
	)

	return &types.MsgCreateCollectionResponse{
		Id: collectionId,
	}, nil
}

func (m msgServer) UpdateCollectionAuthority(goCtx context.Context, msg *types.MsgUpdateCollectionAuthority) (*types.MsgUpdateCollectionAuthorityResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	collection, err := m.Keeper.GetCollectionById(ctx, msg.CollectionId)
	if err != nil {
		return nil, err
	}

	if !collection.IsMutable {
		return nil, types.ErrCollectionImmutable
	}

	if collection.UpdateAuthority != msg.Sender {
		return nil, types.ErrNotEnoughPermission
	}

	collection.UpdateAuthority = msg.NewAuthority
	m.Keeper.SetCollection(ctx, collection)
	ctx.EventManager().EmitTypedEvent(&types.EventUpdateCollectionAuthority{
		CollectionId: msg.CollectionId,
		NewAuthority: msg.NewAuthority,
	})

	return &types.MsgUpdateCollectionAuthorityResponse{}, nil
}

func (m msgServer) UpdateCollectionUri(goCtx context.Context, msg *types.MsgUpdateCollectionUri) (*types.MsgUpdateCollectionUriResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	collection, err := m.Keeper.GetCollectionById(ctx, msg.CollectionId)
	if err != nil {
		return nil, err
	}

	if !collection.IsMutable {
		return nil, types.ErrCollectionImmutable
	}

	if collection.UpdateAuthority != msg.Sender {
		return nil, types.ErrNotEnoughPermission
	}

	collection.Uri = msg.Uri
	m.Keeper.SetCollection(ctx, collection)
	ctx.EventManager().EmitTypedEvent(&types.EventUpdateCollectionUri{
		CollectionId: msg.CollectionId,
		Uri:          msg.Uri,
	})

	return &types.MsgUpdateCollectionUriResponse{}, nil
}

func (m msgServer) UpdateCollectionMutableUri(goCtx context.Context, msg *types.MsgUpdateCollectionMutableUri) (*types.MsgUpdateCollectionMutableUriResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	collection, err := m.Keeper.GetCollectionById(ctx, msg.CollectionId)
	if err != nil {
		return nil, err
	}

	if !collection.IsMutable {
		return nil, types.ErrCollectionImmutable
	}

	if collection.UpdateAuthority != msg.Sender {
		return nil, types.ErrNotEnoughPermission
	}

	collection.MutableUri = msg.Uri
	m.Keeper.SetCollection(ctx, collection)
	ctx.EventManager().EmitTypedEvent(&types.EventUpdateCollectionMutableUri{
		CollectionId: msg.CollectionId,
		Uri:          msg.Uri,
	})

	return &types.MsgUpdateCollectionMutableUriResponse{}, nil
}
