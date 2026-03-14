import React, { useMemo, useEffect, useState } from "react";
import {
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
} from "./Charts";
import { getDashboardStats } from "../services/api";
import WeatherWidget from "./WeatherWidget";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Dashboard Fetch Error:", err);
        setLoading(false);
      });
  }, []);

  /**
   * DATA MAPPING
   * We transform the Laravel API response into the format Recharts expects.
   */
  const stats = useMemo(() => {
    if (!data) {
      return { enrollmentData: [], distributionData: [], attendanceData: [] };
    }

    return {
      // 1. Enrollment: Map to { month: 'Jan', count: 50 }
      enrollmentData: (data.enrollment_trends || []).map((e) => ({
        month: e.month,
        count: e.count,
      })),

      // 2. Courses: Map to { name: 'BSIT', students_count: 120 }
      distributionData: (data.course_distribution || []).map((c) => ({
        name: c.name,
        students_count: c.students_count,
      })),

      // 3. Attendance: Map to { month: '2026-03-01', count: 85 }
      attendanceData: (data.attendance_patterns || []).map((a) => ({
        month: a.date,
        count: a.attendance_count,
      })),
    };
  }, [data]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#660B05] border-t-transparent rounded-full animate-spin"></div>
          <p className="font-semibold text-slate-500 tracking-wide uppercase text-sm">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );

  return (
    <div className="p-6 lg:p-10 space-y-8 bg-slate-50 min-h-screen font-sans">
      {/* HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#3E0703] tracking-tight">
            Academic Dashboard
          </h1>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            Overview of student metrics, enrollment, and weather conditions.
          </p>
        </div>
      </header>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ROW 1: WEATHER & ENROLLMENT */}
        <div className="lg:col-span-1 flex flex-col h-full">
          <WeatherWidget />
        </div>

        <div className="lg:col-span-2 flex flex-col h-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">
              Monthly Enrollment
            </h2>
          </div>
          <div className="flex-grow">
            {/* Component expects 'month' and 'count' keys */}
            <BarChartComponent data={stats.enrollmentData} />
          </div>
        </div>

        {/* ROW 2: COURSE DISTRIBUTION & ATTENDANCE */}
        <div className="lg:col-span-1 flex flex-col h-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
          <div className="mb-6">
            <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">
              Course Distribution
            </h2>
          </div>
          <div className="flex-grow flex items-center justify-center">
            {/* Component expects 'students_count' and 'name' keys */}
            <PieChartComponent data={stats.distributionData} />
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col h-full bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60">
          <div className="mb-6">
            <h2 className="font-bold text-slate-800 uppercase text-xs tracking-wider">
              Attendance Patterns
            </h2>
          </div>
          <div className="flex-grow">
            {/* Reusing LineChartComponent with 'month' and 'count' keys */}
            <LineChartComponent data={stats.attendanceData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
