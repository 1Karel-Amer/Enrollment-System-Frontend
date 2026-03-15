import React, { useMemo, useEffect, useState } from "react";
import {
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
} from "./Charts";
import { getDashboardStats } from "../services/api";
import WeatherWidget from "./WeatherWidget";

// Custom Skeleton for the Dashboard Layout
const DashboardSkeleton = () => (
  <div className="p-6 lg:p-10 space-y-6 bg-slate-50 min-h-screen font-sans w-full animate-in fade-in duration-500">
    {/* Header Skeleton */}
    <div className="mb-2">
      <div className="h-8 w-64 bg-slate-200 rounded mb-3 animate-pulse"></div>
      <div className="h-3 w-32 bg-slate-200 rounded animate-pulse opacity-60"></div>
    </div>

    {/* Top Stats Row Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/60 h-[120px] animate-pulse flex flex-col justify-between"
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="h-2 w-20 bg-slate-200 rounded mb-3"></div>
              <div className="h-8 w-24 bg-slate-200 rounded"></div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100"></div>
          </div>
          <div className="h-2 w-32 bg-slate-100 rounded mt-4"></div>
        </div>
      ))}
    </div>

    {/* Main Content Grid Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50 animate-pulse h-[340px] flex flex-col">
        <div className="h-2 w-32 bg-slate-200 rounded mb-8"></div>
        <div className="flex-1 bg-slate-100 rounded-xl"></div>
      </div>

      <div className="lg:col-span-2 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50 animate-pulse h-[340px] flex flex-col">
        <div className="h-2 w-40 bg-slate-200 rounded mb-8"></div>
        <div className="flex-1 bg-slate-100 rounded-xl"></div>
      </div>

      <div className="lg:col-span-1 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50 animate-pulse h-[340px] flex flex-col">
        <div className="h-2 w-32 bg-slate-200 rounded mb-8"></div>
        <div className="flex-1 bg-slate-100 rounded-xl"></div>
      </div>

      <div className="lg:col-span-2 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50 animate-pulse h-[340px] flex flex-col">
        <div className="h-2 w-40 bg-slate-200 rounded mb-8"></div>
        <div className="flex-1 bg-slate-100 rounded-xl"></div>
      </div>
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
  }, []);

  const stats = useMemo(() => {
    if (!data) return { enrollment: [], distribution: [], attendance: [] };
    return {
      enrollment: data.enrollment_trends || [],
      distribution: (data.course_distribution || []).map((c) => ({
        name: c.name,
        students_count: c.students_count,
      })),
      attendance: (data.attendance_patterns || []).map((a) => ({
        month: a.date, // reusing 'month' key to fit Chart component expectations
        count: a.attendance_count,
      })),
    };
  }, [data]);

  // Replaced the old spinner with our sleek new skeleton!
  if (loading) return <DashboardSkeleton />;

  return (
    <div className="p-6 lg:p-10 space-y-6 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <div className="mb-2">
        <h1 className="text-3xl font-black text-[#3E0703] tracking-tighter">
          Academic Dashboard
        </h1>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest opacity-60">
          System Overview
        </p>
      </div>

      {/* TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(data?.summary || []).map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weather Card */}
        <div className="lg:col-span-1 h-full">
          <WeatherWidget />
        </div>

        {/* Enrollment Bar Chart */}
        <div className="lg:col-span-2 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50">
          <h2 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em] mb-8">
            Monthly Enrollment
          </h2>
          <BarChartComponent data={stats.enrollment} />
        </div>

        {/* Course Distribution */}
        <div className="lg:col-span-1 bg-white p-7 rounded-3xl shadow-sm border border-slate-200/50">
          <h2 className="font-black text-slate-800 uppercase text-[10px] tracking-[0.2em] mb-8">
            Program Split
          </h2>
          <PieChartComponent data={stats.distribution} />
        </div>

        {/* Attendance Line Chart */}
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
