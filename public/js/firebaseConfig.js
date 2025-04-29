// js/firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDl--hYj-_2C6rCGZ-YCrzZHAL7YRmvUjI",
  authDomain: "solar-3a236.firebaseapp.com",
  projectId: "solar-3a236",
  storageBucket: "solar-3a236.appspot.com",
  messagingSenderId: "455982612562",
  appId: "1:455982612562:web:171f109e99673c5cb85f8b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();