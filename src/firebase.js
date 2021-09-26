import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyD8mWC5hIFipL3ne5i0kCHE9azXi_l_1hQ",
  authDomain: "whatsappclone-d20da.firebaseapp.com",
  projectId: "whatsappclone-d20da",
  storageBucket: "whatsappclone-d20da.appspot.com",
  messagingSenderId: "1038292372967",
  appId: "1:1038292372967:web:bd761eeff920b4d3c54142",
  measurementId: "G-SMQYLKHFYK",
});

const db = firebaseApp.firestore();

const auth = firebase.auth();

export { db, auth };
