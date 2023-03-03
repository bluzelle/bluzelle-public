"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bluzelle_1 = require("bluzelle");
const authz_1 = require("../src/authz");
describe("Bluzelle Tests", () => {
    const mnemonic = authz_1.api.generateBIP39Account();
    console.log(mnemonic);
    const address = (0, bluzelle_1.mnemonicToAddress)(mnemonic);
    console.log(address);
});
