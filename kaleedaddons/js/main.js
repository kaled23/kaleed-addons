console.log("تم تحميل main.js");

// وظيفة آمنة لإنشاء عناصر HTML
function createInputElement(type, className, placeholder) {
    const input = document.createElement('input');
    input.type = type;
    input.className = className;
    input.placeholder = placeholder;
    return input;
}

function addLinkField() {
    console.log("جاري إضافة حقل رابط...");
    const container = document.getElementById('links-container');
    const div = document.createElement('div');

    const nameInput = createInputElement('text', 'link-name', 'اسم الرابط');
    const urlInput = createInputElement('url', 'link-url', 'رابط التحميل');

    div.appendChild(nameInput);
    div.appendChild(urlInput);
    container.appendChild(div);
}

document.getElementById('addon-form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("جاري إرسال المود...");
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const links = [];
    const linkNames = document.querySelectorAll('.link-name');
    const linkUrls = document.querySelectorAll('.link-url');

    
    if (linkNames.length === linkUrls.length) {
        linkNames.forEach((name, i) => {
            const url = linkUrls[i].value;
            if (name.value && url) {
                links.push({ name: name.value, url });
                console.log("رابط مضاف:", name.value, url);
            }
        });
    } else {
        console.error("خطأ: عدد أسماء الروابط لا يتطابق مع عدد الروابط.");
        alert("حدث خطأ: عدد أسماء الروابط لا يتطابق مع عدد الروابط.");
        return;
    }

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

        
        const linksContainer = document.getElementById('links-container');
        linksContainer.innerHTML = ''; 
        addLinkField(); 
        loadAddons();
    }).catch(error => {
        console.error("خطأ أثناء إضافة المود:", error);
        alert('حدث خطأ: ' + error.message);
    });
});

function loadAddons() {
    console.log("جاري تحميل المودات في admin...");
    const addonsList = document.getElementById('admin-addons-list');
    addonsList.innerHTML = '<p>جاري التحميل...</p>'; 

    const db = firebase.firestore();
    db.collection('addons').get().then((querySnapshot) => {
        if (querySnapshot.empty) {
            console.log("لا توجد مودات في admin!");
            addonsList.innerHTML = "<p>لا توجد إضافات حاليًا.</p>";
        } else {
            const addonsHtml = []; 
            querySnapshot.forEach((doc) => {
                const addon = doc.data();
                console.log("مود في admin:", addon.title);
                
                const cleanTitle = DOMPurify.sanitize(addon.title);
                const cleanDescription = DOMPurify.sanitize(addon.description);
                addonsHtml.push(`
                    <div class="addon-card">
                        <h3>${cleanTitle}</h3>
                        <p>${cleanDescription}</p>
                        <button onclick="deleteAddon('${doc.id}')">حذف</button>
                    </div>
                `);
            });
            addonsList.innerHTML = addonsHtml.join(''); 
        }
    }).catch(error => {
        console.error("خطأ أثناء تحميل المودات:", error);
        addonsList.innerHTML = "<p>حدث خطأ أثناء تحميل الإضافات.</p>";
    });
}

function deleteAddon(id) {
    if (confirm('هل أنت متأكد من أنك تريد حذف هذا المود؟')) {
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
