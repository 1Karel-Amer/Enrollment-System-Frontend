import React from "react";

const ProgramDetails = ({ program, subjects, onBack }) => {
  const programSubjects = subjects.filter((s) => s.program === program.code);

  return (
    <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100">
      <div className="bg-[#3E0703] p-10 text-white relative">
        <button
          onClick={onBack}
          className="text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 mb-4 block"
        >
          ← Back to Programs
        </button>
        <h1 className="text-4xl font-black uppercase tracking-tighter">
          {program.name}
        </h1>
        <p className="text-[#FFF0C4] font-bold text-xs mt-2 uppercase">
          {program.code} • {program.duration}
        </p>
      </div>

      <div className="p-10">
        <h3 className="text-[#3E0703] font-black uppercase text-xs mb-6">
          Course Subjects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {programSubjects.map((s) => (
            <div
              key={s.id}
              className="p-4 rounded-xl border border-slate-100 bg-slate-50"
            >
              <p className="font-black text-[#3E0703] text-sm">{s.code}</p>
              <p className="text-[11px] text-slate-500 font-medium">
                {s.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgramDetails;
