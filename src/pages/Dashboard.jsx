import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import SearchBar from "../components/SearchBar/SearchBar";

import CurrentWeather from "../components/Weather/CurrentWeather";
import Forecast5Day from "../components/Weather/Forecast5Day";
import AQIStatus from "../components/AQI/AQIStatus";
import TemperatureChart from "../components/Charts/TemperatureChart";
import AQITrendChart from "../components/Charts/AQITrendChart";
import PollutantChart from "../components/Charts/PollutantChart";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer";

import {
  fetchCurrentWeather,
  fetch5DayForecast,
  reverseGeocode,
} from "../utils/weatherAPI";
import { fetchAQI } from "../utils/aqiAPI";

import "../styles/dashboard.css";

export default function Dashboard() {
  const [mode, setMode] = useState("weather");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cityName, setCityName] = useState("Loading...");

  // Combined fetch function
  const fetchAllData = async (value) => {
    setLoading(true);

    try {
      let w;

      if (typeof value === "string") {
        w = await fetchCurrentWeather(value);
        setCityName(value);
      } else if (value?.lat && value?.lon) {
        w = await fetchCurrentWeather(value);

        try {
          const name = await reverseGeocode(value.lat, value.lon);
          setCityName(name || w.name || "Current Location");
        } catch {
          setCityName(w.name || "Current Location");
        }
      }

      setWeather(w);

      const f = await fetch5DayForecast(
        typeof value === "string"
          ? value
          : { lat: w.coord.lat, lon: w.coord.lon }
      );
      setForecast(f);

      const a = await fetchAQI(w.coord.lat, w.coord.lon);
      setAqi(a);
    } catch (e) {
      alert("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  // On mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        fetchAllData({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        }),
      () => fetchAllData("New Delhi")
    );
  }, []);

  return (
    <>
      <Layout>
        {/* ---------------- TOP BAR HERE ---------------- */}
        <header className="topbar glass">
          <div className="top-left">
            <div className="tab-group">
              <div
                className={`tab-option ${mode === "weather" ? "active" : ""}`}
                onClick={() => setMode("weather")}
              >
                Weather Data
              </div>
              <div
                className={`tab-option ${mode === "aqi" ? "active" : ""}`}
                onClick={() => setMode("aqi")}
              >
                Air Quality Index
              </div>
            </div>
          </div>

          <div className="top-right">
            <div style={{ width: 320 }}>
              <SearchBar onSearch={fetchAllData} />
            </div>
          </div>
        </header>

        {/* ---------------- PAGE BODY ---------------- */}
        <main className="dashboard-main p-4">

          <div className="page-header mb-3">
            <h2>📍 {cityName}</h2>
            <small className="text-muted">
              Current data for selected location
            </small>
          </div>

          {loading && <Loader />}

          {!loading && mode === "weather" && weather && (
            <>
              <CurrentWeather data={weather} />
              <Forecast5Day data={forecast} />
              <TemperatureChart forecast={forecast} />
            </>
          )}

          {!loading && mode === "aqi" && aqi && (
            <>
              <AQIStatus aqi={aqi} />
              <AQITrendChart aqi={aqi} />
              <PollutantChart aqi={aqi} />
            </>
          )}
        </main>
      </Layout>

      <Footer />
    </>
  );
}
