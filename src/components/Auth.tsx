import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import AuthForm from "./AuthForm";
import ErrorMessage from "../elements/ErrorMessage";
import * as routes from "../constants/routes";
import { Link } from "react-router-dom";
import { PRIMARY_BLUE, PRIMARY_BLUE_HOVER } from "../constants/colors";

const Div = styled.div`
  display: flex;
  width: fit-content;
  margin: 0 auto;
  margin-top: 13vh;

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    margin-top: 3vh;
    > div {
      margin: 0 auto;
    }
  }
`;

const Animation = styled.div`
  margin-right: 3rem;

  @media only screen and (max-width: 800px) {
    max-width: 55vw;
    margin: 0 auto;
    margin-bottom: -5vh;
  }
`;

const Paragraph = styled.p`
  font-size: 14px;
  width: 300px;
  @media only screen and (max-width: 800px) {
    font-size: 18px;
    margin-top: 1rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${PRIMARY_BLUE};
  font-weight: 800;
  transition: all 0.5s ease-out;
  position: relative;
  &:hover {
    color: ${PRIMARY_BLUE_HOVER};
    top: -1px;
  }
`;

const Auth: React.FC = () => {
  const [errorCount, setErrorCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

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

  const onAuthChange = () => {
    setErrorCount(0);
    setIsLogin(!isLogin);
  };

  return (
    <Div>
      <Animation ref={container} />
      <div>
        <AuthForm
          errorCount={errorCount}
          setErrorCount={setErrorCount}
          setErrorMessage={setErrorMessage}
          isLogin={isLogin}
        />
        <Paragraph>
          {isLogin ? "Don't have an account yet?" : "Already have an account?"}{" "}
          <StyledLink
            onClick={onAuthChange}
            to={isLogin ? routes.SIGN_UP : routes.LOG_IN}
          >
            {isLogin ? "Sign Up!" : "Log in!"}
          </StyledLink>
        </Paragraph>
        <ErrorMessage message={errorMessage} errorCount={errorCount} />
      </div>
    </Div>
  );
};

export default Auth;
