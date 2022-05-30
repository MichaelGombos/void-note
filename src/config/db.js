// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { getAnalytics } from "firebase/analytics";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7BRQktoWIOR0xqL0uK3fn33sH99amufU",
  authDomain: "voidnotedemo.firebaseapp.com",
  databaseURL: "https://voidnotedemo-default-rtdb.firebaseio.com",
  projectId: "voidnotedemo",
  storageBucket: "voidnotedemo.appspot.com",
  messagingSenderId: "859599880706",
  appId: "1:859599880706:web:d389292da37f07b4589d1b",
  measurementId: "G-9YFM1WVS43"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const db = firebaseApp.firestore();
const analytics = getAnalytics(firebaseApp);

export default db;