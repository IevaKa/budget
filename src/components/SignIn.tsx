import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import { auth, db, authMethods } from "../firebase";
import Button from "../elements/Button";
import ErrorMessage from "../elements/ErrorMessage";
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

// TODO
// error message as separate element - its too clutered ✅
// visibility toggle
// google login -error handling, set up a document if nothin in firebase
// sign up message

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13vh;
  margin-left: -5vw;
`;

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

const Animation = styled.div`
  margin-right: 3rem;
`;

const Form = styled.form`
  /* margin-bottom: 10rem; */
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const container = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (container.current !== null) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/finance-guru.json"),
      });
    }
  }, []);

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
    setErrorMessage("");
    try {
      await authMethods.login(email, password);
    } catch (err) {
      setErrorMessage(
        "Sorry, I couldn't find an account with those credentials"
      );
    }
  };
  return (
    <Div>
      <Animation ref={container} />

      <AuthActions>
        <Button
          buttonText="Login with Google"
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
            errorMessage={errorMessage}
          />
          <InputField
            labelText="Password"
            name="password"
            type="password"
            value={password}
            setValue={setPassword}
            errorMessage={errorMessage}
          />
          <Button
            buttonText="Login"
            buttonColor={PRIMARY_GREEN}
            hoverColor={PRIMARY_GREEN_HOVER}
          />
        </Form>
        <p>Don't have an account yet? Sign up!</p>
        <ErrorMessage message={errorMessage}></ErrorMessage>
      </AuthActions>
    </Div>
  );
};

export default SignIn;
