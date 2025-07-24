import * as bip39 from "bip39";
import {Some} from "monet";


export const generateMnemonic = (wordNum: 24 | 12 = 24): string =>
    Some(wordNum)
        .map(getMnemonicBits)
        .map(strength => bip39.generateMnemonic(strength))
        .join();


const getMnemonicBits = (wordNum: 12 | 24): number => wordNum === 12 ? 128 : 256;