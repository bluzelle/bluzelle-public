/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "bluzelle.curium.tax";

export interface QueryGetTaxInfoRequest {}

export interface QueryGetTaxInfoResponse {
  gasTaxBp: number;
  transferTaxBp: number;
  taxCollector: string;
}

const baseQueryGetTaxInfoRequest: object = {};

export const QueryGetTaxInfoRequest = {
  encode(_: QueryGetTaxInfoRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetTaxInfoRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTaxInfoRequest } as QueryGetTaxInfoRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryGetTaxInfoRequest {
    const message = { ...baseQueryGetTaxInfoRequest } as QueryGetTaxInfoRequest;
    return message;
  },

  toJSON(_: QueryGetTaxInfoRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<QueryGetTaxInfoRequest>): QueryGetTaxInfoRequest {
    const message = { ...baseQueryGetTaxInfoRequest } as QueryGetTaxInfoRequest;
    return message;
  },
};

const baseQueryGetTaxInfoResponse: object = {
  gasTaxBp: 0,
  transferTaxBp: 0,
  taxCollector: "",
};

export const QueryGetTaxInfoResponse = {
  encode(
    message: QueryGetTaxInfoResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.gasTaxBp !== 0) {
      writer.uint32(8).int64(message.gasTaxBp);
    }
    if (message.transferTaxBp !== 0) {
      writer.uint32(16).int64(message.transferTaxBp);
    }
    if (message.taxCollector !== "") {
      writer.uint32(26).string(message.taxCollector);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetTaxInfoResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryGetTaxInfoResponse,
    } as QueryGetTaxInfoResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.gasTaxBp = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.transferTaxBp = longToNumber(reader.int64() as Long);
          break;
        case 3:
          message.taxCollector = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTaxInfoResponse {
    const message = {
      ...baseQueryGetTaxInfoResponse,
    } as QueryGetTaxInfoResponse;
    if (object.gasTaxBp !== undefined && object.gasTaxBp !== null) {
      message.gasTaxBp = Number(object.gasTaxBp);
    } else {
      message.gasTaxBp = 0;
    }
    if (object.transferTaxBp !== undefined && object.transferTaxBp !== null) {
      message.transferTaxBp = Number(object.transferTaxBp);
    } else {
      message.transferTaxBp = 0;
    }
    if (object.taxCollector !== undefined && object.taxCollector !== null) {
      message.taxCollector = String(object.taxCollector);
    } else {
      message.taxCollector = "";
    }
    return message;
  },

  toJSON(message: QueryGetTaxInfoResponse): unknown {
    const obj: any = {};
    message.gasTaxBp !== undefined && (obj.gasTaxBp = message.gasTaxBp);
    message.transferTaxBp !== undefined &&
      (obj.transferTaxBp = message.transferTaxBp);
    message.taxCollector !== undefined &&
      (obj.taxCollector = message.taxCollector);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetTaxInfoResponse>
  ): QueryGetTaxInfoResponse {
    const message = {
      ...baseQueryGetTaxInfoResponse,
    } as QueryGetTaxInfoResponse;
    if (object.gasTaxBp !== undefined && object.gasTaxBp !== null) {
      message.gasTaxBp = object.gasTaxBp;
    } else {
      message.gasTaxBp = 0;
    }
    if (object.transferTaxBp !== undefined && object.transferTaxBp !== null) {
      message.transferTaxBp = object.transferTaxBp;
    } else {
      message.transferTaxBp = 0;
    }
    if (object.taxCollector !== undefined && object.taxCollector !== null) {
      message.taxCollector = object.taxCollector;
    } else {
      message.taxCollector = "";
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a list of GetTaxInfo items. */
  GetTaxInfo(request: QueryGetTaxInfoRequest): Promise<QueryGetTaxInfoResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  GetTaxInfo(
    request: QueryGetTaxInfoRequest
  ): Promise<QueryGetTaxInfoResponse> {
    const data = QueryGetTaxInfoRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.tax.Query",
      "GetTaxInfo",
      data
    );
    return promise.then((data) =>
      QueryGetTaxInfoResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
