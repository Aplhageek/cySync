export interface INewWallet {
  name: string;
  mnemonic: string;
}

export interface IWalletResponse {
  name: string;
  token: string;
  addresses: string[];
}

export interface IWallet extends INewWallet, IWalletResponse {}
