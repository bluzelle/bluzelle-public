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

export const multiSend = (client: BluzelleClient,
  params: MultiSendParam[],
  options: BroadcastOptions
) =>
  Promise.resolve(params)
    .then(params => ({
        inputs: params.map(param => ({
          address: client.address,
          coins: param.coins
        })),
        outputs: params.map(param => ({
          address: param.outputAddress,
          coins: param.coins
        }))
      })
    )
    .then(({
        inputs,
        outputs
      }) =>
        sendTx(client, '/cosmos.bank.v1beta1.MsgMultiSend', {
          inputs,
          outputs
        } as MsgMultiSend, options)
    );