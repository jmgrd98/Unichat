import firebase from "firebase/app";
import 'firebase/auth';

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyD58x2LYYtwACQqgG16Q4fJMJ7Jp5Klv-U",
    authDomain: "unichat-9cd4a.firebaseapp.com",
    projectId: "unichat-9cd4a",
    storageBucket: "unichat-9cd4a.appspot.com",
    messagingSenderId: "129151243245",
    appId: "1:129151243245:web:74b41101a9a49907af8de4",
    measurementId: "G-MFBDB628MX"
  }).auth();