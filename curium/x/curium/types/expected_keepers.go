package types

import (
	"context"
)

// CuriumKeeper defines the expected curium keeper interface
type CuriumKeeper interface {
	GetAdminAddress(ctx context.Context) string
}
