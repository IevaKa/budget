import React, { useContext } from "react";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import { UserContext } from "./providers/UserProvider";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import * as routes from "./constants/routes";

const App: React.FC = () => {
  const { authUser, isLoading } = useContext(UserContext);
  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={routes.LANDING}>
          {!authUser.id ? (
            <Redirect to={routes.LOG_IN} />
          ) : (
            <Redirect to={routes.DASHBOARD} />
          )}
        </Route>
        <Route
          exact={true}
          path={routes.LOG_IN}
          render={() =>
            !authUser.id ? <Auth /> : <Redirect to={routes.DASHBOARD} />
          }
        />
        <Route
          exact={true}
          path={routes.SIGN_UP}
          render={() =>
            !authUser.id ? <Auth /> : <Redirect to={routes.DASHBOARD} />
          }
        />

        <Route
          exact={true}
          path={routes.DASHBOARD}
          render={() =>
            authUser.id ? (
              <Dashboard
                expenseCategories={authUser.expenseCategories}
                incomeCategories={authUser.incomeCategories}
                savingsCategories={authUser.savingsCategories}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
