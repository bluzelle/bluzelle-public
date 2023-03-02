import { assert } from "chai";
import { api } from "../src/authz";
describe("Bluzelle Tests", () => {
        api.account()
            .then((info) => {
                console.log(info);
            })      
});