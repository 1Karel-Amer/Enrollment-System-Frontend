import React, { useMemo, useEffect, useState } from "react";
import {
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
} from "./Charts";
import { getDashboardStats } from "../services/api";
import WeatherWidget from "./WeatherWidget";

const DashboardSkeleton = () => (
  <div className="p-6 lg:p-10 space-y-6 bg-slate-50 min-h-screen w-full">
    <div className="h-8 w-64 bg-slate-200 rounded mb-6 animate-pulse"></div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-2xl h-[120px] animate-pulse"
        ></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-7 rounded-3xl h-[340px] animate-pulse"></div>
      <div className="lg:col-span-2 bg-white p-7 rounded-3xl h-[340px] animate-pulse"></div>
    </div>
  </div>
);

const StatCard = ({ label, value, color, trend }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-3xl font-black text-[#3E0703] mt-1">
          {value.toLocaleString()}
        </h3>
      </div>
      <div
        className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#660B05] animate-ping" />
      </div>
    </div>
    <p className="text-[10px] font-bold text-slate-400 mt-4 italic">{trend}</p>
  </div>
);

// FIX 1 (continued): Dashboard now fetches its own data.
// Previously Home.jsx fetched and passed data as props — now this
// component is self-contained, so it only loads when actually visible.
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []); // Empty deps: only fetches once when the Dashboard mounts

  const stats = useMemo(() => {
    if (!data) return { enrollment: [], distribution: [], attendance: [] };
    return {
      enrollment: data.enrollment_trends || [],
      distribution: data.course_distribution || [],
      attendance: (data.attendance_patterns || []).map((a) => ({
        month: a.date,
        count: a.attendance_count,
      })),
    };
  }, [data]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 lg:p-10 space-y-6 bg-slate-50 min-h-screen font-sans">
      <div className="mb-2">
        <h1 className="text-3xl font-black text-[#3E0703] tracking-tighter">
          Academic Dashboard
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">
          System Overview
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(data?.summary || []).map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 h-full">
          <WeatherWidget />
        </div>

        <div className="lg:col-span-2 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50">
          <h2 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em] mb-8">
            Monthly Enrollment
          </h2>
          <BarChartComponent data={stats.enrollment} />
        </div>

        <div className="lg:col-span-1 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50">
          <h2 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em] mb-8">
            Program Split
          </h2>
          <PieChartComponent data={stats.distribution} />
        </div>

        <div className="lg:col-span-2 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50">
          <h2 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em] mb-8">
            Attendance Patterns
          </h2>
          <LineChartComponent data={stats.attendance} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
