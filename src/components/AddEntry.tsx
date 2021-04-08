import React, { useState } from "react";
import { auth } from "../firebase";
import { ExpenseCategory } from "./AuthForm";
import InputField from "../elements/InputField";
import styled from "styled-components";
import Button from "../elements/Button";
import Select from "../elements/Select";
import Spacer from "../elements/Spacer";
import {
  PRIMARY_GREEN,
  PRIMARY_GREEN_HOVER,
  OFF_WHITE,
  DARK_BLUE,
} from "../constants/colors";

export const StyledForm = styled.form`
  width: 300px;
  padding: 2rem;
  border: 1px solid ${DARK_BLUE};
  border-radius: 10px;
`;

export const RadioArea = styled.div`
  display: flex;
  width: 55%;
  justify-content: space-between;
  margin-top: 0.3rem;

  label {
    font-weight: 600;
    font-size: 14px;
    input[type="radio"] {
      margin-right: 0.2rem;
    }
  }
`;

export const StyledParagraph = styled.p`
  font-weight: 600;
  font-size: 14px;
  opacity: 0.8;
`;

export const ButtonArea = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

interface IProps {
  hide: React.Dispatch<React.SetStateAction<boolean>>;
  categories: ExpenseCategory[];
  buttonText: string;
}

const ExpenseEntry: React.FC<IProps> = ({ hide, categories, buttonText }) => {
  const [fixed, setFixed] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const onSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (auth.currentUser === null) {
      return;
    }
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledParagraph>Is this monthly reoccuring?</StyledParagraph>
      <RadioArea>
        <label>
          <input
            type="radio"
            checked={fixed}
            onChange={() => setFixed(true)}
          ></input>
          Yes
        </label>
        <label>
          <input
            type="radio"
            checked={!fixed}
            onChange={() => setFixed(false)}
          ></input>
          One time
        </label>
      </RadioArea>

      <InputField
        labelText="Name"
        name="expense-name"
        value={name}
        type="text"
        setValue={setName}
        visibilityToggle={false}
      />
      <Spacer marginTop="1.5rem" />
      <StyledParagraph>Category:</StyledParagraph>
      <Spacer marginTop="0.3rem" />
      <Select options={categories} setCategory={setCategory} />
      <Spacer marginTop="1.5rem" />
      <InputField
        labelText="Amount (€)"
        name="amount"
        value={amount}
        type="number"
        setValue={setAmount}
        visibilityToggle={false}
      />

      <ButtonArea>
        <Button
          type="button"
          buttonText="Cancel"
          width="100px"
          height="35px"
          textSize="14px"
          buttonColor={OFF_WHITE}
          hoverColor={DARK_BLUE}
          buttonShadow={false}
          hoverTextColor={OFF_WHITE}
          onClick={() => hide(false)}
        />
        <Button
          type="submit"
          buttonText={buttonText}
          width="100px"
          height="35px"
          textSize="14px"
          buttonColor={PRIMARY_GREEN}
          hoverColor={PRIMARY_GREEN_HOVER}
          buttonShadow={false}
        />
      </ButtonArea>
    </StyledForm>
  );
};

export default ExpenseEntry;
