
setInterval(() => {
    document.querySelector('.date').innerHTML = (new Date()).toLocaleString();
}, 1000);

const allLang = ['en', 'ru', 'ua'];

let selectLang = document.querySelector('#language');
function changeURLLanguage() {
    let lang = selectLang.value;
    location.href = `${window.location.pathname}#${lang}`;
    location.reload();
}
selectLang.onchange = changeURLLanguage;

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    if (!allLang.includes(hash)) {
        location.href = `${window.location.pathname}#en`;
        location.reload();
    }
    selectLang.value = hash;
    for (let key in addLang) {
        let elem = document.querySelector('.lang-' + key);
        if (elem) {
            elem.innerHTML = addLang[key][hash];
        }
    }
}

changeLanguage();
