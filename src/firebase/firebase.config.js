import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWMYu6d1IvcToXwgQanu9OnI8mUdMgQII",
  authDomain: "email-firebase-78d95.firebaseapp.com",
  projectId: "email-firebase-78d95",
  storageBucket: "email-firebase-78d95.appspot.com",
  messagingSenderId: "83328067626",
  appId: "1:83328067626:web:0c84df2ccc475bc828bb53"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;