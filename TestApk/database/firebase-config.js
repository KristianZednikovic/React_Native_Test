import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { useState } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyBeaUdkHePNiMcz-dEzNoRjEM6w_7RiQXc",
  authDomain: "gym-app-b394b.firebaseapp.com",
  projectId: "gym-app-b394b",
  storageBucket: "gym-app-b394b.appspot.com",
  messagingSenderId: "528630688246",
  appId: "1:528630688246:web:a3758b1ebc018e2db73fd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
