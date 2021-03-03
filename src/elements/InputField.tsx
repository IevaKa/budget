import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PRIMARY_GREEN, DARK_BLUE, ERROR_RED } from "../constants/colors";

const Div = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  position: relative;
  margin-top: 20px;
`;

interface IInput {
  msg?: string;
}

const Input = styled.input<IInput>`
  border: 0;
  border-bottom: 2px solid ${DARK_BLUE};
  font-family: inherit;
  padding: 10px 0;
  border-color: ${({ msg }) => (msg && msg.length ? ERROR_RED : "inherit")};
  transition: all 0.5s ease-out;
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  &:focus {
    outline: none;
    border-color: ${PRIMARY_GREEN};
  }
`;

const ErrorMessage = styled.div`
  font-size: 10px;
  height: 15px;
  color: ${ERROR_RED};
  margin-top: 2px;
`;

interface ILabel {
  value: number;
  msg?: string;
}

const Label = styled.label<ILabel>`
  font-weight: 600;
  font-size: 14px;
  position: absolute;
  top: ${(props) => (props.value ? "-15px" : "10px")};
  color: ${({ msg }) => (msg && msg.length ? ERROR_RED : "inherit")};
  transition: all 0.5s ease-out;
  ${Input}:focus ~ & {
    top: -15px;
    color: ${PRIMARY_GREEN};
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
      <ErrorMessage>{errorMsg}</ErrorMessage>
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
