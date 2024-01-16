import { useEffect, useState } from "react";

import "./App.css";
import Searchbox from "./components/Searchbox";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("London");
  const [longitude, setLongitude] = useState();
  const [latitude, setLatitude] = useState();
  const [weatherData, setWeatherData] = useState<any>(null);
  const [geoFound, setGeoFound] = useState(true);
  const [forecastData, setForecastData] = useState<any>(null);
  const [forecastTemps, setForecastTemps] = useState<Array<number>>([]);
  const [forecastWeatherIcons, setForecastWeatherIcons] = useState<
    Array<string>
  >([]);
  const [forecastDates, setForecastDates] = useState<Array<string>>([]);

  const fetchGeocoding = async (city: string) => {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    );
    const geoData = await response.json();
    console.log(geoData);
    return geoData;
  };

  const handleSearch = (searchValue: string) => {
    fetchGeocoding(searchValue).then((geoData) => {
      if (geoData.length === 0) {
        setGeoFound(false);
        return;
      }
      setGeoFound(true);
      setCity(geoData[0].name);
      setLongitude(geoData[0].lon);
      setLatitude(geoData[0].lat);
    });
  };

  const fetchCurrentWeather = async (longitude: number, latitude: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  };

  const fetchForecast = async (longitude: number, latitude: number) => {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    const forecastData = await response.json();
    console.log(forecastData);
    return forecastData;
  };

  useEffect(() => {
    if (longitude && latitude) {
      fetchCurrentWeather(longitude, latitude).then((data) =>
        setWeatherData(data)
      );
      fetchForecast(longitude, latitude).then((data) => {
        setForecastData(data);
        setForecastTemps([
          data.list[4].main.temp,
          data.list[12].main.temp,
          data.list[20].main.temp,
        ]);
        setForecastWeatherIcons([
          data.list[4].weather[0].icon,
          data.list[12].weather[0].icon,
          data.list[20].weather[0].icon,
        ]);
        setForecastDates([
          data.list[4].dt_txt,
          data.list[12].dt_txt,
          data.list[20].dt_txt,
        ]);
      });
    }
  }, [longitude, latitude]);

  return (
    <div className="App">
      <Searchbox onSearch={handleSearch} />
      {!geoFound && <p>City not found</p>}
      {weatherData && (
        <WeatherCard
          city={city}
          temperature={weatherData.main.temp}
          description={weatherData.weather[0].main}
          icon={weatherData.weather[0].icon}
          humidity={weatherData.main.humidity}
          wind={weatherData.wind.speed}
          feelsLike={weatherData.main.feels_like}
        />
      )}
      {forecastData && (
        <Forecast
          temps={forecastTemps}
          weather={forecastWeatherIcons}
          dates={forecastDates}
        />
      )}
    </div>
  );
}

export default App;
