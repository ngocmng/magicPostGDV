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

  /*apiKey: "AIzaSyB4iOWmclb_p_YVm8QdUIO9o6RECiXYsvo",
  authDomain: "magicpost-224ab.firebaseapp.com",
  projectId: "magicpost-224ab",
  storageBucket: "magicpost-224ab.appspot.com",
  messagingSenderId: "439957681033",
  appId: "1:439957681033:web:e686930222e6e3e9d0e758",
  measurementId: "G-9VLC22ZD47"*/

  apiKey: "AIzaSyCg-SU9S_yVnp_vxA5BRFIO1lNbx06V9fo",
  authDomain: "magicpost3-ba622.firebaseapp.com",
  projectId: "magicpost3-ba622",
  storageBucket: "magicpost3-ba622.appspot.com",
  messagingSenderId: "334397849352",
  appId: "1:334397849352:web:70b1756d864cff7a1636bd",
  measurementId: "G-450ZSZFBZ0"

  /*apiKey: "AIzaSyCG6zch6v-W3ApPpif3CtujmiOGxg9ONOM",
  authDomain: "test4-cb0a8.firebaseapp.com",
  projectId: "test4-cb0a8",
  storageBucket: "test4-cb0a8.appspot.com",
  messagingSenderId: "1017266786136",
  appId: "1:1017266786136:web:de5dcef77dadd0bccf1f2d"*/

  /*apiKey: "AIzaSyCH-TqqjjrgWJDTIkrb-M1NGPWphEGvKbM",
  authDomain: "test-76d97.firebaseapp.com",
  projectId: "test-76d97",
  storageBucket: "test-76d97.appspot.com",
  messagingSenderId: "986134292791",
  appId: "1:986134292791:web:eeba1c111f6e9f534392b2"*/

  /*apiKey: "AIzaSyBnBaKJk_zc01_XmgR5A_mjv5cKGWypY2I",
  authDomain: "magic-post2.firebaseapp.com",
  projectId: "magic-post2",
  storageBucket: "magic-post2.appspot.com",
  messagingSenderId: "746792341563",
  appId: "1:746792341563:web:f3f3ede47e51bfa191cc1e"*/

  /*apiKey: "AIzaSyBrUUxrvEmUl5KJ1DCoFxFDeuYVfKTIsww",
  authDomain: "magic-post1.firebaseapp.com",
  projectId: "magic-post1",
  storageBucket: "magic-post1.appspot.com",
  messagingSenderId: "318952366608",
  appId: "1:318952366608:web:94a5c380dcac947e01a095"*/
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const fireAuth = getAuth(app);

export {fireAuth, fireDB};