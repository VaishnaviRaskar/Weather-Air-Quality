import { WEATHER_API_KEY, WEATHER_BASE_URL, GEO_BASE_URL } from "../config";

/**
 * Fetch current weather by city name or by coords.
 * city can be string city name OR an object { lat, lon }
 */
export const fetchCurrentWeather = async (cityOrCoords) => {
  let url;
  if (typeof cityOrCoords === "object" && cityOrCoords.lat && cityOrCoords.lon) {
    url = `${WEATHER_BASE_URL}/weather?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}&appid=${WEATHER_API_KEY}&units=metric`;
  } else {
    const cityName = encodeURIComponent(cityOrCoords);
    url = `${WEATHER_BASE_URL}/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;
  } 

  const res = await fetch(url);
  if (!res.ok) throw new Error("Invalid city or weather fetch failed");
  return await res.json();
};

export const fetch5DayForecast = async (cityOrCoords) => {
  let url;
  if (typeof cityOrCoords === "object" && cityOrCoords.lat && cityOrCoords.lon) {
    url = `${WEATHER_BASE_URL}/forecast?lat=${cityOrCoords.lat}&lon=${cityOrCoords.lon}&appid=${WEATHER_API_KEY}&units=metric`;
  } else {
    const cityName = encodeURIComponent(cityOrCoords);
    url = `${WEATHER_BASE_URL}/forecast?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`;
  }

  const res = await fetch(url); 
  if (!res.ok) throw new Error("Forecast fetch failed");
  return await res.json();
};

/** Reverse geocode to get city name from coords */
export const reverseGeocode = async (lat, lon) => {
  const url = `${GEO_BASE_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${WEATHER_API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Reverse geocode failed");
  const data = await res.json();
  return data && data.length ? data[0].name : null;
};
