import { IRow } from "../models/grid";
import {
  IWalletBalance,
  IWalletHistory,
  IWalletTransaction,
} from "../models/sync";

export const parseWalletDisplayDataFromResponse = (
  walletName: string,
  walletResponse: IWalletBalance
): IRow => {
  return {
    walletName: walletName,
    holding: walletResponse.final_balance,
  };
};

export const parseWalletTransactionDisplayDataFromResponse = (
  walletName: string,
  walletResponse: IWalletHistory,
  transaction: IWalletTransaction
): IRow => {
  return {
    date: new Date(transaction.confirmed),
    wallet: walletName,
    amount: transaction.total,
    result: transaction.received ? "RECEIVED" : "PENDING",
    status: transaction.received
      ? transaction.confirmed
        ? "SUCCESS"
        : "CONFIRMATION PENDING"
      : "PENDING",
    walletName: walletName,
    holding: walletResponse.final_balance,
  };
};
