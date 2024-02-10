import { CSSProperties, FunctionComponent } from "react";
import styled from "styled-components";
import { IconSize } from "../../utils/enum";

interface IconProps {
  src: string;
  style?: CSSProperties;
  size?: IconSize;
  onClick?: () => unknown;
}

const getIconHeightFromSize = (size: IconSize) => {
  switch (size) {
    case IconSize.SMALL:
      return "8px";
    case IconSize.MEDIUM:
      return "14px";
    case IconSize.LARGE:
      return "20px";
    case IconSize.EXTRA_LARGE:
      return "24px";
    case IconSize.HUGE:
      return "30px";
    default:
      return "14px";
  }
};

const StyledIcon = styled.img<{ size: IconSize; onClick?: () => void }>`
  height: ${(props) => getIconHeightFromSize(props.size)};
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

const Icon: FunctionComponent<IconProps> = (props) => {
  return (
    <StyledIcon
      style={props.style || {}}
      src={props.src}
      size={props.size || IconSize.MEDIUM}
      onClick={props.onClick}
    ></StyledIcon>
  );
};

export default Icon;
