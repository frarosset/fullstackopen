import { useState, useEffect } from "react";
import weatherService from "../services/weather.js";

const CountryWeather = ({ location }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (location != null)
      weatherService.get(location).then((data) => setWeather(data));
  }, [location]);

  if (weather == null) {
    return null;
  }

  return (
    <div>
      <h2>Weather in {location}</h2>
      <p>Temperature {weather.temperature} Celsius</p>

      <img
        style={{ width: "100%", maxWidth: "100px" }}
        src={weather.weatherSrc}
        alt={weather.weatherAlt}
      />

      <p>Wind {weather.wind} m/s</p>
    </div>
  );
};

export default CountryWeather;
