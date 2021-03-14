import React, { useState } from "react";
import InputField from "../elements/InputField";

const IncomeEntry: React.FC = () => {
  const [isFixed, setIsFixed] = useState(true);
  const [amount, setAmount] = useState("");
  const [incomeName, setIncomeName] = useState("");
  return (
    <div>
      <InputField
        labelText="Name"
        name="income-name"
        value={incomeName}
        type="number"
        setValue={setIncomeName}
        visibilityToggle={false}
      />

      {/* BEGIN: is fixed region */}
      <label>
        <input
          type="radio"
          checked={isFixed}
          onChange={() => setIsFixed(true)}
        ></input>
        Fixed
      </label>

      <label>
        <input
          type="radio"
          checked={!isFixed}
          onChange={() => setIsFixed(false)}
        ></input>
        One time
      </label>
      {/* END: is fixed region */}

      <InputField
        labelText="Amount (€)"
        name="amount"
        value={amount}
        type="number"
        setValue={setAmount}
        visibilityToggle={false}
      />
    </div>
  );
};

export default IncomeEntry;
