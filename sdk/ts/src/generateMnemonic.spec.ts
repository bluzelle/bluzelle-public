import {expect} from "chai";
import {generateMnemonic} from "./generateMnemonic";

describe("generator", () => {

    it('should generate mnemonic of 12 words', () =>
        Promise.resolve(generateMnemonic(12))
            .then(mnemonic => expect(mnemonic.split(" ").length).to.equal(12))
    );

    it('should generate mnemonic of 24 words', () =>
        Promise.resolve(generateMnemonic(24))
            .then(mnemonic => expect(mnemonic.split(" ").length).to.equal(24))
    );

});