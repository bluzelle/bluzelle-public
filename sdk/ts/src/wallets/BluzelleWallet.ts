import {OfflineDirectSigner} from "@cosmjs/proto-signing/build/signer";
import {SequenceResponse} from "@cosmjs/stargate";
import {SigningBluzelleClient} from "../core";

export interface BluzelleWallet extends OfflineDirectSigner {
    getSequence: (client: SigningBluzelleClient, signerAddress: string) => Promise<SequenceResponse>
}

