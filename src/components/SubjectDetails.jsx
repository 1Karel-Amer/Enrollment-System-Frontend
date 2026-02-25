import React from "react";

const SubjectDetails = ({ subject, onClose }) => {
  if (!subject) return null;

  return (
    <div className="fixed inset-0 bg-[#3E0703]/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-fade-in">
        <div className="bg-[#660B05] p-8 text-white flex justify-between items-start">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2 py-1 rounded">
              {subject.program} Offering
            </span>
            <h2 className="text-4xl font-black mt-4">{subject.code}</h2>
            <p className="text-white/80 font-medium text-lg">{subject.title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-2xl font-light hover:rotate-90 transition-transform"
          >
            ×
          </button>
        </div>

        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl">
              <p className="text-[10px] font-black text-slate-400 uppercase">
                Description
              </p>
              <p className="text-sm text-slate-600 italic leading-relaxed mt-1">
                "{subject.description}"
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-slate-100 rounded-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Units
                </p>
                <p className="text-xl font-black text-[#3E0703]">
                  {subject.units}
                </p>
              </div>
              <div className="p-4 border border-slate-100 rounded-xl">
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Term
                </p>
                <p className="text-sm font-bold text-[#660B05]">
                  {subject.term}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-l border-slate-100 pl-8">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                Pre-requisites
              </p>
              <p
                className={`text-lg font-black ${subject.preReq === "None" ? "text-slate-300" : "text-[#8C1007]"}`}
              >
                {subject.preReq}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
                Co-requisites
              </p>
              <p className="text-lg font-black text-slate-300">
                {subject.coReq || "None"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
