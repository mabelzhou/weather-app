import { Wind, Moisture, ThermometerHalf } from "react-bootstrap-icons";

interface Props {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  wind: number;
  feelsLike: number;
}

const WeatherCard = ({
  city,
  temperature,
  description,
  icon,
  humidity,
  wind,
  feelsLike,
}: Props) => {
  return (
    <>
      <div className="card">
        <p className="city">{city}</p>
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} />
        <p className="currentTemp">{Math.round(temperature)}°C</p>
        <p className="currentWeatherDesc">{description}</p>
        <div className="details">
          <div className="detailGroup">
            <Moisture size={40} />
            <div className="nameNvalue">
              <span className="detailName">Humidity</span>
              <span className="detailValue">{humidity}%</span>
            </div>
          </div>
          <div className="detailGroup">
            <Wind size={40} />
            <div className="nameNvalue">
              <span className="detailName">Wind</span>
              <span className="detailValue">{Math.round(wind)} km/h</span>
            </div>
          </div>
          <div className="detailGroup">
            <ThermometerHalf size={40} />
            <div className="nameNvalue">
              <span className="detailName">Feels Like</span>
              <span className="detailValue">{Math.round(feelsLike)}°C</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherCard;
