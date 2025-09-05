/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "tax";

export interface MsgSetGasTaxBp {
  creator: string;
  bp: Long;
}

export interface MsgSetGasTaxBpResponse {}

export interface MsgSetTransferTaxBp {
  creator: string;
  bp: Long;
}

export interface MsgSetTransferTaxBpResponse {}

export interface MsgSetTaxCollector {
  creator: string;
  taxCollector: string;
}

export interface MsgSetTaxCollectorResponse {}

function createBaseMsgSetGasTaxBp(): MsgSetGasTaxBp {
  return { creator: "", bp: Long.ZERO };
}

export const MsgSetGasTaxBp = {
  encode(
    message: MsgSetGasTaxBp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.bp.isZero()) {
      writer.uint32(16).int64(message.bp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetGasTaxBp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetGasTaxBp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bp = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetGasTaxBp {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bp: isSet(object.bp) ? Long.fromValue(object.bp) : Long.ZERO,
    };
  },

  toJSON(message: MsgSetGasTaxBp): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bp !== undefined && (obj.bp = (message.bp || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetGasTaxBp>, I>>(
    object: I
  ): MsgSetGasTaxBp {
    const message = createBaseMsgSetGasTaxBp();
    message.creator = object.creator ?? "";
    message.bp =
      object.bp !== undefined && object.bp !== null
        ? Long.fromValue(object.bp)
        : Long.ZERO;
    return message;
  },
};

function createBaseMsgSetGasTaxBpResponse(): MsgSetGasTaxBpResponse {
  return {};
}

export const MsgSetGasTaxBpResponse = {
  encode(
    _: MsgSetGasTaxBpResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetGasTaxBpResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetGasTaxBpResponse();
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
    return {};
  },

  toJSON(_: MsgSetGasTaxBpResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetGasTaxBpResponse>, I>>(
    _: I
  ): MsgSetGasTaxBpResponse {
    const message = createBaseMsgSetGasTaxBpResponse();
    return message;
  },
};

function createBaseMsgSetTransferTaxBp(): MsgSetTransferTaxBp {
  return { creator: "", bp: Long.ZERO };
}

export const MsgSetTransferTaxBp = {
  encode(
    message: MsgSetTransferTaxBp,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (!message.bp.isZero()) {
      writer.uint32(16).int64(message.bp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTransferTaxBp {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTransferTaxBp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.bp = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSetTransferTaxBp {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      bp: isSet(object.bp) ? Long.fromValue(object.bp) : Long.ZERO,
    };
  },

  toJSON(message: MsgSetTransferTaxBp): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.bp !== undefined && (obj.bp = (message.bp || Long.ZERO).toString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTransferTaxBp>, I>>(
    object: I
  ): MsgSetTransferTaxBp {
    const message = createBaseMsgSetTransferTaxBp();
    message.creator = object.creator ?? "";
    message.bp =
      object.bp !== undefined && object.bp !== null
        ? Long.fromValue(object.bp)
        : Long.ZERO;
    return message;
  },
};

function createBaseMsgSetTransferTaxBpResponse(): MsgSetTransferTaxBpResponse {
  return {};
}

export const MsgSetTransferTaxBpResponse = {
  encode(
    _: MsgSetTransferTaxBpResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetTransferTaxBpResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTransferTaxBpResponse();
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
    return {};
  },

  toJSON(_: MsgSetTransferTaxBpResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTransferTaxBpResponse>, I>>(
    _: I
  ): MsgSetTransferTaxBpResponse {
    const message = createBaseMsgSetTransferTaxBpResponse();
    return message;
  },
};

function createBaseMsgSetTaxCollector(): MsgSetTaxCollector {
  return { creator: "", taxCollector: "" };
}

export const MsgSetTaxCollector = {
  encode(
    message: MsgSetTaxCollector,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.taxCollector !== "") {
      writer.uint32(18).string(message.taxCollector);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetTaxCollector {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTaxCollector();
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
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      taxCollector: isSet(object.taxCollector)
        ? String(object.taxCollector)
        : "",
    };
  },

  toJSON(message: MsgSetTaxCollector): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.taxCollector !== undefined &&
      (obj.taxCollector = message.taxCollector);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTaxCollector>, I>>(
    object: I
  ): MsgSetTaxCollector {
    const message = createBaseMsgSetTaxCollector();
    message.creator = object.creator ?? "";
    message.taxCollector = object.taxCollector ?? "";
    return message;
  },
};

function createBaseMsgSetTaxCollectorResponse(): MsgSetTaxCollectorResponse {
  return {};
}

export const MsgSetTaxCollectorResponse = {
  encode(
    _: MsgSetTaxCollectorResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgSetTaxCollectorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetTaxCollectorResponse();
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
    return {};
  },

  toJSON(_: MsgSetTaxCollectorResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgSetTaxCollectorResponse>, I>>(
    _: I
  ): MsgSetTaxCollectorResponse {
    const message = createBaseMsgSetTaxCollectorResponse();
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
    this.SetGasTaxBp = this.SetGasTaxBp.bind(this);
    this.SetTransferTaxBp = this.SetTransferTaxBp.bind(this);
    this.SetTaxCollector = this.SetTaxCollector.bind(this);
  }
  SetGasTaxBp(request: MsgSetGasTaxBp): Promise<MsgSetGasTaxBpResponse> {
    const data = MsgSetGasTaxBp.encode(request).finish();
    const promise = this.rpc.request("tax.Msg", "SetGasTaxBp", data);
    return promise.then((data) =>
      MsgSetGasTaxBpResponse.decode(new _m0.Reader(data))
    );
  }

  SetTransferTaxBp(
    request: MsgSetTransferTaxBp
  ): Promise<MsgSetTransferTaxBpResponse> {
    const data = MsgSetTransferTaxBp.encode(request).finish();
    const promise = this.rpc.request("tax.Msg", "SetTransferTaxBp", data);
    return promise.then((data) =>
      MsgSetTransferTaxBpResponse.decode(new _m0.Reader(data))
    );
  }

  SetTaxCollector(
    request: MsgSetTaxCollector
  ): Promise<MsgSetTaxCollectorResponse> {
    const data = MsgSetTaxCollector.encode(request).finish();
    const promise = this.rpc.request("tax.Msg", "SetTaxCollector", data);
    return promise.then((data) =>
      MsgSetTaxCollectorResponse.decode(new _m0.Reader(data))
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

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<
        Exclude<keyof I, KeysOfUnion<P>>,
        never
      >;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
