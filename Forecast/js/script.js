const param = {
    "url": "https://api.openweathermap.org/data/2.5",
    "appid": "73d8ec7c9516e366072f0518946547d0",
}

// Анимируем часы в правом углу верхнего блока.
setInterval(function () {
    document.querySelector('.date-now').innerHTML = (new Date()).toLocaleString();
}, 1000)

// Получаем текущую локальную дату
let dt = new Date();

// Получаем часы из этой даты
let hour = dt.getHours();

// Если часы меньше/равно 4:59 и меньше 6:59, то...
if (hour >= 4 && hour < 6) {
    // ... придаём body градиент с цветами и придаём свойство cover в размер фона.
    document.querySelector('body').style.backgroundImage = "linear-gradient(to top right, #ff8080, #4d79ff)";
} else if (hour >= 7 && hour < 9) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to right, #ffff80, #b3d9ff, #3385ff)";
    // Здесь придаём цвет шрифту...
    document.querySelector('body').style.color = "black";
    // ... придаём цвет блокам с основной информацией в определённое время
    document.querySelector('.out-1').style.backgroundColor = "#ffb3b3";
    document.querySelector('.out-2').style.backgroundColor = "#ffb3b3";
    document.querySelector('.out-3').style.backgroundColor = "#ffb3b3";
    document.querySelector('.out-4').style.backgroundColor = "#ffb3b3";
} else if (hour >= 9 && hour < 12) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to bottom right, #ffff80, #b3d9ff, #3385ff)";
    document.querySelector('body').style.color = "#333233";
    document.querySelector('.out-1').style.backgroundColor = "#99bbff";
    document.querySelector('.out-2').style.backgroundColor = "#99bbff";
    document.querySelector('.out-3').style.backgroundColor = "#99bbff";
    document.querySelector('.out-4').style.backgroundColor = "#99bbff";
} else if (hour >= 12 && hour < 15) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to bottom, #ffff80, #b3d9ff, #3385ff)";
    document.querySelector('.out-1').style.backgroundColor = "#b3ccff";
    document.querySelector('.out-2').style.backgroundColor = "#b3ccff";
    document.querySelector('.out-3').style.backgroundColor = "#b3ccff";
    document.querySelector('.out-4').style.backgroundColor = "#b3ccff";
} else if (hour >= 15 && hour < 17) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to left bottom, #ffff80, #b3d9ff, #3385ff)";
    document.querySelector('.out-1').style.backgroundColor = "#99bbff";
    document.querySelector('.out-2').style.backgroundColor = "#99bbff";
    document.querySelector('.out-3').style.backgroundColor = "#99bbff";
    document.querySelector('.out-4').style.backgroundColor = "#99bbff";
} else if (hour >= 17 && hour < 19) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to left, #ffff80, #b3d9ff, #3385ff)";
    document.querySelector('.out-1').style.backgroundColor = "#00bfff";
    document.querySelector('.out-2').style.backgroundColor = "#00bfff";
    document.querySelector('.out-3').style.backgroundColor = "#00bfff";
    document.querySelector('.out-4').style.backgroundColor = "#00bfff";
} else if (hour >= 19 && hour < 20) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to top left, #3385ff, #0080ff, #a4a8a6)";
    document.querySelector('.out-1').style.backgroundColor = "#719cd6";
    document.querySelector('.out-2').style.backgroundColor = "#719cd6";
    document.querySelector('.out-3').style.backgroundColor = "#719cd6";
    document.querySelector('.out-4').style.backgroundColor = "#719cd6";
} else if (hour >= 20 && hour < 22) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to top left, #0080ff, #a4a8a6)";
    document.querySelector('.out-1').style.backgroundColor = "#719cac";
    document.querySelector('.out-2').style.backgroundColor = "#719cac";
    document.querySelector('.out-3').style.backgroundColor = "#719cac";
    document.querySelector('.out-4').style.backgroundColor = "#719cac";
} else if (hour >= 22 && hour < 23) {
    document.querySelector('body').style.backgroundImage = "linear-gradient(to bottom, #a4a8a6, #0c0891)";
    document.querySelector('.out-1').style.backgroundColor = "#6666ff";
    document.querySelector('.out-2').style.backgroundColor = "#6666ff";
    document.querySelector('.out-3').style.backgroundColor = "#6666ff";
    document.querySelector('.out-4').style.backgroundColor = "#6666ff";
} else {
    document.querySelector('body').style.backgroundColor = "#0c0891";
    document.querySelector('body').style.color = "whitesmoke";
    document.querySelector('.out-1').style.backgroundColor = "#004d80";
    document.querySelector('.out-2').style.backgroundColor = "#004d80";
    document.querySelector('.out-3').style.backgroundColor = "#004d80";
    document.querySelector('.out-4').style.backgroundColor = "#004d80";
}

// Получаем API и запускаем функцию вытягивания файла json с сервера openweathermap.com
// Запускаем функцию присвоения данных из data
function getForecast() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}/forecast?id=${cityId}&appid=${param.appid}`)
        .then(forecast => {
            return forecast.json();
        }).then(showForecast);
}
// Присвоение данных из data
function showForecast(data) {
    console.log(data);

    // Блок основной информации
    document.querySelector('.curr-city').innerHTML = `${data.city.name}`;

    document.querySelector('.date').innerHTML = new Date(data.list[0].dt_txt).toUTCString().slice(0, 16);
    document.querySelector('.icon-weather').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png">`;
    document.querySelector('.mmtemp').innerHTML = `${Math.floor(data.list[0].main.temp_max - 273)}&deg;/${Math.floor(data.list[0].main.temp_min - 273)}&deg;`;
    document.querySelector('.about-weather').innerHTML = data.list[0].weather[0].description;

    // Основная информация дополнительного блока
    document.querySelector('.curr-weather').innerHTML = `<b>${Math.floor(data.list[0].main.temp - 273)}&deg;</b>`;
    document.querySelector('.icon-weather-2').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"><br><b>${data.list[0].weather[0].description}</b>`;

    // Дополнительная информация дополнительного блока
    document.querySelector('.min-temp').innerHTML = `${Math.floor(data.list[0].main.temp_min - 273)}&deg;`;
    document.querySelector('.max-temp').innerHTML = `${Math.floor(data.list[0].main.temp_max - 273)}&deg;`;
    document.querySelector('.hum').innerHTML = `${data.list[0].main.humidity}%`;
    document.querySelector('.pres').innerHTML = `${data.list[0].main.pressure}`;
    document.querySelector('.fl').innerHTML = `Feels like ${Math.floor(data.list[0].main.feels_like - 273)}&deg;`;
    document.querySelector('.wind-sp').innerHTML = `${data.list[0].wind.speed}`;
    document.querySelector('.wind-deg').innerHTML = `${data.list[0].wind.deg}&deg;`;
    document.querySelector('.sunrise').innerHTML = `${new Date(data.city.sunrise * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.sunset').innerHTML = `${new Date(data.city.sunset * 1000).toUTCString().slice(17, 22)}`;
  document.querySelector('.img-nav').innerHTML = `<img src="arrow.png" width="16px">`;
    document.querySelector('.img-nav').style.transform = `rotate(${data.list[0].wind.deg}deg) translateY(0%) translateX(0%)`;
    document.querySelector('.clouds').innerHTML = `${data.list[0].clouds.all}%`;


    // Следующий день
    // Блок основной информации 2
    document.querySelector('.curr-city-2').innerHTML = `${data.city.name}`
    document.querySelector('.date-2').innerHTML = new Date(data.list[8].dt_txt).toUTCString().slice(0, 16);
    document.querySelector('.icon-weather-3').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}.png">`;
    document.querySelector('.mmtemp-2').innerHTML = `${Math.floor(data.list[8].main.temp_max - 273)}&deg;/${Math.floor(data.list[8].main.temp_min - 273)}&deg;`;
    document.querySelector('.about-weather-2').innerHTML = data.list[8].weather[0].description;

    // Основная информация дополнительного блока 2
    document.querySelector('.curr-weather-2').innerHTML = `<b>${Math.floor(data.list[8].main.temp - 273)}&deg;</b>`;
    document.querySelector('.icon-weather-4').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[8].weather[0].icon}@2x.png"><br><b>${data.list[8].weather[0].description}</b>`;

    // Дополнительная информация дополнительного блока 2
    document.querySelector('.min-temp-2').innerHTML = `${Math.floor(data.list[8].main.temp_min - 273)}&deg;`;
    document.querySelector('.max-temp-2').innerHTML = `${Math.floor(data.list[8].main.temp_max - 273)}&deg;`;
    document.querySelector('.hum-2').innerHTML = `${data.list[8].main.humidity}%`;
    document.querySelector('.pres-2').innerHTML = `${data.list[8].main.pressure}`;
    document.querySelector('.fl-2').innerHTML = `Feels like ${Math.floor(data.list[8].main.feels_like - 273)}&deg;`;
    document.querySelector('.wind-sp-2').innerHTML = `${data.list[8].wind.speed}`;
    document.querySelector('.wind-deg-2').innerHTML = `${data.list[8].wind.deg}&deg;`;
    document.querySelector('.sunrise-2').innerHTML = `${new Date(data.city.sunrise * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.sunset-2').innerHTML = `${new Date(data.city.sunset * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.img-nav-2').innerHTML = `<img src="arrow.png" width="17px">`;
    document.querySelector('.img-nav-2').style.transform = `rotate(${data.list[8].wind.deg}deg) translateY(0%) translateX(0%)`;
    document.querySelector('.clouds-2').innerHTML = `${data.list[8].clouds.all}%`;

    // Следующий день
    // Блок основной информации 3
    document.querySelector('.curr-city-3').innerHTML = `${data.city.name}`
    document.querySelector('.date-3').innerHTML = new Date(data.list[16].dt_txt).toUTCString().slice(0, 16);
    document.querySelector('.icon-weather-5').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}.png">`;
    document.querySelector('.mmtemp-3').innerHTML = `${Math.floor(data.list[16].main.temp_max - 273)}&deg;/${Math.floor(data.list[16].main.temp_min - 273)}&deg;`;
    document.querySelector('.about-weather-3').innerHTML = data.list[16].weather[0].description;

    // Основная информация дополнительного блока 3
    document.querySelector('.curr-weather-3').innerHTML = `<b>${Math.floor(data.list[16].main.temp - 273)}&deg;</b>`;
    document.querySelector('.icon-weather-6').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[16].weather[0].icon}@2x.png"><br><b>${data.list[16].weather[0].description}</b>`;

    // Дополнительная информация дополнительного блока 3
    document.querySelector('.min-temp-3').innerHTML = `${Math.floor(data.list[16].main.temp_min - 273)}&deg;`;
    document.querySelector('.max-temp-3').innerHTML = `${Math.floor(data.list[16].main.temp_max - 273)}&deg;`;
    document.querySelector('.hum-3').innerHTML = `${data.list[16].main.humidity}%`;
    document.querySelector('.pres-3').innerHTML = `${data.list[16].main.pressure}`;
    document.querySelector('.fl-3').innerHTML = `Feels like ${Math.floor(data.list[16].main.feels_like - 273)}&deg;`;
    document.querySelector('.wind-sp-3').innerHTML = `${data.list[16].wind.speed}`;
    document.querySelector('.wind-deg-3').innerHTML = `${data.list[16].wind.deg}&deg;`;
    document.querySelector('.sunrise-3').innerHTML = `${new Date(data.city.sunrise * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.sunset-3').innerHTML = `${new Date(data.city.sunset * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.img-nav-3').innerHTML = `<img src="arrow.png" width="17px">`;
    document.querySelector('.img-nav-3').style.transform = `rotate(${data.list[16].wind.deg}deg) translateY(0%) translateX(0%)`;
    document.querySelector('.clouds-3').innerHTML = `${data.list[16].clouds.all}%`;

    // Следующий день
    // Блок основной информации 4
    document.querySelector('.curr-city-4').innerHTML = `${data.city.name}`
    document.querySelector('.date-4').innerHTML = new Date(data.list[22].dt_txt).toUTCString().slice(0, 16);
    document.querySelector('.icon-weather-7').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[22].weather[0].icon}.png">`;
    document.querySelector('.mmtemp-4').innerHTML = `${Math.floor(data.list[22].main.temp_max - 273)}&deg;/${Math.floor(data.list[22].main.temp_min - 273)}&deg;`;
    document.querySelector('.about-weather-4').innerHTML = data.list[22].weather[0].description;

    // Основная информация дополнительного блока 4
    document.querySelector('.curr-weather-4').innerHTML = `<b>${Math.floor(data.list[22].main.temp - 273)}&deg;</b>`;
    document.querySelector('.icon-weather-8').innerHTML = `<img src="http://openweathermap.org/img/wn/${data.list[22].weather[0].icon}@2x.png"><br><b>${data.list[22].weather[0].description}</b>`;

    // Дополнительная информация дополнительного блока 4
    document.querySelector('.min-temp-4').innerHTML = `${Math.floor(data.list[22].main.temp_min - 273)}&deg;`;
    document.querySelector('.max-temp-4').innerHTML = `${Math.floor(data.list[22].main.temp_max - 273)}&deg;`;
    document.querySelector('.hum-4').innerHTML = `${data.list[22].main.humidity}%`;
    document.querySelector('.pres-4').innerHTML = `${data.list[22].main.pressure}`;
    document.querySelector('.fl-4').innerHTML = `Feels like ${Math.floor(data.list[22].main.feels_like - 273)}&deg;`;
    document.querySelector('.wind-sp-4').innerHTML = `${data.list[22].wind.speed}`;
    document.querySelector('.wind-deg-4').innerHTML = `${data.list[22].wind.deg}&deg;`;
    document.querySelector('.sunrise-4').innerHTML = `${new Date(data.city.sunrise * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.sunset-4').innerHTML = `${new Date(data.city.sunset * 1000).toUTCString().slice(17, 22)}`;
    document.querySelector('.img-nav-4').innerHTML = `<img src="arrow.png" width="17px">`;
    document.querySelector('.img-nav-4').style.transform = `rotate(${data.list[22].wind.deg}deg) translateY(0%) translateX(0%)`;
    document.querySelector('.clouds-4').innerHTML = `${data.list[22].clouds.all}%`;
}
getForecast();
// При изменении в select - запускаем функцию.
document.querySelector('#city').onchange = getForecast;


// Функции открытия и закрытия блоков с дополнительной информацией
document.querySelector('.out-1').onclick = function () {
    if (document.querySelector('.information-1').style.display == "grid") {
        document.querySelector('.information-1').style.display = "none";
    } else {
        document.querySelector('.information-1').style.display = "grid";
        document.querySelector('.information-3').style.display = "none";
        document.querySelector('.information-2').style.display = "none";
        document.querySelector('.information-4').style.display = "none";
    }
}

document.querySelector('.out-2').onclick = function () {
    if (document.querySelector('.information-2').style.display == "grid") {
        document.querySelector('.information-2').style.display = "none";
    } else {
        document.querySelector('.information-2').style.display = "grid";
        document.querySelector('.information-1').style.display = "none";
        document.querySelector('.information-3').style.display = "none";
        document.querySelector('.information-4').style.display = "none";
    }
}

document.querySelector('.out-3').onclick = function () {
    if (document.querySelector('.information-3').style.display == "grid") {
        document.querySelector('.information-3').style.display = "none";
    } else {
        document.querySelector('.information-3').style.display = "grid";
        document.querySelector('.information-1').style.display = "none";
        document.querySelector('.information-2').style.display = "none";
        document.querySelector('.information-4').style.display = "none";
    }
}

document.querySelector('.out-4').onclick = function () {
    if (document.querySelector('.information-4').style.display == "grid") {
        document.querySelector('.information-4').style.display = "none";
    } else {
        document.querySelector('.information-4').style.display = "grid";
        document.querySelector('.information-1').style.display = "none";
        document.querySelector('.information-2').style.display = "none";
        document.querySelector('.information-3').style.display = "none";
    }
}

