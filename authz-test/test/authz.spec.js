"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authz_1 = require("../src/authz");
describe("Bluzelle Tests", () => {
    authz_1.api.account()
        .then((info) => {
        console.log(info);
    });
});
