// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  /*apiKey: "AIzaSyDI4OBEa7Zh7w0mo9G-dyYf0cjjSQx_uwI",
  authDomain: "magic-post-21f3f.firebaseapp.com",
  projectId: "magic-post-21f3f",
  storageBucket: "magic-post-21f3f.appspot.com",
  messagingSenderId: "968165012418",
  appId: "1:968165012418:web:d60163f26d79ac342cdc5b"*/

  apiKey: "AIzaSyB4iOWmclb_p_YVm8QdUIO9o6RECiXYsvo",
  authDomain: "magicpost-224ab.firebaseapp.com",
  projectId: "magicpost-224ab",
  storageBucket: "magicpost-224ab.appspot.com",
  messagingSenderId: "439957681033",
  appId: "1:439957681033:web:e686930222e6e3e9d0e758",
  measurementId: "G-9VLC22ZD47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const fireAuth = getAuth(app);

export {fireAuth, fireDB};