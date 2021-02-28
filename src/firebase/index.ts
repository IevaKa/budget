import firebase, { auth } from "./firebase";
import { signInWithGoogle, signOut } from "./auth";
import { createUserProfileDocument } from "./database";

export { firebase, auth, signInWithGoogle, createUserProfileDocument, signOut };
