interface WeatherInfo {
    description: string;
    icon: string;
}

interface MainInfo {
    temp: number;
    feels_like: number;
    humidity: number;
}

interface OpenWeatherResponse {
    main: MainInfo;
    weather: WeatherInfo[];
    name: string;
}

const form = document.getElementById('city-form') as HTMLFormElement;
const input = document.getElementById('city-input') as HTMLInputElement;
const output = document.getElementById('weather-output') as HTMLDivElement;
const API_KEY = '***REMOVED***';



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = input.value.trim();
    if (!city) return;

    await getWeatherForCity(city);
})

async function getWeatherForCity(city: string): Promise<void> {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;

  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
        throw new Error('City not found');
    }
    const data = (await res.json()) as OpenWeatherResponse;

    renderWeather(data);
    } catch (err: any) {
    output.innerHTML = `<p class="error">${err.message}</p>`;
  }

  function renderWeather(data: OpenWeatherResponse) {
    const {
    main: { temp, feels_like, humidity },
    weather,
    name,
  } = data;
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
} 
