import {Left, Either} from "monet";
import { CID } from 'multiformats/cid'
import {identity} from "lodash";

export const ensureCidV0 = (cid: CID) =>
    cid.toV0().toString()

export const adaptCid = (value: string): string =>
    Either
        .fromTry(() => CID.parse(value))
        .catchMap(() => Left(value))
        .cata<string>(identity, ensureCidV0);

