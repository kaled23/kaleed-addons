console.log("جاري تهيئة Firebase...");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};
try {
    firebase.initializeApp(firebaseConfig);
    console.log("تم تهيئة Firebase بنجاح!");
    firebase.firestore().collection('test').doc('check').set({ test: 'ok' })
        .then(() => console.log("اختبار Firestore ناجح!"))
        .catch(error => console.error("خطأ في اختبار Firestore:", error));
} catch (error) {
    console.error("خطأ في تهيئة Firebase:", error);
}
