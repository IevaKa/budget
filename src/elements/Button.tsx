import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface ButtonProps {
  buttonColor: string;
  textColor?: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  margin-top: 15px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  top: 0;
  transition: background-color 0.5s ease-out;
  background-color: ${(props) => props.buttonColor};
  color: ${(props) => props.textColor || "inherit"};
  filter: drop-shadow(3px 4px 6px rgba(36, 44, 66, 0.25));
  &:focus {
    outline: 0;
  }
  &:hover {
    top: -1px;
    background-color: #29ccaf;
  }
`;

export interface IProps {
  buttonText: string;
  buttonColor: string;
  textColor?: string;
}

const Button: React.FC<IProps> = ({ buttonText, buttonColor, textColor }) => {
  //   let history = useHistory();
  //   const onClick = (): void => {
  //     history.push(url);
  //   };
  return (
    <StyledButton buttonColor={buttonColor} textColor={textColor}>
      {buttonText}
    </StyledButton>
  );
};

export default Button;
