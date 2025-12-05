import { WEATHER_API_KEY, AQI_API_URL } from "../config";
import {
  WiDaySunny,
  WiDayHaze,
  WiDust,
  WiFog,
  WiSmoke,
  WiCloudyGusts,
} from "react-icons/wi";

/** Fetch AQI data by lat/lon */
export const fetchAQI = async (lat, lon) => {
  const res = await fetch(
    `${AQI_API_URL}?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`
  );
  if (!res.ok) throw new Error("AQI fetch failed");
  return await res.json();
};

/** Advanced AQI Icons */
export const AQIIcons = {
  1: <WiDaySunny size={40} color="#009966" />,       // Good
  2: <WiDayHaze size={40} color="#FFDE33" />,        // Fair
  3: <WiFog size={40} color="#FF9933" />,            // Moderate
  4: <WiSmoke size={40} color="#CC0033" />,          // Poor
  5: <WiDust size={40} color="#660099" />,           // Very Poor
  default: <WiCloudyGusts size={40} color="#666" />, // Unknown
};

/** AQI Status With Tip-Based Advice (Not Paragraphs) */
export const getAQIStatus = (aqi) => {
  switch (aqi) {
    case 1:
      return {
        level: "Good",
        color: "#009966",
        icon: AQIIcons[1],
        advice: [
          "🌤️ Great day for outdoor fun",
          "🏃 Ideal for jogging or cycling",
          "📸 Take selfies — lighting is perfect",
          "🌳 Enjoy the fresh, clean air",
          "💚 Safe for children & sensitive groups"
        ],
      };

    case 2:
      return {
        level: "Fair",
        color: "#FFDE33",
        icon: AQIIcons[2],
        advice: [
          "🙂 Air quality is acceptable",
          "🤧 Sensitive people might feel mild irritation",
          "🚶 Suitable for casual outdoor walks",
          "🌬️ Avoid intense outdoor workouts",
          "😌 Mostly comfortable for everyone"
        ],
      };

    case 3:
      return {
        level: "Moderate",
        color: "#FF9933",
        icon: AQIIcons[3],
        advice: [
          "⚠️ Air quality is average",
          "🧘 Avoid heavy breathing activities outside",
          "🚸 Kids & elderly should limit outdoor play",
          "🪟 Keep windows partly closed",
          "😷 Mask recommended if sensitive"
        ],
      };

    case 4:
      return {
        level: "Poor",
        color: "#CC0033",
        icon: AQIIcons[4],
        advice: [
          "🚫 Avoid long outdoor exposure",
          "😷 Wear a mask outdoors",
          "🫁 Asthma patients should stay indoors",
          "❌ Skip outdoor workout sessions",
          "🌬️ Use air purifiers indoors"
        ],
      };

    case 5:
      return {
        level: "Very Poor",
        color: "#660099",
        icon: AQIIcons[5],
        advice: [
          "☠️ Air is unsafe for everyone",
          "🏠 Stay indoors as much as possible",
          "😷 N95 mask recommended outdoors",
          "🔒 Keep all windows/doors closed",
          "🕒 Postpone outdoor plans",
          "🫁 High irritation risk — protect lungs"
        ],
      };

    default:
      return {
        level: "Unknown",
        color: "#999",
        icon: AQIIcons.default,
        advice: [
          "❓ AQI data not available",
          "🔄 Try refreshing or checking later",
          "📡 Location/GPS may be slow",
          "🌐 Ensure city or coordinates are correct"
        ],
      };
  }
};
