import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as routes from "../constants/routes";
import styled from "styled-components";
import { auth, db, authMethods } from "../firebase";
import Button from "../elements/Button";
import {
  DARK_BLUE,
  PRIMARY_GREEN,
  PRIMARY_GREEN_HOVER,
  GOOGLE_RED,
  WHITE,
  GOOGLE_RED_HOVER,
} from "../constants/colors";
import InputField from "../elements/InputField";
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
  margin-top: 5vh;

  @media only screen and (max-width: 800px) {
    width: auto;
    margin: 0 0.5rem;
    /* width: 80vw; */
  }
`;

const Form = styled.form`
  /* margin-bottom: 10rem; */
`;

interface IAuthForm {
  errorCount: number;
  setErrorCount: React.Dispatch<React.SetStateAction<number>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  formButtonText: string;
  googleButtonText: string;
}

const AuthForm: React.FC<IAuthForm> = ({
  errorCount,
  setErrorCount,
  setErrorMessage,
  formButtonText,
  googleButtonText,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const login = async () => {
    try {
      await authMethods.login(email, password);
      setErrorCount(0);
      history.push("/dashboard");
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
        user !== null && db.createUserProfileDocument(user);
        history.push("/dashboard");
      } catch (error) {
        setErrorCount(errorCount + 1);
        setErrorMessage(error.message);
      }
    }
  };

  const onSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (formButtonText === "Login") {
      login();
    } else {
      signup();
    }
  };
  return (
    <AuthActions>
      <Button
        buttonText={googleButtonText}
        textSize="14px"
        fontWeight={300}
        buttonColor={GOOGLE_RED}
        hoverColor={GOOGLE_RED_HOVER}
        textColor={WHITE}
        iconPath={GoogleLogo}
        onClick={authMethods.signInWithGoogle}
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
        <Button
          buttonText={formButtonText}
          buttonColor={PRIMARY_GREEN}
          hoverColor={PRIMARY_GREEN_HOVER}
        />
      </Form>
    </AuthActions>
  );
};

export default AuthForm;
