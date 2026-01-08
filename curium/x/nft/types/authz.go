package types

import (
	sdkerrors "cosmossdk.io/errors"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/errors"
	authztypes "github.com/cosmos/cosmos-sdk/x/authz"
)

var _ authztypes.Authorization = &NFTTransferAuthorization{}

// NewNFTTransferAuthorization creates a new NFTTransferAuthorization
func NewNFTTransferAuthorization(nftId string) *NFTTransferAuthorization {
	return &NFTTransferAuthorization{
		NftId: nftId,
	}
}

// MsgTypeURL implements Authorization.MsgTypeURL
func (a NFTTransferAuthorization) MsgTypeURL() string {
	return sdk.MsgTypeURL(&MsgTransferNFT{})
}

// Accept implements Authorization.Accept
func (a NFTTransferAuthorization) Accept(ctx sdk.Context, msg sdk.Msg) (authztypes.AcceptResponse, error) {
	transferMsg, ok := msg.(*MsgTransferNFT)
	if !ok {
		return authztypes.AcceptResponse{}, sdkerrors.Wrapf(
			errors.ErrInvalidRequest,
			"expected %T, got %T", &MsgTransferNFT{}, msg,
		)
	}

	// Check if the NFT ID in the message matches the authorized NFT ID
	if transferMsg.Id != a.NftId {
		return authztypes.AcceptResponse{}, sdkerrors.Wrapf(
			errors.ErrUnauthorized,
			"authorization is for NFT %s, but message is for NFT %s",
			a.NftId, transferMsg.Id,
		)
	}

	// This is a one-time use authorization - delete after use
	return authztypes.AcceptResponse{Delete: true, Updated: nil}, nil
}

// ValidateBasic implements Authorization.ValidateBasic
func (a NFTTransferAuthorization) ValidateBasic() error {
	if a.NftId == "" {
		return sdkerrors.Wrapf(
			ErrInvalidNftId,
			"nft_id cannot be empty",
		)
	}

	if !IsValidNftId(a.NftId) {
		return sdkerrors.Wrapf(
			ErrInvalidNftId,
			"invalid nft_id: %s",
			a.NftId,
		)
	}

	return nil
}
