package keeper

import (
	"context"
	"github.com/bluzelle/curium/x/faucet/types"
	"github.com/cosmos/cosmos-sdk/crypto/hd"
	"github.com/cosmos/cosmos-sdk/crypto/keyring"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Mint(goCtx context.Context, msg *types.MsgMint) (*types.MsgMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	var mnemonic string
	address := msg.Address

	if len(address) == 0 {
		kr := keyring.NewInMemory()
		info, m, err := kr.NewMnemonic("temp", keyring.English, "m/44'/483'/0'/0/0", "", hd.Secp256k1)
		mnemonic = m
		if err != nil {
			return nil, err
		}

		address = info.GetAddress().String()
	}

	addr, err := sdk.AccAddressFromBech32(msg.Address)
	if err != nil {
		return nil, err
	}
	coins := sdk.NewCoins(sdk.NewCoin("ubnt", sdk.NewInt(2000*100000)))

	err = k.bankKeeper.MintCoins(ctx, "faucet", coins)
	if err != nil {
		return nil, err
	}
	err = k.bankKeeper.SendCoinsFromModuleToAccount(ctx, "faucet", addr, coins)
	if err != nil {
		return nil, err
	}

	response := types.MsgMintResponse{
		Mnemonic: mnemonic,
		Address:  address,
	}

	return &response, nil
}
