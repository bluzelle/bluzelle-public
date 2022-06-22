/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.storage";

export interface QueryHasContentRequest {
  cid: string;
}

export interface QueryHasContentResponse {
  hasContent: boolean;
}

const baseQueryHasContentRequest: object = { cid: "" };

export const QueryHasContentRequest = {
  encode(
    message: QueryHasContentRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.cid !== "") {
      writer.uint32(10).string(message.cid);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryHasContentRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryHasContentRequest } as QueryHasContentRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cid = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryHasContentRequest {
    const message = { ...baseQueryHasContentRequest } as QueryHasContentRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = String(object.cid);
    } else {
      message.cid = "";
    }
    return message;
  },

  toJSON(message: QueryHasContentRequest): unknown {
    const obj: any = {};
    message.cid !== undefined && (obj.cid = message.cid);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryHasContentRequest>
  ): QueryHasContentRequest {
    const message = { ...baseQueryHasContentRequest } as QueryHasContentRequest;
    if (object.cid !== undefined && object.cid !== null) {
      message.cid = object.cid;
    } else {
      message.cid = "";
    }
    return message;
  },
};

const baseQueryHasContentResponse: object = { hasContent: false };

export const QueryHasContentResponse = {
  encode(
    message: QueryHasContentResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.hasContent === true) {
      writer.uint32(8).bool(message.hasContent);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryHasContentResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryHasContentResponse,
    } as QueryHasContentResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hasContent = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryHasContentResponse {
    const message = {
      ...baseQueryHasContentResponse,
    } as QueryHasContentResponse;
    if (object.hasContent !== undefined && object.hasContent !== null) {
      message.hasContent = Boolean(object.hasContent);
    } else {
      message.hasContent = false;
    }
    return message;
  },

  toJSON(message: QueryHasContentResponse): unknown {
    const obj: any = {};
    message.hasContent !== undefined && (obj.hasContent = message.hasContent);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryHasContentResponse>
  ): QueryHasContentResponse {
    const message = {
      ...baseQueryHasContentResponse,
    } as QueryHasContentResponse;
    if (object.hasContent !== undefined && object.hasContent !== null) {
      message.hasContent = object.hasContent;
    } else {
      message.hasContent = false;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  HasContent(request: QueryHasContentRequest): Promise<QueryHasContentResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  HasContent(
    request: QueryHasContentRequest
  ): Promise<QueryHasContentResponse> {
    const data = QueryHasContentRequest.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.storage.Query",
      "HasContent",
      data
    );
    return promise.then((data) =>
      QueryHasContentResponse.decode(new Reader(data))
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
