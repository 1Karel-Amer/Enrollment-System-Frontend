import React, { useState, useEffect } from "react";

const Home = () => {
  const [weather, setWeather] = useState({
    temp: "--",
    condition: "Loading...",
  });

  // Mock Weather API Integration placeholder
  useEffect(() => {
    // Future: fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=Davao')
    setTimeout(() => {
      setWeather({ temp: "31°C", condition: "Sunny in Davao" });
    }, 1500);
  }, []);

  const menuItems = [
    "Students",
    "Courses",
    "Enrollment",
    "Reports",
    "Settings",
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#3E0703] text-white hidden md:flex flex-col shadow-xl">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-tighter">
            UM Portal
          </h1>
          <p className="text-[10px] text-[#8C1007] font-bold uppercase">
            Enrollment Admin
          </p>
        </div>

        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item}
              className="w-full flex items-center p-3 text-sm font-semibold rounded-xl hover:bg-[#660B05] transition-all group"
            >
              <span className="opacity-70 group-hover:opacity-100">{item}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 bg-[#3E0703] border-t border-white/10">
          <div className="text-xs font-bold text-white/50 mb-2 uppercase">
            Weather Stats
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-[#FFF0C4]">
              {weather.temp}
            </span>
            <span className="text-[10px] leading-tight text-white/70">
              {weather.condition}
            </span>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* TOP NAV */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <h2 className="text-lg font-bold text-[#3E0703]">
            Dashboard Overview
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#3E0703]">Admin User</p>
              <p className="text-[10px] font-bold text-[#660B05] uppercase">
                Registrar Office
              </p>
            </div>
            <div className="w-10 h-10 bg-[#8C1007] rounded-full border-2 border-slate-200 shadow-sm"></div>
          </div>
        </header>

        {/* DASHBOARD GRID */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* STATS WIDGETS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Total Students", value: "12,450", color: "#3E0703" },
              { label: "Active Courses", value: "84", color: "#660B05" },
              { label: "New Enrollees", value: "1,202", color: "#8C1007" },
              { label: "Revenue", value: "₱2.4M", color: "#3E0703" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
              >
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                  {stat.label}
                </p>
                <p
                  className="text-2xl font-black"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* REALISTIC CHART PLACEHOLDER */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 min-h-[400px]">
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-bold text-[#3E0703]">
                  Enrollment Trends (2026)
                </h3>
                <span className="text-[10px] bg-slate-100 px-3 py-1 rounded-full font-bold text-slate-500 uppercase">
                  Live Data
                </span>
              </div>
              <div className="w-full h-64 bg-slate-50 rounded-2xl flex items-end justify-around p-4 gap-2">
                {/* Mock Chart Bars */}
                {[40, 70, 45, 90, 65, 80, 95].map((h, i) => (
                  <div
                    key={i}
                    className="w-full bg-[#660B05]/20 rounded-t-lg transition-all hover:bg-[#660B05]"
                    style={{ height: `${h}%` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* CHATBOT INTERFACE */}
            <div className="bg-[#3E0703] rounded-[2rem] shadow-2xl p-6 flex flex-col">
              <h3 className="text-[#FFF0C4] font-bold mb-4 flex items-center gap-2 text-sm uppercase">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                UM Assistant
              </h3>
              <div className="flex-1 bg-white/5 rounded-xl p-4 mb-4 overflow-y-auto space-y-4">
                <p className="text-white/70 text-xs bg-white/10 p-3 rounded-lg rounded-tl-none">
                  Hello! How can I help with student records today?
                </p>
                <p className="text-white/90 text-xs bg-[#660B05] p-3 rounded-lg rounded-tr-none ml-auto w-3/4">
                  Show me pending enrollees for IT-101.
                </p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 outline-none focus:border-[#8C1007]"
                  placeholder="Ask a question..."
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
