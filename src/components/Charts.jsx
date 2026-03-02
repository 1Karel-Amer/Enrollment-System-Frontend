import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// 1. Reusable Bar Chart for "Subjects per Semester"
export const BarChartComponent = ({ data, color = "#660B05" }) => {
  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            interval={0} // This ensures all labels (Summer, etc.) are visible
            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="count"
            fill={color}
            radius={[6, 6, 0, 0]}
            barSize={45} // Slightly wider for better visibility
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// 2. Reusable Pie Chart for "Program Status Distribution"
export const PieChartComponent = ({ data }) => {
  /**
   * Status Color Mapping:
   * 0: Active (UM Red)
   * 1: Inactive (Slate/Grey)
   * 2: Under Review (Amber/Yellow)
   */
  const COLORS = ["#660B05", "#94A3B8", "#F59E0B"];

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={8}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            iconType="circle"
            verticalAlign="bottom"
            height={36}
            formatter={(value) => (
              <span className="text-xs font-bold text-slate-600 uppercase tracking-tighter">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
