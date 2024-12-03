// firebase.config.js
import { initializeApp } from "firebase/app";

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
const app = initializeApp(firebaseConfig);

export default app;
