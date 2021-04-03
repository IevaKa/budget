import React from "react";
import styled from "styled-components";
import { ExpenseCategory } from "../components/Dashboard";
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
  setNewCategory: React.Dispatch<React.SetStateAction<boolean>>;
  options: ExpenseCategory[];
}

const Select: React.FC<IProps> = ({ setNewCategory, options }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "new") {
      setNewCategory(true);
    }
  };
  return (
    <StyledSelect onChange={(e) => handleChange(e)}>
      <option value="" style={{ display: "none" }}></option>
      <option value="new">Add new</option>
      {options.map(({ id, name }) => {
        return <option value={id}>{name}</option>;
      })}
    </StyledSelect>
  );
};

export default Select;
