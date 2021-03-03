import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import { auth, db, authMethods } from "../firebase";
import Button from "../elements/Button";
import { PRIMARY_GREEN, DARK_BLUE } from "../constants/colors";
import InputField from "../elements/InputField";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
`;

const Animation = styled.div`
  margin-right: 3rem;
`;

const Form = styled.form`
  margin-bottom: 10rem;
  width: 300px;
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
        <Button buttonText="Login" buttonColor={PRIMARY_GREEN} />
      </Form>

      {/* <button onClick={authMethods.signInWithGoogle}> */}
      {/* Sign in with google
      </button> */}
    </Div>
  );
};

export default SignIn;
