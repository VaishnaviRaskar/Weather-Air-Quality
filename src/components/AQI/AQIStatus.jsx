import { getAQIStatus } from "../../utils/aqiAPI";

// Icons
import {
  WiSmoke,
  WiFog,
} from "react-icons/wi";
import { GiSmokeBomb } from "react-icons/gi";

const AQIStatus = ({ aqi }) => {
  if (!aqi || !aqi.list || !aqi.list[0]) return null;

  const aqiValue = aqi.list[0].main.aqi;
  const components = aqi.list[0].components || {};
  const level = getAQIStatus(aqiValue);

  return (
    <section className="aqi-panel glass">
      <h3 className="section-title">Air Quality Index</h3>

      <div className="grid-2">
        {/* AQI MAIN CARD */}
        <div
          className="card-box aqi-main"
          style={{
            borderLeft: `6px solid ${level.color}`,
            background: "rgba(255,255,255,0.75)",
          }}
        >
          <h5>AQI Status</h5>

          <div className="d-flex align-items-center gap-3">
            <div className="aqi-circle" style={{ borderColor: level.color }}>
              <span style={{ color: level.color }}>{aqiValue}</span>
            </div>

            <div>
              <p className="value" style={{ color: level.color }}>
                {level.level}
              </p>
              <small className="muted">Scale: 1 (Good) → 5 (Hazardous)</small>
            </div>
          </div>

          {/* POLLUTANTS */}
          <div className="aqi-breakdown mt-4">
            <h6 className="muted">Pollutants</h6>
            <ul className="pollutant-list">
              <li>
                <GiSmokeBomb size={20} /> <strong>PM2.5:</strong> {components.pm2_5 ?? "-"} µg/m³
              </li>
              <li>
                <GiSmokeBomb size={20} /> <strong>PM10:</strong> {components.pm10 ?? "-"} µg/m³
              </li>
              <li>
                <WiFog size={22} /> <strong>NO₂:</strong> {components.no2 ?? "-"} µg/m³
              </li>
              <li>
                <WiFog size={22} /> <strong>SO₂:</strong> {components.so2 ?? "-"} µg/m³
              </li>
              <li>
                <WiSmoke size={22} /> <strong>O₃:</strong> {components.o3 ?? "-"} µg/m³
              </li>
              <li>
                <WiSmoke size={22} /> <strong>CO:</strong> {components.co ?? "-"} µg/m³
              </li>
            </ul>
          </div>
        </div>

        {/* HEALTH ADVICE CARD */}
         {/* HEALTH ADVICE CARD */}
        <div className="card-box">
          <h5>Health Advice</h5>

          <ul className="tip-list">
            {level.advice.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>

          <a className="btn btn-sm btn-outline-primary mt-2" href="/">
            Stay Safe
          </a>
        </div>
      </div>
    </section>
  );
};

export default AQIStatus;
