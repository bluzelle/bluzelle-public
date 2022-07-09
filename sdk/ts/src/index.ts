export type {BluzelleWallet} from './wallets/BluzelleWallet'
export type {BluzelleLocalWallet} from './wallets/localWallet'
export {newLocalWallet, LocalWalletOptions} from './wallets/localWallet'
export {newKeplrWallet, BluzelleKeplrWallet} from './wallets/keplrWallet'
export {mint, createAddress} from "./faucet"
export {newBluzelleClient} from "./sdk"
export type {BluzelleClient} from "./sdk"
export {getAccountBalance, hasContent, getTaxInfo} from "./query"
export {getStatus, getValidators} from "./queryTendermint"
export {send, pinCid, withTransaction} from "./tx"

// export {newKeplrWallet, BluzelleKeplrWallet}
//
// (global as any).newKeplerWallet = newKeplrWallet;





