import React from "react";

const EnrollmentSubjectCard = ({ subject, selected, onToggle }) => {
  return (
    <div className="p-6 border rounded-xl shadow hover:shadow-md bg-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-black text-[#8C1007]">{subject.code}</p>

          <p className="font-semibold">{subject.title}</p>

          <p className="text-xs text-gray-500">Units: {subject.units}</p>

          <p className="text-xs text-gray-400">Term: {subject.term}</p>
        </div>

        <input type="checkbox" checked={selected} onChange={onToggle} />
      </div>
    </div>
  );
};

export default EnrollmentSubjectCard;
