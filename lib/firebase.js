import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } = process.env;

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
