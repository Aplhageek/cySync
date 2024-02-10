import { CSSProperties, FunctionComponent, SyntheticEvent } from "react";
import styled from "styled-components";
import Icon from "./Icon";
import { IconSize } from "../../utils/enum";

interface ButtonProps {
  text: string;
  onClick: (e: SyntheticEvent) => void;
  icon?: string;
  reverse?: boolean;
  style?: CSSProperties;
  iconSize?: IconSize;
}

const StyledButton = styled.button<{
  style: CSSProperties;
  reverse?: boolean;
}>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  width: auto;
  max-width: 250px;
  gap: 12px;
  background: transparent;
  outline: none;
  cursor: pointer;
  font-size: 1em;
  font-weight: 500;
  padding: 0.6em 1.2em;
  border: 1px solid transparent;
  border-radius: 4px;
`;

const Button: FunctionComponent<ButtonProps> = (props) => {
  return (
    <StyledButton
      style={props.style || {}}
      reverse={props.reverse}
      onClick={
        props.onClick ??
        (() => {
          alert("No event listener added on button");
        })
      }
    >
      {props.icon ? (
        <Icon src={props.icon} size={props.iconSize || IconSize.LARGE} />
      ) : null}
      {props.text}
    </StyledButton>
  );
};

export default Button;
