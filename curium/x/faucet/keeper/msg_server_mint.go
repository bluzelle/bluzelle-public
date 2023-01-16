package keeper

import (
	"context"
	"github.com/bluzelle/bluzelle/curium/x/faucet/types"
	sdk "github.com/cosmos/cosmos-sdk/types"
)

func (k msgServer) Mint(goCtx context.Context, msg *types.MsgMint) (*types.MsgMintResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

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
		Address: msg.Address,
	}

	return &response, nil
}
