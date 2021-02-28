import firebase, { auth } from "./firebase";

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signOut = () =>
  auth.signOut().then(() => window.location.reload());
