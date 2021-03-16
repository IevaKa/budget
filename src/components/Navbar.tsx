import React from "react";
import styled from "styled-components";
import { authMethods } from "../firebase";
import { OFF_WHITE, DARK_BLUE } from "../constants/colors";
import Button from "../elements/Button";
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: flex;
  height: 9vh;
  width: 100%;
  padding: 1rem;
  padding-top: 0.8rem;
  background-color: ${OFF_WHITE};
  justify-content: flex-end;
`;

const UserName = styled.p`
  margin-right: 1rem;
  margin-top: 5px;
`;

const Navbar: React.FC = () => {
  return (
    <Wrapper>
      {auth.currentUser !== null && (
        <UserName>{auth.currentUser.email}</UserName>
      )}
      <Button
        buttonText="Logout"
        width="100px"
        height="35px"
        textSize="14px"
        buttonColor={OFF_WHITE}
        hoverColor={DARK_BLUE}
        buttonShadow={false}
        onClick={authMethods.signOut}
        border={`1px solid ${DARK_BLUE}`}
        hoverTextColor={OFF_WHITE}
      />
    </Wrapper>
  );
};

export default Navbar;
