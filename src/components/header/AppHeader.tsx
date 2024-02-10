import { FunctionComponent } from "react";
import Button from "../base/Button";
import styled from "styled-components";
import { StyledRowContainer } from "../base/StyledContainers";

import ic_sync from "../../assets/icons/ic_sync.png";
import ic_logo_white from "../../assets/cypherock-logo-white.png";
import { colors } from "../../utils/constants";
import useRouteManager from "../../hooks/useRouteManager";
import { PAGE_ROUTES, SYNC_STATUS } from "../../utils/enum";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import useSyncManager from "../../hooks/useSyncManager";

export const StyledHeaderContainer = styled(StyledRowContainer)`
  width: 100vw;
  height: 90px;
  padding: 16px 24px;
  box-sizing: border-box;
  background-color: ${colors.primaryBg};
  border-bottom: 1px solid ${colors.borderBg};
  justify-content: space-between;
`;

const AppHeader: FunctionComponent = () => {
  useSyncManager({});

  const { syncStatus, syncQueue } = useSelector(
    (state: RootState) => state.sync
  );
  const { navigateToPage } = useRouteManager();
  return (
    <StyledHeaderContainer>
      <Button
        text={"cySync"}
        icon={ic_logo_white}
        style={{
          color: colors.white,
          fontSize: "1em",
          fontWeight: 800,
          lineHeight: 1.36,
        }}
        onClick={() => navigateToPage(PAGE_ROUTES.HOME)}
      ></Button>

      <Button
        text={
          syncStatus === SYNC_STATUS.COMPLETED
            ? `Synced`
            : `Syncing(${syncQueue.length || 1})...`
        }
        icon={ic_sync}
        onClick={() => {}}
        reverse={true}
        style={{
          color: colors.buttonBronzeGold,
        }}
      />
    </StyledHeaderContainer>
  );
};

export default AppHeader;
