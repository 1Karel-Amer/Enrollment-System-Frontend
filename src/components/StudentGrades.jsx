import React from "react";

const StudentGrades = ({ subjects = [] }) => {
  if (!subjects || subjects.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-sm">
        No verified academic records indexed inside the system data arrays.
      </div>
    );
  }

  // 1. Removed "pivot." - Look directly at the subject object
  // Note: Your Laravel controller aliased school_year as "year"
  const grouped = subjects.reduce((acc, subject) => {
    const key = `${subject.year || "Unknown Year"} - ${subject.term || "Unknown Term"}`;

    if (!acc[key]) acc[key] = [];
    acc[key].push(subject);
    return acc;
  }, {});

  // GWA Calculation Helper
  const calculateGWA = (semSubjects) => {
    let totalUnits = 0;
    let totalWeightedGrades = 0;

    semSubjects.forEach((sub) => {
      // 2. Removed "pivot."
      const grade = parseFloat(sub.final_grade);
      const units = parseFloat(sub.units) || 3;

      if (!isNaN(grade) && grade > 0) {
        totalUnits += units;
        totalWeightedGrades += grade * units;
      }
    });
    return totalUnits > 0
      ? (totalWeightedGrades / totalUnits).toFixed(2)
      : "N/A";
  };

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([sem, semSubjects]) => (
        <div
          key={sem}
          className="border border-gray-100 rounded-xl overflow-hidden shadow-sm"
        >
          {/* Header Row for the Semester */}
          <div className="bg-gray-50 px-6 py-4 font-bold text-gray-700 flex justify-between items-center border-b border-gray-100">
            <span className="text-sm tracking-wide text-gray-800">{sem}</span>
            <span className="text-sm text-gray-500">
              GWA:{" "}
              <span className="font-extrabold text-gray-800 ml-1">
                {calculateGWA(semSubjects)}
              </span>
            </span>
          </div>

          {/* Table of Grades */}
          <table className="w-full text-sm text-left">
            <thead className="bg-white text-gray-400 uppercase text-xs border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-bold">Code</th>
                <th className="px-6 py-3 font-bold">Subject</th>
                <th className="px-6 py-3 font-bold text-center">Units</th>
                <th className="px-6 py-3 font-bold text-center">Final Grade</th>
                <th className="px-6 py-3 font-bold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {semSubjects.map((subject, index) => {
                // 3. Removed "pivot." for status and final_grade
                const statusBadge =
                  subject.status === "Passed"
                    ? "bg-green-100 text-green-700"
                    : subject.status === "Failed"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600";

                return (
                  <tr
                    key={index}
                    className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-700">
                      {subject.code}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{subject.title}</td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {subject.units}
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-gray-900">
                      {subject.final_grade || "—"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`px-2.5 py-1 text-xs font-bold rounded-md ${statusBadge}`}
                      >
                        {subject.status || "Enrolled"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default StudentGrades;
