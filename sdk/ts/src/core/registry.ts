import {Registry} from "@cosmjs/proto-signing";
import {Some} from "monet";
import {registerMessages} from "./tx";
import {memoize} from "lodash";

export const getRegistry = memoize(() =>
    Some(new Registry())
        .map(registerMessages)
        .join()
);

