import React, { useState, useEffect } from "react";
import axios from "axios";

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
      <div className="p-10 text-slate-400 font-bold animate-pulse bg-white rounded-[2rem]">
        Fetching local forecast...
      </div>
    );

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
            {weather?.city?.name || "Location"}
          </h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            {weather?.list?.[0]?.weather?.[0]?.description}
          </p>
        </div>
        <input
          onKeyDown={(e) => e.key === "Enter" && fetchWeather(e.target.value)}
          placeholder="Search City..."
          className="bg-slate-50 border-none text-xs rounded-full py-2 px-4 outline-none focus:ring-2 focus:ring-[#3E0703]/20 w-32 focus:w-48 transition-all"
        />
      </div>

      <div className="flex items-center gap-4 mb-8">
        <span className="text-7xl font-black text-slate-900 tracking-tighter">
          {Math.round(weather?.list?.[0]?.main?.temp || 0)}°
        </span>
        <img
          src={`http://openweathermap.org/img/wn/${weather?.list?.[0]?.weather?.[0]?.icon}@2x.png`}
          className="w-20 h-20"
          alt="icon"
        />
      </div>

      <div className="flex justify-between border-t border-slate-50 pt-6 gap-2 overflow-x-auto">
        {weather?.list?.slice(0, 5).map((item, i) => (
          <div key={i} className="text-center min-w-[60px]">
            <p className="text-[10px] font-bold text-slate-300 mb-2">
              {new Date(item.dt * 1000).getHours()}:00
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              className="w-10 h-10 mx-auto"
              alt="icon"
            />
            <p className="font-black text-xs text-slate-700">
              {Math.round(item.main.temp)}°
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
