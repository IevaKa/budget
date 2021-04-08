import firebase, { firestore } from "./firebase";
import { ExpenseCategory } from "../components/AuthForm";

export const createUserProfileDocument = async (
  user: firebase.User,
  expenseCategories?: ExpenseCategory[],
  incomeCategories?: ExpenseCategory[],
  savingsCategories?: ExpenseCategory[]
) => {
  if (!user) return;

  //   get a reference in the database
  const userRef = firestore.doc(`users/${user.uid}`);

  // // go and document from that location
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        expenseCategories,
        incomeCategories,
        savingsCategories,
      });
    } catch (error) {
      console.error("error creating user", error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid: string) => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("error fetching a user", error.message);
  }
};
