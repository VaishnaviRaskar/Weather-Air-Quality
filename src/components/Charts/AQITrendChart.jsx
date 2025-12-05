import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AQITrendChart = ({ aqi }) => {
  if (!aqi || !aqi.list || aqi.list.length === 0) return null;

  // Prepare Graph Data
  const graphData = aqi.list.map((item, index) => {
    const timeLabel = item.dt
      ? new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      : `T${index + 1}`;

    return {
      time: timeLabel,
      aqi: item.main.aqi,
    };
  });

  return (
    <div
      className="card-box glass"
      style={{
        marginTop: 25,
        padding: 20,
        borderRadius: 16,
      }}
    >
      <h5 style={{ marginBottom: 15, fontWeight: 600 }}>AQI Trend</h5>

      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={graphData}>
          <defs>
            {/* Smooth Gradient */}
            <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff4d4d" stopOpacity={1} />
              <stop offset="100%" stopColor="#ff9f43" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" opacity={0.3} />

          <XAxis
            dataKey="time"
            tick={{ fontSize: 12 }}
            tickMargin={10}
            stroke="#555"
          />
          <YAxis
            domain={[1, 5]}
            tick={{ fontSize: 12 }}
            stroke="#555"
            tickCount={5}
          />

          <Tooltip
            contentStyle={{
              background: "rgba(255,255,255,0.8)",
              backdropFilter: "blur(8px)",
              borderRadius: 10,
              border: "1px solid #eee",
            }}
          />

          {/* Main Line with gradient + glow */}
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="url(#aqiGradient)"
            strokeWidth={4}
            dot={{ r: 5, stroke: "#ff4d4d", strokeWidth: 2 }}
            activeDot={{
              r: 7,
              stroke: "#ff4d4d",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AQITrendChart;
