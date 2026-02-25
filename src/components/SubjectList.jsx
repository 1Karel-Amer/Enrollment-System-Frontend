import React, { useState } from "react";

const SubjectList = ({ subjects, onSelect }) => {
  const [search, setSearch] = useState("");
  const [filterTerm, setFilterTerm] = useState("All");

  const filtered = subjects.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());
    const matchesTerm = filterTerm === "All" || s.term === filterTerm;
    return matchesSearch && matchesTerm;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <input
          type="text"
          placeholder="Search by code or title..."
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#660B05] outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#3E0703] outline-none"
          onChange={(e) => setFilterTerm(e.target.value)}
        >
          <option value="All">All Semesters</option>
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
        </select>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <div
            key={s.id}
            onClick={() => onSelect(s)}
            className="group bg-white p-6 rounded-2xl border-l-4 border-[#8C1007] shadow-sm hover:shadow-md transition-all cursor-pointer flex justify-between items-center"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <span className="text-xl font-black text-[#3E0703]">
                  {s.code}
                </span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-[#FFF0C4] text-[#660B05]">
                  {s.term}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-600 group-hover:text-[#660B05] transition-colors">
                {s.title}
              </h4>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                {s.units} Units • Pre-req:{" "}
                {s.preReq === "None" ? "None" : s.preReq}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-[#660B05] group-hover:text-white transition-all">
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
