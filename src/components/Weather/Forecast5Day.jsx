import React from "react";
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiDayRain,
  WiSmoke,
} from "react-icons/wi";

const iconMap = (main, isNight) => {
  main = main.toLowerCase();

  if (isNight) {
    if (main === "clear") return <WiNightClear size={45} />;
    if (main === "rain") return <WiDayRain size={45} />;
  }

  switch (main) {
    case "clear":
      return <WiDaySunny size={45} />;
    case "clouds":
      return <WiCloud size={45} />;
    case "rain":
      return <WiRain size={45} />;
    case "snow":
      return <WiSnow size={45} />;
    case "thunderstorm":
      return <WiThunderstorm size={45} />;
    case "drizzle":
      return <WiDayRain size={45} />;
    case "mist":
    case "fog":
    case "haze":
      return <WiFog size={45} />;
    case "smoke":
      return <WiSmoke size={45} />;
    default:
      return <WiCloud size={45} />;
  }
};

const Forecast5Day = ({ data }) => {
  if (!data || !data.list) return null;

  const daily = data.list.filter((_, i) => i % 8 === 0).slice(0, 5);

  return (
    <div className="forecast-wrap">
      <br/>
      <h5 className="section-title">Next 5-Day Forecast</h5>

      <div className="grid-3">
        {daily.map((d, idx) => {
          const date = new Date(d.dt * 1000);
          const hrs = date.getHours();
          const isNight = hrs >= 18 || hrs < 6;

          const icon = iconMap(d.weather[0].main, isNight);

          return (
            <div className="card-box forecast-card text-center" key={idx}>
              <p className="muted">
                {date.toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>

              <div className="forecast-icon">{icon}</div>

              <p className="value">{Math.round(d.main.temp)}°C</p>
              <small className="muted text-capitalize">
                {d.weather[0].description}
              </small>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast5Day;
