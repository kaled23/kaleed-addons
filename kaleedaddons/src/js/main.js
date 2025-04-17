import { db } from './firebase-init.js';
import { collection, addDoc } from 'firebase/firestore';


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


const form = document.getElementById('addon-form');

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
    
    const extraLinks = document.querySelectorAll('.link-group');
    if (extraLinks.length > 1) {
      for (let i = 1; i < extraLinks.length; i++) {
        extraLinks[i].remove();
      }
    }

  } catch (error) {
    console.error('حدث خطأ أثناء الإضافة:', error.message);
    alert('فشل في إضافة المود، حاول مرة أخرى.');
  }
});
