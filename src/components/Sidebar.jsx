import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, active: true },
    { name: "Enrollment", icon: <Users size={20} /> },
    { name: "Reports", icon: <FileText size={20} /> },
    { name: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#3E0703] text-white rounded-xl shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-[#3E0703] text-white transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        flex flex-col h-full
      `}
      >
        <div className="p-8">
          <h2 className="text-xl font-black tracking-tighter italic text-white">
            ACADEMIC SYS
          </h2>
          <p className="text-[10px] text-white/40 uppercase mt-1 tracking-widest font-bold">
            Management Portal
          </p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all ${
                item.active
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-white/50 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="font-bold text-sm">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <button className="w-full flex items-center gap-4 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all">
            <LogOut size={20} />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
