import React from "react";
import { signOut } from "../firebase";

const Dashboard: React.FC = () => {
  return (
    <div>
      <p>You are logged in</p>
      <button onClick={signOut}>LogOut</button>
    </div>
  );
};

export default Dashboard;
