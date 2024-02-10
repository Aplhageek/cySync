import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SYNC_STATUS } from "../../utils/enum";
import { IBalanceSyncItem, IHistorySyncItem } from "../../models/sync";
import { RootState } from "..";

const SYNC_SLICE_INITIAL_STATE = {
  syncStatus: SYNC_STATUS.COMPLETED,
  syncQueue: [] as (IBalanceSyncItem | IHistorySyncItem)[],
};

export const syncSlice = createSlice({
  name: "sync",
  initialState: SYNC_SLICE_INITIAL_STATE,
  reducers: {
    enqueueSyncOperation: (
      state,
      action: PayloadAction<IBalanceSyncItem | IHistorySyncItem>
    ) => {
      state.syncQueue = state.syncQueue || [];
      state.syncQueue.push(action.payload);
      state.syncStatus = SYNC_STATUS.PENDING;
    },
    dequeueSyncOperation: (state) => {
      const updatedSyncQueue = [...(state.syncQueue || [])];
      updatedSyncQueue.shift();
      state.syncQueue = updatedSyncQueue;
      if (!updatedSyncQueue?.length) {
        state.syncStatus = SYNC_STATUS.COMPLETED;
      }
    },
  },
  extraReducers: () => {},
});

export const selectSyncQueue = (state: RootState) => state.sync.syncQueue;

export const { enqueueSyncOperation, dequeueSyncOperation } = syncSlice.actions;
