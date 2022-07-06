/* eslint-disable */
import * as Long from "long";
import { util, configure, Writer, Reader } from "protobufjs/minimal";

export const protobufPackage = "bluzelle.curium.tax";

/** GenesisState defines the tax module's genesis state. */
export interface GenesisState {
  gasTaxBp: number;
  transferTaxBp: number;
  taxCollector: string;
}

const baseGenesisState: object = {
  gasTaxBp: 0,
  transferTaxBp: 0,
  taxCollector: "",
};

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
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

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
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

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    message.gasTaxBp !== undefined && (obj.gasTaxBp = message.gasTaxBp);
    message.transferTaxBp !== undefined &&
      (obj.transferTaxBp = message.transferTaxBp);
    message.taxCollector !== undefined &&
      (obj.taxCollector = message.taxCollector);
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
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
