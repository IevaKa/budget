import React, { createContext, useEffect, useState } from "react";
import { auth, db, firebase } from "../firebase";
import { ExpenseCategory } from "../components/AuthForm";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
  expenseCategories: ExpenseCategory[];
  incomeCategories: ExpenseCategory[];
  savingsCategories: ExpenseCategory[];
}

interface IUserContext {
  authUser: AuthUser;
  isLoading: boolean;
}

const authUserDefault: AuthUser = {
  id: "",
  email: "",
  displayName: "",
  photoURL: "",
  expenseCategories: [],
  incomeCategories: [],
  savingsCategories: [],
};

export const UserContext = createContext<IUserContext>({
  authUser: authUserDefault,
  isLoading: true,
});

const UserProvider: React.FC = ({ children }) => {
  const [authUser, setAuthUser] = useState(authUserDefault);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let unsubscribeFromAuth: firebase.Unsubscribe;
    (async () => {
      unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        if (userAuth) {
          const userRef = await db.createUserProfileDocument(userAuth);
          userRef &&
            userRef.onSnapshot((snapshot) => {
              const data = snapshot.data();
              setIsLoading(false);
              if (data) {
                const {
                  email,
                  displayName,
                  photoURL,
                  expenseCategories,
                  incomeCategories,
                  savingsCategories,
                } = data;
                setAuthUser({
                  id: snapshot.id,
                  email,
                  displayName,
                  photoURL,
                  expenseCategories,
                  incomeCategories,
                  savingsCategories,
                });
              }
            });
        } else {
          setAuthUser(authUserDefault);
          setIsLoading(false);
        }
      });
    })();
    return () => unsubscribeFromAuth();
  }, []);

  return (
    <UserContext.Provider value={{ authUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
