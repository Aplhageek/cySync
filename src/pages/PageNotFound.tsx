import { FunctionComponent } from "react";
import {
  StyledColumnContainer,
  StyledRowContainer,
} from "../components/base/StyledContainers";
import Label from "../components/base/Label";
import { colors } from "../utils/constants";
import Icon from "../components/base/Icon";
import im_page_not_found from "../assets/page_not_found_hero.png";
import Button from "../components/base/Button";
import useRouteManager from "../hooks/useRouteManager";
import { PAGE_ROUTES } from "../utils/enum";

interface PageNotFoundProps {}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
  const { navigateToPage } = useRouteManager();
  return (
    <StyledRowContainer>
      <StyledColumnContainer
        style={{
          width: "50%",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <Label
          text="Oops we couldn't find this page."
          style={{
            margin: "auto",
            color: colors.textGold,
            fontSize: "2.5em",
            fontWeight: 600,
          }}
        />
        <Label
          text="The page may have been removed or is out of date."
          style={{
            margin: "auto",
            color: colors.white,
            fontSize: "2em",
            fontWeight: 500,
          }}
        />
        <Button
          text="Go back to HomePage"
          style={{
            backgroundColor: colors.buttonBronzeGold,
            textAlign: "center",
            maxWidth: 220,
            fontWeight: 600,
            color: colors.white,
            borderColor: colors.buttonBronzeGold,
          }}
          onClick={() => navigateToPage(PAGE_ROUTES.HOME)}
        />
      </StyledColumnContainer>
      <Icon
        src={im_page_not_found}
        style={{
          minHeight: 200,
          height: "70vh",
        }}
      />
    </StyledRowContainer>
  );
};
``;

export default PageNotFound;
