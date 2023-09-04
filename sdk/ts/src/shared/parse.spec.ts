import { expect } from 'chai';
import { deepParseLong, parseDecTypeToNumber } from './parse';
import * as Long from 'long';

describe('parse', function () {
    this.timeout(600_000);

    it("should parse dec type to number", () => {
        expect(parseDecTypeToNumber("100000000000000000")).to.equal(0.1)
        expect(parseDecTypeToNumber("10000000000000000")).to.equal(0.01)
        expect(parseDecTypeToNumber("100500000000000")).to.equal(0.0001005)
        expect(parseDecTypeToNumber("20500000000000000000")).to.equal(20.5)
    });

  it('should parse all numbers in an object into Long', () =>
    Promise.resolve({
      a: 1,
      b: "b",
      c: 2,
      d: {
        e: 3,
        f: {
          g: 4
        }
      }
    })
      .then(obj => deepParseLong(obj, ['a', 'c', 'd.e', 'd.f.g']))
      .then(obj => expect(obj).to.deep.equal({
        a: Long.fromNumber(1),
        b: "b",
        c: Long.fromNumber(2),
        d: {
          e: Long.fromNumber(3),
          f: {
            g: Long.fromNumber(4)
          }
        }
      }))
  );

});