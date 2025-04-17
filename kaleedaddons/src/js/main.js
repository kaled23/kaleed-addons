import { db } from './firebase-init.js';
import { collection, addDoc } from 'firebase/firestore';

const form = document.getElementById('addon-form');
const addLinkBtn = document.getElementById('add-link');
const linksContainer = document.getElementById('links-container');


addLinkBtn.addEventListener('click', () => {
  const linkGroup = document.createElement('div');
  linkGroup.classList.add('link-group');
  linkGroup.innerHTML = 
    <input type="text" class="link-name" placeholder="اسم الرابط">
    <input type="url" class="link-url" placeholder="رابط التحميل">
  ;
  linksContainer.appendChild(linkGroup);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();

  const linkNames = document.querySelectorAll('.link-name');
  const linkUrls = document.querySelectorAll('.link-url');
  const links = [];

  for (let i = 0; i < linkNames.length; i++) {
    const name = linkNames[i].value.trim();
    const url = linkUrls[i].value.trim();
    if (name && url) {
      links.push({ name, url });
    }
  }

  try {
    await addDoc(collection(db, 'addons'), {
      title,
      description,
      links,
      createdAt: new Date()
    });

    alert('تمت إضافة المود بنجاح!');
    form.reset();
    linksContainer.innerHTML = 
      <div class="link-group">
        <input type="text" class="link-name" placeholder="اسم الرابط">
        <input type="url" class="link-url" placeholder="رابط التحميل">
      </div>
    ;

  } catch (error) {
    console.error('خطأ في الإضافة:', error.message);
    alert('فشل في الإضافة، حاول مرة أخرى.');
  }
});
