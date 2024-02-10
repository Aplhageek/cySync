import { SYNC_TYPE } from "../utils/enum";

interface ISyncItem {
  walletName: string;
  address: string;
}

export interface IBalanceSyncItem extends ISyncItem {
  type: SYNC_TYPE.BALANCE;
}

export interface IHistorySyncItem extends ISyncItem {
  type: SYNC_TYPE.TRANSACTION_HISTORY;
}

export interface IWalletBalance {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
}

export interface IWalletTransaction {
  block_hash: string;
  block_height: number;
  hash: string;
  addresses: string[];
  total: number;
  fees: number;
  size: number;
  preference: string;
  relayed_by: string;
  confirmed: string;
  received: string;
  ver: number;
  lock_time: number;
  double_spend: boolean;
  vin_sz: number;
  vout_sz: number;
  confirmations: number;
  confidence: number;
  inputs: {
    prev_hash: string;
    output_index: number;
    script: string;
    output_value: number;
    sequence: number;
    addresses: string[];
    script_type: string;
  }[];
  outputs: {
    value: number;
    script: string;
    addresses: string[];
    script_type: string;
  }[];
}

export interface IWalletHistory {
  address: string;
  total_received: number;
  total_sent: number;
  balance: number;
  unconfirmed_balance: number;
  final_balance: number;
  n_tx: number;
  unconfirmed_n_tx: number;
  final_n_tx: number;
  txs: IWalletTransaction[];
}
