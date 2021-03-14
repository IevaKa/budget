import React from "react";

import IncomeEntry from "./IncomeEntry";
import Navbar from "./Navbar";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar />
      <IncomeEntry />
    </div>
  );
};

export default Dashboard;
