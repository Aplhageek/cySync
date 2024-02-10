import { FunctionComponent, useEffect, useRef, useState } from "react";
import { INPUT_TYPE } from "../../utils/enum";
import { StyledColumnContainer } from "./StyledContainers";
import Label from "./Label";
import styled, { CSSProperties } from "styled-components";
import { colors } from "../../utils/constants";

interface InputProps {
  title: string;
  value: string;
  type: INPUT_TYPE;
  placeholder?: string;
  style?: CSSProperties;
  onBlur: (updatedValue: string) => void;
}

const StyledInput = styled.input<{
  type: INPUT_TYPE;
  value: unknown;
  onChange: (e: InputEvent) => void;
}>`
  background-color: ${colors.inputBg};
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  color: ${colors.white};
  height: ${(props) => (props.type === INPUT_TYPE.LONG_TEXT ? "90px" : "35px")};
`;

const StyledTextArea = styled.textarea<{
  type: INPUT_TYPE;
  value: unknown;
  onChange: (e: InputEvent) => void;
}>`
  background-color: ${colors.inputBg};
  border: 1px solid ${colors.inputBorder};
  border-radius: 3px;
  color: ${colors.white};
  height: ${(props) => (props.type === INPUT_TYPE.LONG_TEXT ? "90px" : "35px")};
`;

const Input: FunctionComponent<InputProps> = (props) => {
  const [inputValue, setInputValue] = useState(props.value || "");

  const inputValueRef = useRef(inputValue);
  useEffect(() => {
    if (props.value !== inputValueRef.current) {
      inputValueRef.current = props.value;
      setInputValue(props.value);
    }
  }, [props.value]);

  return (
    <StyledColumnContainer
      style={{
        flexGrow: 0,
      }}
    >
      <Label
        text={`${props.title}:`}
        style={{
          color: colors.textSmokeGray,
        }}
      />
      {props.type === INPUT_TYPE.LONG_TEXT ? (
        <StyledTextArea
          type={props.type}
          value={inputValue}
          onChange={(e) => {
            const updatedValue = (e.target as HTMLInputElement)?.value || "";
            inputValueRef.current = updatedValue;
            setInputValue(updatedValue);
          }}
          onBlur={() => {
            props.onBlur?.(inputValue);
          }}
        />
      ) : (
        <StyledInput
          type={props.type}
          value={inputValue}
          onChange={(e) => {
            const updatedValue = (e.target as HTMLInputElement)?.value || "";
            inputValueRef.current = updatedValue;
            setInputValue(updatedValue);
          }}
          onBlur={() => {
            props.onBlur?.(inputValue);
          }}
        />
      )}
    </StyledColumnContainer>
  );
};

export default Input;
