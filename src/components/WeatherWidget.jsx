import React, { useState, useEffect } from "react";
import axios from "axios";
import ForecastDisplay from "./ForecastDisplay";

const WeatherWidget = () => {
  const [city, setCity] = useState("Tagum");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const fetchWeather = async (searchCity = city) => {
    setLoading(true);
    setError(false);
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/weather/${searchCity}`,
      );
      if (res.data && res.data.list) {
        setWeather(res.data);
        setSelectedDay(res.data.list[0].dt_txt.split(" ")[0]);
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading || error)
    return (
      <div className="bg-[#3E0703] p-8 rounded-3xl shadow-xl h-full min-h-[400px] w-full flex flex-col items-center justify-center text-center">
        {loading ? (
          <div className="animate-pulse text-white/40 font-bold uppercase text-xs">
            Loading...
          </div>
        ) : (
          <button
            onClick={() => fetchWeather("Tagum")}
            className="text-white text-xs border border-white/20 px-4 py-2 rounded-full"
          >
            Retry
          </button>
        )}
      </div>
    );

  // Get data for the selected day for stats
  const dayData =
    weather.list.find((item) => item.dt_txt.includes(selectedDay)) ||
    weather.list[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#4A0804] to-[#660B05] p-7 rounded-3xl shadow-2xl w-full h-full text-white border border-white/10 flex flex-col justify-between">
      {/* Top Section: Search & Main Info */}
      <div className="relative z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeather(city);
          }}
          className="mb-8"
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-white/10 backdrop-blur-md placeholder-white/30 text-white rounded-2xl py-3 px-5 border border-white/10 focus:border-white/30 outline-none transition-all text-sm"
          />
        </form>

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-7xl font-black tracking-tighter drop-shadow-md">
              {Math.round(dayData.main.temp)}°
            </h1>
            <p className="text-white font-bold text-xl mt-1 tracking-tight">
              {weather.city.name}
            </p>
            <p className="text-white/50 text-xs font-black uppercase tracking-widest">
              {dayData.weather[0].description}
            </p>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@4x.png`}
            className="w-28 drop-shadow-2xl"
            alt="weather"
          />
        </div>

        {/* New Minimalist Stats Row */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-[10px] font-black text-white/40 uppercase mb-1">
              Humidity
            </p>
            <p className="text-lg font-bold">{dayData.main.humidity}%</p>
          </div>
          <div className="flex-1 bg-white/5 border border-white/5 rounded-2xl p-3 backdrop-blur-sm">
            <p className="text-[10px] font-black text-white/40 uppercase mb-1">
              Wind Speed
            </p>
            <p className="text-lg font-bold">{dayData.wind.speed} m/s</p>
          </div>
        </div>
      </div>

      {/* Expanded Forecast Pills */}
      <ForecastDisplay
        forecastList={weather.list}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default WeatherWidget;
