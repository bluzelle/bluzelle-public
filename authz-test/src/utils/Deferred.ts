import {Some} from "monet";
import {passThrough} from "promise-passthrough";

export interface Deferred<T> {
    resolve: (v: T | PromiseLike<T>) => void
    reject: <E>(e: E | PromiseLike<E>) => void
    promise: Promise<T>
}

export const newDeferred = <T>(): Deferred<T> =>
    Some<Deferred<T>>({} as Deferred<T>)
        .map(passThrough(d => d.promise = new Promise((resolve, reject) => {
            d.resolve = resolve
            d.reject = reject
        })))
        .join();

