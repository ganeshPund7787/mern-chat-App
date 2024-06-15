// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: "mern-chat-app-1998a.firebaseapp.com",
    projectId: "mern-chat-app-1998a",
    storageBucket: "mern-chat-app-1998a.appspot.com",
    messagingSenderId: "988469611468",
    appId: "1:988469611468:web:f62c10a921bdec1da86b69"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);