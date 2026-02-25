import React from "react";

const Dashboard = ({ programs = [], subjects = [] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border-l-8 border-[#660B05]">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          Total Programs
        </h3>
        <p className="text-5xl font-black text-[#3E0703]">{programs.length}</p>
      </div>
      <div className="bg-white p-8 rounded-[2rem] shadow-xl border-l-8 border-[#8C1007]">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
          Total Subjects
        </h3>
        <p className="text-5xl font-black text-[#660B05]">{subjects.length}</p>
      </div>
    </div>
  );
};

export default Dashboard;
