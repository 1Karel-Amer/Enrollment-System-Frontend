import React from "react";
import { X, BookOpen, Clock, Info, AlignLeft } from "lucide-react";

const SubjectDetails = ({ subject, onClose }) => {
  return (
    // Backdrop with blur
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose} // Clicking outside closes the modal
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        {/* Header Section */}
        <div className="bg-gradient-to-br from-[#3E0703] via-[#5A0A05] to-[#8C1007] p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} className="text-white" />
          </button>

          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 border border-white/20">
            {subject.code}
          </span>
          <h2 className="text-2xl font-black uppercase italic leading-tight text-balance pr-8">
            {subject.title}
          </h2>
        </div>

        {/* Content Section */}
        <div className="p-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <BookOpen size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Units
                </span>
              </div>
              <p className="font-bold text-slate-800">{subject.units} Units</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Clock size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Term
                </span>
              </div>
              <p className="font-bold text-slate-800 text-sm truncate">
                {subject.term}
              </p>
            </div>
          </div>

          {/* Requisites */}
          <div className="space-y-3 mb-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-rose-50 rounded-lg text-rose-600 shrink-0">
                <Info size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Pre-requisites
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {subject.preReq || "None"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600 shrink-0">
                <Info size={16} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Co-requisites
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  {subject.coReq || "None"}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-slate-100 pt-6">
            <div className="flex items-center gap-2 text-[#8C1007] mb-2">
              <AlignLeft size={16} />
              <p className="text-xs font-bold uppercase tracking-widest">
                Course Description
              </p>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {subject.description ||
                "No description available for this course yet."}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-8 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectDetails;
