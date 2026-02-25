import React from "react";

const ProgramList = ({ programs, onSelect }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {programs.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer hover:-translate-y-1 group"
        >
          <div className="flex justify-between items-start mb-4">
            <span className="text-2xl font-black text-[#3E0703]">{p.code}</span>
            <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-green-100 text-green-700 uppercase">
              {p.status}
            </span>
          </div>
          <h3 className="font-bold text-slate-800 text-lg group-hover:text-[#660B05] transition-colors">
            {p.name}
          </h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase mt-2">
            {p.type} • {p.duration}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProgramList;
