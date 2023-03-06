"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNftByOwner = exports.getNftMetadata = exports.getCollectionInfo = exports.getNftInfo = exports.parseDecTypeToNumber = exports.getDelegationTotalRewards = exports.getDelegationRewards = exports.getValidatorsInfo = exports.getDelegatorUnbondingDelegations = exports.getDelegation = exports.getDelegatorDelegations = exports.getTaxInfo = exports.getAccountBalance = exports.hasContent = exports.waitForContent = exports.getTx = void 0;
const async_wait_until_1 = __importDefault(require("async-wait-until"));
const Long = require("long");
const lodash_1 = require("lodash");
const monet_1 = require("monet");
const defaultPaginationOptions = () => ({
    key: new Uint8Array(),
    offset: 0,
    limit: 10,
    countTotal: true,
    reverse: false,
});
const defaultPaginationResponse = () => ({ nextKey: new Uint8Array(), total: Long.fromValue(0) });
const getTx = (client, hash) => client.queryClient.tx.GetTx({ hash });
exports.getTx = getTx;
const waitForContent = (client, path, waitTime = 5000) => (0, async_wait_until_1.default)(() => (0, exports.hasContent)(client, path), { timeout: waitTime });
exports.waitForContent = waitForContent;
const hasContent = (client, cid) => client.queryClient.storage.HasContent({ cid })
    .then(x => x.hasContent);
exports.hasContent = hasContent;
const getAccountBalance = (client, address, denom = "ubnt") => client.queryClient.bank.Balance({ address: address, denom })
    .then(res => { var _a; return Number((_a = res.balance) === null || _a === void 0 ? void 0 : _a.amount); });
exports.getAccountBalance = getAccountBalance;
const getTaxInfo = (client) => client.queryClient.tax.GetTaxInfo({});
exports.getTaxInfo = getTaxInfo;
const getDelegatorDelegations = (client, delegatorAddress, options = defaultPaginationOptions()) => client.queryClient.staking.DelegatorDelegations({
    delegatorAddr: delegatorAddress,
    pagination: {
        key: options.key,
        offset: new Long(options.offset),
        limit: new Long(options.limit),
        countTotal: options.countTotal,
        reverse: options.reverse
    }
})
    .then(parseQueryDelegatorDelegationsResponse);
exports.getDelegatorDelegations = getDelegatorDelegations;
const getDelegation = (client, delegatorAddress, validatorAddress) => client.queryClient.staking.Delegation({
    delegatorAddr: delegatorAddress,
    validatorAddr: validatorAddress
})
    .then(res => res.delegationResponse ? parseDelegationResponse(res.delegationResponse) : {
    delegation: {
        validatorAddress,
        delegatorAddress,
        shares: 0
    },
    balance: {
        denom: 'ubnt',
        amount: 0
    }
});
exports.getDelegation = getDelegation;
const getDelegatorUnbondingDelegations = (client, delegatorAddress, options = defaultPaginationOptions()) => client.queryClient.staking.DelegatorUnbondingDelegations({
    delegatorAddr: delegatorAddress,
    pagination: {
        key: options.key,
        offset: new Long(options.offset),
        limit: new Long(options.limit),
        countTotal: options.countTotal,
        reverse: options.reverse
    }
})
    .then(parseQueryDelegatorUnbondingDelegationsResponse);
exports.getDelegatorUnbondingDelegations = getDelegatorUnbondingDelegations;
const getValidatorsInfo = (client, status = 'BOND_STATUS_BONDED', options = defaultPaginationOptions()) => client.queryClient.staking.Validators({
    status,
    pagination: {
        key: options.key,
        offset: new Long(options.offset),
        limit: new Long(options.limit),
        countTotal: options.countTotal,
        reverse: options.reverse
    }
})
    .then(parseQueryValidatorsResponse);
exports.getValidatorsInfo = getValidatorsInfo;
const getDelegationRewards = (client, delegatorAddress, validatorAddress) => client.queryClient.distribution.DelegationRewards({
    delegatorAddress,
    validatorAddress
})
    .then(res => res.rewards ? res.rewards.map(parseLongCoin) : []);
exports.getDelegationRewards = getDelegationRewards;
const getDelegationTotalRewards = (client, delegatorAddress) => client.queryClient.distribution.DelegationTotalRewards({
    delegatorAddress
})
    .then(parseQueryDelegationTotalRewardsResponse);
exports.getDelegationTotalRewards = getDelegationTotalRewards;
const parseQueryDelegationTotalRewardsResponse = (res) => Promise.all(res.rewards.map(parseDelegationDelegatorReward))
    .then(rewards => ({
    rewards,
    total: res.total.map(parseLongCoin)
}));
const parseDelegationDelegatorReward = (delegatorReward) => Promise.resolve(delegatorReward.reward.map(parseLongCoin))
    .then(reward => ({
    reward: reward,
    validatorAddress: delegatorReward.validatorAddress,
    totalReward: sumBluzelleCoins(reward)
}));
const sumBluzelleCoins = (coins) => coins.reduce((total, coin) => ({
    denom: "ubnt",
    amount: total.amount + coin.amount
}), { denom: 'ubnt', amount: 0 });
const parseQueryDelegatorDelegationsResponse = (res) => Promise.resolve(res.delegationResponses.map(parseDelegationResponse))
    .then(delegations => ({
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
    delegations,
}));
const parseDelegationResponse = (res) => ({
    delegation: res.delegation ? parseDelegation(res.delegation) : {
        validatorAddress: '',
        delegatorAddress: '',
        shares: 0
    },
    balance: res.balance ? parseCoin(res.balance) : { denom: 'ubnt', amount: 0 }
});
const parseDelegation = (delegation) => ({
    validatorAddress: delegation.validatorAddress,
    delegatorAddress: delegation.delegatorAddress,
    shares: (0, exports.parseDecTypeToNumber)(delegation.shares)
});
const parseCoin = (coin) => ({ denom: 'ubnt', amount: Number(coin.amount) });
const parseLongCoin = (coin) => ({ denom: 'ubnt', amount: (0, exports.parseDecTypeToNumber)(coin.amount) });
const parseQueryValidatorsResponse = (res) => ({
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
    validators: res.validators ? res.validators.map(parseValidator) : []
});
const parseValidator = (validator) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return ({
        operatorAddress: validator.operatorAddress,
        description: {
            moniker: ((_a = validator.description) === null || _a === void 0 ? void 0 : _a.moniker) || '',
            details: ((_b = validator.description) === null || _b === void 0 ? void 0 : _b.details) || '',
            website: ((_c = validator.description) === null || _c === void 0 ? void 0 : _c.website) || '',
            securityContact: ((_d = validator.description) === null || _d === void 0 ? void 0 : _d.securityContact) || '',
        },
        commission: {
            commissionRates: {
                rate: (0, exports.parseDecTypeToNumber)(((_f = (_e = validator.commission) === null || _e === void 0 ? void 0 : _e.commissionRates) === null || _f === void 0 ? void 0 : _f.rate) || '0'),
                maxRate: (0, exports.parseDecTypeToNumber)(((_h = (_g = validator.commission) === null || _g === void 0 ? void 0 : _g.commissionRates) === null || _h === void 0 ? void 0 : _h.maxRate) || '0'),
                maxChangeRate: (0, exports.parseDecTypeToNumber)(((_k = (_j = validator.commission) === null || _j === void 0 ? void 0 : _j.commissionRates) === null || _k === void 0 ? void 0 : _k.maxChangeRate) || '0'),
            },
            updateTime: ((_l = validator.commission) === null || _l === void 0 ? void 0 : _l.updateTime) || new Date(0)
        },
        minSelfDelegation: Number(validator.minSelfDelegation),
        delegatorShares: (0, exports.parseDecTypeToNumber)(validator.delegatorShares),
        jailed: validator.jailed
    });
};
const parseQueryDelegatorUnbondingDelegationsResponse = (res) => ({
    unbondingDelegations: res.unbondingResponses.map(parseUnbondingDelegation),
    pagination: res.pagination ? res.pagination : defaultPaginationResponse(),
});
const parseUnbondingDelegation = (res) => ({
    delegatorAddress: res.delegatorAddress,
    validatorAddress: res.validatorAddress,
    entries: res.entries.map(parseUnbondingDelegationEntry),
    totalBalance: getTotalUnbondingDelegationBalance(res.entries)
});
const getTotalUnbondingDelegationBalance = (entries) => entries.map(parseUnbondingDelegationEntry).reduce((total, entry) => total + entry.balance, 0);
const parseUnbondingDelegationEntry = (res) => ({
    creationHeight: Number(res.creationHeight),
    completionTime: res.completionTime || new Date(0),
    initialBalance: Number(res.initialBalance),
    balance: Number(res.balance)
});
const parseDecTypeToNumber = (dec) => (0, monet_1.Some)((0, lodash_1.padStart)(dec, 18, '0'))
    .map(dec => `${dec.slice(0, dec.length - 18)}.${dec.slice(-18)}`)
    .map(Number)
    .join();
exports.parseDecTypeToNumber = parseDecTypeToNumber;
const getNftInfo = (client, id) => client.queryClient.nft.NFTInfo({ id })
    .then(resp => ({
    nft: resp.nft && longToNumberNFT(resp.nft),
    metadata: resp.metadata && longToNumberMetadata(resp.metadata)
}));
exports.getNftInfo = getNftInfo;
const getCollectionInfo = (client, id) => client.queryClient.nft.Collection({ id: new Long(id) })
    .then(resp => (Object.assign(Object.assign({}, resp), { collection: resp.collection && longToNumberCollection(resp.collection), nfts: resp.nfts.map(longToNumberNFT) })));
exports.getCollectionInfo = getCollectionInfo;
const getNftMetadata = (client, id) => client.queryClient.nft.Metadata({ id: new Long(id) })
    .then(resp => ({
    metadata: resp.metadata && longToNumberMetadata(resp.metadata)
}));
exports.getNftMetadata = getNftMetadata;
const getNftByOwner = (client, owner) => client.queryClient.nft.NFTsByOwner({ owner })
    .then(resp => ({
    nfts: resp.nfts.map(longToNumberNFT),
    metadata: resp.metadata.map(longToNumberMetadata)
}));
exports.getNftByOwner = getNftByOwner;
const longToNumberNFT = (nft) => (Object.assign(Object.assign({}, nft), { collId: nft.collId.toNumber(), seq: nft.seq.toNumber(), metadataId: nft.metadataId.toNumber() }));
const longToNumberCollection = (collection) => {
    var _a;
    return (Object.assign(Object.assign({}, collection), { id: (_a = collection.id) === null || _a === void 0 ? void 0 : _a.toNumber() }));
};
const longToNumberMasterEdition = (masterEdition) => ({
    supply: masterEdition.supply.toNumber(),
    maxSupply: masterEdition.maxSupply.toNumber()
});
const longToNumberMetadata = (metadata) => (Object.assign(Object.assign({}, metadata), { id: metadata.id.toNumber(), masterEdition: metadata.masterEdition && longToNumberMasterEdition(metadata.masterEdition) }));
