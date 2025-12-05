import React, { useEffect, useState } from "react";
import "../../styles/dashboard.css";
import { formatTime, kmFromMeters } from "../../utils/helpers";

// Beautiful Weather Icons
import {
  WiDaySunny,
  WiNightClear,
  WiCloud,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiSunrise,
  WiSunset,
  WiCloudy,
  WiDayRain,
  WiSmoke,
} from "react-icons/wi";

import { FaMapMarkerAlt, FaEye } from "react-icons/fa";

const iconMap = {
  clear: <WiDaySunny size={70} />,
  clouds: <WiCloud size={70} />,
  rain: <WiRain size={70} />,
  thunderstorm: <WiThunderstorm size={70} />,
  drizzle: <WiDayRain size={70} />,
  snow: <WiSnow size={70} />,
  mist: <WiFog size={70} />,
  haze: <WiFog size={70} />,
  smoke: <WiSmoke size={70} />,
};

const CurrentWeather = ({ data }) => {
  const [theme, setTheme] = useState("sunny");

  // ❗ DO NOT RETURN BEFORE HOOKS
  // So we won't put "if (!data) return null" here

  const wmain = (data?.weather?.[0]?.main || "").toLowerCase();
  const temp = Math.round(data?.main?.temp || 0);
  const feels = Math.round(data?.main?.feels_like || 0);
  const humidity = data?.main?.humidity;
  const wind = data?.wind?.speed;
  const pressure = data?.main?.pressure;
  const visibility = kmFromMeters(data?.visibility);
  const sunrise = data ? formatTime(data.sys.sunrise) : "";
  const sunset = data ? formatTime(data.sys.sunset) : "";

  const isNight =
    data?.dt && data?.sys && data.dt > data.sys.sunset
      ? true
      : new Date().getHours() > 18;

  // ✔ Hooks must be above any return
  useEffect(() => {
    if (!data) return;

    if (isNight) setTheme("night");
    else if (wmain.includes("rain") || wmain.includes("drizzle"))
      setTheme("rain");
    else if (wmain.includes("cloud")) setTheme("cloud");
    else setTheme("sunny");
  }, [wmain, isNight, data]);

  // ✔ Now it's safe to return conditionally
  if (!data) return null;

  const getFeelText = () => {
    if (feels >= 35) return "Feels Very Hot";
    if (feels >= 30) return "Feels Hot";
    if (feels >= 25) return "Feels Warm";
    if (feels >= 18) return "Feels Comfortable";
    if (feels >= 10) return "Feels Cool";
    return "Feels Cold";
  };

  const mainIcon = isNight
    ? <WiNightClear size={70} />
    : iconMap[wmain] || <WiCloudy size={70} />;

  return (
    <section className={`weather-panel glass theme-${theme}`}>
      <div className="panel-grid grid-3">

        {/* MAIN CARD */}
        <div className="card-box main-card">
          <div className="main-card-top d-flex align-items-center justify-content-between">
            <div>
              <h3 className="temp-large">{temp}°C</h3>
              <p className="muted mb-1">{data.weather[0].description}</p>
              <p className="feel small">{getFeelText()} · Feels {feels}°C</p>
            </div>

            <div className="icon-wrap">{mainIcon}</div>
          </div>

          <div className="main-card-bottom mt-3 d-flex gap-3">
            <div className="info">
              <small className="muted">Humidity</small>
              <p className="value d-flex align-items-center gap-1">
                <WiHumidity size={22} /> {humidity}%
              </p>
            </div>

            <div className="info">
              <small className="muted">Wind</small>
              <p className="value d-flex align-items-center gap-1">
                <WiStrongWind size={22} /> {wind} m/s
              </p>
            </div>

            <div className="info">
              <small className="muted">Pressure</small>
              <p className="value d-flex align-items-center gap-1">
                <WiBarometer size={22} /> {pressure} hPa
              </p>
            </div>
          </div>
        </div>

        {/* SUNRISE */}
        <div className="card-box">
          <h6 className="d-flex align-items-center gap-2">
            <WiSunrise size={28} /> Sunrise
          </h6>
          <p className="value">{sunrise}</p>
          <small className="muted">Local time</small>
        </div>

        {/* SUNSET */}
        <div className="card-box">
          <h6 className="d-flex align-items-center gap-2">
            <WiSunset size={28} /> Sunset
          </h6>
          <p className="value">{sunset}</p>
          <small className="muted">Local time</small>
        </div>

        {/* VISIBILITY */}
        <div className="card-box">
          <h6 className="d-flex align-items-center gap-2">
            <FaEye size={20} /> Visibility
          </h6>
          <p className="value">{visibility} km</p>
        </div>

        {/* FEELS LIKE */}
        <div className="card-box">
          <h6>Feels Like</h6>
          <p className="value">{feels}°C</p>
          <small className="muted">{getFeelText()}</small>
        </div>

        {/* LOCATION */}
        <div className="card-box">
          <h6 className="d-flex align-items-center gap-2">
            <FaMapMarkerAlt size={18} /> Location
          </h6>
          <p className="value">{data.name}</p>
        </div>

      </div>
    </section>
  );
};

export default CurrentWeather;
