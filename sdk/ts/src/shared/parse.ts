import {Some} from "monet";
import {padStart} from "lodash";

export const parseDecTypeToNumber = (dec: string): number =>
    Some(padStart(dec, 18, '0'))
        .map(dec => `${dec.slice(0, dec.length - 18)}.${dec.slice(-18)}`)
        .map(Number)
        .join();