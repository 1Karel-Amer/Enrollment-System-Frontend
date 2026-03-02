import React from "react";
import ProgramCard from "./ProgramCard";

const ProgramList = ({ programs, onSelect, role }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {programs.map((p) => (
        <ProgramCard key={p.id} program={p} onSelect={onSelect} role={role} />
      ))}
    </div>
  );
};

export default ProgramList;
