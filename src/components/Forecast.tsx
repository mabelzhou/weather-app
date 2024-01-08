interface Props {
  temps: number[];
  weather: string[];
  dates: string[];
}

const Forecast = ({ temps, weather, dates }: Props) => {
  const dateObjects = dates.map((date) => new Date(date));
  const days = dateObjects.map((date) =>
    date.toLocaleString("en-US", { weekday: "long" })
  );

  return (
    <>
      <div className="forecast-card">
        <div className="forecast">
          <img src={`https://openweathermap.org/img/wn/${weather[0]}@2x.png`} />
          <p className="forecastDate">Tomorrow</p>
          <p className="forecastTemp">{Math.round(temps[0])}°C</p>
        </div>
        <div className="forecast">
          <img src={`https://openweathermap.org/img/wn/${weather[1]}@2x.png`} />
          <p className="forecastDate">{days[1]}</p>
          <p className="forecastTemp">{Math.round(temps[1])}°C</p>
        </div>
        <div className="forecast">
          <img src={`https://openweathermap.org/img/wn/${weather[2]}@2x.png`} />
          <p className="forecastDate">{days[2]}</p>
          <p className="forecastTemp">{Math.round(temps[2])}°C</p>
        </div>
      </div>
    </>
  );
};

export default Forecast;
