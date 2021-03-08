import React, { useState, useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import { auth, db, authMethods } from "../firebase";
import AuthForm from "./AuthForm";
import ErrorMessage from "../elements/ErrorMessage";
import { Link } from "react-router-dom";
import { PRIMARY_BLUE, PRIMARY_BLUE_HOVER } from "../constants/colors";

// TODO
// error message as separate element - its too clutered ✅
// visibility toggle ✅
// google login -error handling, set up a document if nothin in firebase
// sign up message

const Div = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13vh;
  margin-left: -5vw;
`;

const Animation = styled.div`
  margin-right: 3rem;
`;

const Paragraph = styled.p`
  font-size: 14px;
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
