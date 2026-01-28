package types

import (
	"context"
)

// CuriumKeeper defines the expected curium keeper interface
type CuriumKeeper interface {
	GetAdminAddressString(ctx context.Context) string
}
