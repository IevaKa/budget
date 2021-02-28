import React, { createContext, useEffect, useState } from "react";
import { auth, db, firebase } from "../firebase";

export interface AuthUser {
  id: string;
  email: string;
  displayName: string;
  photoURL: string;
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
                const { email, displayName, photoURL } = data;
                setAuthUser({ id: snapshot.id, email, displayName, photoURL });
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
