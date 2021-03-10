import React from "react";
import styled from "styled-components";

interface ButtonProps {
  buttonColor: string;
  hoverColor: string;
  textColor?: string;
  textSize?: string;
  fontWeight?: number;
}

const StyledButton = styled.button<ButtonProps>`
  width: 100%;
  margin-top: 1rem;
  height: 48px;
  border: 0;
  border-radius: 5px;
  font-family: inherit;
  font-size: ${({ textSize }) => (textSize ? textSize : "18px")};
  font-weight: ${({ fontWeight }) => (fontWeight ? fontWeight : 600)};
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
    background-color: ${(props) => props.hoverColor};
  }
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 0.5rem;
  margin-bottom: -0.2rem;
`;

export interface IProps {
  buttonText: string;
  textSize?: string;
  fontWeight?: number;
  buttonColor: string;
  hoverColor: string;
  textColor?: string;
  iconPath?: string;
  onClick?: () => {};
}

const Button: React.FC<IProps> = ({
  buttonText,
  textSize,
  fontWeight,
  buttonColor,
  hoverColor,
  textColor,
  iconPath,
  onClick,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      buttonColor={buttonColor}
      textColor={textColor}
      hoverColor={hoverColor}
      textSize={textSize}
      fontWeight={fontWeight}
    >
      {iconPath && <Icon src={iconPath} alt=""></Icon>}
      {buttonText}
    </StyledButton>
  );
};

export default Button;
