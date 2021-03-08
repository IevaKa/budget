import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PRIMARY_GREEN, DARK_BLUE, ERROR_RED } from "../constants/colors";
import ShowIcon from "../assets/show.svg";
import HideIcon from "../assets/hide.svg";

const Div = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  position: relative;
  margin-top: 1.7rem;
`;

interface IInput {
  errorCount?: number;
}

const Input = styled.input<IInput>`
  border: 0;
  border-bottom: 1px solid ${DARK_BLUE};
  font-family: inherit;
  padding: 0.2rem 0;
  outline: none;
  border-color: ${({ errorCount }) =>
    errorCount && errorCount > 0 ? ERROR_RED : DARK_BLUE};
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
  errorCount?: number;
}

const Label = styled.label<ILabel>`
  font-weight: 600;
  font-size: 14px;
  position: absolute;
  top: ${(props) => (props.value ? "-1.1rem" : "0rem")};
  color: ${({ errorCount }) =>
    errorCount && errorCount > 0 ? ERROR_RED : "inherit"};
  opacity: 0.8;
  transition: all 0.5s ease-out;
  ${Input}:focus ~ &,
  ${Div}:hover & {
    top: -1.1rem;
    color: ${PRIMARY_GREEN};
    opacity: 1;
  }
`;

const Icon = styled.img`
  width: 25px;
  position: absolute;
  top: -4px;
  right: 0;
  cursor: pointer;
`;

interface IInputField {
  labelText: string;
  name: string;
  type: string;
  value: string;
  errorCount?: number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  visibilityToggle: boolean;
}

const InputField: React.FC<IInputField> = ({
  labelText,
  name,
  value,
  type,
  errorCount,
  setValue,
  visibilityToggle,
}) => {
  const [errCount, setErrCount] = useState(errorCount);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    setErrCount(errorCount);
  }, [errorCount]);
  return (
    <Div>
      <Input
        name={name}
        value={value}
        type={visibilityToggle && !hide ? "text" : type}
        onChange={(e) => {
          setErrCount(0);
          setValue(e.target.value);
        }}
        errorCount={errCount}
      />
      <Label errorCount={errCount} htmlFor={name} value={value.length}>
        {labelText}
      </Label>
      {visibilityToggle && (
        <Icon
          onClick={() => setHide(!hide)}
          src={hide ? HideIcon : ShowIcon}
        ></Icon>
      )}
    </Div>
  );
};

export default InputField;
