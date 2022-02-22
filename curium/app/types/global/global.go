package global

import "github.com/bluzelle/curium/app/ante/gasmeter"

// Put here because we don't control this between the ante handler and the end blocker so it was
// getting duplicated.  Needed to make a global variable.
var GasMeterKeeper = gasmeter.NewGasMeterKeeper()
