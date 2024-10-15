import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import app from "./firebase.config";

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Configure Google Authentication Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account", // Prompts user to select a Google account
});

// Sign in with Google Popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Create a user document in Firestore from auth data
export const createUserDocumentFromAuth = async (userAuth, additional = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid); // Get a reference to the user document
  const userSnapshot = await getDoc(userDocRef); // Retrieve user document

  // If the document doesn't exist, create it
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additional, // Additional data (if any)
      });
    } catch (error) {
      console.error("Error creating the user", error);
    }
  }

  return userSnapshot;
};

// Create a new user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out the current user
export const signOutUser = async () => await signOut(auth);

// Listener to track authentication state changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getCurrentUser=()=>{
  return new Promise((resolve,reject)=>{
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    },reject)
  })
}

// Add a batch of documents to a collection in Firestore
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); 
  const batch = writeBatch(db); // Create a batch write

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); 
    batch.set(docRef, object); // Add each document to the batch
  });

  await batch.commit(); // Commit the batch
  console.log("Collection added successfully");
};

// Fetch categories and their documents from Firestore
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef); // Define the query
  const querySnapshot = await getDocs(q); // Execute the query
  return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());

  // // Reduce the query result to a categories object
  // return querySnapshot.docs.reduce((acc, docSnapShot) => {
  //   const { title, items } = docSnapShot.data();
  //   acc[title.toLowerCase()] = items; // Add category items to accumulator
  //   return acc;
  // }, {});
};

/**
 * Why query and writeBatch?
 * - `query` allows flexibility to easily add filtering and sorting conditions later (e.g., where, orderBy, limit).
 * - `writeBatch()` is used for efficient and atomic operations. All writes in the batch either succeed or fail together.
 */
