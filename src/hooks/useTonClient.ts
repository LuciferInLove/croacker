import { TonClient } from 'ton';
import { useAsyncInitialize } from './useAsyncInitialize';

const mainnetApiKey = import.meta.env.VITE_APP_API_KEY_MAINNET
const mainnetApiUrl = 'https://toncenter.com/api/v2/jsonRPC'

const testnetApiKey = import.meta.env.VITE_APP_API_KEY_TESTNET
const testnetApiURL = 'https://testnet.toncenter.com/api/v2/jsonRPC'

export function useTonClient(network: string) {
  return useAsyncInitialize(
    async () =>
      new TonClient({
        endpoint: network === "testnet" ? testnetApiURL : mainnetApiUrl,
        apiKey: network === "testnet" ? testnetApiKey : mainnetApiKey,
      })
  );
}
