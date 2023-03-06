"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newDeferred = void 0;
const monet_1 = require("monet");
const promise_passthrough_1 = require("promise-passthrough");
const newDeferred = () => (0, monet_1.Some)({})
    .map((0, promise_passthrough_1.passThrough)(d => d.promise = new Promise((resolve, reject) => {
    d.resolve = resolve;
    d.reject = reject;
})))
    .join();
exports.newDeferred = newDeferred;
