import React from "react";
import { authMethods } from "../firebase";

const Dashboard: React.FC = () => {
  return (
    <div>
      <p>You are logged in</p>
      <button onClick={authMethods.signOut}>LogOut</button>
    </div>
  );
};

export default Dashboard;
