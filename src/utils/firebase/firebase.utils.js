import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
//   signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDcdPYwrs_KVVN5fPI4lkmYH1VfSDW5o6I",
  authDomain: "crown-clothing-db-ef222.firebaseapp.com",
  projectId: "crown-clothing-db-ef222",
  storageBucket: "crown-clothing-db-ef222.appspot.com",
  messagingSenderId: "913545812425",
  appId: "1:913545812425:web:3e7ac86ef65ce714ee7018",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account", //force user to select an account
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUerDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  //If user data does not exist, create or set the document with data from `userAuth`. This is used for new users.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error);
    }
  }

  //if user dota exists,return
  return userDocRef;
};
