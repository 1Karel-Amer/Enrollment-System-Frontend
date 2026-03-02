import React, { useMemo } from "react";
import { BarChartComponent, PieChartComponent } from "./Charts";

const Dashboard = ({ programs = [], subjects = [] }) => {
  const stats = useMemo(() => {
    // 1. Program Status Logic (Handles Active, Inactive, and Under Review)
    const activeCount = programs.filter(
      (p) => p.status?.toLowerCase() === "active",
    ).length;
    const inactiveCount = programs.filter(
      (p) => p.status?.toLowerCase() === "inactive",
    ).length;
    const reviewCount = programs.filter(
      (p) => p.status?.toLowerCase() === "under review",
    ).length;

    // 2. Pre-requisites Logic (Matches your JSON key "preReq")
    // Filters subjects where preReq is not "None" and not empty
    const subjectsWithPrereq = subjects.filter(
      (s) => s.preReq && s.preReq !== "None" && s.preReq !== "",
    );
    const withPrereqCount = subjectsWithPrereq.length;

    // 3. Subjects per Term (Matches your JSON key "term")
    const termMap = subjects.reduce((acc, sub) => {
      const termName = sub.term || "Other";
      acc[termName] = (acc[termName] || 0) + 1;
      return acc;
    }, {});

    const subjectsPerSemester = Object.keys(termMap).map((key) => ({
      name: key,
      count: termMap[key],
    }));

    return {
      activeCount,
      inactiveCount,
      reviewCount,
      withPrereqCount,
      subjectsPerSemester,
      subjectsWithPrereq,
    };
  }, [programs, subjects]);

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-black text-[#3E0703] uppercase tracking-tight">
          Academic Dashboard
        </h1>
        <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase">
          Real-time Summary
        </span>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Programs"
          value={programs.length}
          sub={`${stats.activeCount} Active / ${stats.reviewCount} Pending`}
        />
        <MetricCard
          title="Total Subjects"
          value={subjects.length}
          sub="Official Curriculum Count"
        />
        <MetricCard
          title="Pre-requisites"
          value={stats.withPrereqCount}
          sub="Curriculum dependencies"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* CHART 1: Subjects per Term */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h2 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wide">
            Subjects per Term
          </h2>
          <BarChartComponent data={stats.subjectsPerSemester} />
        </div>

        {/* CHART 2: Program Status (Now includes Under Review) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <h2 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wide">
            Program Distribution
          </h2>
          <PieChartComponent
            data={[
              { name: "Active", value: stats.activeCount },
              { name: "Inactive", value: stats.inactiveCount },
              { name: "Under Review", value: stats.reviewCount },
            ]}
          />
        </div>
      </div>

      {/* REQUISITE LIST TABLE: To verify data is working */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="font-bold text-slate-800 mb-4 uppercase text-sm tracking-wide">
          Subject Dependency List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.subjectsWithPrereq.slice(0, 6).map((sub) => (
            <div
              key={sub.id}
              className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center"
            >
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {sub.code}
                </p>
                <p className="text-xs font-bold text-slate-700 truncate w-32">
                  {sub.title}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold text-red-800 uppercase">
                  Requires
                </p>
                <p className="text-xs font-black text-[#660B05]">
                  {sub.preReq}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, sub }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
      {title}
    </p>
    <h3 className="text-3xl font-black text-[#660B05] mt-1">{value}</h3>
    <p className="text-xs text-slate-400 mt-1 font-medium">{sub}</p>
  </div>
);

export default Dashboard;
