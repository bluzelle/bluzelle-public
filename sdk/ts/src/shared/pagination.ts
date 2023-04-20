import {PageResponse} from "../curium/lib/generated/cosmos/base/query/v1beta1/pagination";

const Long = require("long");

export type BluzellePageRequest = {
    key: Uint8Array,
    offset: number,
    limit: number,
    countTotal: boolean,
    reverse: boolean,
}

export const defaultPaginationOptions = (): BluzellePageRequest => ({
    key: new Uint8Array(),
    offset: 0,
    limit: 10,
    countTotal: true,
    reverse: false,
});

export const defaultPaginationResponse = (): PageResponse => ({nextKey: new Uint8Array(), total: Long.fromValue(0)});