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

const COLORS = [
  "#3E0703",
  "#660B05",
  "#941B14",
  "#0F172A",
  "#334155",
  "#64748B",
  "#D97706",
];

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
        contentStyle={{ borderRadius: "12px", border: "none" }}
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
      {/* FIX: Formatter shows Program Name and Student Count on hover */}
      <Tooltip
        formatter={(value, name) => [`${value} Students`, name]}
        contentStyle={{
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
        }}
      />
    </PieChart>
  </ResponsiveContainer>
);

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
        /* FIX: Formats the long ISO string from Laravel to "Jan 03" */
        tickFormatter={(str) => {
          const date = new Date(str);
          return isNaN(date.getTime())
            ? str
            : date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
        }}
      />
      <YAxis
        fontSize={11}
        tickLine={false}
        axisLine={false}
        tick={{ fill: "#64748B" }}
      />
      <Tooltip
        /* FIX: Formats the date inside the tooltip popup */
        labelFormatter={(label) => {
          const date = new Date(label);
          return isNaN(date.getTime())
            ? label
            : date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              });
        }}
        contentStyle={{ borderRadius: "12px", border: "none" }}
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
