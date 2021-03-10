import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import AuthForm from "./AuthForm";
import ErrorMessage from "../elements/ErrorMessage";
import { Link } from "react-router-dom";
import { PRIMARY_BLUE, PRIMARY_BLUE_HOVER } from "../constants/colors";

// TODO
// error message as separate element - its too clutered ✅
// visibility toggle ✅
// google login -error handling, set up a document if nothin in firebase
// sign up message ✅
// responsive design ✅
// secure password ✅

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

interface IAuth {
  paragraphURL: string;
  paragraphText: string;
  linkText: string;
  formButtonText: string;
  googleButtonText: string;
}

const Auth: React.FC<IAuth> = ({
  paragraphURL,
  paragraphText,
  linkText,
  formButtonText,
  googleButtonText,
}) => {
  const [errorCount, setErrorCount] = useState(0);
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

  return (
    <Div>
      <Animation ref={container} />
      <div>
        <AuthForm
          errorCount={errorCount}
          setErrorCount={setErrorCount}
          setErrorMessage={setErrorMessage}
          formButtonText={formButtonText}
          googleButtonText={googleButtonText}
        />
        <Paragraph>
          {paragraphText}{" "}
          <StyledLink onClick={() => setErrorCount(0)} to={paragraphURL}>
            {linkText}
          </StyledLink>
        </Paragraph>
        <ErrorMessage message={errorMessage} errorCount={errorCount} />
      </div>
    </Div>
  );
};

export default Auth;
