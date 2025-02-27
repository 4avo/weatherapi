// api.js — Fetch and display London’s weather data

const fetchWeatherForLondon = async () => {
    const apiRoot = "https://api.open-meteo.com/v1/forecast";
    const newyork = { lat: 40.7128, lon: -74.0060 }
    const url = `${apiRoot}?latitude=${newyork.lat}&longitude=${newyork.lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data.current_weather.temperature, data.current_weather.weathercode);
    } catch (error) {
        console.error(`Error fetching weather data: ${error}`);
    }
};

const displayWeather = (temperature, weatherCode) => {
    const weatherElement = document.getElementById('city-weather');
    if (weatherElement) {
        weatherElement.innerHTML = `
            <h2 class='text-2xl font-bold mb-2'>Current Weather</h2>
            <p class='text-lg font-semibold'>Temperature: ${temperature}°C</p>
            <p class='text-md text-gray-400'>Weather Code: ${weatherCode}</p>
        `;
    }
};

document.addEventListener('DOMContentLoaded', fetchWeatherForLondon);

export { fetchWeatherForLondon, displayWeather };