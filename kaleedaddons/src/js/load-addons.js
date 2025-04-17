
import { db } from "./firebase-init.js";
import { collection, getDocs } from "firebase/firestore";

const container = document.getElementById("addons-list");

async function loadAddons() {
  try {
    const querySnapshot = await getDocs(collection(db, "addons"));
    if (querySnapshot.empty) {
      container.innerHTML = "<p>لا توجد إضافات حاليًا.</p>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const linksHTML = data.links
        ? data.links.map(link => <li><a href="${link.url}" target="_blank">${link.name}</a></li>).join("")
        : '<li>لا توجد روابط</li>';

      const addonHTML = 
        <div class="addon-card">
          <h3>${data.name}</h3>
          <p>${data.description}</p>
          <div>
            <strong>الروابط:</strong>
            <ul>${linksHTML}</ul>
          </div>
        </div>
      ;
      container.innerHTML += addonHTML;
    });
  } catch (error) {
    console.error("خطأ في تحميل المودات:", error);
    container.innerHTML = "<p>حدث خطأ أثناء تحميل الإضافات.</p>";
  }
}

// تنفيذ التحميل
loadAddons();
