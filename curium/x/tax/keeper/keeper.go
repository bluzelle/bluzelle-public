package keeper

import (
	"fmt"
	taxTypes "github.com/bluzelle/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	banktypes "github.com/cosmos/cosmos-sdk/x/bank/types"
	paramTypes "github.com/cosmos/cosmos-sdk/x/params/types"
	"github.com/tendermint/tendermint/libs/log"
)

type Keeper struct {
	cdc           codec.BinaryCodec
	storeKey      sdk.StoreKey
	memKey        sdk.StoreKey
	paramstore    paramTypes.Subspace
	BankKeeper    bankKeeper.Keeper
	AccountKeeper acctypes.AccountKeeper
}

func NewKeeper(
	cdc codec.BinaryCodec,
	storeKey,
	memKey sdk.StoreKey,
	ps paramTypes.Subspace,
	bankKeeper bankKeeper.Keeper,
	accountKeeper acctypes.AccountKeeper,
) *Keeper {
	return &Keeper{
		cdc:           cdc,
		storeKey:      storeKey,
		memKey:        memKey,
		paramstore:    ps,
		BankKeeper:    bankKeeper,
		AccountKeeper: accountKeeper,
	}
}

func (k Keeper) Logger(ctx sdk.Context) log.Logger {
	return ctx.Logger().With("module", fmt.Sprintf("x/%s", taxTypes.ModuleName))
}

func (k Keeper) GetKVStore(ctx sdk.Context) sdk.KVStore {
	return ctx.KVStore(k.storeKey)
}

func (k Keeper) GetCodec() codec.BinaryCodec {
	return k.cdc
}

func (k Keeper) GetTaxInfoKeep(ctx sdk.Context) (taxTypes.GenesisState, error) {
	store := k.GetKVStore(ctx)
	var info taxTypes.GenesisState
	bz := store.Get([]byte(taxTypes.KeyTaxInfo))
	err := info.Unmarshal(bz)
	return info, err
}

func (k Keeper) SetTaxInfoKeep(ctx sdk.Context, info *taxTypes.GenesisState) error {
	store := k.GetKVStore(ctx)

	bz, err := info.Marshal()
	if err != nil {
		return err
	}
	store.Set([]byte(taxTypes.KeyTaxInfo), bz)
	return err
}

func (k Keeper) ChargeGasTax(ctx sdk.Context, sender sdk.AccAddress, gasFee sdk.Coins) error {
	gasTaxes := k.calculateGasTax(ctx, gasFee)
	if !gasTaxes.IsZero() {
		info, err := k.GetTaxInfoKeep(ctx)
		if err != nil {
			return err
		}
		taxCollector, err := sdk.AccAddressFromBech32(info.TaxCollector)
		if err != nil {
			return err
		}
		err = k.BankKeeper.SendCoinsFromAccountToModule(ctx, sender, taxTypes.ModuleName, gasTaxes)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}

		err = k.BankKeeper.SendCoinsFromModuleToAccount(ctx, taxTypes.ModuleName, taxCollector, gasTaxes)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}
	}

	return nil
}

func (k Keeper) calculateGasTax(ctx sdk.Context, gasFee sdk.Coins) sdk.Coins {
	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, 0))
	}
	return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, gasFee.AmountOf(taxTypes.Denom).Int64()*info.GasTaxBp/10000))
}

func (k Keeper) ChargeTransferTax(ctx sdk.Context, taxPayer sdk.AccAddress, msg sdk.Msg) error {
	taxPayerAcc := k.AccountKeeper.GetAccount(ctx, taxPayer)
	if taxPayerAcc == nil {
		return sdkerrors.Wrapf(sdkerrors.ErrUnknownAddress, "fee payer address: %s does not exist", taxPayer)
	}
	transferTaxes := k.calculateTransferTax(ctx, msg)
	if !transferTaxes.IsZero() {
		info, err := k.GetTaxInfoKeep(ctx)
		if err != nil {
			return err
		}
		taxCollector, err := sdk.AccAddressFromBech32(info.TaxCollector)
		if err != nil {
			return err
		}

		err = k.BankKeeper.SendCoinsFromAccountToModule(ctx, taxPayer, taxTypes.ModuleName, transferTaxes)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}

		err = k.BankKeeper.SendCoinsFromModuleToAccount(ctx, taxTypes.ModuleName, taxCollector, transferTaxes)
		if err != nil {
			return sdkerrors.Wrapf(sdkerrors.ErrInsufficientFunds, err.Error())
		}
	}

	return nil
}

func (k Keeper) calculateTransferTax(ctx sdk.Context, msg sdk.Msg) sdk.Coins {
	info, err := k.GetTaxInfoKeep(ctx)
	if err != nil {
		return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, 0))
	}

	bankMsg := msg.(*banktypes.MsgSend)
	transferTaxes := sdk.Coins{}
	for _, coin := range bankMsg.Amount {
		feeAmt := coin.Amount.Int64() * info.TransferTaxBp / 10_000
		if feeAmt > 0 {
			transferTax := sdk.NewInt64Coin(taxTypes.Denom, feeAmt)
			transferTaxes = append(transferTaxes, transferTax)
		}
	}
	return transferTaxes
}
