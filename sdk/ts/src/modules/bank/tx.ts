import { BluzelleClient, BroadcastOptions, sendTx } from '../../core';
import { MsgMultiSend, MsgSend } from '../../curium/lib/generated/cosmos/bank/v1beta1/tx';
import { Coin } from '@cosmjs/proto-signing';

export type MultiSendParam = {
  outputAddress: string,
  coins: Coin[]
}

export const send = (client: BluzelleClient, toAddress: string, amount: number, options: BroadcastOptions, denom: string = 'ubnt') =>
  sendTx(client, '/cosmos.bank.v1beta1.MsgSend', {
    toAddress: toAddress,
    amount: [{
      denom,
      amount: amount.toString()
    }],
    fromAddress: client.address
  } as MsgSend, options);


export const multiSend = (
  client: BluzelleClient,
  params: MultiSendParam[],
  options: BroadcastOptions
) =>
  Promise.resolve(params)
    .then(params => ({
        inputs: [
          {
            address: client.address,
            coins: aggregateCoins(params)
          }
        ],
        outputs: params.map(param => ({
          address: param.outputAddress,
          coins: param.coins
        }))
    }))
    .then(({ inputs, outputs }) =>
      sendTx(client, '/cosmos.bank.v1beta1.MsgMultiSend', { inputs, outputs } as MsgMultiSend, options)
    );


const aggregateCoins = (params: MultiSendParam[]) =>
  params.reduce((acc, param) => {
    param.coins.forEach(coin => {
      const existing = acc.find(c => c.denom === coin.denom);
      if (existing) {
        acc = acc.map(c =>
          c.denom === coin.denom
            ? { ...c, amount: (parseInt(c.amount) + parseInt(coin.amount)).toString() }
            : c
        );
      } else {
        acc.push({ ...coin });
      }
    });
    return acc;
  }, [] as Coin[]);