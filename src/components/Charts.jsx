import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

import { Line as ChartJSLine } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend as ChartJSLegend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartJSTooltip,
  ChartJSLegend,
);

// Refined Professional Color Palette matching the Red/Slate theme
const COLORS = [
  "#3E0703", // Deep Maroon
  "#660B05", // Primary Red
  "#941B14", // Lighter Red
  "#0F172A", // Slate 900
  "#334155", // Slate 700
  "#64748B", // Slate 500
  "#D97706", // Muted Amber accent
];

/* -------------------- Recharts Components -------------------- */

/**
 * 1. Enrollment Bar Chart
 * UPDATED: dataKey="month" for XAxis and dataKey="count" for Bar
 * matches the Laravel DashboardController output.
 */
export const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
      <XAxis
        dataKey="month"
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tick={{ fill: "#64748B" }}
        dy={10}
      />
      <YAxis
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tick={{ fill: "#64748B" }}
      />
      <Tooltip
        cursor={{ fill: "#F1F5F9" }}
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      />
      <Bar
        dataKey="count"
        fill="#660B05"
        radius={[6, 6, 0, 0]}
        maxBarSize={45}
      />
    </BarChart>
  </ResponsiveContainer>
);

/**
 * 2. Course Distribution Pie Chart
 * UPDATED: dataKey="students_count" to match Laravel's withCount() result
 */
export const PieChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <PieChart>
      <Pie
        data={data}
        dataKey="students_count"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={95}
        paddingAngle={5}
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      />
    </PieChart>
  </ResponsiveContainer>
);

// 3. Recharts Line Chart (General Purpose)
export const LineChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={280}>
    <LineChart
      data={data}
      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
      <XAxis
        dataKey="month"
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tick={{ fill: "#64748B" }}
        dy={10}
      />
      <YAxis
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tick={{ fill: "#64748B" }}
      />
      <Tooltip
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      />
      <Line
        type="monotone"
        dataKey="count"
        stroke="#660B05"
        strokeWidth={3}
        dot={{ r: 4, fill: "#660B05", strokeWidth: 2, stroke: "#fff" }}
        activeDot={{ r: 6 }}
      />
    </LineChart>
  </ResponsiveContainer>
);

/* -------------------- Chart.js Attendance Chart -------------------- */
export const AttendanceChart = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-[280px] w-full flex items-center justify-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
        <p className="text-slate-400 text-sm font-medium">
          No attendance data found for this period.
        </p>
      </div>
    );
  }

  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Daily Attendance",
        data: data.map((item) => item.attendance_count),
        borderColor: "#3E0703",
        backgroundColor: "rgba(62, 7, 3, 0.1)",
        borderWidth: 3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#3E0703",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        padding: 12,
        borderRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "#F1F5F9", drawBorder: false },
        ticks: { color: "#64748B", font: { size: 11 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#64748B", font: { size: 11 } },
      },
    },
  };

  return (
    <div className="h-[280px] w-full p-2">
      <ChartJSLine data={chartData} options={options} />
    </div>
  );
};
