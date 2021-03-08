import React, { useState, useEffect } from "react";
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

  //   const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
  //     e.preventDefault();

  //     try {
  //       const { user } = await auth.createUserWithEmailAndPassword(
  //         email,
  //         password
  //       );
  //       user !== null && db.createUserProfileDocument(user);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  const onSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    if (formButtonText === "Login") {
      try {
        await authMethods.login(email, password);
        setErrorCount(0);
      } catch (err) {
        setErrorCount(errorCount + 1);
        setErrorMessage(
          "Sorry, I couldn't find an account with those credentials."
        );
      }
    } else {
      setErrorCount(errorCount + 1);
      setErrorMessage("Sorry, this hasn't been implemented yet");
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
