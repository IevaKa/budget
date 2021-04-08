import React from "react";
import styled from "styled-components";
import { ExpenseCategory } from "../components/AuthForm";
import {
  PRIMARY_GREEN,
  PRIMARY_GREEN_HOVER,
  OFF_WHITE,
  DARK_BLUE,
} from "../constants/colors";

const StyledSelect = styled.select`
  width: 100%;
  border-color: rgba(36, 44, 68, 0.2);
  border-radius: 4px;
  outline: 0;
`;

interface IProps {
  options: ExpenseCategory[];
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const Select: React.FC<IProps> = ({ setCategory, options }) => {
  return (
    <StyledSelect onChange={(e) => setCategory(e.target.value)}>
      {options
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(({ id, name }) => {
          return <option value={id}>{name}</option>;
        })}
    </StyledSelect>
  );
};

export default Select;
