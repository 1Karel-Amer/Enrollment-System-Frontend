import React, { useState, useMemo } from "react";
import SubjectDetails from "./SubjectDetails";
import SubjectCard from "./SubjectCard";

const SubjectListingPage = ({ subjects = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Filter Logic
  const filteredSubjects = useMemo(() => {
    return (subjects || []).filter((s) => {
      const lowerSearch = searchTerm.toLowerCase();
      return (
        s.subject_code?.toLowerCase().includes(lowerSearch) ||
        s.name?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [subjects, searchTerm]);

  return (
    <div className="max-w-5xl mx-auto w-full animate-in fade-in duration-700 pb-20">
      <header className="mb-12">
        <h1 className="text-7xl font-[900] text-[#3E0703] uppercase tracking-tighter leading-[0.8] mb-4">
          Subject <br /> Offerings
        </h1>
      </header>

      {/* Search Bar */}
      <div className="relative group mb-16">
        <input
          type="text"
          placeholder="Search subject code or name..."
          className="w-full bg-white border-2 border-slate-100 rounded-3xl px-10 py-6 text-lg shadow-sm outline-none focus:border-[#3E0703] transition-all"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* SUBJECT LIST - Logic is now built-in here, no extra file needed */}
      <div className="space-y-4">
        {filteredSubjects.length > 0 ? (
          filteredSubjects.map((s) => (
            <SubjectCard
              key={s.id}
              subject={s}
              onSelect={() => setSelectedSubject(s)}
            />
          ))
        ) : (
          <div className="py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-medium italic">
              No subjects found.
            </p>
          </div>
        )}
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
