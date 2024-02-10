import { FunctionComponent, useEffect } from "react";
import { fetchWalletListAction } from "../store/slices/walletSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { pushSyncOperationsToQueue } from "./useSyncManager";
import { IWalletResponse } from "../models/transaction";

const useWalletListQuery: FunctionComponent = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(fetchWalletListAction()).then((res) => {
        const walletResponseList = res.payload as IWalletResponse[];
        pushSyncOperationsToQueue(walletResponseList);
      });
    } catch (err) {
      console.error("Error in fetching wallet list by account", err);
    }
  }, [dispatch]);

  return [];
};

export default useWalletListQuery;
