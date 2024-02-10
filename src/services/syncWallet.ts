import {
  IBalanceSyncItem,
  IHistorySyncItem,
  IWalletBalance,
  IWalletHistory,
} from "../models/sync";
import ApiConstants from "../utils/apiConstants";
import axiosInstance from "./axiosInstance";

export const fetchWalletBalanceDetails = (payload: IBalanceSyncItem) => {
  return axiosInstance.get<unknown, IWalletBalance>(
    ApiConstants.API_URLS.SYNC.BALANCE(payload.address)
  );
};

export const fetchWalletFullHistory = (
  payload: IHistorySyncItem,
  limit = 10
) => {
  return axiosInstance.get<unknown, IWalletHistory>(
    ApiConstants.API_URLS.SYNC.TRANSACTIONS(payload.address),
    {
      params: {
        limit,
      },
    }
  );
};
