import React from "react";
import styled from "styled-components";
import { ERROR_RED } from "../constants/colors";

interface IErrorMessage {
  message: string;
}

const Div = styled.div`
  position: relative;
`;

const MessageDiv = styled.div<IErrorMessage>`
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  font-size: 0.8rem;
  line-height: 1.2rem;
  letter-spacing: 0.05rem;
  padding: 0.5rem;
  color: ${ERROR_RED};
  background-color: rgba(230, 0, 35, 0.1);
  visibility: ${({ message }) => (message.length ? "visible" : "hidden")};
  transition: ${({ message }) => (message.length ? "2s" : "0")};
  right: ${({ message }) => (message.length ? "0" : "-40vw")};
`;

const ErrorMessage: React.FC<IErrorMessage> = ({ message }) => {
  return (
    <Div>
      <MessageDiv message={message}>{message}</MessageDiv>
    </Div>
  );
};

export default ErrorMessage;
