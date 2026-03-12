import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 

import programsData from "../data/programs.json";
import subjectsData from "../data/subjects.json";

import Chatbot from "../components/Chatbot";
import Dashboard from "../components/Dashboard";
import ProgramList from "../components/ProgramList";
import ProgramDetails from "../components/ProgramDetails";
import SubjectListingPage from "../components/SubjectListingPage"; 

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "admin";

  const [weather, setWeather] = useState({
    temp: "--",
    condition: "Loading...",
  });

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Weather Logic
  useEffect(() => {
    setTimeout(() => {
      setWeather({ temp: "31°C", condition: "Sunny in Davao" });
    }, 1500);
  }, []);

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Programs", key: "programs" },
    { label: "Subjects", key: "subjects" }, 
    { label: "Students", key: "students" },
    { label: "Enrollment", key: "enrollment" },
    { label: "Reports", key: "reports" },
    { label: "Settings", key: "settings" },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#3E0703] text-white hidden md:flex flex-col shadow-xl">
        <div className="p-8 border-b border-white/10">
          <h1 className="text-xl font-black uppercase tracking-tighter italic">
            UM PORTAL
          </h1>
          <p className="text-[10px] text-[#8C1007] font-bold uppercase">
            {role === "student" ? "Student Portal" : "Enrollment Admin"}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                setActivePage(item.key);
                setSelectedProgram(null);
              }}
              className={`w-full flex items-center p-3 text-sm font-semibold rounded-xl transition-all ${
                activePage === item.key
                  ? "bg-[#660B05] shadow-lg"
                  : "hover:bg-[#660B05]/50 text-white/70 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* LOGOUT CHOICE */}
        <div className="px-4 py-2 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-sm font-bold text-red-400 hover:bg-red-500/10 rounded-xl transition-all group"
          >
            <span>Logout</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </button>
        </div>

        {/* Weather Display */}
        <div className="p-6 bg-[#3E0703]">
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <h2 className="text-lg font-bold text-[#3E0703] capitalize">
            {activePage}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#3E0703] leading-none mb-1">
                {role === "student" ? "Student User" : "Admin User"}
              </p>
              <p className="text-[10px] font-bold text-[#660B05] uppercase tracking-wider">
                {role === "student" ? "Student Access" : "Registrar Office"}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#8C1007] rounded-full border-2 border-slate-200 shadow-sm"></div>
          </div>
        </header>

        {/* PAGE DYNAMIC CONTENT */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* DASHBOARD VIEW */}
          {activePage === "dashboard" && (
            <Dashboard programs={programsData} subjects={subjectsData} />
          )}

          {/* PROGRAMS VIEW */}
          {activePage === "programs" &&
            (!selectedProgram ? (
              <ProgramList
                programs={programsData}
                onSelect={(p) => setSelectedProgram(p)}
                role={role}
              />
            ) : (
              <ProgramDetails
                program={selectedProgram}
                subjects={subjectsData}
                onBack={() => setSelectedProgram(null)}
              />
            ))}

          {/* SUBJECT OFFERINGS MODULE */}
          {activePage === "subjects" && (
            <SubjectListingPage subjects={subjectsData} />
          )}

          {/* PLACEHOLDER MODULES (Students, Enrollment, etc.) */}
          {["students", "enrollment", "reports", "settings"].includes(
            activePage,
          ) && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl opacity-20">📁</span>
              </div>
              <h3 className="text-2xl font-black text-[#3E0703] uppercase tracking-tighter">
                {activePage} Module
              </h3>
              <p className="text-slate-400 mt-2 max-w-xs mx-auto text-sm font-medium leading-relaxed">
                This module is ready for integration with your Laravel REST API.
              </p>
            </div>
          )}
        </div>

        {/* Chatbot Overlay */}
        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
