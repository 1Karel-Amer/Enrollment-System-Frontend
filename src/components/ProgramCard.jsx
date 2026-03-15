import React from "react";
import { GraduationCap, ChevronRight } from "lucide-react";

const ProgramCard = ({ program, onSelect, role }) => {
  const isActive = program.status?.toLowerCase() === "active";

  return (
    <div
      onClick={() => onSelect(program)}
      className="bg-white p-7 rounded-[1.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1.5 group flex flex-col justify-between h-[240px] relative overflow-hidden"
    >
      {/* Subtle UI accent */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-[#8C1007]/5 to-[#8C1007]/10 rounded-full group-hover:scale-125 transition-transform duration-500" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-5">
          {/* Icon using your UM theme color */}
          <div className="w-12 h-12 bg-gradient-to-br from-[#8C1007]/10 to-[#8C1007]/20 rounded-2xl flex items-center justify-center text-[#8C1007] group-hover:bg-[#8C1007] group-hover:text-white transition-all duration-300 shadow-sm">
            <GraduationCap size={24} />
          </div>

          {/* Status Badge */}
          {role !== "student" && (
            <span
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest ${
                isActive
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-slate-100 text-slate-500 border border-slate-200"
              }`}
            >
              {program.status || "Active"}
            </span>
          )}
        </div>

        <p className="text-xs font-black text-[#8C1007] uppercase tracking-widest mb-2">
          {program.code}
        </p>

        <h3 className="font-black text-[#3E0703] text-xl leading-tight uppercase italic tracking-tight group-hover:text-[#8C1007] transition-colors line-clamp-2">
          {program.name}
        </h3>
      </div>

      <div className="pt-5 mt-auto border-t border-slate-100 flex items-center justify-between relative z-10">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
          {program.duration || "4 Years"}
        </span>
        <div className="flex items-center gap-1 text-[#8C1007] font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          View Details
          <ChevronRight size={16} />
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
