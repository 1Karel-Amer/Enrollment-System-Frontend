import React from "react";
import { BookOpen, GraduationCap } from "lucide-react";

const SubjectCard = ({ subject, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative p-6 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:border-[#8C1007]/30 cursor-pointer transition-all duration-300 flex flex-col h-full overflow-hidden hover:-translate-y-1"
    >
      {/* Left accent border */}
      <div className="absolute top-0 left-0 w-1.5 h-full bg-slate-200 group-hover:bg-[#8C1007] transition-colors duration-300" />

      <div className="flex justify-between items-start mb-3">
        <p className="font-black text-[#8C1007] text-sm tracking-wide bg-[#8C1007]/10 px-2 py-1 rounded-md">
          {subject.code}
        </p>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md border border-slate-200">
          {subject.term}
        </span>
      </div>

      <p className="text-base font-bold text-slate-800 mb-4 flex-grow leading-snug group-hover:text-[#8C1007] transition-colors">
        {subject.title}
      </p>

      <div className="pt-4 border-t border-slate-100 flex flex-col gap-2 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1.5">
          <BookOpen size={14} className="text-slate-400" />
          {subject.units} Units
        </span>
        {subject.program?.name && (
          <span
            className="flex items-center gap-1.5 truncate"
            title={subject.program.name}
          >
            <GraduationCap size={14} className="text-slate-400 shrink-0" />
            <span className="truncate">{subject.program.name}</span>
          </span>
        )}
      </div>
    </div>
  );
};

export default SubjectCard;
