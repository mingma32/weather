import "./App.css";
import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const Api_Key = "YOUR_API_KEY_HERE";
  const getWeather = async (e) => {
    e.preventDefault();

    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api_Key}&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      setWeather({
        city: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].main,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="app-container">
        <h1 className="title">Weather App</h1>
        <form className="search-form" onSubmit={getWeather}>
          <input
            type="text"
            className="input-outline"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" className="btn-outline">{loading ? "Searching..." : "Search"}</button>
        </form>

       <div className="error">{error}</div>
        {weather && (
          <>
            <h2 className="weather-title">{weather.city}, {weather.country}</h2>
            <p className="weather-description">{weather.description}</p>
            <p className="weather-temperature">{weather.temperature}°C</p>
            <p className="weather-humidity">Humidity: {weather.humidity}%</p>
            <p className="weather-wind">Wind Speed: {weather.windSpeed} m/s</p>
          </>
        )}
      </div>
    </>
  );
}