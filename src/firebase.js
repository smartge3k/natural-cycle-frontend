// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD7m-WGuxMsXdnGC0rtz7EYdjRZjTh7jvA",
    authDomain: "phoneauthentication-2448a.firebaseapp.com",
    projectId: "phoneauthentication-2448a",
    storageBucket: "phoneauthentication-2448a.appspot.com",
    messagingSenderId: "297348814763",
    appId: "1:297348814763:web:00c0feb281973f59c8a4ee",
    measurementId: "G-1P2P5KBSN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  authentication = getAuth(app);