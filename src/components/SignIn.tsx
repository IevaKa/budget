import React, { useState } from "react";
import { auth, db, authMethods } from "../firebase";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (user !== null) {
        db.createUserProfileDocument(user);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form className="SignUp" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value="Sign Up" />
      </form>
      <button onClick={authMethods.signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
};

export default SignIn;
