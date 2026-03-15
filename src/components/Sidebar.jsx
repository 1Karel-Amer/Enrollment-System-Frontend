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
  Loader2,
  AlertCircle,
} from "lucide-react";

const Sidebar = ({ activePage, onPageChange, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleFinalLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      onLogout();
    }, 1500);
  };

  const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: LayoutDashboard },
    { label: "Programs", key: "programs", icon: GraduationCap },
    { label: "Subjects", key: "subjects", icon: BookOpen },
    { label: "Students", key: "students", icon: Users },
    { label: "Enrollment", key: "enrollment", icon: UserPlus },
    { label: "Calendar", key: "calendar", icon: CalendarDays },
  ];

  return (
    <>
      <aside
        className={`relative h-screen transition-all duration-500 ease-in-out flex flex-col z-50 shadow-2xl
          ${isCollapsed ? "w-24" : "w-64"} 
          bg-gradient-to-b from-[#4a0804] via-[#2d0502] to-[#0f172a] overflow-x-hidden`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 bg-[#941B14] text-white rounded-full p-2 border-4 border-[#3E0703] hover:bg-[#b01e15] z-[60]"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        <div
          className={`pt-12 pb-8 px-4 flex justify-center items-center min-h-[140px]`}
        >
          {!isCollapsed ? (
            <div className="text-center">
              <h1 className="text-xl font-black uppercase text-white">
                University <br />
                <span className="text-red-500">of Mindanao</span>
              </h1>
            </div>
          ) : (
            <div className="font-black text-3xl italic text-red-500">UM</div>
          )}
        </div>

        <nav className="flex-1 px-4 space-y-3 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => onPageChange(item.key)}
              className={`relative group w-full flex items-center rounded-2xl transition-all duration-300
                ${isCollapsed ? "justify-center p-4" : "p-3.5 space-x-4"} 
                ${activePage === item.key ? "bg-white/10 text-white" : "text-white/40 hover:text-white"}`}
            >
              <item.icon
                size={isCollapsed ? 26 : 22}
                className={activePage === item.key ? "text-red-500" : ""}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto">
          {/* Changed onClick to show the modal instead of immediate logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className={`flex items-center group rounded-2xl transition-all duration-300 w-full bg-black/20 border border-white/5
              ${isCollapsed ? "justify-center p-4" : "p-3 space-x-4 hover:bg-red-500/10"}
              text-slate-400 hover:text-red-400`}
          >
            <LogOut size={isCollapsed ? 24 : 20} />
            {!isCollapsed && (
              <span className="text-xs font-black uppercase tracking-widest">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* --- LOGOUT CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-[#1e293b] border border-white/10 w-full max-w-sm rounded-[2rem] p-8 shadow-2xl overflow-hidden relative">
            {isLoggingOut ? (
              <div className="flex flex-col items-center justify-center py-6 text-center space-y-4 animate-in zoom-in duration-300">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                  <div className="absolute inset-0 blur-lg bg-red-500/20" />
                </div>
                <p className="text-white font-bold tracking-widest uppercase text-sm">
                  Securing your session...
                </p>
              </div>
            ) : (
              <div className="animate-in slide-in-from-bottom-4">
                <div className="flex justify-center mb-4">
                  <div className="bg-red-500/10 p-4 rounded-full">
                    <AlertCircle className="text-red-500 w-8 h-8" />
                  </div>
                </div>
                <h2 className="text-white text-xl font-black text-center mb-2"></h2>
                <p className="text-slate-400 text-center text-sm mb-8">
                  Are you sure you want to end your session?
                </p>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={handleFinalLogout}
                    className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all active:scale-95"
                  >
                    Yes, Logout
                  </button>
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
