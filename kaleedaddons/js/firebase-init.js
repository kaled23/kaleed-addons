console.log("جاري تهيئة Firebase...");

// التحقق من وجود متغيرات البيئة
if (!process.env.FIREBASE_API_KEY ||
    !process.env.FIREBASE_AUTH_DOMAIN ||
    !process.env.FIREBASE_PROJECT_ID ||
    !process.env.FIREBASE_STORAGE_BUCKET ||
    !process.env.FIREBASE_MESSAGING_SENDER_ID ||
    !process.env.FIREBASE_APP_ID) {
    console.error("خطأ: بعض متغيرات البيئة الخاصة بتكوين Firebase مفقودة.");
} else {
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

        // اختبار Firestore باستخدام async/await
        async function testFirestore() {
            try {
                await firebase.firestore().collection('test').doc('check').set({ test: 'ok' });
                console.log("اختبار Firestore ناجح!");
            } catch (error) {
                console.error("خطأ في اختبار Firestore:", error);
            }
        }
        testFirestore();

    } catch (error) {
        console.error("خطأ في تهيئة Firebase:", error);
    }
}
