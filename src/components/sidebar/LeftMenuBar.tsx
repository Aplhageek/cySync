import { FunctionComponent } from "react";
import { StyledColumnContainer } from "../base/StyledContainers";
import { colors } from "../../utils/constants";
import LeftMenuItem from "./LeftMenuItem";
import { PAGE_ROUTES } from "../../utils/enum";
import ic_wallet from "../../assets/icons/ic_wallet.png";
import ic_transactions from "../../assets/icons/ic_transactions.png";
import Button from "../base/Button";

interface LeftMenuBarProps {}

const LeftMenuBar: FunctionComponent<LeftMenuBarProps> = () => {
  return (
    <StyledColumnContainer
      style={{
        backgroundColor: colors.secondaryBg,
        minWidth: 200,
        maxWidth: 250,
        height: "calc(100vh - 150px)",
        borderRadius: 12,
      }}
    >
      <LeftMenuItem
        title="Wallets"
        route={PAGE_ROUTES.WALLET_LIST}
        icon={ic_wallet}
      />
      <LeftMenuItem
        title="Transactions"
        route={PAGE_ROUTES.TRANSACTION_LIST}
        icon={ic_transactions}
      />
      <Button
        text="Support"
        style={{
          backgroundColor: colors.buttonBronzeBg,
          color: colors.white,
          justifyContent: "center",
          marginTop: "auto",
          borderRadius: "0 0 6px 6px",
        }}
        onClick={() => {}}
      />
    </StyledColumnContainer>
  );
};

export default LeftMenuBar;
