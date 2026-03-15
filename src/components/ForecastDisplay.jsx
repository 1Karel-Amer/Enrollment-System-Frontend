import React from "react";

const ForecastDisplay = ({ forecastList, setSelectedDay, selectedDay }) => {
  if (!forecastList) return null;

  // Group by date and pick the one closest to noon (12:00:00)
  const dailyMap = new Map();
  forecastList.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!dailyMap.has(date) || item.dt_txt.includes("12:00:00")) {
      dailyMap.set(date, item);
    }
  });

  const fiveDayForecast = Array.from(dailyMap.values()).slice(0, 5);

  return (
    <div className="grid grid-cols-5 gap-2 mt-4 pt-6 border-t border-white/10">
      {fiveDayForecast.map((day) => {
        const date = day.dt_txt.split(" ")[0];
        const isSelected = selectedDay === date;

        return (
          <button
            key={day.dt}
            onClick={() => setSelectedDay(date)}
            className={`flex flex-col items-center py-3 rounded-2xl transition-all duration-300
            ${isSelected ? "bg-white/20 border border-white/20 shadow-lg scale-105" : "hover:bg-white/5 border border-transparent"}`}
          >
            <p
              className={`text-[9px] font-black uppercase mb-1 ${isSelected ? "text-white" : "text-white/40"}`}
            >
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="icon"
              className="w-10 h-10 filter brightness-125"
            />
            <p className="text-xs font-black mt-1 italic">
              {Math.round(day.main.temp)}°
            </p>
          </button>
        );
      })}
    </div>
  );
};

export default ForecastDisplay;
