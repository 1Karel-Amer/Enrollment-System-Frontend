import React, { useState, useEffect } from "react";
import { getForecast } from "../services/weatherApi";
import ForecastDisplay from "./ForecastDisplay";
import { toast } from "sonner";
import { MapPin, Search, Wind, Droplets } from "lucide-react";

const WeatherWidget = () => {
  const [city, setCity] = useState("Tagum"); // Initial default
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    setError(false);
    try {
      const data = await getForecast(searchCity);
      if (data?.list) {
        setWeather(data);
        setSelectedDay(data.list[0].dt_txt.split(" ")[0]);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error(`City "${searchCity}" not found.`);
      } else {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // AUTOMATIC LOCATION LOGIC
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // If the user allows location, we could fetch by coords
          // For now, we'll keep it simple: if they are in a new city,
          // they can search, or you can use a reverse-geocoding API here.
          fetchWeather("Tagum");
        },
        () => {
          // Fallback if location is denied
          fetchWeather("Tagum");
        },
      );
    } else {
      fetchWeather("Tagum");
    }
  }, []);

  if (loading && !weather) {
    return (
      <div className="h-full min-h-[400px] bg-[#3E0703] rounded-[2.5rem] flex items-center justify-center">
        <div className="animate-pulse text-white/20 font-black italic tracking-widest">
          SYNCING LOCAL ATMOSPHERE...
        </div>
      </div>
    );
  }

  const dayData =
    weather?.list?.find((item) => item.dt_txt.includes(selectedDay)) ||
    weather?.list?.[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#4A0804] to-[#660B05] p-8 rounded-[2.5rem] shadow-2xl w-full h-full text-white border border-white/10 flex flex-col justify-between">
      <div className="relative z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeather(city);
          }}
          className="mb-8 relative group"
        >
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white transition-colors"
            size={16}
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Search city..."
            className="w-full bg-white/10 backdrop-blur-xl text-white rounded-2xl py-3 pl-12 pr-5 border border-white/10 focus:border-white/40 outline-none transition-all text-sm font-medium"
          />
        </form>

        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin size={14} className="text-red-400" />
              <p className="text-white font-bold text-xl tracking-tight">
                {weather?.city?.name}
              </p>
            </div>
            <h1 className="text-7xl font-black tracking-tighter italic drop-shadow-lg">
              {dayData ? Math.round(dayData.main.temp) : "--"}°
            </h1>
            <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">
              {dayData?.weather[0].description}
            </p>
          </div>
          {dayData && (
            <img
              src={`https://openweathermap.org/img/wn/${dayData.weather[0].icon}@4x.png`}
              className="w-28 drop-shadow-2xl brightness-110"
              alt="weather"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-sm flex items-center gap-3">
            <Droplets size={18} className="text-blue-400" />
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase">
                Humidity
              </p>
              <p className="text-lg font-bold">{dayData?.main.humidity}%</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-sm flex items-center gap-3">
            <Wind size={18} className="text-slate-300" />
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase">
                Wind
              </p>
              <p className="text-lg font-bold">{dayData?.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      </div>

      <ForecastDisplay
        forecastList={weather?.list}
        setSelectedDay={setSelectedDay}
        selectedDay={selectedDay}
      />
    </div>
  );
};

export default WeatherWidget;
