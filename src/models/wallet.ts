export interface INewWalletPayload {
  name: string;
  addresses: string[];
}

export interface INewAddressPayload {
  addresses: string[];
}

export interface IWalletListResponse {
  wallet_names: string[];
}

export interface IWalletAddressRemovePayload {
  name: string;
  address: string;
}
