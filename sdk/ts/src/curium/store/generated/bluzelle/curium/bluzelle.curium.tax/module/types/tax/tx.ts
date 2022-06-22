/* eslint-disable */
import { Reader, util, configure, Writer } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "bluzelle.curium.tax";

export interface MsgSetGasTaxBp {
  creator: string;
  bp: number;
}

export interface MsgSetGasTaxBpResponse {}

export interface MsgSetTransferTaxBp {
  creator: string;
  bp: number;
}

export interface MsgSetTransferTaxBpResponse {}

export interface MsgSetTaxCollector {
  creator: string;
  taxCollector: string;
}

export interface MsgSetTaxCollectorResponse {}

const baseMsgSetGasTaxBp: object = { creator: "", bp: 0 };

export const MsgSetGasTaxBp = {
  encode(message: MsgSetGasTaxBp, writer: Writer = Writer.create()): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bp !== 0) {
      writer.uint32(16).int64(message.bp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetGasTaxBp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetGasTaxBp } as MsgSetGasTaxBp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bp = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetGasTaxBp {
    const message = { ...baseMsgSetGasTaxBp } as MsgSetGasTaxBp;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.bp !== undefined && object.bp !== null) {
      message.bp = Number(object.bp);
    } else {
      message.bp = 0;
    }
    return message;
  },

  toJSON(message: MsgSetGasTaxBp): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bp !== undefined && (obj.bp = message.bp);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetGasTaxBp>): MsgSetGasTaxBp {
    const message = { ...baseMsgSetGasTaxBp } as MsgSetGasTaxBp;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.bp !== undefined && object.bp !== null) {
      message.bp = object.bp;
    } else {
      message.bp = 0;
    }
    return message;
  },
};

const baseMsgSetGasTaxBpResponse: object = {};

export const MsgSetGasTaxBpResponse = {
  encode(_: MsgSetGasTaxBpResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetGasTaxBpResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetGasTaxBpResponse } as MsgSetGasTaxBpResponse;
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

  fromJSON(_: any): MsgSetGasTaxBpResponse {
    const message = { ...baseMsgSetGasTaxBpResponse } as MsgSetGasTaxBpResponse;
    return message;
  },

  toJSON(_: MsgSetGasTaxBpResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgSetGasTaxBpResponse>): MsgSetGasTaxBpResponse {
    const message = { ...baseMsgSetGasTaxBpResponse } as MsgSetGasTaxBpResponse;
    return message;
  },
};

const baseMsgSetTransferTaxBp: object = { creator: "", bp: 0 };

export const MsgSetTransferTaxBp = {
  encode(
    message: MsgSetTransferTaxBp,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.bp !== 0) {
      writer.uint32(16).int64(message.bp);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetTransferTaxBp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetTransferTaxBp } as MsgSetTransferTaxBp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bp = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetTransferTaxBp {
    const message = { ...baseMsgSetTransferTaxBp } as MsgSetTransferTaxBp;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.bp !== undefined && object.bp !== null) {
      message.bp = Number(object.bp);
    } else {
      message.bp = 0;
    }
    return message;
  },

  toJSON(message: MsgSetTransferTaxBp): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bp !== undefined && (obj.bp = message.bp);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetTransferTaxBp>): MsgSetTransferTaxBp {
    const message = { ...baseMsgSetTransferTaxBp } as MsgSetTransferTaxBp;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.bp !== undefined && object.bp !== null) {
      message.bp = object.bp;
    } else {
      message.bp = 0;
    }
    return message;
  },
};

const baseMsgSetTransferTaxBpResponse: object = {};

export const MsgSetTransferTaxBpResponse = {
  encode(
    _: MsgSetTransferTaxBpResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetTransferTaxBpResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetTransferTaxBpResponse,
    } as MsgSetTransferTaxBpResponse;
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

  fromJSON(_: any): MsgSetTransferTaxBpResponse {
    const message = {
      ...baseMsgSetTransferTaxBpResponse,
    } as MsgSetTransferTaxBpResponse;
    return message;
  },

  toJSON(_: MsgSetTransferTaxBpResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSetTransferTaxBpResponse>
  ): MsgSetTransferTaxBpResponse {
    const message = {
      ...baseMsgSetTransferTaxBpResponse,
    } as MsgSetTransferTaxBpResponse;
    return message;
  },
};

const baseMsgSetTaxCollector: object = { creator: "", taxCollector: "" };

export const MsgSetTaxCollector = {
  encode(
    message: MsgSetTaxCollector,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.taxCollector !== "") {
      writer.uint32(18).string(message.taxCollector);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgSetTaxCollector {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSetTaxCollector } as MsgSetTaxCollector;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.taxCollector = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetTaxCollector {
    const message = { ...baseMsgSetTaxCollector } as MsgSetTaxCollector;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = String(object.creator);
    } else {
      message.creator = "";
    }
    if (object.taxCollector !== undefined && object.taxCollector !== null) {
      message.taxCollector = String(object.taxCollector);
    } else {
      message.taxCollector = "";
    }
    return message;
  },

  toJSON(message: MsgSetTaxCollector): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.taxCollector !== undefined &&
      (obj.taxCollector = message.taxCollector);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSetTaxCollector>): MsgSetTaxCollector {
    const message = { ...baseMsgSetTaxCollector } as MsgSetTaxCollector;
    if (object.creator !== undefined && object.creator !== null) {
      message.creator = object.creator;
    } else {
      message.creator = "";
    }
    if (object.taxCollector !== undefined && object.taxCollector !== null) {
      message.taxCollector = object.taxCollector;
    } else {
      message.taxCollector = "";
    }
    return message;
  },
};

const baseMsgSetTaxCollectorResponse: object = {};

export const MsgSetTaxCollectorResponse = {
  encode(
    _: MsgSetTaxCollectorResponse,
    writer: Writer = Writer.create()
  ): Writer {
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): MsgSetTaxCollectorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgSetTaxCollectorResponse,
    } as MsgSetTaxCollectorResponse;
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

  fromJSON(_: any): MsgSetTaxCollectorResponse {
    const message = {
      ...baseMsgSetTaxCollectorResponse,
    } as MsgSetTaxCollectorResponse;
    return message;
  },

  toJSON(_: MsgSetTaxCollectorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgSetTaxCollectorResponse>
  ): MsgSetTaxCollectorResponse {
    const message = {
      ...baseMsgSetTaxCollectorResponse,
    } as MsgSetTaxCollectorResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  SetGasTaxBp(request: MsgSetGasTaxBp): Promise<MsgSetGasTaxBpResponse>;
  SetTransferTaxBp(
    request: MsgSetTransferTaxBp
  ): Promise<MsgSetTransferTaxBpResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  SetTaxCollector(
    request: MsgSetTaxCollector
  ): Promise<MsgSetTaxCollectorResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  SetGasTaxBp(request: MsgSetGasTaxBp): Promise<MsgSetGasTaxBpResponse> {
    const data = MsgSetGasTaxBp.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.tax.Msg",
      "SetGasTaxBp",
      data
    );
    return promise.then((data) =>
      MsgSetGasTaxBpResponse.decode(new Reader(data))
    );
  }

  SetTransferTaxBp(
    request: MsgSetTransferTaxBp
  ): Promise<MsgSetTransferTaxBpResponse> {
    const data = MsgSetTransferTaxBp.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.tax.Msg",
      "SetTransferTaxBp",
      data
    );
    return promise.then((data) =>
      MsgSetTransferTaxBpResponse.decode(new Reader(data))
    );
  }

  SetTaxCollector(
    request: MsgSetTaxCollector
  ): Promise<MsgSetTaxCollectorResponse> {
    const data = MsgSetTaxCollector.encode(request).finish();
    const promise = this.rpc.request(
      "bluzelle.curium.tax.Msg",
      "SetTaxCollector",
      data
    );
    return promise.then((data) =>
      MsgSetTaxCollectorResponse.decode(new Reader(data))
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
