import {withStorageSdk} from "./decorators/withStorageSdk";
import {bluzelle} from "./sdk";

bluzelle({
    url: 'http://localhost:26657',
    mnemonic: 'joy clean pact dry deposit retire razor fence action session tilt lift network despair derive pride employ tilt shield meadow casino motion deny coach',
})
    .then(withStorageSdk)
    .then(x => x.pin())
    .then(x => x)
