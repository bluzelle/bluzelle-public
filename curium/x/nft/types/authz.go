package types

import (
	"context"
	"fmt"

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
func (a NFTTransferAuthorization) Accept(ctx context.Context, msg sdk.Msg) (authztypes.AcceptResponse, error) {
	// Add detailed error message to help debug
	errMsg := fmt.Sprintf("NFTTransferAuthorization.Accept called: authz.NftId=%q, msgType=%T", a.NftId, msg)

	transferMsg, ok := msg.(*MsgTransferNFT)
	if !ok {
		return authztypes.AcceptResponse{}, sdkerrors.Wrapf(
			errors.ErrInvalidRequest,
			"%s: expected %T, got %T", errMsg, &MsgTransferNFT{}, msg,
		)
	}

	errMsg = fmt.Sprintf("%s, transferMsg.Id=%q", errMsg, transferMsg.Id)

	// Check if the NFT ID in the message matches the authorized NFT ID
	// Use string comparison with explicit check for empty strings
	if transferMsg.Id == "" {
		return authztypes.AcceptResponse{}, sdkerrors.Wrapf(
			errors.ErrUnauthorized,
			"%s: message NFT ID is empty, authorization is for NFT %s",
			errMsg, a.NftId,
		)
	}

	if a.NftId == "" {
		return authztypes.AcceptResponse{}, sdkerrors.Wrapf(
			errors.ErrUnauthorized,
			"%s: authorization NFT ID is empty, message is for NFT %s",
			errMsg, transferMsg.Id,
		)
	}

	if transferMsg.Id != a.NftId {
		return authztypes.AcceptResponse{}, sdkerrors.Wrapf(
			errors.ErrUnauthorized,
			"%s: authorization is for NFT %q (len=%d), but message is for NFT %q (len=%d)",
			errMsg, a.NftId, len(a.NftId), transferMsg.Id, len(transferMsg.Id),
		)
	}

	// This is a one-time use authorization - delete after use
	return authztypes.AcceptResponse{Delete: true, Updated: nil, Accept: true}, nil
}

// ValidateBasic implements Authorization.ValidateBasic
func (a NFTTransferAuthorization) ValidateBasic() error {
	// Add logging to see if this is being called
	if a.NftId == "" {
		return sdkerrors.Wrapf(
			ErrInvalidNftId,
			"ValidateBasic: nft_id cannot be empty",
		)
	}

	if !IsValidNftId(a.NftId) {
		return sdkerrors.Wrapf(
			ErrInvalidNftId,
			"ValidateBasic: invalid nft_id: %s",
			a.NftId,
		)
	}

	return nil
}
