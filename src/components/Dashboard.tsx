import React, { useContext } from "react";
import { authMethods } from "../firebase";
import { UserContext } from "../providers/UserProvider";

const Dashboard: React.FC = () => {
  const { authUser } = useContext(UserContext);

  return (
    <div>
      <p>You are logged in</p>
      <p>{authUser.email}</p>
      <button onClick={authMethods.signOut}>LogOut</button>
    </div>
  );
};

export default Dashboard;
