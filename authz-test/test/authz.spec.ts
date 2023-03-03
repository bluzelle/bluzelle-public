import { mnemonicToAddress } from "bluzelle";
import { assert } from "chai";
import { api } from "../src/authz";
describe("Bluzelle Tests", () => {
        console.log(api)
        const mnemonic = api.generateBIP39Account();
        console.log(mnemonic);
        const address = mnemonicToAddress(mnemonic);
        console.log(address);
});