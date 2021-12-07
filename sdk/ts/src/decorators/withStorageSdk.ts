import {BluzelleSdk} from "../sdk";

export const withStorageSdk = <T>(sdk: T) => ({
    ...sdk,
    pin: () => {
        (sdk as unknown as BluzelleSdk).client.
    }
})