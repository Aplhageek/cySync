import styled from "styled-components";
import {
  StyledColumnContainer,
  StyledRowContainer,
} from "./components/base/StyledContainers";
import { colors } from "./utils/constants";
import { PAGE_ROUTES } from "./utils/enum";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

import AppHeader from "./components/header/AppHeader";
import LeftMenuBar from "./components/sidebar/LeftMenuBar";
import ErrorBoundary from "./pages/ErrorBoundary";
import WalletList from "./pages/Wallet";
import TransactionList from "./pages/Transactions";
import PageNotFound from "./pages/PageNotFound";
import useWalletListQuery from "./hooks/useWalletListQuery";

export const StyledAppContainer = styled(StyledColumnContainer)`
  width: 100%;
  min-height: 100vh;
  background: ${colors.primaryBg};
`;

function App() {
  useWalletListQuery({});

  return (
    <BrowserRouter>
      <StyledAppContainer>
        <AppHeader />
        <StyledRowContainer
          style={{
            alignItems: "center",
            width: "100%",
            height: "calc(100vh - 90px)",
            padding: 32,
          }}
        >
          <LeftMenuBar />
          <ErrorBoundary>
            <Routes>
              <Route path={PAGE_ROUTES.WALLET_LIST} Component={WalletList} />
              <Route
                path={PAGE_ROUTES.TRANSACTION_LIST}
                Component={TransactionList}
              />
              <Route
                path={PAGE_ROUTES.PAGE_NOT_FOUND}
                Component={PageNotFound}
              />
              <Route path={PAGE_ROUTES.HOME} Component={WalletList} />
            </Routes>
          </ErrorBoundary>
        </StyledRowContainer>
      </StyledAppContainer>
    </BrowserRouter>
  );
}

export default App;
