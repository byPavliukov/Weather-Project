setInterval(function () {
    document.querySelector('.date-time').innerHTML = (new Date()).toLocaleString();
}, 1000)

const param = {
    "url": "https://api.openweathermap.org/data/2.5",
    "appid": "47edbcf8f0327c86b7883a2a8ca3d21f"
}
let dt = new Date();
let hour = dt.getHours();
if (hour >= 4 && hour < 6) {
    // ... придаём body градиент с цветами и придаём свойство cover в размер фона.
    document.querySelector('body').style.backgroundImage = "linear-gradient(to top right, #ff8080, #4d79ff)";
} else if (hour >= 7 && hour < 9) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to right, #ffff80, #b3d9ff, #3385ff)";
    // Здесь придаём цвет шрифту...
    document.querySelector('body').style.color = "black";
    // ... придаём цвет блокам с основной информацией в определённое время
    document.querySelector('.subcontainer-info').style.backgroundColor = "#ffb3b3";
} else if (hour >= 9 && hour < 12) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to bottom right, #ffff80, #b3d9ff, #3385ff)";
    document.querySelector('body').style.color = "#333233";
    document.querySelector('.subcontainer-info').style.backgroundColor = "#99bbff";
} else if (hour >= 12 && hour < 15) {
    document.querySelector('.subcontainer-info').style.backgroundColor = "#b3ccff";
    document.querySelector('body').style.backgroundImage = "linear-gradient(to bottom, #ffff80, #b3d9ff, #3385ff)";
} else if (hour >= 15 && hour < 17) {
    document.querySelector('.subcontainer-info').style.backgroundColor = "#99bbff";
    document.querySelector('body').style.backgroundImage = "linear-gradient(to left bottom, #ffff80, #b3d9ff, #3385ff)";
} else if (hour >= 17 && hour < 19) {
    document.querySelector('.subcontainer-info').style.backgroundColor = "#00bfff";
    document.querySelector('body').style.backgroundImage = "linear-gradient(to left, #ffff80, #b3d9ff, #3385ff)";
} else if (hour >= 19 && hour < 20) {
    document.querySelector('.subcontainer-info').style.backgroundColor = "#719cd6";
    document.querySelector('body').style.backgroundImage = "linear-gradient(to top left, #3385ff, #0080ff, #a4a8a6)";
} else if (hour >= 20 && hour < 22) {
    document.querySelector('.subcontainer-info').style.backgroundColor = "#719cac";
    document.querySelector('body').style.backgroundImage = "linear-gradient(to top left, #0080ff, #a4a8a6)";
} else if (hour >= 22 && hour < 23) {
    document.querySelector('.subcontainer-info').style.backgroundColor = "#6666ff";
    document.querySelector('body').style.backgroundImage = "linear-gradient(to bottom, #a4a8a6, #0c0891)";
} else {
    document.querySelector('body').style.background = "#0c0891";
    document.querySelector('body').style.color = "whitesmoke";
    document.querySelector('.subcontainer-info').style.backgroundColor = "#6666ff";
}

let subCont = document.querySelector('.subcontainer');
let select = document.createElement("select");
select.id = "city";
select.className = "city bd-r-10 outline-none select-text";
subCont.appendChild(select);
for (let key in cities) {
    let option = document.createElement('option');
    select.appendChild(option);
    option.value = key;
    option.innerHTML = cities[key];
}

function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}/weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    // Main block
    document.querySelector('.curr-temp').innerHTML = `<b>${Math.floor(data.main.temp)}</b>&deg;C`;
    document.querySelector('.icon-weather').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`;
    let description = data.weather[0].description;
    let fLetter = description.slice(0, 1).toUpperCase();
    fLetter = fLetter + description.slice(1);
    document.querySelector('.about-weather').innerHTML = `<b>${fLetter}</b>`;

    // Block information
    document.querySelector('.min-temp').innerHTML = `${Math.floor(data.main.temp_min)}&deg;C`;
    document.querySelector('.max-temp').innerHTML = `${Math.floor(data.main.temp_max)}&deg;C`;
    document.querySelector('.hum').innerHTML = `${data.main.humidity}%`;
    document.querySelector('.pres').innerHTML = `${data.main.pressure}hPA`;
    document.querySelector('.wind-sp').innerHTML = `${data.wind.speed}m/s`;
    document.querySelector('.wind-dg').innerHTML = `${data.wind.deg}&deg; <img src="img/arrow.png" width="12px" class="text-center img-arrow">`;
    document.querySelector('.img-arrow').style.transform = `rotate(${data.wind.deg}deg)`;
}
getWeather();
document.querySelector('#city').onchange = getWeather;

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
