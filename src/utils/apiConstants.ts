import { IWalletAddressRemovePayload } from "../models/wallet";

class ApiConstants {
  static API_TOKEN = import.meta.env.VITE_API_TOKEN;
  static BASE_URL = import.meta.env.VITE_BASE_API_URL;

  static API_URLS = {
    WALLET: {
      LIST: "/wallets",
      GET_BY_NAME: (name: string) => `/wallets/${name}`,
      GET_BY_ADDRESS: (address: string) => `/addrs/${address}`,
      CREATE: "/wallets",
      ADD_ADDRESS: (name: string) => `/wallets/${name}/addresses`,
      DELETE_ADDRESS: (payload: IWalletAddressRemovePayload) =>
        `/wallets/${payload.name}/addresses?address=${payload.address}`,
    },
    SYNC: {
      BALANCE: (address: string) => `/addrs/${address}/balance`,
      TRANSACTIONS: (address: string) => `/addrs/${address}/full`,
    },
  };
}

export default ApiConstants;
