import React, { useMemo, useEffect, useState } from "react";
import {
  BarChartComponent,
  PieChartComponent,
  LineChartComponent,
} from "./Charts";
import { getDashboardStats } from "../services/api";

const Dashboard = () => {
  const [data, setData] = useState({
    enrollment_trends: [],
    course_distribution: [],
    attendance_patterns: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const stats = useMemo(() => {
    return {
      enrollmentData: data.enrollment_trends.map((e) => ({
        name: `Month ${e.month}`,
        count: e.count,
      })),
      distributionData: data.course_distribution.map((c) => ({
        name: c.course_name,
        value: c.students_count,
      })),
      attendanceData: data.attendance_patterns.map((a) => ({
        name: a.date,
        value: a.attendance_count,
      })),
    };
  }, [data]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-8 space-y-8 bg-[#F8FAFC] min-h-screen">
      <h1 className="text-2xl font-black text-[#3E0703] uppercase">
        Academic Dashboard
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-bold text-slate-800 mb-4 uppercase text-sm">
            Monthly Enrollment
          </h2>
          <BarChartComponent data={stats.enrollmentData} />
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-bold text-slate-800 mb-4 uppercase text-sm">
            Course Distribution
          </h2>
          <PieChartComponent data={stats.distributionData} />
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border">
          <h2 className="font-bold text-slate-800 mb-4 uppercase text-sm">
            Attendance Patterns
          </h2>
          <LineChartComponent data={stats.attendanceData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
