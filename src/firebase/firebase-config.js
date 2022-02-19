import firebase from 'firebase/compat/app';
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMIAN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,

  };
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  
  const db= getFirestore(app);

  const googleAuthProvider= new GoogleAuthProvider();
  


  export {
      db,
      googleAuthProvider,
      firebase
  }