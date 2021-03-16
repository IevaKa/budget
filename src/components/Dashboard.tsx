import React, { useState } from "react";
import IncomeEntry from "./IncomeEntry";
import Navbar from "./Navbar";

const Dashboard: React.FC = () => {
  const [showIncomeEntry, setShowIncomeEntry] = useState(false);
  return (
    <div>
      <Navbar />
      <button onClick={() => setShowIncomeEntry(true)}>Add income</button>
      {showIncomeEntry && <IncomeEntry cancel={setShowIncomeEntry} />}
    </div>
  );
};

export default Dashboard;
