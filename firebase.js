import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBSpA1Qcass3V6_PbPaQxL0Um_NTekUO5Q",
  authDomain: "borang-f-jabatan-pembangunan.firebaseapp.com",
  projectId: "borang-f-jabatan-pembangunan",
  storageBucket: "borang-f-jabatan-pembangunan.firebasestorage.app",
  messagingSenderId: "549863540285",
  appId: "1:549863540285:web:985fa51a35280edc3f0c54"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
