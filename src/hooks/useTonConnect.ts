import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { TonConnectUI } from '@tonconnect/ui';
import { Address, Sender, SenderArguments } from 'ton-core';

export function useTonConnect(): { sender: Sender; tonConnectUI: TonConnectUI } {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet()

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
      address: wallet?.account.address ? Address.parse(wallet.account.address as string) : undefined,
    },
    tonConnectUI: tonConnectUI,
  };
}
