import React, { useState } from "react";
import ProgramCard from "../components/ProgramCard";
import ProgramDetails from "../components/ProgramDetails";

const Programs = ({ programs = [], subjects = [], role }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  // If a program is selected, show the Details view
  if (selectedProgram) {
    return (
      <ProgramDetails
        program={selectedProgram}
        subjects={subjects}
        onBack={() => setSelectedProgram(null)}
      />
    );
  }

  // Otherwise, show the grid of ProgramCards
  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-[#3E0703] uppercase tracking-tighter">
          Academic Programs
        </h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">
          University of Mindanao Tagum College
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.length > 0 ? (
          programs.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              role={role}
              onSelect={(program) => setSelectedProgram(program)}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-medium italic">
              No programs found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
