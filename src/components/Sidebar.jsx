import React, { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Users,
  UserPlus,
  CalendarDays,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ role, activePage, onPageChange, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { label: "Programs", key: "programs", icon: GraduationCap },
    { label: "Subjects", key: "subjects", icon: BookOpen },
    { label: "Students", key: "students", icon: Users },
    { label: "Enrollment", key: "enrollment", icon: UserPlus },
    { label: "Calendar", key: "calendar", icon: CalendarDays },
  ];

  return (
    <aside
      className={`relative h-screen bg-[#3E0703] text-white transition-all duration-300 ease-in-out flex flex-col z-50 ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-[#8C1007] text-white rounded-full p-1 border-2 border-[#3E0703] hover:scale-110 transition-transform"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div
        className={`p-6 border-b border-white/10 ${isCollapsed ? "text-center" : ""}`}
      >
        {!isCollapsed ? (
          <h1 className="text-lg font-black leading-tight tracking-tight uppercase">
            University <br />
            <span className="text-red-500">of Mindanao</span>
          </h1>
        ) : (
          <div className="font-black text-xl italic text-red-500">UM</div>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-2 mt-4 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => onPageChange(item.key)}
            className={`w-full flex items-center rounded-xl transition-all duration-200 ${
              isCollapsed ? "justify-center p-3" : "p-3 space-x-4"
            } ${activePage === item.key ? "bg-[#660B05] text-white shadow-lg" : "text-white/50 hover:bg-white/5 hover:text-white"}`}
          >
            <item.icon size={20} />
            {!isCollapsed && (
              <span className="font-semibold text-sm">{item.label}</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={onLogout}
          className={`flex items-center text-red-400 hover:bg-red-500/10 rounded-xl transition-all w-full ${isCollapsed ? "justify-center p-3" : "p-3 space-x-4"}`}
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
