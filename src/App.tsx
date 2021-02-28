import React, { useContext } from "react";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import { UserContext } from "./providers/UserProvider";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import * as routes from "./constants/routes";

const App: React.FC = () => {
  const { authUser, isLoading } = useContext(UserContext);
  const LandingComponent = !isLoading && !authUser.id ? SignIn : Dashboard;

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path={routes.LANDING}
          component={LandingComponent}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
