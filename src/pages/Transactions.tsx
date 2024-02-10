import { FunctionComponent, useEffect, useState } from "react";
import {
  StyledColumnContainer,
  StyledRowContainer,
} from "../components/base/StyledContainers";
import Label from "../components/base/Label";
import DataGrid from "../components/grid/DataGrid";
import Icon from "../components/base/Icon";

import { DATA_GRID_TABLES, colors } from "../utils/constants";
import { CELL_TYPE } from "../utils/enum";
import ic_txn_result from "../assets/icons/ic_txn_result_icon.png";
import { IRow } from "../models/grid";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { isEmpty } from "../utils/commonUtils";
import { parseWalletTransactionDisplayDataFromResponse } from "../utils/walletResponseParser";

interface TransactionListProps {}

const TransactionList: FunctionComponent<TransactionListProps> = () => {
  const transactionColumns = [
    {
      name: "Coin",
      type: CELL_TYPE.ICON,
      key: "coin",
      width: 40,
    },
    {
      name: "Date",
      type: CELL_TYPE.DATE_TIME_STAMP,
      key: "date",
      width: 150,
    },
    {
      name: "Wallet",
      type: CELL_TYPE.TEXT,
      key: "wallet",
      width: 150,
    },
    {
      name: "Amount",
      type: CELL_TYPE.AMOUNT,
      key: "amount",
      width: 150,
    },
    {
      name: "Result",
      type: CELL_TYPE.STATUS,
      key: "result",
      width: 150,
      renderer: (_rowData: IRow, value: unknown) => (
        <StyledRowContainer>
          <Icon src={ic_txn_result} />
          <Label
            text={(value || "RECEIVED") as string}
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: colors.textPurple,
              textTransform: "uppercase",
            }}
          />
        </StyledRowContainer>
      ),
    },
    {
      name: "Status",
      type: CELL_TYPE.STATUS,
      key: "status",
      width: 150,
      renderer: (_rowData: IRow, value: unknown) => (
        <Label
          text={(value || "SUCCESS") as string}
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: colors.textPurple,
            textTransform: "uppercase",
          }}
        />
      ),
    },
  ];

  const [transactions, setWalletTransactions] = useState<IRow[]>([]);
  const { walletList, walletDetailByAddress } = useSelector(
    (state: RootState) => state.wallet
  );

  useEffect(() => {
    if (isEmpty(walletList) || isEmpty(walletDetailByAddress)) return;

    const parsedTransactionList: IRow[] = [];
    (walletList || []).forEach((wallet) => {
      (wallet.addresses || []).forEach((address) => {
        const walletDetail = walletDetailByAddress[address];

        walletDetail.txs.forEach((transaction) => {
          parsedTransactionList.push(
            parseWalletTransactionDisplayDataFromResponse(
              wallet.name,
              walletDetail,
              transaction
            )
          );
        });
      });
    });

    setWalletTransactions(parsedTransactionList);
  }, [walletList, walletDetailByAddress]);

  return (
    <StyledColumnContainer
      style={{
        padding: "0 32px",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      <Label
        text={`${DATA_GRID_TABLES.TRANSACTIONS} ${
          transactions.length ? `(${transactions.length})` : ""
        }`}
        style={{
          color: colors.textGold,
          fontSize: "1.3em",
        }}
      />
      <DataGrid
        tableName={DATA_GRID_TABLES.TRANSACTIONS}
        columns={transactionColumns}
        rows={transactions}
        totalCount={transactions?.length || 0}
      />
    </StyledColumnContainer>
  );
};

export default TransactionList;
