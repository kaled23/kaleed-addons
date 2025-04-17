// 
import { db } from './firebase-init.js';
import { collection, addDoc } from 'firebase/firestore';

const form = document.getElementById('addon-form');
const linksContainer = document.getElementById('links-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  const links = [];
  const nameInputs = document.querySelectorAll('.link-name');
  const urlInputs = document.querySelectorAll('.link-url');

  for (let i = 0; i < nameInputs.length; i++) {
    const name = nameInputs[i].value.trim();
    const url = urlInputs[i].value.trim();
    if (name && url) links.push({ name, url });
  }

  try {
    await addDoc(collection(db, 'addons'), {
      name: title,
      description,
      links,
    });

    alert('تمت إضافة المود بنجاح!');
    form.reset();
  } catch (error) {
    console.error("فشل إضافة المود:", error.message);
    alert('حدث خطأ أثناء الإضافة');
  }
});

window.addLinkField = () => {
  const div = document.createElement('div');
  div.innerHTML = 
    <input type="text" class="link-name" placeholder="اسم الرابط">
    <input type="url" class="link-url" placeholder="رابط التحميل">
  ;
  linksContainer.appendChild(div);
};
