import styled from "styled-components";
import { colors } from "../../utils/constants";

export const StyledColumnContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
  flex: 1;
`;

export const StyledRowContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-self: center;
  width: auto;
`;

export const StyledBorderLine = styled.div<{
  height?: number | string;
  width?: number | string;
}>`
  height: ${(props) => props.height || `0`};
  width: ${(props) => props.width || `100%`};
  border-bottom: 1px solid ${colors.borderBg};
`;
