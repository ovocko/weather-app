// src/components/Weather.js
import React, { useState } from 'react';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const apiKey = '105ea8ef109dbe1414a8452ce77ed168';

  const fetchWeather = async () => {
    if (!city) return;

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    if (data.cod === 200) {
      setWeather(data);
    } else {
      alert('City not found');
      setWeather(null);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

