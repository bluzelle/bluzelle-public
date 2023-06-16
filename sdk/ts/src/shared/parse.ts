import { Some } from 'monet';
import { padStart } from 'lodash';
import { BluzelleCoin } from './types';
import { Coin } from '@cosmjs/proto-signing';

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
