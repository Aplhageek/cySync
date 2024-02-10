import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IWalletResponse } from "../../models/transaction";
import {
  INewWalletPayload,
  IWalletAddressRemovePayload,
} from "../../models/wallet";
import {
  addAddressToWallet,
  createWallet,
  deleteAddressFromWallet,
  fetchWalletByName,
  fetchWalletList,
} from "../../services/wallet";
import {
  IBalanceSyncItem,
  IHistorySyncItem,
  IWalletBalance,
  IWalletHistory,
} from "../../models/sync";
import {
  fetchWalletBalanceDetails,
  fetchWalletFullHistory,
} from "../../services/syncWallet";

const WALLET_LIST_INITIAL_STATE = {
  walletList: [] as IWalletResponse[],
  walletShortDetailByAddress: {} as { [address: string]: IWalletBalance },
  walletDetailByAddress: {} as { [address: string]: IWalletHistory },
};

export const fetchWalletListAction = createAsyncThunk(
  "wallets/fetchWalletListAction",
  async () => {
    const walletList = await fetchWalletList();
    const walletByNamePromiseList: Promise<IWalletResponse>[] = [];
    (walletList?.wallet_names || []).forEach((walletName) => {
      walletByNamePromiseList.push(fetchWalletByName(walletName));
    });

    const allWalletResponse = await Promise.all(walletByNamePromiseList);
    return allWalletResponse;
  }
);

export const createWalletAction = createAsyncThunk(
  "wallets/createWalletAction",
  async (_data: INewWalletPayload) => {
    const newWallet = await createWallet(_data);
    return newWallet;
  }
);

export const addNewAddressToWalletAction = createAsyncThunk(
  "wallets/addNewAddressToWalletAction",
  async (_data: INewWalletPayload) => {
    const newWallet = await addAddressToWallet(_data);
    return newWallet;
  }
);

export const fetchWalletBalanceDetailsAction = createAsyncThunk(
  "wallets/fetchWalletBalanceDetailsAction",
  async (_data: IBalanceSyncItem) => {
    const walletBalanceDetails = await fetchWalletBalanceDetails(_data);
    return walletBalanceDetails;
  }
);

export const fetchWalletTransactionHistoryAction = createAsyncThunk(
  "wallets/fetchWalletTransactionHistoryAction",
  async (_data: IHistorySyncItem) => {
    const walletHistoryDetails = await fetchWalletFullHistory(_data);
    return walletHistoryDetails;
  }
);

export const removeAddressFromWalletAction = createAsyncThunk(
  "wallets/",
  async (_data: IWalletAddressRemovePayload) => {
    const walletResponse = await deleteAddressFromWallet(_data);
    return walletResponse;
  }
);

export const walletSlice = createSlice({
  name: "wallets",
  initialState: WALLET_LIST_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWalletAction.fulfilled, (state, action) => {
      state.walletList = state.walletList || [];
      state.walletList.push(action.payload);
    });
    builder.addCase(addNewAddressToWalletAction.fulfilled, (state, action) => {
      state.walletList = state.walletList || [];
      const existingWalletIndex = state.walletList.findIndex(
        (wallet) => wallet.name === action.payload.name
      );
      if (existingWalletIndex !== -1) {
        state.walletList[existingWalletIndex] = action.payload;
      } else {
        state.walletList.push(action.payload);
      }
    });
    builder.addCase(
      removeAddressFromWalletAction.fulfilled,
      (state, action) => {
        state.walletList = state.walletList || [];
        const existingWalletIndex = state.walletList.findIndex(
          (wallet) => wallet.name === action.payload.name
        );
        if (existingWalletIndex !== -1) {
          state.walletList[existingWalletIndex] = action.payload;
        } else {
          state.walletList.push(action.payload);
        }
      }
    );
    builder.addCase(
      fetchWalletBalanceDetailsAction.fulfilled,
      (state, action) => {
        state.walletShortDetailByAddress =
          state.walletShortDetailByAddress || {};
        state.walletShortDetailByAddress[action.meta.arg.address] =
          action.payload;
      }
    );
    builder.addCase(
      fetchWalletTransactionHistoryAction.fulfilled,
      (state, action) => {
        state.walletDetailByAddress = state.walletDetailByAddress || {};
        state.walletDetailByAddress[action.meta.arg.address] = action.payload;
      }
    );
  },
});
