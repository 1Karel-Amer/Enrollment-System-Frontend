import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import StudentGrades from "../components/StudentGrades";

const StudentProfile = () => {
  const { id } = useParams();

  // Unified State
  const [student, setStudent] = useState(null);
  const [mlData, setMlData] = useState(null); // Lifted ML State
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState("grades");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // Fetch both endpoints concurrently to keep the app snappy
        const [studentResponse, mlResponse] = await Promise.all([
          api.get(`/students/${id}`),
          api.get(`/students/${id}/predict-risk`).catch((err) => {
            console.error("ML engine offline or processing error:", err);
            return { data: null }; // Graceful fallback if ML script fails
          }),
        ]);

        setStudent(studentResponse.data);
        setMlData(mlResponse.data);
        setError(null);
      } catch (err) {
        console.error("Critical error fetching student records:", err);
        setError(
          "System Error Response: Request failed. Please verify API states.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mb-4"></div>
        <p className="text-gray-600 font-semibold tracking-widest text-sm uppercase">
          Accessing Analytics Engines...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg border border-red-200 shadow-sm text-center">
          <h3 className="font-bold text-lg mb-1">System Error Response</h3>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!student)
    return (
      <div className="p-8 text-center text-gray-500">
        No student record found.
      </div>
    );

  // ----------------------------------------------------------------------
  // DYNAMIC CALCULATIONS & ML FEATURE ALIGNMENT
  // ----------------------------------------------------------------------
  const subjectsList = Array.isArray(student.subjects) ? student.subjects : [];
  const attendanceList = subjectsList;
  const subjectsCount = subjectsList.length;

  // 1. Calculate Units Earned
  let totalUnits = 0;
  subjectsList.forEach((subject) => {
    totalUnits += Number(subject?.units) || 3;
  });

  // 2. Local Fallback Attendance Math
  let totalAttendancePoints = 0;
  attendanceList.forEach((log) => {
    totalAttendancePoints += Number(log?.subject_attendance) || 100;
  });
  const localAverageAttendance =
    subjectsCount > 0 ? Math.round(totalAttendancePoints / subjectsCount) : 100;

  // 🌟 SMART ALIGNED METRICS (No hardcoding!)
  // Uses ML computed features first; falls back to raw table data if ML is empty.
  const dynamicAttendanceRate =
    mlData?.metrics_evaluated?.attendance_rate !== undefined
      ? mlData.metrics_evaluated.attendance_rate
      : localAverageAttendance;

  const dynamicCumulativeGpa =
    mlData?.metrics_evaluated?.um_scale?.final_gpa_avg !== undefined
      ? Number(mlData.metrics_evaluated.um_scale.final_gpa_avg).toFixed(2)
      : student.gpa != null
        ? Number(student.gpa).toFixed(2)
        : "N/A";

  // Helper for tab styling
  const getTabClass = (tabName) => {
    const baseClass =
      "pb-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ";
    return activeTab === tabName
      ? baseClass + "text-gray-900 border-b-2 border-red-900"
      : baseClass + "text-gray-400 hover:text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Navigation */}
        <Link
          to="/dashboard"
          className="text-gray-500 hover:text-gray-800 text-sm font-semibold tracking-wide flex items-center w-max"
        >
          <span className="mr-2">←</span> BACK TO STUDENTS LIST
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#7c1d1d] text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {String(student.first_name?.charAt(0) || "U")}
              {String(student.last_name?.charAt(0) || "U")}
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {String(student.first_name || "")}{" "}
                  {String(student.last_name || "")}
                </h1>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md tracking-wider uppercase">
                  ACTIVE
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Student ID:{" "}
                <span className="font-semibold text-gray-700">
                  {String(student.student_id || "Unknown")}
                </span>{" "}
                {String(student.program?.name || "Unassigned Program")}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Enrolled: {String(student.enrollment_date || "N/A")} •{" "}
                {String(student.year_level || "1st Year")}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => window.print()}
              className="bg-[#5c1a1b] hover:bg-red-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide shadow-sm transition"
            >
              🖨️ PRINT TRANSCRIPT
            </button>
            <button
              onClick={() => alert("Additional actions menu coming soon!")}
              className="border border-gray-200 text-gray-500 hover:bg-gray-50 px-4 py-2.5 rounded-lg font-bold shadow-sm transition"
            >
              •••
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Aligned Cumulative GPA */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">
              Cumulative GPA
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {dynamicCumulativeGpa}
              </span>
              <span className="text-sm text-gray-400 font-medium">
                out of 5.00
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">
              Units Earned
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {totalUnits}
              </span>
              <span className="text-sm text-gray-400 font-medium">
                of {String(student.required_units || 148)} required
              </span>
            </div>
          </div>

          {/* Aligned Attendance Rate */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">
              Attendance Rate
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {dynamicAttendanceRate}%
              </span>
              <span className="text-sm text-gray-400 font-medium">
                overall presence
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">
              Subjects Taken
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {subjectsCount}
              </span>
              <span className="text-sm text-gray-400 font-medium">
                recorded subjects
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mt-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab("grades")}
            className={getTabClass("grades")}
          >
            Grades Per Semester
          </button>
          <button
            onClick={() => setActiveTab("insights")}
            className={getTabClass("insights")}
          >
            Insights
          </button>
          <button
            onClick={() => setActiveTab("personal")}
            className={getTabClass("personal")}
          >
            Personal Info
          </button>
          <button
            onClick={() => setActiveTab("attendance")}
            className={getTabClass("attendance")}
          >
            Attendance Log
          </button>
          <button
            onClick={() => setActiveTab("remarks")}
            className={getTabClass("remarks")}
          >
            Remarks
          </button>
        </div>

        {/* Dynamic Data Display Area */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-6 min-h-[250px]">
          {/* TAB 1: GRADES */}
          {activeTab === "grades" && <StudentGrades subjects={subjectsList} />}

          {/* TAB 2: INSIGHTS (Fed with unified, shared state) */}
          {activeTab === "insights" && <InsightsPanel mlData={mlData} />}

          {/* TAB 3: PERSONAL INFO */}
          {activeTab === "personal" && (
            <div className="text-left w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-6">
                Student Demographics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {String(student.email || "N/A")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Contact Number
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {String(student.contact_no || "N/A")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Date of Birth
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {String(student.date_of_birth || "N/A")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Home Address
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {String(student.address || "N/A")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATTENDANCE LOG */}
          {activeTab === "attendance" && (
            <div className="w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Attendance Records
              </h3>

              {attendanceList.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-800 font-bold mb-1">
                    No attendance logs reported yet.
                  </p>
                  <p className="text-gray-400 font-medium text-sm">
                    Attendance metrics are updated regularly.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto border border-gray-200 rounded-xl">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                        <th className="p-4 font-bold border-b border-gray-200">
                          Subject Code
                        </th>
                        <th className="p-4 font-bold border-b border-gray-200">
                          School Year
                        </th>
                        <th className="p-4 font-bold border-b border-gray-200">
                          Term
                        </th>
                        <th className="p-4 font-bold border-b border-gray-200">
                          Attendance Score
                        </th>
                        <th className="p-4 font-bold border-b border-gray-200">
                          Remarks
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                      {attendanceList.map((log, index) => {
                        const score = Number(log.subject_attendance) || 100;
                        return (
                          <tr
                            key={log.id || index}
                            className="hover:bg-gray-50 transition"
                          >
                            <td className="p-4 font-semibold text-gray-900">
                              {String(log.code || "N/A")}
                            </td>
                            <td className="p-4">{String(log.year || "N/A")}</td>
                            <td className="p-4 capitalize">
                              {String(log.term || "N/A")}
                            </td>
                            <td className="p-4">
                              <span
                                className={`px-2 py-1 rounded-md font-bold text-xs ${score < 75 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                              >
                                {score}%
                              </span>
                            </td>
                            <td className="p-4">
                              {String(log.remarks || "-")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REMARKS */}
          {activeTab === "remarks" && (
            <div className="flex items-center justify-center h-full pt-10 text-center">
              <div>
                <p className="text-gray-800 font-bold mb-2">Clear Record</p>
                <p className="text-gray-400 font-medium text-sm">
                  There are no academic or disciplinary remarks on file for this
                  student.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// InsightsPanel (No more redundant API fetching! Snappy & instant loading)
// ─────────────────────────────────────────────────────────────────────────────
const InsightsPanel = ({ mlData }) => {
  if (!mlData) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg border border-red-200 text-center">
          <p className="font-bold mb-1">Insights Unavailable</p>
          <p className="text-sm">
            The ML engine could not process predictions for this profile
            configuration.
          </p>
        </div>
      </div>
    );
  }

  const {
    dropout_risk = {},
    key_factors = [],
    suggested_alternative_programs = [],
    metrics_evaluated = {},
    meta = {},
  } = mlData;

  const {
    gpa_trend = { history: [] },
    um_scale = {},
    attendance_rate = 0,
  } = metrics_evaluated;
  const isHighRisk = String(dropout_risk.label) === "High Risk";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* ── LEFT: Risk Score + Key Factors + GPA Trend ── */}
      <div>
        {/* Risk score card */}
        <div
          className={`rounded-xl p-5 mb-6 flex items-center justify-between ${isHighRisk ? "bg-red-50" : "bg-green-50"}`}
        >
          <div>
            <p
              className={`text-xs font-bold uppercase tracking-wider mb-1 ${isHighRisk ? "text-red-400" : "text-green-400"}`}
            >
              Dropout Risk Score
            </p>
            <p
              className={`text-4xl font-black ${isHighRisk ? "text-red-700" : "text-green-700"}`}
            >
              {String(dropout_risk.score_display || "N/A")}
            </p>
            <p
              className={`text-xs mt-1 ${isHighRisk ? "text-red-400" : "text-green-400"}`}
            >
              Threshold: {(Number(dropout_risk.threshold_used) || 0) * 100}% ·{" "}
              {String(meta.model_version || "v1.0")}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${isHighRisk ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {String(dropout_risk.label || "Safe")}
          </span>
        </div>

        {/* Key Factors */}
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
          Key Factors
        </p>
        <div className="space-y-3 mb-6">
          {Array.isArray(key_factors) &&
            key_factors.map((f, i) => (
              <div
                key={i}
                className="flex items-start justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
              >
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-800">
                    {String(f.factor || "Unknown")}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Value: {String(f.value || "N/A")} · {String(f.note || "")}
                  </p>
                </div>
                <span
                  className={`ml-3 px-2.5 py-1 text-xs font-bold rounded-md flex-shrink-0 ${f.impact === "high" ? "bg-red-100 text-red-700" : f.impact === "medium" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
                >
                  {String(f.impact || "low").toUpperCase()}
                </span>
              </div>
            ))}
        </div>

        {/* GPA Trend Chart */}
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
          GPA Trend Per Semester
        </p>
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div
            className="flex items-flex-end justify-between gap-2"
            style={{ height: 70, alignItems: "flex-end" }}
          >
            {Array.isArray(gpa_trend.history) &&
              gpa_trend.history.map((h, i) => {
                const gpaValue = Number(h.gpa) || 0;
                const maxGpa =
                  Math.max(
                    ...gpa_trend.history.map((x) => Number(x.gpa) || 0),
                  ) + 0.5;
                const pct =
                  maxGpa === 0 ? 0 : Math.round((gpaValue / maxGpa) * 100);
                const color =
                  gpaValue < 2.0
                    ? "#dc2626"
                    : gpaValue < 2.5
                      ? "#f97316"
                      : "#16a34a";
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-1 flex-1"
                  >
                    <span style={{ fontSize: 9, color: "#9ca3af" }}>
                      {gpaValue}
                    </span>
                    <div
                      style={{
                        width: "100%",
                        height: `${pct}%`,
                        background: color,
                        borderRadius: "3px 3px 0 0",
                        minHeight: 4,
                      }}
                    />
                  </div>
                );
              })}
          </div>
          <div className="flex justify-between mt-2 gap-2">
            {Array.isArray(gpa_trend.history) &&
              gpa_trend.history.map((h, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 8,
                    flex: 1,
                    textAlign: "center",
                    color: "#9ca3af",
                    margin: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {String(h.sem || "").replace("T", "")}
                </p>
              ))}
          </div>
          <div className="flex justify-between mt-2">
            <span
              className={`text-xs font-bold ${gpa_trend.direction === "volatile" ? "text-orange-500" : gpa_trend.direction === "declining" ? "text-red-500" : "text-green-600"}`}
            >
              {gpa_trend.direction === "volatile" && "⚠ Volatile"}
              {gpa_trend.direction === "declining" && "↓ Declining"}
              {gpa_trend.direction === "improving" && "↑ Improving"}
              {gpa_trend.direction === "stable" && "→ Stable"} · std_dev:{" "}
              {String(gpa_trend.std_dev || "0")}
            </span>
            <span className="text-xs text-gray-400">
              slope: {String(gpa_trend.slope || "0")}
            </span>
          </div>
        </div>

        {/* GPA averages */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
              Midterm GPA
            </p>
            <p className="text-2xl font-black text-gray-900">
              {String(um_scale.midterm_gpa_avg || "0.0")}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
              Final GPA
            </p>
            <p className="text-2xl font-black text-gray-900">
              {String(um_scale.final_gpa_avg || "0.0")}
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Recommendations + Actions + Meta ── */}
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
          Suggested Alternative Programs
        </p>

        {!Array.isArray(suggested_alternative_programs) ||
        suggested_alternative_programs.length === 0 ? (
          <div className="bg-green-50 rounded-xl p-5 border border-green-100 text-center mb-6">
            <p className="text-green-700 font-bold text-sm">
              No alternatives needed
            </p>
            <p className="text-green-500 text-xs mt-1">
              Student is performing well in current program.
            </p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {suggested_alternative_programs.map((prog, i) => (
              <div
                key={prog.id || i}
                className={`rounded-xl p-4 border ${i === 0 ? "border-blue-300 bg-blue-50" : "border-gray-100 bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-gray-900">
                    {String(prog.course_name || "Unknown")}
                  </p>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-md ${i === 0 ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}
                  >
                    {i === 0 ? "Best Match" : "Good Match"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {String(prog.department || "Unknown")} · Rank #
                  {String(prog.rank || i + 1)}
                </p>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  {String(prog.reason || "")}
                </p>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Match score</span>
                  <span
                    className={`font-bold ${i === 0 ? "text-blue-600" : "text-gray-600"}`}
                  >
                    {String(prog.match_display || "0%")}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${i === 0 ? "bg-blue-500" : "bg-gray-400"}`}
                    style={{ width: String(prog.match_display || "0%") }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin actions */}
        {isHighRisk && (
          <>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
              Admin Actions
            </p>
            <div className="space-y-2 mb-6">
              {[
                { icon: "📧", label: "Notify Adviser" },
                { icon: "📅", label: "Schedule Intervention" },
                { icon: "📤", label: "Send Recommendation to Student" },
              ].map((action) => (
                <button
                  key={action.label}
                  onClick={() => alert(`${action.label} — coming soon!`)}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition text-left"
                >
                  <span>{action.icon}</span>
                  <span>{action.label}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Meta */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
            Model Info
          </p>
          <div className="space-y-1">
            <p className="text-xs text-gray-500">
              Version:{" "}
              <span className="font-semibold text-gray-700">
                {String(meta.model_version || "N/A")}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Evaluated:{" "}
              <span className="font-semibold text-gray-700">
                {meta.evaluated_at
                  ? new Date(meta.evaluated_at).toLocaleString()
                  : "N/A"}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Semesters used:{" "}
              <span className="font-semibold text-gray-700">
                {String(meta.semesters_used || "0")}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Data:{" "}
              <span className="font-semibold text-gray-700">
                {String(meta.data_completeness || "N/A")}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Attendance:{" "}
              <span className="font-semibold text-gray-700">
                {String(attendance_rate)}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
