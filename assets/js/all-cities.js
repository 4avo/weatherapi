/**
 * Async function to fetch data from Open-Meteo API
 * @param url - The URL to fetch data from
 * @returns Promise | error
 */

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Unfortunately this ${error} occurred`);
    }
};

/**
 * Fetches current weather data for a list of cities
 * @param cities - Array of city objects with name, lat, and lon
 * @param apiRoot - The API's root URL
 * @returns Promise | Error
 */
const getWeatherForCities = async (cities, apiRoot) => {
    const weatherData = await Promise.all(
        cities.map(async (city) => {
            const url = `${apiRoot}?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
            return { city: city.name, data: await fetchData(url) };
        })
    );
    return weatherData;
};

/**
 * Displays weather information for a given city
 * @param city - The city name
 * @param temperature - The temperature data
 * @param weatherCode - The weather condition code
 */
const displayWeather = (city, temperature, weatherCode) => {
    const cityElement = document.querySelector(`[data-city='${city}']`);
    if (cityElement) {
        cityElement.innerHTML += `<p class='text-lg mt-2'>${temperature}°C</p>`;
    }
};

const cities = [
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Tokyo", lat: 35.6895, lon: 139.6917 },
    { name: "Sydney", lat: -33.8688, lon: 151.2093 },
    { name: "Berlin", lat: 52.5200, lon: 13.4050 },
    { name: "Moscow", lat: 55.7558, lon: 37.6173 },
    { name: "Dubai", lat: 25.276987, lon: 55.296249 },
    { name: "Rome", lat: 41.9028, lon: 12.4964 },
    { name: "Madrid", lat: 40.4168, lon: -3.7038 },
    { name: "Toronto", lat: 43.651070, lon: -79.347015 },
    { name: "Beijing", lat: 39.9042, lon: 116.4074 },
    { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
    { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
    { name: "Seoul", lat: 37.5665, lon: 126.9780 },
    { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
    { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
    { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Bangkok", lat: 13.7563, lon: 100.5018 }
];

const apiRoot = "https://api.open-meteo.com/v1/forecast";

document.addEventListener("DOMContentLoaded", async () => {
    const weatherData = await getWeatherForCities(cities, apiRoot);
    weatherData.forEach(({ city, data }) => {
        displayWeather(city, data.current_weather.temperature, data.current_weather.weathercode);
    });
});

export { getWeatherForCities, displayWeather, cities };
