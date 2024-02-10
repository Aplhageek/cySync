import {
  INewAddressPayload,
  INewWalletPayload,
  IWalletAddressRemovePayload,
  IWalletListResponse,
} from "../models/wallet";
import ApiConstants from "../utils/apiConstants";
import axiosInstance from "./axiosInstance";
import { IWalletResponse } from "../models/transaction";

export const fetchWalletList = () => {
  return axiosInstance.get<unknown, IWalletListResponse>(
    ApiConstants.API_URLS.WALLET.LIST
  );
};

export const fetchWalletByName = (name: string) => {
  return axiosInstance.get<unknown, IWalletResponse>(
    ApiConstants.API_URLS.WALLET.GET_BY_NAME(name)
  );
};

export const fetchWalletByAddress = (address: string) => {
  return axiosInstance.get<unknown, IWalletResponse>(
    ApiConstants.API_URLS.WALLET.GET_BY_ADDRESS(address)
  );
};

export const createWallet = (payload: INewWalletPayload) => {
  return axiosInstance.post<unknown, IWalletResponse, INewWalletPayload>(
    ApiConstants.API_URLS.WALLET.CREATE,
    payload
  );
};

export const addAddressToWallet = (payload: INewWalletPayload) => {
  return axiosInstance.post<unknown, IWalletResponse, INewAddressPayload>(
    ApiConstants.API_URLS.WALLET.ADD_ADDRESS(payload.name),
    { addresses: payload.addresses }
  );
};

export const deleteAddressFromWallet = (
  payload: IWalletAddressRemovePayload
) => {
  return axiosInstance.delete<unknown, IWalletResponse>(
    ApiConstants.API_URLS.WALLET.DELETE_ADDRESS(payload)
  );
};
