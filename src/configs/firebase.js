// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBX-bcVW22dRwtdCGrVb9m_fFKInxMzGYo",
  authDomain: "dtuparking.firebaseapp.com",
  databaseURL: "https://dtuparking.firebaseio.com",
  projectId: "dtuparking",
  storageBucket: "dtuparking.appspot.com",
  messagingSenderId: "1059316722935",
  appId: "1:1059316722935:web:1e69b103a0fd02a5cdf7f2",
  measurementId: "G-ZKSEMW84DK"
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseProviders = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export { firebaseApp, firebaseProviders }
