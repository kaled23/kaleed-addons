const db = firebase.firestore();

function addLinkField() {
    const container = document.getElementById('links-container');
    const div = document.createElement('div');
    div.innerHTML = `
        <input type="text" class="link-name" placeholder="اسم الرابط">
        <input type="url" class="link-url" placeholder="رابط التحميل">
    `;
    container.appendChild(div);
}

document.getElementById('addon-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const links = [];
    document.querySelectorAll('.link-name').forEach((name, i) => {
        const url = document.querySelectorAll('.link-url')[i].value;
        if (name.value && url) links.push({ name: name.value, url });
    });

    db.collection('addons').add({
        title,
        description,
        thumbnail: '',
        links
    }).then(() => {
        alert('تم إضافة المود!');
        document.getElementById('addon-form').reset();
        document.getElementById('links-container').innerHTML = `
            <input type="text" class="link-name" placeholder="اسم الرابط">
            <input type="url" class="link-url" placeholder="رابط التحميل">
        `;
        loadAddons();
    }).catch(error => {
        console.error('خطأ:', error);
        alert('حدث خطأ.');
    });
});

function loadAddons() {
    const addonsList = document.getElementById('admin-addons-list');
    addonsList.innerHTML = '';
    db.collection('addons').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const addon = doc.data();
            addonsList.innerHTML += `
                <div class="addon-card">
                    <h3>${addon.title}</h3>
                    <p>${addon.description}</p>
                    <button onclick="deleteAddon('${doc.id}')">حذف</button>
                </div>
            `;
        });
    });
}

function deleteAddon(id) {
    if (confirm('هل أنت متأكد؟')) {
        db.collection('addons').doc(id).delete().then(() => {
            alert('تم الحذف!');
            loadAddons();
        }).catch(error => {
            console.error('خطأ:', error);
            alert('حدث خطأ.');
        });
    }
}

loadAddons();
