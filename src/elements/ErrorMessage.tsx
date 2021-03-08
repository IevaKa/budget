import React from "react";
import styled, { keyframes } from "styled-components";
import { ERROR_RED } from "../constants/colors";

interface IErrorMessage {
  message: string;
  errorCount?: number;
}

interface IErrorCount {
  errorCount?: number;
}

const Wobble = keyframes`
    0% { transform: translateX(0%); } 
    15% { transform: translateX(-5%); } 
    30% { transform: translateX(4%); } 
    45% { transform: translateX(-3%); } 
    60% { transform: translateX(2%); } 
    75% { transform: translateX(-1%); } 
    100% { transform: translateX(0%); } 
`;

const SlideIn = keyframes`
    100% { right: 0; }
`;

const Div = styled.div<IErrorCount>`
  position: relative;
`;

const MessageDiv = styled.div<IErrorCount>`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: 0.05rem;
  padding: 0.5rem;
  color: ${ERROR_RED};
  background-color: rgba(230, 0, 35, 0.1);
  right: ${({ errorCount }) =>
    errorCount && errorCount === 1 ? "-50vw" : "0"};
  visibility: ${({ errorCount }) => (errorCount ? "visible" : "hidden")};
  animation-name: ${({ errorCount }) =>
    errorCount && errorCount === 1 ? SlideIn : Wobble};
  animation-duration: ${({ errorCount }) => (errorCount ? "1s" : "0")};
  animation-iteration-count: 1;
  animation-fill-mode: ${({ errorCount }) =>
    errorCount && errorCount === 1 ? "forwards" : "both"};
`;

const ErrorMessage: React.FC<IErrorMessage> = ({ message, errorCount }) => {
  return (
    <Div errorCount={errorCount}>
      <MessageDiv key={Math.random()} errorCount={errorCount}>
        {message}
      </MessageDiv>
    </Div>
  );
};

export default ErrorMessage;
