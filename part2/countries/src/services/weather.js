import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const queryUrl = (query) =>
  `${baseUrl}?q=${query}&appid=${import.meta.env.VITE_OPENWEATHERMAP_API_KEY}&units=metric`;

const iconSrcUrl = (icon) =>
  `https://openweathermap.org/payload/api/media/file/${icon}.png`;

const get = (location) => {
  return axios
    .get(queryUrl(location))
    .then((response) => response.data)
    .then((data) => extractData(data));
};

const extractData = (data) => {
  return {
    temperature: data.main.temp,
    wind: data.wind.speed,
    weatherSrc: iconSrcUrl(data.weather[0].icon),
    weatherAlt: `${data.weather[0].main} (${data.weather[0].description})`,
  };
};

export default { get };
