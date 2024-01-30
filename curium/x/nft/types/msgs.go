package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const (
	TypeMsgCreateNFT                  = "create_nft"
	TypeMsgPrintEdition               = "print_edition"
	TypeMsgTransferNFT                = "transfer_nft"
	TypeMsgSignMetadata               = "sign_metadata"
	TypeMsgUpdateMetadata             = "update_metadata"
	TypeMsgUpdateMetadataAuthority    = "update_metadata_authority"
	TypeMsgUpdateMintAuthority        = "update_metadata_authority"
	TypeMsgCreateCollection           = "create_collection"
	TypeMsgVerifyCollection           = "verify_collection"
	TypeMsgUnverifyCollection         = "unverify_collection"
	TypeMsgUpdateCollectionAuthority  = "update_collection_authority"
	TypeMsgUpdateCollectionUri        = "update_collection_uri"
	TypeMsgUpdateCollectionMutableUri = "update_collection_mutable_uri"
	TypeMsgMultiSendNFT = "multi_send_nft"
)

var _ sdk.Msg = &MsgCreateNFT{}

func NewMsgCreateNFT(sender sdk.AccAddress,
	collId uint64,
	updateAuthority string,
	name, uri string,
	mutableUri string,
	sellerFeeBasisPoints uint32,
	presaleHappened,
	isMutable bool,
	creators []Creator,
	masterEditionMaxSupply uint64,
) *MsgCreateNFT {
	return &MsgCreateNFT{
		Sender: sender.String(),
		CollId: collId,
		Metadata: Metadata{
			MetadataAuthority:    updateAuthority,
			MintAuthority:        sender.String(),
			Name:                 name,
			Uri:                  uri,
			MutableUri:           mutableUri,
			SellerFeeBasisPoints: sellerFeeBasisPoints,
			PrimarySaleHappened:  presaleHappened,
			IsMutable:            isMutable,
			Creators:             creators,
			MasterEdition: &MasterEdition{
				MaxSupply: masterEditionMaxSupply,
			},
		},
	}
}

func (msg MsgCreateNFT) Route() string { return RouterKey }

func (msg MsgCreateNFT) Type() string { return TypeMsgCreateNFT }

func (msg MsgCreateNFT) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	if msg.Metadata.SellerFeeBasisPoints > 100 {
		return ErrInvalidSellerFeeBasisPoints
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgCreateNFT) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgCreateNFT) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgPrintEdition{}

func NewMsgPrintEdition(sender sdk.AccAddress, collId, metadataId uint64, owner string) *MsgPrintEdition {
	return &MsgPrintEdition{
		Sender:     sender.String(),
		CollId:     collId,
		MetadataId: metadataId,
		Owner:      owner,
	}
}

func (msg MsgPrintEdition) Route() string { return RouterKey }

func (msg MsgPrintEdition) Type() string { return TypeMsgPrintEdition }

func (msg MsgPrintEdition) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	_, err = sdk.AccAddressFromBech32(msg.Owner)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid owner address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgPrintEdition) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgPrintEdition) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgTransferNFT{}

func NewMsgTransferNFT(sender sdk.AccAddress, nftId string, newOwner string) *MsgTransferNFT {
	return &MsgTransferNFT{
		Sender:   sender.String(),
		Id:       nftId,
		NewOwner: newOwner,
	}
}

func (msg MsgTransferNFT) Route() string { return RouterKey }

func (msg MsgTransferNFT) Type() string { return TypeMsgTransferNFT }

func (msg MsgTransferNFT) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	if !IsValidNftId(msg.Id) {
		return ErrInvalidNftId
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgTransferNFT) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgTransferNFT) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgSignMetadata{}

func NewMsgSignMetadata(sender sdk.AccAddress, metadataId uint64) *MsgSignMetadata {
	return &MsgSignMetadata{
		Sender:     sender.String(),
		MetadataId: metadataId,
	}
}

func (msg MsgSignMetadata) Route() string { return RouterKey }

func (msg MsgSignMetadata) Type() string { return TypeMsgSignMetadata }

func (msg MsgSignMetadata) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgSignMetadata) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgSignMetadata) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgUpdateMetadata{}

func NewMsgUpdateMetadata(
	sender sdk.AccAddress,
	metadataId uint64,
	name, uri string,
	mutableUri string,
	sellerFeeBasisPoints uint32,
	creators []Creator,
) *MsgUpdateMetadata {
	return &MsgUpdateMetadata{
		Sender:               sender.String(),
		MetadataId:           metadataId,
		Name:                 name,
		Uri:                  uri,
		MutableUri:           mutableUri,
		SellerFeeBasisPoints: sellerFeeBasisPoints,
		Creators:             creators,
	}
}

func (msg MsgUpdateMetadata) Route() string { return RouterKey }

func (msg MsgUpdateMetadata) Type() string { return TypeMsgUpdateMetadata }

func (msg MsgUpdateMetadata) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	if msg.SellerFeeBasisPoints > 100 {
		return ErrInvalidSellerFeeBasisPoints
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgUpdateMetadata) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgUpdateMetadata) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgUpdateMetadataAuthority{}

func NewMsgUpdateMetadataAuthority(sender sdk.AccAddress, metadataId uint64, newAuthority string) *MsgUpdateMetadataAuthority {
	return &MsgUpdateMetadataAuthority{
		Sender:       sender.String(),
		MetadataId:   metadataId,
		NewAuthority: newAuthority,
	}
}

func (msg MsgUpdateMetadataAuthority) Route() string { return RouterKey }

func (msg MsgUpdateMetadataAuthority) Type() string { return TypeMsgUpdateMetadataAuthority }

func (msg MsgUpdateMetadataAuthority) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgUpdateMetadataAuthority) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgUpdateMetadataAuthority) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgUpdateMintAuthority{}

func NewMsgUpdateMintAuthority(sender sdk.AccAddress, metadataId uint64, newAuthority string) *MsgUpdateMintAuthority {
	return &MsgUpdateMintAuthority{
		Sender:       sender.String(),
		MetadataId:   metadataId,
		NewAuthority: newAuthority,
	}
}

func (msg MsgUpdateMintAuthority) Route() string { return RouterKey }

func (msg MsgUpdateMintAuthority) Type() string { return TypeMsgUpdateMintAuthority }

func (msg MsgUpdateMintAuthority) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgUpdateMintAuthority) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgUpdateMintAuthority) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgCreateCollection{}

func NewMsgCreateCollection(sender sdk.AccAddress, symbol, name, uri, mutableUri, updateAuthority string, isMutable bool) *MsgCreateCollection {
	return &MsgCreateCollection{
		Sender:          sender.String(),
		Symbol:          symbol,
		Name:            name,
		Uri:             uri,
		MutableUri:      mutableUri,
		UpdateAuthority: updateAuthority,
		IsMutable:       isMutable,
	}
}

func (msg MsgCreateCollection) Route() string { return RouterKey }

func (msg MsgCreateCollection) Type() string { return TypeMsgCreateCollection }

func (msg MsgCreateCollection) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgCreateCollection) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgCreateCollection) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgUpdateCollectionAuthority{}

func NewMsgUpdateCollectionAuthority(sender sdk.AccAddress, collectionId uint64, newAuthority string) *MsgUpdateCollectionAuthority {
	return &MsgUpdateCollectionAuthority{
		Sender:       sender.String(),
		CollectionId: collectionId,
		NewAuthority: newAuthority,
	}
}

func (msg MsgUpdateCollectionAuthority) Route() string { return RouterKey }

func (msg MsgUpdateCollectionAuthority) Type() string { return TypeMsgUpdateCollectionAuthority }

func (msg MsgUpdateCollectionAuthority) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgUpdateCollectionAuthority) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgUpdateCollectionAuthority) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgUpdateCollectionUri{}

func NewMsgUpdateCollectionUri(sender sdk.AccAddress, collectionId uint64, uri string) *MsgUpdateCollectionUri {
	return &MsgUpdateCollectionUri{
		Sender:       sender.String(),
		CollectionId: collectionId,
		Uri:          uri,
	}
}

func (msg MsgUpdateCollectionUri) Route() string { return RouterKey }

func (msg MsgUpdateCollectionUri) Type() string { return TypeMsgUpdateCollectionUri }

func (msg MsgUpdateCollectionUri) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgUpdateCollectionUri) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgUpdateCollectionUri) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}

var _ sdk.Msg = &MsgUpdateCollectionMutableUri{}

func NewMsgUpdateCollectionMutableUri(sender sdk.AccAddress, collectionId uint64, uri string) *MsgUpdateCollectionMutableUri {
	return &MsgUpdateCollectionMutableUri{
		Sender:       sender.String(),
		CollectionId: collectionId,
		Uri:          uri,
	}
}

func (msg MsgUpdateCollectionMutableUri) Route() string { return RouterKey }

func (msg MsgUpdateCollectionMutableUri) Type() string { return TypeMsgUpdateCollectionMutableUri }

func (msg MsgUpdateCollectionMutableUri) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}

	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgUpdateCollectionMutableUri) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgUpdateCollectionMutableUri) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}



var _ sdk.Msg = &MsgMultiSendNFT{}

func NewMsgMultiSendNFT(sender sdk.AccAddress, multiSendOutputs []*MultiSendNFTOutput) *MsgMultiSendNFT {
	return &MsgMultiSendNFT{
		Sender:       sender.String(),
		MultiSendOutputs: multiSendOutputs,
	}
}

func (msg MsgMultiSendNFT) Route() string { return RouterKey }

func (msg MsgMultiSendNFT) Type() string { return TypeMsgMultiSendNFT }

func (msg MsgMultiSendNFT) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid sender address (%s)", err)
	}
	for _, output := range msg.MultiSendOutputs {
		_, err := sdk.AccAddressFromBech32(output.Receiver)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid receiver address (%s)", err)
		}
	}
	return nil
}

// GetSignBytes Implements Msg.
func (msg MsgMultiSendNFT) GetSignBytes() []byte {
	b, err := ModuleCdc.MarshalJSON(&msg)
	if err != nil {
		panic(err)
	}
	return sdk.MustSortJSON(b)
}

// GetSigners Implements Msg.
func (msg MsgMultiSendNFT) GetSigners() []sdk.AccAddress {
	sender, err := sdk.AccAddressFromBech32(msg.Sender)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{sender}
}
