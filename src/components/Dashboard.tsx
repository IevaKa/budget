import React, { useState, useEffect } from "react";
import { auth, db, firebase, firestore } from "../firebase";
import IncomeEntry from "./IncomeEntry";
import ExpenseEntry from "./ExpenseEntry";
import Navbar from "./Navbar";

export interface ExpenseCategory {
  id: string;
  name: string;
}

const Dashboard: React.FC = () => {
  const [showIncomeEntry, setShowIncomeEntry] = useState(false);
  const [showExpenseEntry, setShowExpenseEntry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );

  useEffect(() => {
    let unsubscribeFromFirestore: firebase.Unsubscribe;

    (async () => {
      if (auth.currentUser !== null) {
        unsubscribeFromFirestore = firestore
          .collection("categories")
          .where("userId", "==", auth.currentUser.uid)
          .onSnapshot((snap) => {
            const categories = snap.docs.map((cat) => {
              return {
                id: cat.id,
                name: cat.data().name,
              };
            });
            setExpenseCategories(categories);
            setIsLoading(false);
          });
      }
    })();

    return () => unsubscribeFromFirestore();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Navbar />
      <button onClick={() => setShowIncomeEntry(!showIncomeEntry)}>
        Add income
      </button>
      <button onClick={() => setShowExpenseEntry(!showExpenseEntry)}>
        Add expense
      </button>
      {showIncomeEntry && <IncomeEntry hide={setShowIncomeEntry} />}
      {showExpenseEntry && (
        <ExpenseEntry
          hide={setShowExpenseEntry}
          categories={expenseCategories}
        />
      )}
    </div>
  );
};

export default Dashboard;
