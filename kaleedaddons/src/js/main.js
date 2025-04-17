
import { db } from "./firebase-init.js";
import { collection, addDoc } from "firebase/firestore";

const addonForm = document.getElementById("addon-form");

addonForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const linkName = document.querySelector(".link-name").value;
  const linkURL = document.querySelector(".link-url").value;

  try {
    await addDoc(collection(db, "addons"), {
      name: title,
      description,
      downloadLink: linkURL,
      linkName: linkName
    });
    alert("تمت إضافة المود!");
    addonForm.reset();
  } catch (err) {
    console.error("خطأ أثناء الإضافة:", err);
  }
});
