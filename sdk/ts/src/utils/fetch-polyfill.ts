// Polyfill for Node.js fetch to handle duplex requirement in Node.js 18.13+, 19.1+, and 20+
// This addresses the error: "TypeError: RequestInit: duplex option is required when sending a body"
// This is needed when using ipfs-http-client with newer Node.js versions.
// https://github.com/nodejs/node/issues/46221




let isPolyfillApplied = false;

export function applyFetchPolyfill(): void {
    if (isPolyfillApplied) {
        return;
    }

    if (typeof global !== 'undefined' && typeof window === 'undefined') {
        // Patch global fetch
        if (global.fetch) {
            const originalFetch = global.fetch;
            global.fetch = function(input: any, init?: any) {
                if (init && init.body && typeof init.duplex === 'undefined') {
                    init.duplex = 'half';
                }
                return originalFetch.call(this, input, init);
            };
        }

        if (global.Request) {
            const OriginalRequest = global.Request;
            global.Request = class extends OriginalRequest {
                constructor(input: any, init?: any) {
                    if (init && init.body && typeof init.duplex === 'undefined') {
                        init.duplex = 'half';
                    }
                    super(input, init);
                }
            } as any;
        }

        isPolyfillApplied = true;
    }
}

applyFetchPolyfill(); 