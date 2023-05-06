import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyCAzyLwpruNffUtT6xIJ1-dQJIa9qnGM3c",
  authDomain: "vidtube-app-ac7d0.firebaseapp.com",
  projectId: "vidtube-app-ac7d0",
  storageBucket: "vidtube-app-ac7d0.appspot.com",
  messagingSenderId: "798034315980",
  appId: "1:798034315980:web:90be9ca564adbc28255069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authProvider = new GoogleAuthProvider();
export const db = getFirestore(app);