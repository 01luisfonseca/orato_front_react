import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getEnvironment } from "./environment";

const firebaseEnvironment = getEnvironment("FIREBASE_ENVIRONMENT");
const firebaseConfig = JSON.parse(firebaseEnvironment);
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
