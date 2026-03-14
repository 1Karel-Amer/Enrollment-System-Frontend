import React from "react";

const ForecastDisplay = ({ forecastList, setSelectedDay, selectedDay }) => {
  if (!forecastList) return null;

  const dailyData = forecastList.filter((item) =>
    item.dt_txt.includes("12:00:00"),
  );

  return (
    <div className="grid grid-cols-5 gap-1 mt-4 pt-4 border-t border-white/10">
      {dailyData.map((day) => {
        const date = day.dt_txt.split(" ")[0];
        const isSelected = selectedDay === date;

        return (
          <div
            key={day.dt}
            onClick={() => setSelectedDay(date)}
            className={`cursor-pointer flex flex-col items-center py-2 px-1 rounded-2xl transition-all
            ${isSelected ? "bg-white/20 border border-white/20" : "bg-transparent hover:bg-white/5"}`}
          >
            <p
              className={`text-[9px] font-bold uppercase ${isSelected ? "text-white" : "text-white/50"}`}
            >
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </p>
            {/* VIBRANT ICON: Applied filter to small icons too */}
            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="weather"
              className="w-8 h-8 filter brightness-125 drop-shadow-md"
            />
            <p className="text-xs font-bold">{Math.round(day.main.temp)}°</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastDisplay;
