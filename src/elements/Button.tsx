import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

interface ButtonProps {
  buttonColor: string;
  textColor: string;
}

const StyledButton = styled.button<ButtonProps>`
  width: 300px;
  height: 48px;
  border: 0;
  border-radius: 5px;
  font-family: inherit;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.5s ease-out;
  background-color: ${(props) => props.buttonColor};
  color: ${(props) => props.textColor};
  &:focus {
    outline: 0;
  }
  &:hover {
    background-color: #29ccaf;
  }
`;

export interface IProps {
  buttonText: string;
  buttonColor: string;
  textColor: string;
  link: string;
}

const Button: React.FC<IProps> = ({
  buttonText,
  buttonColor,
  textColor,
  link,
}) => {
  let history = useHistory();
  const onClick = (): void => {
    history.push(link);
  };
  return (
    <StyledButton
      onClick={onClick}
      buttonColor={buttonColor}
      textColor={textColor}
    >
      {buttonText}
    </StyledButton>
  );
};

export default Button;
