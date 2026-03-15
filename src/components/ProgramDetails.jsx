import React, { useState } from "react";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

const ProgramDetails = ({ program, subjects = [], onBack }) => {
  const [selectedYear, setSelectedYear] = useState("1st Year");

  const filteredSubjects = subjects.filter((s) => s.year === selectedYear);
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  if (program.duration?.includes("5")) {
    years.push("5th Year");
  }

  return (
    // Added a max-w-6xl and mx-auto to prevent it from stretching endlessly on ultrawides
    <div className="bg-white rounded-[1.5rem] shadow-xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-300 max-w-6xl mx-auto">
      {/* Header - REDUCED padding from p-12 to p-6 md:p-8 */}
      <div className="bg-gradient-to-br from-[#3E0703] via-[#5A0A05] to-[#8C1007] p-6 md:p-8 text-white relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-white/5 rounded-full blur-3xl" />

        <button
          onClick={onBack}
          // REDUCED mb-8 to mb-4
          className="relative z-10 flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors text-sm font-medium bg-white/10 w-fit px-4 py-1.5 rounded-full hover:bg-white/20"
        >
          <ArrowLeft size={16} /> Back to Programs
        </button>

        <div className="relative z-10">
          <p className="text-[#ffb5b0] font-bold tracking-widest uppercase text-xs mb-1">
            {program.code}
          </p>
          {/* REDUCED text size to text-2xl md:text-3xl and mb-4 to mb-2 */}
          <h1 className="text-2xl md:text-3xl font-black uppercase italic leading-tight mb-2 text-balance">
            {program.name}
          </h1>
          <div className="flex items-center gap-2 text-sm text-white/80 font-medium">
            <Clock size={16} className="opacity-70" />
            {program.duration}
          </div>
        </div>
      </div>

      {/* Content - REDUCED padding to p-6 md:p-8 */}
      <div className="p-6 md:p-8 bg-slate-50/50">
        {/* Year Selector Tabs - REDUCED mb-10 to mb-6 */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex bg-slate-200/70 p-1.5 rounded-xl border border-slate-200">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300
          ${
            selectedYear === year
              ? "bg-white text-[#8C1007] shadow-sm"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-200/50"
          }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid - REDUCED gap from 5 to 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((s) => (
              <div
                key={s.id}
                // REDUCED card padding from p-6 to p-5
                className="group relative p-5 border border-slate-200 rounded-2xl bg-white shadow-sm hover:shadow-lg hover:border-[#8C1007]/30 transition-all duration-300 flex flex-col h-full overflow-hidden"
              >
                {/* Left accent border */}
                <div className="absolute top-0 left-0 w-1 h-full bg-slate-200 group-hover:bg-[#8C1007] transition-colors duration-300" />

                <div className="flex justify-between items-start mb-2">
                  <p className="font-black text-[#8C1007] text-sm tracking-wide bg-[#8C1007]/10 px-2 py-1 rounded-md">
                    {s.code}
                  </p>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded-md">
                    {s.term}
                  </span>
                </div>

                <p className="text-sm font-bold text-slate-800 mb-4 flex-grow leading-snug">
                  {s.title}
                </p>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={14} className="text-slate-400" />
                    {s.units} Units
                  </span>
                  {s.preReq && (
                    <span
                      className="text-slate-400 truncate max-w-[120px]"
                      title={s.preReq}
                    >
                      Pre: {s.preReq}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 flex flex-col items-center justify-center text-slate-400 bg-white rounded-3xl border border-dashed border-slate-200">
              <BookOpen size={40} className="mb-4 text-slate-200" />
              <p className="font-medium text-base">No subjects listed</p>
              <p className="text-sm">
                We couldn't find any subjects for {selectedYear}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
