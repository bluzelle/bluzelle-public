package keeper

import (
	"fmt"

	sdk "github.com/cosmos/cosmos-sdk/types"
)

type Migrator struct {
	keeper Keeper
}

func NewMigrator(keeper Keeper) Migrator {
	return Migrator{keeper: keeper}
}

func (m Migrator) Migrate1to2(ctx sdk.Context) error {
	panic(fmt.Errorf("failed to migrate"))
	// return v2.MigrateStore(ctx, m.keeper.StoreKey, m.keeper.Cdc)
}
