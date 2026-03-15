import React, { useState, useEffect } from "react";
import { getForecast } from "../services/weatherApi";
import ForecastDisplay from "./ForecastDisplay";
import { toast } from "sonner";
import { MapPin, Search, Wind, Droplets } from "lucide-react";

const WeatherWidget = () => {
  const [city, setCity] = useState("Tagum");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  const fetchWeather = async (searchCity) => {
    setLoading(true);
    try {
      const data = await getForecast(searchCity);
      if (data?.list) {
        setWeather(data);
        setSelectedDay(data.list[0].dt_txt.split(" ")[0]);
      }
    } catch (err) {
      toast.error(
        err.response?.status === 404
          ? `City "${searchCity}" not found.`
          : "Weather sync failed.",
      );
    } finally {
      // Small delay for a smoother visual transition
      setTimeout(() => setLoading(false), 800);
    }
  };

  useEffect(() => {
    fetchWeather("Tagum");
  }, []);

  if (loading) return <WeatherSkeleton />;

  const dayData =
    weather?.list?.find((item) => item.dt_txt.includes(selectedDay)) ||
    weather?.list?.[0];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#4A0804] to-[#660B05] p-8 rounded-[2.5rem] shadow-2xl w-full h-full text-white border border-white/10 flex flex-col justify-between transition-all duration-500">
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
          <div className="animate-in fade-in slide-in-from-left-4 duration-700">
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
              className="w-28 drop-shadow-2xl brightness-110 animate-in zoom-in duration-500"
              alt="weather"
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Droplets size={18} className="text-blue-400" />
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-tighter">
                Humidity
              </p>
              <p className="text-lg font-bold">{dayData?.main.humidity}%</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-sm flex items-center gap-3 hover:bg-white/10 transition-colors">
            <Wind size={18} className="text-slate-300" />
            <div>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-tighter">
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

const WeatherSkeleton = () => (
  <div className="bg-gradient-to-br from-[#4A0804] to-[#660B05] p-8 rounded-[2.5rem] w-full h-full border border-white/10 flex flex-col justify-between">
    <div>
      <div className="h-12 w-full bg-white/10 rounded-2xl mb-8 shimmer-wrapper" />
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-white/20 rounded-lg shimmer-wrapper" />
          <div className="h-20 w-28 bg-white/20 rounded-2xl shimmer-wrapper" />
          <div className="h-4 w-40 bg-white/10 rounded-md shimmer-wrapper" />
        </div>
        <div className="w-24 h-24 bg-white/10 rounded-full shimmer-wrapper" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="h-20 bg-white/5 rounded-3xl shimmer-wrapper" />
        <div className="h-20 bg-white/5 rounded-3xl shimmer-wrapper" />
      </div>
    </div>
    <div className="grid grid-cols-5 gap-2 mt-4 pt-6 border-t border-white/10">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-20 bg-white/5 rounded-2xl shimmer-wrapper" />
      ))}
    </div>
  </div>
);

export default WeatherWidget;
