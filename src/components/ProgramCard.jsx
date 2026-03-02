import React from "react";

const ProgramCard = ({ program, onSelect, role }) => {
  const isActive = program.status?.toLowerCase() === "active";

  return (
    <div
      onClick={() => onSelect(program)}
      className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-2 group flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="text-3xl font-black text-[#3E0703] group-hover:scale-110 transition-transform duration-300 block">
            {program.code}
          </span>
          {role !== "student" && (
            <span
              className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                isActive
                  ? "bg-green-100 text-green-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {program.status}
            </span>
          )}
        </div>
        <h3 className="font-bold text-slate-800 text-xl leading-tight group-hover:text-[#660B05] transition-colors">
          {program.name}
        </h3>
      </div>

      <div className="mt-6 pt-6 border-t border-slate-50">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {program.type} • {program.duration}
        </p>
      </div>
    </div>
  );
};

export default ProgramCard;
