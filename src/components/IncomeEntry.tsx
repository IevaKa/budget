import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import InputField from "../elements/InputField";
import styled from "styled-components";
import Button from "../elements/Button";
import Spacer from "../elements/Spacer";
import {
  PRIMARY_GREEN,
  PRIMARY_GREEN_HOVER,
  OFF_WHITE,
  DARK_BLUE,
} from "../constants/colors";

const StyledForm = styled.form`
  width: 300px;
  padding: 2rem;
  border: 1px solid ${DARK_BLUE};
  border-radius: 10px;
`;

const RadioArea = styled.div`
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

const StyledParagraph = styled.p`
  font-weight: 600;
  font-size: 14px;
  opacity: 0.8;
`;

const ButtonArea = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

interface IProps {
  cancel: React.Dispatch<React.SetStateAction<boolean>>;
}

const IncomeEntry: React.FC<IProps> = ({ cancel }) => {
  const [fixed, setFixed] = useState(true);
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    if (auth.currentUser !== null) {
      const entry = {
        name,
        amount,
        fixed,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      firestore.collection("income").add(entry);
      setFixed(true);
      setAmount("");
      setName("");
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
        name="income-name"
        value={name}
        type="text"
        setValue={setName}
        visibilityToggle={false}
      />
      <Spacer marginTop="2rem" />
      <InputField
        labelText="Amount per month (€)"
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
          onClick={() => cancel(false)}
        />
        <Button
          type="submit"
          buttonText="Add income"
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

export default IncomeEntry;
