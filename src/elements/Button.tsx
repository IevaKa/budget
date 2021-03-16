import React from "react";
import styled from "styled-components";

interface ButtonProps {
  buttonColor: string;
  hoverColor: string;
  border?: string;
  width?: string;
  height?: string;
  textColor?: string;
  hoverTextColor?: string;
  textSize?: string;
  fontWeight?: number;
  buttonShadow: boolean;
}

interface IProps extends ButtonProps {
  buttonText: string;
  iconPath?: string;
  type?: "submit" | "button";
  onClick?: () => void;
}

const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "48px"};
  border: ${({ border }) => border || "0"};
  border-radius: 5px;
  font-family: inherit;
  font-size: ${({ textSize }) => textSize || "18px"};
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  cursor: pointer;
  position: relative;
  top: 0;
  transition: background-color 0.5s ease-out;
  background-color: ${(props) => props.buttonColor};
  color: ${(props) => props.textColor || "inherit"};
  filter: ${({ buttonShadow }) =>
    buttonShadow ? "drop-shadow(3px 4px 6px rgba(36, 44, 66, 0.25))" : ""};
  &:focus {
    outline: 0;
  }
  &:hover {
    top: -1px;
    background-color: ${(props) => props.hoverColor};
    color: ${({ hoverTextColor }) => hoverTextColor || "inherit"};
  }
`;

const Icon = styled.img`
  width: 20px;
  margin-right: 0.5rem;
  margin-bottom: -0.2rem;
`;

const Button: React.FC<IProps> = ({
  buttonText,
  width,
  height,
  border,
  buttonShadow,
  textSize,
  fontWeight,
  buttonColor,
  hoverColor,
  hoverTextColor,
  textColor,
  iconPath,
  type,
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
      buttonShadow={buttonShadow}
      width={width}
      height={height}
      border={border}
      hoverTextColor={hoverTextColor}
      type={type}
    >
      {iconPath && <Icon src={iconPath} alt=""></Icon>}
      {buttonText}
    </StyledButton>
  );
};

export default Button;
