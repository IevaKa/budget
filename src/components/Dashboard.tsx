import React, { useState } from "react";
import ExpenseEntry from "./AddEntry";
import Navbar from "./Navbar";
import { ExpenseCategory } from "./AuthForm";

interface IProps {
  expenseCategories: ExpenseCategory[];
  incomeCategories: ExpenseCategory[];
  savingsCategories: ExpenseCategory[];
}

const Dashboard: React.FC<IProps> = ({
  expenseCategories,
  incomeCategories,
  savingsCategories,
}) => {
  const [showIncomeEntry, setShowIncomeEntry] = useState(false);
  const [showExpenseEntry, setShowExpenseEntry] = useState(false);
  const [showSavingsEntry, setShowSavingsEntry] = useState(false);

  return (
    <div>
      <Navbar />
      <button onClick={() => setShowIncomeEntry(!showIncomeEntry)}>
        Add income
      </button>
      <button onClick={() => setShowExpenseEntry(!showExpenseEntry)}>
        Add expense
      </button>
      <button onClick={() => setShowSavingsEntry(!showSavingsEntry)}>
        Add savings
      </button>
      {showIncomeEntry && (
        <ExpenseEntry
          hide={setShowIncomeEntry}
          categories={incomeCategories}
          buttonText="Add income"
        />
      )}
      {showExpenseEntry && (
        <ExpenseEntry
          hide={setShowExpenseEntry}
          categories={expenseCategories}
          buttonText="Add expense"
        />
      )}
      {showSavingsEntry && (
        <ExpenseEntry
          hide={setShowSavingsEntry}
          categories={savingsCategories}
          buttonText="Add savings"
        />
      )}
    </div>
  );
};

export default Dashboard;
