import React, { useState } from "react";

const ProgramDetails = ({ program, subjects, onBack }) => {
  const [selectedYear, setSelectedYear] = useState("1st Year");

  // Filter by Program Code AND the Selected Year Level
  const filteredSubjects = subjects.filter(
    (s) => s.program === program.code && s.year === selectedYear,
  );

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  // If Engineering, add 5th year
  if (program.duration?.includes("5")) years.push("5th Year");

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in duration-300">
      {/* Header with Darker UM Red */}
      <div className="bg-[#3E0703] p-12 text-white relative">
        <button
          onClick={onBack}
          className="group text-[10px] font-black uppercase tracking-widest opacity-70 hover:opacity-100 mb-6 flex items-center gap-2 transition-all"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>{" "}
          Back to Programs
        </button>

        <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-4">
          {program.name}
        </h1>

        <div className="flex gap-4 items-center">
          <p className="bg-[#FFF0C4] text-[#3E0703] px-3 py-1 rounded font-black text-[10px] uppercase">
            {program.code}
          </p>
          <p className="text-white/60 font-bold text-xs uppercase tracking-widest">
            {program.duration} Curriculum
          </p>
        </div>

        {/* Added Program Description */}
        <div className="mt-8 max-w-2xl">
          <p className="text-white/70 text-sm leading-relaxed italic">
            {program.description ||
              "The curriculum focuses on developing core competencies and professional standards required for this field of study."}
          </p>
        </div>
      </div>

      <div className="p-12 bg-slate-50/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
          <h3 className="text-[#3E0703] font-black uppercase text-xs tracking-widest">
            Curriculum Structure
          </h3>

          {/* Year Level Tabs */}
          <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                  selectedYear === year
                    ? "bg-[#660B05] text-white shadow-md"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((s) => (
              <div
                key={s.id}
                className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:border-[#660B05]/30 transition-colors group"
              >
                <div className="flex justify-between items-start mb-3">
                  <p className="font-black text-[#660B05] text-sm group-hover:scale-105 transition-transform">
                    {s.code}
                  </p>
                  <span className="text-[9px] font-bold text-slate-300 uppercase bg-slate-50 px-2 py-0.5 rounded">
                    {s.term}
                  </span>
                </div>
                <p className="text-sm text-slate-700 font-bold mb-2">
                  {s.title}
                </p>
                <div className="pt-3 border-t border-slate-50 flex justify-between items-center">
                  <p className="text-[9px] text-slate-400 font-medium">
                    Pre-req:{" "}
                    <span className="text-[#660B05] font-bold">{s.preReq}</span>
                  </p>
                  <p className="text-[9px] text-slate-400 font-medium">
                    {s.units} Units
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 text-sm font-medium italic">
                No subjects uploaded for {selectedYear} yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
