import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCUBxokAkKdZ53II1gScQ-fPWu1UCI4To",
    authDomain: "frutas-del-diablo.firebaseapp.com",
    projectId: "frutas-del-diablo",
    storageBucket: "frutas-del-diablo.appspot.com", // Corregido
    messagingSenderId: "178505516028",
    appId: "1:178505516028:web:7a63453561b77ed6c32879",
    measurementId: "G-JCB3E0HCL1"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Base de datos Firestore
const storage = getStorage(app); // Storage para imágenes

export { db, storage };
