import React from "react";
import { authMethods } from "../firebase";

const SignIn: React.FC = () => {
  return (
    <div>
      <button onClick={authMethods.signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
};

export default SignIn;
