import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PollutantChart = ({ aqi }) => {
  if (!aqi || !aqi.list || !aqi.list[0]) return null;

  const c = aqi.list[0].components;

  const pollutants = [
    { name: "PM2.5", value: c.pm2_5 },
    { name: "PM10", value: c.pm10 },
    { name: "NO₂", value: c.no2 },
    { name: "SO₂", value: c.so2 },
    { name: "O₃", value: c.o3 },
    { name: "CO", value: c.co },
  ];

  return (
    <div
      className="card-box glass"
      style={{
        marginTop: 25,
        padding: 20,
        borderRadius: 16,
      }}
    >
      <h5 style={{ marginBottom: 15, fontWeight: 600 }}>Pollutant Breakdown</h5>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={pollutants} barSize={40}>
          <defs>
            {/* Beautiful blue → purple gradient */}
            <linearGradient id="pollutantGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4facfe" stopOpacity={1} />
              <stop offset="100%" stopColor="#6a11cb" stopOpacity={0.7} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="4 4" opacity={0.3} />

          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fontWeight: 500 }}
            tickMargin={10}
            stroke="#555"
          />

          <Tooltip
            formatter={(value) => `${value} µg/m³`}
            contentStyle={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: 12,
              border: "1px solid #ddd",
            }}
          />

          <Bar
            dataKey="value"
            fill="url(#pollutantGradient)"
            radius={[12, 12, 0, 0]} // Rounded top corners
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PollutantChart;
