import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  defs
} from "recharts";

const TemperatureChart = ({ forecast }) => {
  if (!forecast || !forecast.list) return null;

  const list = Array.isArray(forecast.list) ? forecast.list : [];

  const graphData = list.slice(0, 10).map((item) => ({
    time: item.dt_txt
      ? item.dt_txt.split(" ")[1].slice(0, 5)
      : "N/A",
    temp: item.main?.temp ? Math.round(item.main.temp) : 0,
  }));

  return (
    <div
      className="card-box"
      style={{
        marginTop: 20,
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#ffffff",
      }}
    >
      <h5 style={{ marginBottom: 15 }}>🌡 Temperature Trend</h5>

      {graphData.length === 0 ? (
        <p>No forecast data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={graphData}>
            {/* Soft grid */}
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              stroke="#666"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="#666" />
            <Tooltip
              contentStyle={{
                background: "#fff",
                borderRadius: "10px",
                border: "1px solid #eee",
              }}
              labelStyle={{ fontWeight: "bold" }}
            />

            {/* Gradient Line */}
            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6c5ce7" stopOpacity={0.9} />
                <stop offset="100%" stopColor="#a29bfe" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            <Line
              type="monotone"
              dataKey="temp"
              stroke="url(#tempGradient)"
              strokeWidth={4}
              dot={{ r: 5, stroke: "#6c5ce7", strokeWidth: 2 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TemperatureChart;
