import React from "react";
import { signInWithGoogle } from "../firebase";

const SignIn: React.FC = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Sign in with google</button>
    </div>
  );
};

export default SignIn;
