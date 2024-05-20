import { TonClientV3 } from "ton-http-api";
import { useAsyncInitialize } from './useAsyncInitialize';

const mainnetApiKey = import.meta.env.VITE_APP_API_KEY_MAINNET
const mainnetApiUrl = 'https://toncenter.com/'

const testnetApiKey = import.meta.env.VITE_APP_API_KEY_TESTNET
const testnetApiURL = 'https://testnet.toncenter.com/'

export function useTonClient(network: string) {
  return useAsyncInitialize(
    async () =>
      new TonClientV3({
        endpoint: network === "testnet" ? testnetApiURL : mainnetApiUrl,
        apiKey: network === "testnet" ? testnetApiKey : mainnetApiKey,
      })
  );
}
