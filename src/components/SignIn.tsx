import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import { auth, db, authMethods } from "../firebase";
import Button from "../elements/Button";
import { PRIMARY_GREEN, DARK_BLUE } from "../constants/colors";

const Animation = styled.div`
  width: 200px;
`;

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      user !== null && db.createUserProfileDocument(user);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Animation ref={container} />
      <Button
        link="/test"
        buttonText="Login"
        buttonColor={PRIMARY_GREEN}
        textColor={DARK_BLUE}
      />
      <form className="SignUp" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign Up" />
      </form>
      <button onClick={authMethods.signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
};

export default SignIn;
