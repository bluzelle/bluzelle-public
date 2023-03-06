export declare const protobufPackage = "bluzelle.curium.curium";
/** Msg defines the Msg service. */
export interface Msg {
}
export declare class MsgClientImpl implements Msg {
    private readonly rpc;
    constructor(rpc: Rpc);
}
interface Rpc {
    request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
export {};
//# sourceMappingURL=tx.d.ts.map