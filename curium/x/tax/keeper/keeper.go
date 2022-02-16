package keeper

import (
	"fmt"
	taxTypes "github.com/bluzelle/curium/x/tax/types"
	"github.com/cosmos/cosmos-sdk/codec"
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
	acctypes "github.com/cosmos/cosmos-sdk/x/auth/keeper"
	bankKeeper "github.com/cosmos/cosmos-sdk/x/bank/keeper"
	paramTypes "github.com/cosmos/cosmos-sdk/x/params/types"
	gogotypes "github.com/gogo/protobuf/types"
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

func (k Keeper) GetTaxCollector(ctx sdk.Context) (sdk.AccAddress, error) {
	store := k.GetKVStore(ctx)
	var collector sdk.AccAddress
	bz := store.Get([]byte(taxTypes.KeyTaxCollector))
	err := collector.Unmarshal(bz)
	if err != nil {
		return nil, sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, err.Error())
	}
	return collector, nil
}

func (k Keeper) SetTaxCollector(ctx sdk.Context, address string) (sdk.AccAddress, error) {
	store := k.GetKVStore(ctx)

	bz, err := sdk.GetFromBech32(address, taxTypes.AccountAddressPrefix)
	if err != nil {
		return nil, err
	}

	err = sdk.VerifyAddressFormat(bz)
	if err != nil {
		return nil, err
	}

	addr := sdk.AccAddress(bz)
	store.Set([]byte(taxTypes.KeyTaxCollector), addr)

	return addr, nil
}

func (k Keeper) GetGasTaxBp(ctx sdk.Context) gogotypes.Int64Value {
	store := k.GetKVStore(ctx)
	var bp gogotypes.Int64Value
	bz := store.Get([]byte(taxTypes.KeyGasTaxBp))
	k.cdc.MustUnmarshal(bz, &bp)
	return bp
}

func (k Keeper) SetGasTaxBp(ctx sdk.Context, gasTaxBp int64) {
	store := k.GetKVStore(ctx)
	bz := k.GetCodec().MustMarshal(&gogotypes.Int64Value{Value: gasTaxBp})
	store.Set([]byte(taxTypes.KeyGasTaxBp), bz)
}

func (k Keeper) GetTransferTaxBp(ctx sdk.Context) gogotypes.Int64Value {
	store := k.GetKVStore(ctx)
	var bp gogotypes.Int64Value
	bz := store.Get([]byte(taxTypes.KeyTransferTaxBp))
	k.cdc.MustUnmarshal(bz, &bp)
	return bp
}

func (k Keeper) SetTransferTaxBp(ctx sdk.Context, transferTaxBp int64) {
	store := k.GetKVStore(ctx)
	bz := k.GetCodec().MustMarshal(&gogotypes.Int64Value{Value: transferTaxBp})
	store.Set([]byte(taxTypes.KeyTransferTaxBp), bz)
}

func (k Keeper) GetTaxInfo(ctx sdk.Context) (taxTypes.GenesisState, error) {
	store := k.GetKVStore(ctx)
	var info taxTypes.GenesisState
	bz := store.Get([]byte(taxTypes.KeyTaxInfo))
	err := info.Unmarshal(bz)
	return info, err
}

func (k Keeper) ChargeGasTax(ctx sdk.Context, sender sdk.AccAddress, gasFee sdk.Coins) error {
	gasTaxes := k.calculateGasTax(ctx, gasFee)
	taxCollector, err := k.GetTaxCollector(ctx)
	if err != nil {
		return err
	}
	if !gasTaxes.IsZero() {
		err := k.BankKeeper.SendCoinsFromAccountToModule(ctx, sender, taxTypes.ModuleName, gasTaxes)
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
	return sdk.NewCoins(sdk.NewInt64Coin(taxTypes.Denom, gasFee.AmountOf(taxTypes.Denom).Int64()*k.GetGasTaxBp(ctx).Value/10000))
}
