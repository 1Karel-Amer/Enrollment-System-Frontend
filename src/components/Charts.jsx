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
  Legend,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";

// Colors for Pie Chart
const COLORS = [
  "#660B05",
  "#0F172A",
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#EC4899",
  "#64748B",
  "#F97316",
  "#14B8A6",
  "#D946EF",
  "#6366F1",
  "#A855F7",
  "#F43F5E",
  "#06B6D4",
];

// 1. Bar Chart with maxBarSize to fix width
export const BarChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" fontSize={12} />
      <YAxis fontSize={12} />
      <Tooltip />
      <Bar
        dataKey="count"
        fill="#660B05"
        radius={[4, 4, 0, 0]}
        maxBarSize={60}
      />
    </BarChart>
  </ResponsiveContainer>
);

// 2. Pie Chart
export const PieChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={60}
        outerRadius={80}
        paddingAngle={2}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
);

// 3. Line Chart
export const LineChartComponent = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis dataKey="name" fontSize={12} />
      <YAxis fontSize={12} />
      <Tooltip />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#660B05"
        strokeWidth={2}
        dot={{ r: 4 }}
      />
    </LineChart>
  </ResponsiveContainer>
);
