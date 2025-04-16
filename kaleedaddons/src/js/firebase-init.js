import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc, serverTimestamp } from "firebase/firestore";

console.log("جاري تهيئة Firebase...");

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// اختبار الاتصال
setDoc(doc(collection(db, 'test'), 'vite-check'), {
    status: 'vite-working',
    timestamp: serverTimestamp()
}).then(() => {
    console.log("نجاح: Firestore متصل!");
}).catch(error => {
    console.error("فشل الاتصال بـ Firestore:", error.message);
});

console.log("تم تهيئة Firebase بنجاح!");
export { app, db };
