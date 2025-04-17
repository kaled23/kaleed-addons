import { db } from "./firebase-init.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

console.log("تم تحميل main.js");

export function addLinkField() {
    console.log("جاري تنفيذ addLinkField...");
    try {
        const container = document.getElementById('links-container');
        if (!container) {
            throw new Error("links-container غير موجود في DOM!");
        }
        const div = document.createElement('div');
        div.className = 'link-group';
        div.innerHTML = `
            <input type="text" class="link-name" placeholder="اسم الرابط">
            <input type="url" class="link-url" placeholder="رابط التحميل">
        `;
        container.appendChild(div);
        console.log("تم إضافة حقل رابط جديد بنجاح!");
    } catch (error) {
        console.error("خطأ في إضافة حقل رابط:", error.message);
    }
}

const addonForm = document.getElementById('addon-form');
if (addonForm) {
    console.log("تم العثور على addon-form، جاري تهيئة الـ submit...");
    addonForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log("جاري إرسال المود...");
        try {
            const title = document.getElementById('title').value;
            const description = document.getElementById('description').value;
            const links = [];
            document.querySelectorAll('.link-name').forEach((name, i) => {
                const url = document.querySelectorAll('.link-url')[i].value;
                if (name.value && url) {
                    links.push({ name: name.value, url });
                }
            });

            console.log("البيانات المرسلة:", { title, description, links });

            if (!db) {
                throw new Error("Firestore db غير مهيأ!");
            }

            await addDoc(collection(db, 'addons'), {
                title: title || "مود بدون عنوان",
                description: description || "بدون وصف",
                thumbnail: '',
                links: links.length ? links : [{ name: "بدون رابط", url: "https://example.com" }],
                createdAt: serverTimestamp()
            });

            console.log("نجاح: تم إضافة المود إلى Firestore!");
            alert("تم إضافة المود بنجاح!");
            addonForm.reset();
            document.getElementById('links-container').innerHTML = `
                <input type="text" class="link-name" placeholder="اسم الرابط">
                <input type="url" class="link-url" placeholder="رابط التحميل">
            `;
        } catch (error) {
            console.error("خطأ في إضافة المود:", error.message);
            alert("خطأ في إضافة المود: " + error.message);
        }
    });
} else {
    console.error("خطأ: addon-form غير موجود في DOM!");
}
