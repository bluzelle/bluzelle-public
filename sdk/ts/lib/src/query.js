"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaxInfo = exports.getAccountBalance = exports.hasContent = exports.waitForContent = void 0;
const async_wait_until_1 = require("async-wait-until");
const waitForContent = (client, path, waitTime = 5000) => (0, async_wait_until_1.default)(() => (0, exports.hasContent)(client, path), { timeout: waitTime });
exports.waitForContent = waitForContent;
const hasContent = (client, cid) => client.queryClient.storage.HasContent({ cid })
    .then(x => x.hasContent);
exports.hasContent = hasContent;
const getAccountBalance = (client, address) => client.queryClient.bank.Balance({ address: address, denom: "ubnt" })
    .then(res => { var _a; return Number((_a = res.balance) === null || _a === void 0 ? void 0 : _a.amount); });
exports.getAccountBalance = getAccountBalance;
const getTaxInfo = (client) => client.queryClient.tax.GetTaxInfo({});
exports.getTaxInfo = getTaxInfo;
//# sourceMappingURL=query.js.map