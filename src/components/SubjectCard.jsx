import React from "react";

const SubjectCard = ({ subject, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(subject)}
      className="group bg-white p-6 rounded-[2rem] border-l-4 border-l-[#660B05] border-y border-r border-slate-100 shadow-sm hover:shadow-xl transition-all cursor-pointer flex justify-between items-center animate-in slide-in-from-bottom-4 duration-300"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-[#3E0703]">
            {subject.code}
          </span>
          <span className="text-[9px] font-black px-2 py-0.5 rounded bg-[#FFF0C4] text-[#3E0703] uppercase">
            {subject.term}
          </span>
        </div>
        <h4 className="font-bold text-slate-700 text-lg group-hover:text-[#660B05] transition-colors">
          {subject.title}
        </h4>
        <div className="flex gap-4 items-center pt-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            {subject.units} Units
          </p>
          <p className="text-[10px] font-bold text-[#660B05] uppercase tracking-widest bg-red-50 px-2 py-0.5 rounded-full">
            Pre-req: {subject.preReq || "None"}
          </p>
        </div>
      </div>

      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#660B05] group-hover:text-white transition-all text-slate-300">
        <span className="text-xl">→</span>
      </div>
    </div>
  );
};

export default SubjectCard;
