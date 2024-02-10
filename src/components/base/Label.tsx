import { CSSProperties, FunctionComponent } from "react";
import styled from "styled-components";

interface LabelProps {
  text: string;
  style?: CSSProperties;
}

const StyledLabel = styled.div``;

const Label: FunctionComponent<LabelProps> = (props) => {
  return <StyledLabel style={props.style || {}}>{props.text}</StyledLabel>;
};

export default Label;
