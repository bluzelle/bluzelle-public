import * as bip39 from "bip39";
import {Some} from "monet";


export const generateMnemonic = (wordNum: 12 | 24 = 12): string =>
    Some(wordNum)
        .map(getMnemonicBits)
        .map(entropy => bip39.generateMnemonic(entropy))
        .join();


const getMnemonicBits = (wordNum: 12 | 24): number => wordNum === 12 ? 128 : 256;