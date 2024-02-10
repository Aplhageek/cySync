import { FunctionComponent, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  dequeueSyncOperation,
  enqueueSyncOperation,
  selectSyncQueue,
} from "../store/slices/syncSlice";
import { IWalletResponse } from "../models/transaction";
import { AppDispatch, Store } from "../store";
import { SYNC_TYPE } from "../utils/enum";
import { isEmpty } from "../utils/commonUtils";
import {
  fetchWalletBalanceDetailsAction,
  fetchWalletTransactionHistoryAction,
} from "../store/slices/walletSlice";
import { IBalanceSyncItem, IHistorySyncItem } from "../models/sync";
import { MAX_RETRY_COUNT, SYNC_DELAY_MS } from "../utils/constants";

export const pushSyncOperationsToQueue = (wallets: IWalletResponse[]) => {
  (wallets || []).forEach((wallet) => {
    (wallet.addresses || []).forEach((address) => {
      const syncItem = {
        walletName: wallet.name,
        address: address,
      };

      Store.dispatch(
        enqueueSyncOperation({
          ...syncItem,
          type: SYNC_TYPE.BALANCE,
        })
      );
      Store.dispatch(
        enqueueSyncOperation({
          ...syncItem,
          type: SYNC_TYPE.TRANSACTION_HISTORY,
        })
      );
    });
  });
};

const useSyncManager: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const syncQueue = useSelector(selectSyncQueue);
  const executingSyncOperation = useRef(false);

  const executeSyncOperation = useCallback(
    async (syncItem: IBalanceSyncItem | IHistorySyncItem, retryCount = 0) => {
      try {
        executingSyncOperation.current = true;

        if (syncItem.type === SYNC_TYPE.BALANCE) {
          await dispatch(fetchWalletBalanceDetailsAction(syncItem));
        } else {
          await dispatch(fetchWalletTransactionHistoryAction(syncItem));
        }
      } catch (err) {
        if (retryCount <= MAX_RETRY_COUNT) {
          return executeSyncOperation(syncItem, retryCount + 1);
        }
        console.error(err);
      }

      /** Executing operations after 0.2s */
      return new Promise((resolve) =>
        setTimeout(() => {
          dispatch(dequeueSyncOperation());
          executingSyncOperation.current = false;
          resolve("");
        }, SYNC_DELAY_MS)
      );
    },
    [dispatch]
  );

  useEffect(() => {
    if (executingSyncOperation.current || isEmpty(syncQueue)) return;

    const syncItem = syncQueue[0];
    executeSyncOperation(syncItem);
  }, [syncQueue, executeSyncOperation]);

  return [];
};

export default useSyncManager;
