import React, { useState, useMemo } from "react";
import SubjectList from "./SubjectList";
import SubjectDetails from "./SubjectDetails";

const SubjectListingPage = ({ subjects = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTerm, setFilterTerm] = useState("All");
  const [filterProgram, setFilterProgram] = useState("All");
  const [filterPrereq, setFilterPrereq] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Filter Logic
  const filteredSubjects = useMemo(() => {
    return subjects.filter((s) => {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch =
        s.code.toLowerCase().includes(lowerSearch) ||
        s.title.toLowerCase().includes(lowerSearch);

      const matchesTerm = filterTerm === "All" || s.term === filterTerm;
      const matchesProgram =
        filterProgram === "All" || s.program === filterProgram;
      const hasPrereq = s.preReq && s.preReq !== "None";
      const matchesPrereq =
        filterPrereq === "All" ||
        (filterPrereq === "With" ? hasPrereq : !hasPrereq);

      return matchesSearch && matchesTerm && matchesProgram && matchesPrereq;
    });
  }, [subjects, searchTerm, filterTerm, filterProgram, filterPrereq]);

  return (
   
    <div className="max-w-5xl mx-auto w-full animate-in fade-in duration-700 pb-20">
      {/* 1. HEADER SECTION */}
      <header className="mb-12">
        <h1 className="text-7xl font-[900] text-[#3E0703] uppercase tracking-tighter leading-[0.8] mb-4">
          Subject <br /> Offerings
        </h1>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">
          Academic Year 2025-2026
        </p>
      </header>

      {/* 2. CENTERED SEARCH BAR - Now spans the full width of the centered container */}
      <div className="relative group mb-16">
        <input
          type="text"
          placeholder="Search code, title, or program tags..."
          className="w-full bg-white border-2 border-slate-100 rounded-3xl px-10 py-6 text-lg shadow-[0_15px_40px_rgba(0,0,0,0.03)] focus:ring-8 focus:ring-[#660B05]/5 focus:border-[#3E0703] outline-none transition-all placeholder:text-slate-200"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-4">
          <span className="h-6 w-[1px] bg-slate-100"></span>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Tags
          </span>
        </div>
      </div>

      {/* 3. MINIMALIST FILTER ROW - Distributed evenly */}
      <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mb-20 border-b border-slate-100 pb-10">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Term
          </span>
          <select
            onChange={(e) => setFilterTerm(e.target.value)}
            className="text-xs font-black uppercase text-[#3E0703] bg-transparent outline-none cursor-pointer hover:text-[#8C1007] transition-colors"
          >
            <option value="All">All Semesters</option>
            <option value="1st Semester">1st Semester</option>
            <option value="2nd Semester">2nd Semester</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Program
          </span>
          <select
            onChange={(e) => setFilterProgram(e.target.value)}
            className="text-xs font-black uppercase text-[#3E0703] bg-transparent outline-none cursor-pointer hover:text-[#8C1007] transition-colors"
          >
            <option value="All">All Programs</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCS">BSCS</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Prereq
          </span>
          <select
            onChange={(e) => setFilterPrereq(e.target.value)}
            className="text-xs font-black uppercase text-[#3E0703] bg-transparent outline-none cursor-pointer hover:text-[#8C1007] transition-colors"
          >
            <option value="All">Any Status</option>
            <option value="With">With Pre-requisites</option>
            <option value="Without">No Pre-requisites</option>
          </select>
        </div>
      </div>

      {/* 4. SUBJECT LIST - Requirement 3.A */}
      <div className="space-y-4">
        <SubjectList
          subjects={filteredSubjects}
          onSelect={(s) => setSelectedSubject(s)}
        />
      </div>

      {selectedSubject && (
        <SubjectDetails
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
};

export default SubjectListingPage;
