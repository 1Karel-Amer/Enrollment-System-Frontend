import React from "react";

const SubjectDetails = ({ subject, onClose }) => {
  if (!subject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3E0703]/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Modal Header */}
        <div className="bg-[#660B05] p-10 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-8 right-8 h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
          <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded uppercase tracking-widest mb-4 inline-block">
            {subject.program} Offering
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tighter">
            {subject.code}
          </h2>
          <p className="text-white/70 font-bold text-lg mt-1">
            {subject.title}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                Description
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed italic border-l-2 border-slate-100 pl-4">
                "
                {subject.description ||
                  "No description provided for this subject."}
                "
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl flex-1 border border-slate-100">
                <h4 className="text-[9px] font-black text-slate-400 uppercase mb-1">
                  Units
                </h4>
                <p className="text-2xl font-black text-[#660B05]">
                  {subject.units}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl flex-1 border border-slate-100">
                <h4 className="text-[9px] font-black text-slate-400 uppercase mb-1">
                  Term
                </h4>
                <p className="text-sm font-black text-[#3E0703]">
                  {subject.term}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {/* PREREQUISITE SECTION FIXED */}
            <div className="group">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                Pre-requisites
              </h4>
              <p
                className={`text-2xl font-black ${subject.preReq === "None" ? "text-slate-200" : "text-[#3E0703]"}`}
              >
                {subject.preReq || "None"}
              </p>
            </div>

            <div>
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
                Co-requisites
              </h4>
              <p className="text-2xl font-black text-slate-200">None</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
