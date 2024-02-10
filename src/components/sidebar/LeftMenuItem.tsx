import { FunctionComponent } from "react";
import {
  StyledColumnContainer,
  StyledRowContainer,
} from "../base/StyledContainers";
import Icon from "../base/Icon";
import Label from "../base/Label";
import { IconSize, PAGE_ROUTES } from "../../utils/enum";
import { useMatch } from "react-router";
import { colors } from "../../utils/constants";
import styled from "styled-components";
import useRouteManager from "../../hooks/useRouteManager";

interface LeftMenuItemProps {
  title: string;
  icon: string;
  route: PAGE_ROUTES;
}

const StyledBottomBorder = styled.div`
  align-self: center;
  height: 0px;
  width: 80%;
  margin: auto;
  border: 2px solid ${colors.borderBgLight};
`;

const StyledLeftBorder = styled.div`
  position: absolute;
  left: 0;
  align-self: center;
  height: 50%;
  width: 0;
  margin: auto;
  border: 2px solid ${colors.buttonBronzeGold};
`;

const LeftMenuItem: FunctionComponent<LeftMenuItemProps> = (props) => {
  const isActiveRoute = useMatch(props.route);
  const { navigateToPage } = useRouteManager();

  return (
    <StyledColumnContainer
      style={{
        flexGrow: 0,
      }}
    >
      <StyledRowContainer
        style={{
          width: "100%",
          padding: 24,
          gap: 12,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => navigateToPage(props.route)}
      >
        {isActiveRoute && <StyledLeftBorder />}
        <Icon
          src={props.icon}
          style={{
            backgroundColor: colors.buttonGrayBg,
            padding: 6,
            borderRadius: 3,
          }}
          size={IconSize.EXTRA_LARGE}
        />
        <Label
          text={props.title}
          style={{
            color: isActiveRoute ? colors.buttonBronzeGold : colors.white,
            fontWeight: 600,
            fontSize: "0.75em",
          }}
        />
      </StyledRowContainer>
      <StyledBottomBorder />
    </StyledColumnContainer>
  );
};

export default LeftMenuItem;
