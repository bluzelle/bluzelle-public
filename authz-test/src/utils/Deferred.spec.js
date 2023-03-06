"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deferred_1 = require("./Deferred");
describe('deferred', () => {
    it('should resolve a deferred promise', (done) => {
        const d = (0, Deferred_1.newDeferred)();
        d.promise
            .then(v => v === 10 ? done() : done(`invalid result: ${v}`))
            .catch(e => done(`error thrown when it should not be: ${e}`));
        d.resolve(10);
    });
    it('should catch a deferred promise', (done) => {
        const d = (0, Deferred_1.newDeferred)();
        d.promise
            .then(v => done(`resolve happens when it should not: ${v}`))
            .catch(e => e === 'some error' ? done() : done('error caught with wrong value'));
        d.reject('some error');
    });
});
