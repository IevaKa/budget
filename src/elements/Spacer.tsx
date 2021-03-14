import React from "react";
import styled from "styled-components";

interface ISpacer {
  marginTop: string;
}

const StyledSpacer = styled.div<ISpacer>`
  margin-top: ${({ marginTop }) => marginTop};
`;

const Spacer: React.FC<ISpacer> = ({ marginTop }) => {
  return <StyledSpacer marginTop={marginTop} />;
};

export default Spacer;
