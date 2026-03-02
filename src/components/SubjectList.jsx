import React from "react";
import SubjectCard from "./SubjectCard";

const SubjectList = ({ subjects, onSelect }) => {
  return (
    <div className="space-y-4">
      {subjects.length > 0 ? (
        subjects.map((subject) => (
          <SubjectCard key={subject.id} subject={subject} onSelect={onSelect} />
        ))
      ) : (
        <div className="py-20 text-center bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
          <p className="text-slate-400 font-medium italic">
            No subjects matching your search.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubjectList;
