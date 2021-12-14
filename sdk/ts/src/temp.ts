import {newBluzelleClient} from "./sdk";
import {DirectSecp256k1HdWallet} from "@cosmjs/proto-signing";

DirectSecp256k1HdWallet.fromMnemonic('wisdom true tornado idea fun mail jump round primary perfect broken cycle gaze chuckle announce verify public black captain plug metal orchard orchard bachelor', {prefix: 'bluzelle'})
    .then(wallet => newBluzelleClient({
        url: 'localhost:26657',
        wallet
    }))
    .then(x => x.sgClient.signAndBroadcast([x.sgClient.msgPin({cid: 'xxxx', creator: x.address})]))
    .then(x => x);






