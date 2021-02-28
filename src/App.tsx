import React, { useContext } from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import { UserContext } from "./providers/UserProvider";

const App: React.FC = () => {
  const { authUser, isLoading } = useContext(UserContext);

  if (isLoading) return <div>Loading...</div>;
  if (!isLoading && !authUser.id) return <SignIn />;
  return <Dashboard />;
};

export default App;
