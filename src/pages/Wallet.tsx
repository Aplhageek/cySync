import { FunctionComponent, useEffect, useState } from "react";
import {
  StyledColumnContainer,
  StyledRowContainer,
} from "../components/base/StyledContainers";
import Label from "../components/base/Label";
import Button from "../components/base/Button";
import DataGrid from "../components/grid/DataGrid";
import Icon from "../components/base/Icon";
import ImportWalletPopup from "../components/importWallet/ImportWalletPopup";

import ic_import from "../assets/icons/ic_import.png";
import ic_delete from "../assets/icons/ic_delete.png";
import { DATA_GRID_TABLES, colors } from "../utils/constants";
import { CELL_TYPE } from "../utils/enum";
import { IRow } from "../models/grid";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { removeAddressFromWalletAction } from "../store/slices/walletSlice";
import { IWalletAddressRemovePayload } from "../models/wallet";
import Spinner from "../components/base/Spinner";
import { parseWalletDisplayDataFromResponse } from "../utils/walletResponseParser";
import { isEmpty } from "../utils/commonUtils";

interface WalletListProps {}

const WalletList: FunctionComponent<WalletListProps> = () => {
  const [loading, setLoading] = useState(false);
  const [showImportWalletPopup, setShowImportWalletPopup] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveWalletAction = async (data: IRow) => {
    setLoading(true);
    try {
      await dispatch(
        removeAddressFromWalletAction({
          name: data.walletName,
          address: data.address,
        } as IWalletAddressRemovePayload)
      );
    } catch (err) {
      console.error("Error deleting wallet address", err);
    }

    setLoading(false);
    return Promise.resolve();
  };

  const walletColumns = [
    {
      name: "Wallet",
      type: CELL_TYPE.TEXT,
      key: "walletName",
    },
    {
      name: "Holding",
      type: CELL_TYPE.AMOUNT,
      key: "holding",
    },
    {
      name: "Actions",
      type: CELL_TYPE.ACTIONS,
      key: "actions",
      renderer: (rowData: IRow) => {
        return (
          <Icon
            src={ic_delete}
            onClick={() => handleRemoveWalletAction(rowData)}
          />
        );
      },
    },
  ];

  const [walletCoins, setWalletCoins] = useState<IRow[]>([]);
  const { walletList, walletShortDetailByAddress } = useSelector(
    (state: RootState) => state.wallet
  );

  useEffect(() => {
    if (isEmpty(walletList) || isEmpty(walletShortDetailByAddress)) return;

    const walletParsedList: IRow[] = [];

    (walletList || []).forEach((wallet) => {
      (wallet.addresses || []).forEach((address) => {
        const walletDetail = walletShortDetailByAddress[address];
        walletParsedList.push(
          parseWalletDisplayDataFromResponse(wallet.name, walletDetail)
        );
      });
    });

    setWalletCoins(walletParsedList);
  }, [walletList, walletShortDetailByAddress]);

  return (
    <StyledColumnContainer
      style={{
        padding: "0 32px",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      <StyledRowContainer
        style={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Label
          text={`${DATA_GRID_TABLES.WALLETS} ${
            walletList.length ? `(${walletList.length})` : ""
          }`}
          style={{
            color: colors.textGold,
            fontSize: "1.3em",
          }}
        />
        {loading ? <Spinner /> : null}
        <Button
          text="IMPORT WALLET"
          icon={ic_import}
          style={{
            backgroundColor: colors.buttonLightGrayBg,
            border: `1px solid ${colors.borderBgLight}`,
            color: colors.textLightBrown,
            fontSize: "0.6em",
          }}
          onClick={() => setShowImportWalletPopup(true)}
        />
      </StyledRowContainer>
      <DataGrid
        tableName={DATA_GRID_TABLES.WALLETS}
        customHeader={`Total Coins`}
        columns={walletColumns}
        rows={walletCoins}
        totalCount={walletCoins?.length || 0}
      />
      {showImportWalletPopup && (
        <ImportWalletPopup onClose={() => setShowImportWalletPopup(false)} />
      )}
    </StyledColumnContainer>
  );
};

export default WalletList;
