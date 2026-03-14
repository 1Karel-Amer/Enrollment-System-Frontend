import React, { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  UserPlus,
  FileBarChart,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ role, activePage, onPageChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Controls the width

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { label: "Programs", key: "programs", icon: GraduationCap },
    { label: "Subjects", key: "subjects", icon: BookOpen },
    { label: "Students", key: "students", icon: Users },
    { label: "Enrollment", key: "enrollment", icon: UserPlus },
    { label: "Reports", key: "reports", icon: FileBarChart },
  ];

  return (
    <aside
      className={`relative h-screen bg-[#3E0703] text-white transition-all duration-300 ease-in-out flex flex-col shadow-2xl z-50
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* TOGGLE BUTTON - Floating on the edge */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-[#8C1007] text-white rounded-full p-1 border-2 border-[#3E0703] hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* LOGO AREA */}
      <div
        className={`p-6 border-b border-white/10 transition-all ${isCollapsed ? "items-center" : ""}`}
      >
        {!isCollapsed ? (
          <>
            <h1 className="text-xl font-black uppercase tracking-tighter italic">
              UM PORTAL
            </h1>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
              {role === "student" ? "Student Access" : "Enrollment Admin"}
            </p>
          </>
        ) : (
          <div className="font-black text-xl italic text-center">UM</div>
        )}
      </div>

      {/* NAVIGATION LINKS */}
      <nav className="flex-1 p-3 space-y-2 mt-4 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.key}
            title={isCollapsed ? item.label : ""} // Tooltip on hover when slim
            onClick={() => onPageChange(item.key)}
            className={`w-full flex items-center rounded-xl transition-all duration-200 group
              ${isCollapsed ? "justify-center p-3" : "p-3 space-x-4"}
              ${
                activePage === item.key
                  ? "bg-[#660B05] text-white shadow-lg"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
          >
            <item.icon
              size={20}
              className={
                activePage === item.key
                  ? "text-white"
                  : "group-hover:text-white"
              }
            />

            {/* Smoothly hide text when collapsed */}
            <span
              className={`font-semibold text-sm transition-opacity duration-300 
              ${isCollapsed ? "hidden opacity-0" : "block opacity-100"}`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* LOGOUT BUTTON */}
      <div className="p-4 border-t border-white/10">
        <button
          className={`flex items-center text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full
            ${isCollapsed ? "justify-center p-3" : "p-3 space-x-4"}`}
        >
          <LogOut size={20} />
          {!isCollapsed && (
            <span className="text-sm font-bold uppercase tracking-wider">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
