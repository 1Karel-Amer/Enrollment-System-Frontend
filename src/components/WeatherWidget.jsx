import React, { useState, useEffect } from "react";
import axios from "axios";
import { AreaChart, Area, ResponsiveContainer, YAxis } from "recharts";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (city = "Davao") => {
    setLoading(true);
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/weather/${city}`);
      setWeather(res.data);
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-slate-500 font-medium animate-pulse bg-white rounded-3xl border border-slate-100 shadow-sm max-w-3xl">
        Loading local forecast...
      </div>
    );

  // Map the live API data for the Recharts component
  const forecastData = weather?.list?.slice(0, 7) || [];
  const chartData = forecastData.map((item) => ({
    temp: Math.round(item.main.temp),
  }));

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 w-full max-w-3xl font-sans">
      {/* Top Section: Icon, Temp, and Meta */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-2">
          <img
            src={`http://openweathermap.org/img/wn/${forecastData[0]?.weather?.[0]?.icon}@4x.png`}
            className="w-28 h-28 object-contain drop-shadow-sm"
            alt="weather icon"
          />
          <div className="flex items-start">
            <span className="text-6xl font-normal text-slate-800 tracking-tighter">
              {Math.round(forecastData[0]?.main?.temp || 0)}
            </span>
            <span className="text-2xl font-normal text-slate-500 mt-2 ml-1">
              °C
            </span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <input
            onKeyDown={(e) => e.key === "Enter" && fetchWeather(e.target.value)}
            placeholder="Search City..."
            className="bg-slate-50 border border-slate-200 text-sm rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-blue-100 w-40 focus:w-56 transition-all text-slate-700 placeholder-slate-400"
          />
          <div className="text-right">
            <h2 className="text-2xl font-normal text-slate-800">
              {weather?.city?.name || "Location"}
            </h2>
            <p className="text-slate-500 text-sm capitalize">
              {forecastData[0]?.weather?.[0]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Mockup */}
      <div className="border-b border-slate-200 mb-6 flex gap-6 pb-2">
        <span className="text-sm font-medium border-b-2 border-yellow-400 pb-2 text-slate-800 cursor-pointer">
          Temperature
        </span>
        <span className="text-sm font-medium text-slate-500 pb-2 cursor-pointer hover:text-slate-800 transition-colors">
          Precipitation
        </span>
        <span className="text-sm font-medium text-slate-500 pb-2 cursor-pointer hover:text-slate-800 transition-colors">
          Wind
        </span>
      </div>

      {/* Recharts Temperature Line */}
      <div className="w-full h-24 mb-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 30, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FCD34D" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#FCD34D" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* Hide YAxis but scale it so the line doesn't hit the very top/bottom */}
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#FACC15" /* Yellow-400 */
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorTemp)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Forecast Columns */}
      <div className="flex justify-between items-center gap-2 overflow-x-auto px-4">
        {forecastData.map((item, i) => {
          const date = new Date(item.dt * 1000);
          const hour = date.getHours();
          const displayTime =
            hour === 0 ? "12 AM" : hour > 12 ? `${hour - 12} PM` : `${hour} AM`;

          return (
            <div
              key={i}
              className="flex flex-col items-center min-w-[64px] p-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer"
            >
              <p className="text-xs font-medium text-slate-500 mb-2">
                {displayTime}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                className="w-10 h-10 mb-2 object-contain"
                alt="forecast icon"
              />
              <p className="font-medium text-sm text-slate-800">
                {Math.round(item.main.temp)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherWidget;
