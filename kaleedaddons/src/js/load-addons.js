
import { db } from "./firebase-init.js";
import { collection, getDocs } from "firebase/firestore";

const container = document.getElementById("addons-list");

async function fetchAddons() {
  const querySnapshot = await getDocs(collection(db, "addons"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const div = document.createElement("div");
    div.innerHTML = 
      <h3>${data.name}</h3>
      <p>${data.description}</p>
      <a href="${data.downloadLink}" target="_blank">${data.linkName || "تحميل"}</a>
    ;
    container.appendChild(div);
  });
}

fetchAddons();
