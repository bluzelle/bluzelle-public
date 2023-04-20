import {expect} from "chai";
import {parseDecTypeToNumber} from "./parse";


describe('parse', function () {
    this.timeout(600_000);

    it("should parse dec type to number", () => {
        expect(parseDecTypeToNumber("100000000000000000")).to.equal(0.1)
        expect(parseDecTypeToNumber("10000000000000000")).to.equal(0.01)
        expect(parseDecTypeToNumber("100500000000000")).to.equal(0.0001005)
        expect(parseDecTypeToNumber("20500000000000000000")).to.equal(20.5)
    });


});