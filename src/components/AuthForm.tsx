import React, { useState, useEffect } from "react";
import { auth, db, authMethods, firebase, firestore } from "../firebase";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import {
  PRIMARY_GREEN_HOVER,
  DARK_BLUE,
  PRIMARY_GREEN,
  GOOGLE_RED,
  WHITE,
  GOOGLE_RED_HOVER,
} from "../constants/colors";
import InputField from "../elements/InputField";
import Spacer from "../elements/Spacer";
import GoogleLogo from "../assets/GoogleLogo.svg";

const Or = styled.p`
  display: flex;
  flex-direction: row;
  margin: 30px 0;
  opacity: 0.3;
  &:before,
  &:after {
    content: "";
    flex: 1 1;
    border-bottom: 1px solid ${DARK_BLUE};
    margin: auto;
  }

  &:before {
    margin-right: 0.5rem;
  }

  &:after {
    margin-left: 0.5rem;
  }
`;

const AuthActions = styled.div`
  width: 300px;
  margin-top: 8vh;

  @media only screen and (max-width: 800px) {
    width: auto;
    margin: 0 0.5rem;
  }
`;

const Form = styled.form`
  /* margin-bottom: 10rem; */
`;

interface IAuthForm {
  errorCount: number;
  setErrorCount: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isLogin: boolean;
}

export interface ExpenseCategory {
  id: string;
  name: string;
}

const AuthForm: React.FC<IAuthForm> = ({
  errorCount,
  setErrorCount,
  setErrorMessage,
  isLogin,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [expenseCategories, setExpenseCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [incomeCategories, setIncomeCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [savingsCategories, setSavingsCategories] = useState<ExpenseCategory[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLogin) {
      setIsLoading(true);
      let unsubscribeFromFirestore: firebase.Unsubscribe;

      (async () => {
        unsubscribeFromFirestore = firestore
          .collection("expenseCategories")
          .onSnapshot((snap) => {
            const categories = snap.docs.map((cat) => {
              return {
                id: cat.id,
                name: cat.data().name,
              };
            });
            setExpenseCategories(categories);
            setIsLoading(false);
          });
      })();

      return () => unsubscribeFromFirestore();
    }
  }, [isLogin]);

  useEffect(() => {
    if (!isLogin) {
      setIsLoading(true);
      let unsubscribeFromFirestore: firebase.Unsubscribe;

      (async () => {
        unsubscribeFromFirestore = firestore
          .collection("incomeCategories")
          .onSnapshot((snap) => {
            const categories = snap.docs.map((cat) => {
              return {
                id: cat.id,
                name: cat.data().name,
              };
            });
            setIncomeCategories(categories);
            setIsLoading(false);
          });
      })();

      return () => unsubscribeFromFirestore();
    }
  }, [isLogin]);

  useEffect(() => {
    if (!isLogin) {
      setIsLoading(true);
      let unsubscribeFromFirestore: firebase.Unsubscribe;

      (async () => {
        unsubscribeFromFirestore = firestore
          .collection("savingCategories")
          .onSnapshot((snap) => {
            const categories = snap.docs.map((cat) => {
              return {
                id: cat.id,
                name: cat.data().name,
              };
            });
            setSavingsCategories(categories);
            setIsLoading(false);
          });
      })();

      return () => unsubscribeFromFirestore();
    }
  }, [isLogin]);

  let history = useHistory();

  const login = async () => {
    try {
      const test = await authMethods.login(email, password);
      // console.log("🚀 ~ file: AuthForm.tsx ~ line 78 ~ login ~ test", test);
      setErrorCount(0);
    } catch (err) {
      setErrorCount(errorCount + 1);
      setErrorMessage(
        "Sorry, I couldn't find an account with those credentials."
      );
    }
  };

  const signup = async () => {
    if (password.length < 6) {
      setErrorCount(errorCount + 1);
      setErrorMessage("I'd prefer 6 or more characters for your password");
    } else {
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password
        );
        setErrorCount(0);
        user !== null &&
          db.createUserProfileDocument(
            user,
            expenseCategories,
            incomeCategories,
            savingsCategories
          );
        history.push("/dashboard");
      } catch (error) {
        setErrorCount(errorCount + 1);
        setErrorMessage(error.message);
      }
    }
  };

  const onSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (isLogin) {
      login();
    } else {
      signup();
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <AuthActions>
      <Button
        buttonText={isLogin ? "Login with Google" : "Sign up with Google"}
        textSize="14px"
        fontWeight={300}
        buttonColor={GOOGLE_RED}
        hoverColor={GOOGLE_RED_HOVER}
        textColor={WHITE}
        iconPath={GoogleLogo}
        onClick={authMethods.signInWithGoogle}
        buttonShadow={true}
      />
      <Or>or</Or>
      <Form onSubmit={onSubmit}>
        <InputField
          labelText="Email"
          name="email"
          type="email"
          value={email}
          setValue={setEmail}
          errorCount={errorCount}
          visibilityToggle={false}
        />
        <InputField
          labelText="Password"
          name="password"
          type="password"
          value={password}
          setValue={setPassword}
          errorCount={errorCount}
          visibilityToggle={true}
        />
        <Spacer marginTop="1rem" />
        <Button
          buttonText={isLogin ? "Login" : "Sign Up"}
          buttonColor={PRIMARY_GREEN}
          hoverColor={PRIMARY_GREEN_HOVER}
          buttonShadow={true}
        />
      </Form>
      <Spacer marginTop="0.5rem" />
    </AuthActions>
  );
};

export default AuthForm;
