console.log("تم تحميل main.js");

function addLinkField() {
    console.log("جاري إضافة حقل رابط...");
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
    console.log("جاري إرسال المود...");
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const links = [];
    document.querySelectorAll('.link-name').forEach((name, i) => {
        const url = document.querySelectorAll('.link-url')[i].value;
        if (name.value && url) {
            links.push({ name: name.value, url });
            console.log("رابط مضاف:", name.value, url);
        }
    });

    console.log("البيانات المرسلة:", { title, description, links });

    const db = firebase.firestore();
    db.collection('addons').add({
        title,
        description,
        thumbnail: '',
        links,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("تم إضافة المود بنجاح!");
        alert('تم إضافة المود!');
        document.getElementById('addon-form').reset();
        document.getElementById('links-container').innerHTML = `
            <input type="text" class="link-name" placeholder="اسم الرابط">
            <input type="url" class="link-url" placeholder="رابط التحميل">
        `;
        loadAddons();
    }).catch(error => {
        console.error("خطأ أثناء إضافة المود:", error);
        alert('حدث خطأ: ' + error.message);
    });
});

function loadAddons() {
    console.log("جاري تحميل المودات في admin...");
    const addonsList = document.getElementById('admin-addons-list');
    addonsList.innerHTML = '';
    const db = firebase.firestore();
    db.collection('addons').get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log("لا توجد مودات في admin!");
            addonsList.innerHTML = "<p>لا توجد إضافات حاليًا.</p>";
        } else {
            querySnapshot.forEach((doc) => {
                const addon = doc.data();
                console.log("مود في admin:", addon.title);
                addonsList.innerHTML += `
                    <div class="addon-card">
                        <h3>${addon.title}</h3>
                        <p>${addon.description}</p>
                        <button onclick="deleteAddon('${doc.id}')">حذف</button>
                    </div>
                `;
            });
        }
    }).catch(error => {
        console.error("خطأ أثناء تحميل المودات:", error);
    });
}

function deleteAddon(id) {
    if (confirm('هل أنت متأكد؟')) {
        const db = firebase.firestore();
        db.collection('addons').doc(id).delete().then(() => {
            console.log("تم حذف المود!");
            alert('تم الحذف!');
            loadAddons();
        }).catch(error => {
            console.error("خطأ أثناء الحذف:", error);
            alert('حدث خطأ: ' + error.message);
        });
    }
}

loadAddons();
