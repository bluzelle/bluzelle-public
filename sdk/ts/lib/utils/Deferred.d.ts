export interface Deferred<T> {
    resolve: (v: T | PromiseLike<T>) => void;
    reject: <E>(e: E | PromiseLike<E>) => void;
    promise: Promise<T>;
}
export declare const newDeferred: <T>() => Deferred<T>;
//# sourceMappingURL=Deferred.d.ts.map