"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log('app.ts script loaded'); // manual error checking
const form = document.getElementById('city-form');
const input = document.getElementById('city-input');
const output = document.getElementById('weather-output');
const API_KEY = '2baa968064fe0b3212dfa6b537128766';
form.addEventListener('submit', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const city = input.value.trim();
    if (!city)
        return;
    yield getWeatherForCity(city);
}));
function getWeatherForCity(city) {
    return __awaiter(this, void 0, void 0, function* () {
        const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        try {
            const res = yield fetch(endpoint);
            if (!res.ok) {
                throw new Error('City not found');
            }
            const data = (yield res.json());
            renderWeather(data);
        }
        catch (err) {
            output.innerHTML = `<p class="error">${err.message}</p>`;
        }
        function renderWeather(data) {
            const { main: { temp, feels_like, humidity }, weather, name, } = data;
            const { description, icon } = weather[0];
            output.innerHTML = `
    <h2>${name}</h2>
    <img
      src="https://openweathermap.org/img/wn/${icon}@2x.png"
      alt="${description}"
    />
    <p>${description}</p>
    <p>🌡️ ${temp.toFixed(1)}°C (feels like ${feels_like.toFixed(1)}°C)</p>
    <p>💧 Humidity: ${humidity}%</p>`;
        }
    });
}
