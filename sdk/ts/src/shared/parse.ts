import { Some } from 'monet';
import { padStart } from 'lodash';
import { BluzelleCoin } from './types';
import { Coin } from '@cosmjs/proto-signing';

const Long = require('long');

export const parseDecTypeToNumber = (dec: string): number =>
    Some(padStart(dec, 18, '0'))
        .map(dec => `${dec.slice(0, dec.length - 18)}.${dec.slice(-18)}`)
        .map(Number)
        .join();

export const sumBluzelleCoins = (coins: BluzelleCoin[]): BluzelleCoin =>
  coins.reduce((total, coin) => ({
    denom: 'ubnt',
    amount: total.amount + coin.amount
  }), {
    denom: 'ubnt',
    amount: 0
  });

export const parseLongCoin = (coin: Coin): BluzelleCoin => ({
  denom: ['ubnt', 'ug4', 'uelt'].includes(coin.denom) ? coin.denom as 'ubnt' | 'ug4' | 'uelt' : 'ubnt',
  amount: parseDecTypeToNumber(coin.amount)
});


export const parseNumToLong = (num: number): Long => new Long.fromNumber(num);

export const parseStringToLong = (val: string): Long => new Long.fromString(val);


export type ParseFn = ((params: object) => unknown)


export const deepParseLong = (obj: object, paths: string[]): object => {
  const setAtPath = (object: Record<string, unknown>, pathParts: string[]): void => {
    pathParts.reduce((acc: Record<string, unknown>, part, idx, arr) => {
      if (idx === arr.length - 1) {
        if (typeof acc[part] === "string" || typeof acc[part] === "number") {
          acc[part] = parseNumToLong(Number(acc[part]));
        }
      } else {
        acc[part] = acc[part] || {};
      }
      return acc[part] as Record<string, unknown>;
    }, object);
  }

  paths.forEach(path => setAtPath(obj as Record<string, unknown>, path.split('.')));

  return obj;
};


export const scaleTo18 = (num: number) => (num * 1e18).toString();