import firebase, { auth } from "./firebase";

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const login = (email: string, password: string) =>
  auth.signInWithEmailAndPassword(email, password);

export const signOut = () => auth.signOut();
