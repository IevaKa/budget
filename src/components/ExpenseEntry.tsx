import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import {
  StyledForm,
  RadioArea,
  StyledParagraph,
  ButtonArea,
} from "./IncomeEntry";
import { ExpenseCategory } from "./Dashboard";
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

interface IProps {
  hide: React.Dispatch<React.SetStateAction<boolean>>;
  categories: ExpenseCategory[];
}

const ExpenseEntry: React.FC<IProps> = ({ hide, categories }) => {
  const [fixed, setFixed] = useState(false);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState(false);

  const onSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (auth.currentUser === null) {
      return;
    }

    if (newCategory) {
      const entry = {
        name: category,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      firestore.collection("categories").add(entry);
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
      {!newCategory && <StyledParagraph>Category:</StyledParagraph>}
      {!newCategory && <Spacer marginTop="0.3rem" />}
      {!newCategory && (
        <Select setNewCategory={setNewCategory} options={categories} />
      )}
      {newCategory && (
        <InputField
          labelText="Category"
          name="expense-category"
          value={category}
          type="text"
          setValue={setCategory}
          visibilityToggle={false}
        />
      )}
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
          buttonText="Add expense"
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
