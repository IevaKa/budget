import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PRIMARY_GREEN, DARK_BLUE, ERROR_RED } from "../constants/colors";

const Div = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  position: relative;
  margin-top: 1.7rem;
`;

interface IInput {
  msg?: string;
}

const Input = styled.input<IInput>`
  border: 0;
  border-bottom: 1px solid ${DARK_BLUE};
  font-family: inherit;
  padding: 0.2rem 0;
  outline: none;
  border-color: ${({ msg }) => (msg && msg.length ? ERROR_RED : DARK_BLUE)};
  transition: all 0.5s ease-out;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  &:focus,
  &:hover {
    border-color: ${PRIMARY_GREEN};
  }
`;

interface ILabel {
  value: number;
  msg?: string;
}

const Label = styled.label<ILabel>`
  font-weight: 600;
  font-size: 14px;
  position: absolute;
  top: ${(props) => (props.value ? "-1.1rem" : "0rem")};
  color: ${({ msg }) => (msg && msg.length ? ERROR_RED : "inherit")};
  opacity: 0.8;
  transition: all 0.5s ease-out;
  ${Input}:focus ~ &,
  ${Div}:hover & {
    top: -1.1rem;
    color: ${PRIMARY_GREEN};
    opacity: 1;
  }
`;

interface IInputField {
  labelText: string;
  name: string;
  type: string;
  value: string;
  errorMessage?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<IInputField> = ({
  labelText,
  name,
  value,
  type,
  errorMessage,
  setValue,
}) => {
  const [errorMsg, setErrorMsg] = useState(errorMessage);

  useEffect(() => {
    if (errorMessage) {
      setErrorMsg(errorMessage);
    }
  }, [errorMessage]);
  return (
    <Div>
      <Input
        name={name}
        value={value}
        type={type}
        onChange={(e) => {
          setValue(e.target.value);
          setErrorMsg("");
        }}
        msg={errorMsg}
      />
      <Label msg={errorMsg} htmlFor={name} value={value.length}>
        {labelText}
      </Label>
    </Div>
  );
};

export default InputField;
