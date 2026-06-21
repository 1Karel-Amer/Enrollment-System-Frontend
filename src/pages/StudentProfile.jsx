import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

const StudentProfile = () => {
  const { id } = useParams();

  // API State
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState("grades");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/students/${id}`);
        setStudent(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError(
          "System Error Response: Request failed. Please verify API states.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-900 mb-4"></div>
        <p className="text-gray-600 font-semibold tracking-widest text-sm uppercase">
          Accessing Database Records...
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
    return <div className="p-8 text-center">No student record found.</div>;

  // Calculations
  const subjectsCount = student.grades ? student.grades.length : 0;
  const totalUnits = student.grades
    ? student.grades.reduce(
        (sum, subject) => sum + (Number(subject.units) || 3),
        0,
      )
    : 0;

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
              {student.first_name.charAt(0)}
              {student.last_name.charAt(0)}
            </div>

            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {student.first_name} {student.last_name}
                </h1>
                <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-md tracking-wider uppercase">
                  ACTIVE
                </span>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Student ID:{" "}
                <span className="font-semibold text-gray-700">
                  {student.student_id}
                </span>{" "}
                {student.program?.name || "Unassigned Program"}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Enrolled: {student.enrollment_date || "N/A"} •{" "}
                {student.year_level || "1st Year"}
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
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">
              Cumulative GPA
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {student.gpa !== null && student.gpa !== undefined
                  ? Number(student.gpa).toFixed(2)
                  : "N/A"}
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
                of {student.required_units || 148} required
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">
              Attendance
            </p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {student.attendance !== null && student.attendance !== undefined
                  ? student.attendance
                  : "0"}
                %
              </span>
              <span className="text-sm text-gray-400 font-medium">
                this semester
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
                total records
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mt-8">
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
          {/* TAB 1: GRADES PER SEMESTER */}
{activeTab === "grades" &&
  (student.grades && student.grades.length > 0 ? (
    <div className="space-y-8 w-full text-left">
      {Object.entries(
        student.grades.reduce((acc, currentGrade) => {
          const semesterKey = `${currentGrade.school_year} - ${currentGrade.term}`;
          if (!acc[semesterKey]) acc[semesterKey] = [];
          acc[semesterKey].push(currentGrade);
          return acc;
        }, {})
      ).map(([semesterTitle, semGrades]) => {
        // Calculate GWA for this semester specifically
        const validGrades = semGrades.filter(g => g.final_grade !== null && !isNaN(g.final_grade));
        const totalUnits = validGrades.reduce((sum, g) => sum + (Number(g.units) || 0), 0);
        const weightedSum = validGrades.reduce((sum, g) => sum + (Number(g.final_grade) * (Number(g.units) || 0)), 0);
        const semesterGWA = totalUnits > 0 ? (weightedSum / totalUnits).toFixed(2) : "0.00";

        return (
          <div key={semesterTitle} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
            {/* Header Block Section */}
            <div className="bg-gray-50/70 px-6 py-4 flex justify-between items-center border-b border-gray-100">
              <h4 className="text-[14px] font-bold text-gray-800 tracking-tight">
                {semesterTitle}
              </h4>
              <p className="text-[13px] text-gray-500 font-medium">
                GWA: <span className="text-gray-900 font-black">{semesterGWA}</span>
              </p>
            </div>

            {/* Structured Table Section */}
            <div className="px-6 pb-2 overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-[10px] text-gray-400 uppercase font-bold tracking-widest border-b border-gray-100">
                  <tr>
                    <th className="py-4 w-1/5">Code</th>
                    <th className="py-4 w-2/5">Subject</th>
                    <th className="py-4 text-center w-1/12">Units</th>
                    <th className="py-4 text-center w-1/6">Final Grade</th>
                    <th className="py-4 text-center w-1/6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {semGrades.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/40 transition-colors">
                      <td className="py-4 font-bold text-gray-700 text-[13px]">
                        {sub.subject_code}
                      </td>
                      <td className="py-4 text-gray-500 font-medium text-[13px]">
                        {sub.subject_name}
                      </td>
                      <td className="py-4 text-center font-medium text-gray-600 text-[13px]">
                        {sub.units}
                      </td>
                      <td className="py-4 text-center font-black text-gray-800 text-[14px]">
                        {sub.final_grade !== null ? Number(sub.final_grade).toFixed(2) : "—"}
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md tracking-wide ${
                            sub.status?.toLowerCase() === "passed" || sub.status?.toLowerCase() === "enrolled"
                              ? "bg-green-100/70 text-green-700"
                              : "bg-red-100/70 text-red-700"
                          }`}
                        >
                          {sub.status || "PASSED"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div className="flex items-center justify-center py-12">
      <p className="text-gray-400 font-bold tracking-widest text-xs uppercase text-center">
        No verified academic records indexed inside the system data arrays.
      </p>
    </div>
  ))}

          {/* TAB 2: INSIGHTS — ML Dropout Risk */}
          {activeTab === "insights" && <InsightsPanel studentId={id} />}

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
                    {student.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Contact Number
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {student.contact_no || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Date of Birth
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {student.date_of_birth || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
                    Home Address
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {student.address || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ATTENDANCE LOG */}
          {activeTab === "attendance" && <AttendancePanel studentId={id} />}

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
// AttendancePanel — Fetches Present & Absent Logs from /students/{id}/attendance
// ─────────────────────────────────────────────────────────────────────────────

const AttendancePanel = ({ studentId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/students/${studentId}/attendance`);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching attendance logs:", err);
        setError("Could not load attendance details. Please check connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-900 mb-4"></div>
        <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
          Compiling Attendance Data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg border border-red-200 text-center">
          <p className="font-bold mb-1">Attendance Logs Unavailable</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { summary, subject_attendance } = data;

  return (
    <div className="space-y-8 text-left w-full">
      {/* Metrics Header Summary Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Summary Totals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
              Attendance Rate
            </p>
            <p className="text-2xl font-black text-gray-900">
              {summary.attendance_rate}%
            </p>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <p className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">
              Days Present
            </p>
            <p className="text-2xl font-black text-green-700">
              {summary.present} Days
            </p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4">
            <p className="text-xs text-red-600 font-bold uppercase tracking-wider mb-1">
              Days Absent
            </p>
            <p className="text-2xl font-black text-red-700">
              {summary.absent} Days
            </p>
          </div>
        </div>
      </div>

      {/* Breakdown per subject code */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Per-Subject Logs
        </h3>
        {subject_attendance && subject_attendance.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 font-bold tracking-wider">
                <tr>
                  <th className="px-4 py-3">Subject Name</th>
                  <th className="px-4 py-3 text-center">Present Counts</th>
                  <th className="px-4 py-3 text-center">Absent Counts</th>
                  <th className="px-4 py-3 text-center">Subject Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {subject_attendance.map((sub, index) => (
                  <tr key={index} className="hover:bg-gray-50 bg-white">
                    <td className="px-4 py-3">
                      <p className="font-bold text-gray-800">{sub.subject_name}</p>
                      <p className="text-xs text-gray-400">{sub.subject_code}</p>
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-green-600 bg-green-50/20">
                      {sub.present}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-red-600 bg-red-50/20">
                      {sub.absent}
                    </td>
                    <td className="px-4 py-3 text-center font-black text-gray-900">
                      {sub.attendance_rate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-400 text-sm italic">
            No per-subject attendance data matching current filter profiles.
          </p>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// InsightsPanel — fetches ML prediction from /students/{id}/predict-risk
// ─────────────────────────────────────────────────────────────────────────────

const InsightsPanel = ({ studentId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRisk = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/students/${studentId}/predict-risk`);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching risk prediction:", err);
        setError("Could not load ML insights. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRisk();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-900 mb-4"></div>
        <p className="text-gray-400 text-sm font-semibold tracking-widest uppercase">
          Running ML Model...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="bg-red-50 text-red-600 px-6 py-4 rounded-lg border border-red-200 text-center">
          <p className="font-bold mb-1">Insights Unavailable</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const {
    dropout_risk,
    key_factors,
    suggested_alternative_programs,
    metrics_evaluated,
    meta,
  } = data;
  const { gpa_trend, um_scale, attendance_rate } = metrics_evaluated;
  const isHighRisk = dropout_risk.label === "High Risk";

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
              {dropout_risk.score_display}
            </p>
            <p
              className={`text-xs mt-1 ${isHighRisk ? "text-red-400" : "text-green-400"}`}
            >
              Threshold: {dropout_risk.threshold_used * 100}% ·{" "}
              {meta.model_version}
            </p>
          </div>
          <span
            className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${isHighRisk ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
          >
            {dropout_risk.label}
          </span>
        </div>

        {/* Key Factors */}
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
          Key Factors
        </p>
        <div className="space-y-3 mb-6">
          {key_factors.map((f, i) => (
            <div
              key={i}
              className="flex items-start justify-between p-3 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-800">{f.factor}</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Value: {f.value} · {f.note}
                </p>
              </div>
              <span
                className={`ml-3 px-2.5 py-1 text-xs font-bold rounded-md flex-shrink-0 ${
                  f.impact === "high"
                    ? "bg-red-100 text-red-700"
                    : f.impact === "medium"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                }`}
              >
                {f.impact.toUpperCase()}
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
            {gpa_trend.history.map((h, i) => {
              const maxGpa =
                Math.max(...gpa_trend.history.map((x) => x.gpa)) + 0.5;
              const pct = Math.round((h.gpa / maxGpa) * 100);
              const color =
                h.gpa < 2.0 ? "#dc2626" : h.gpa < 2.5 ? "#f97316" : "#16a34a";
              return (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <span style={{ fontSize: 9, color: "#9ca3af" }}>{h.gpa}</span>
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
            {gpa_trend.history.map((h, i) => (
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
                {h.sem.replace("T", "")}
              </p>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span
              className={`text-xs font-bold ${
                gpa_trend.direction === "volatile"
                  ? "text-orange-500"
                  : gpa_trend.direction === "declining"
                    ? "text-red-500"
                    : "text-green-600"
              }`}
            >
              {gpa_trend.direction === "volatile" && "⚠ Volatile"}
              {gpa_trend.direction === "declining" && "↓ Declining"}
              {gpa_trend.direction === "improving" && "↑ Improving"}
              {gpa_trend.direction === "stable" && "→ Stable"} · std_dev:{" "}
              {gpa_trend.std_dev}
            </span>
            <span className="text-xs text-gray-400">
              slope: {gpa_trend.slope}
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
              {um_scale.midterm_gpa_avg}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
              Final GPA
            </p>
            <p className="text-2xl font-black text-gray-900">
              {um_scale.final_gpa_avg}
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Recommendations + Actions + Meta ── */}
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-3">
          Suggested Alternative Programs
        </p>

        {suggested_alternative_programs.length === 0 ? (
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
                key={prog.id}
                className={`rounded-xl p-4 border ${i === 0 ? "border-blue-300 bg-blue-50" : "border-gray-100 bg-gray-50"}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-gray-900">
                    {prog.course_name}
                  </p>
                  <span
                    className={`px-2.5 py-1 text-xs font-bold rounded-md ${i === 0 ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-600"}`}
                  >
                    {i === 0 ? "Best Match" : "Good Match"}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-2">
                  {prog.department} · Rank #{prog.rank}
                </p>
                <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                  {prog.reason}
                </p>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Match score</span>
                  <span
                    className={`font-bold ${i === 0 ? "text-blue-600" : "text-gray-600"}`}
                  >
                    {prog.match_display}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all duration-700 ${i === 0 ? "bg-blue-500" : "bg-gray-400"}`}
                    style={{ width: prog.match_display }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin actions — only for high risk */}
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
                {meta.model_version}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Evaluated:{" "}
              <span className="font-semibold text-gray-700">
                {new Date(meta.evaluated_at).toLocaleString()}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Semesters used:{" "}
              <span className="font-semibold text-gray-700">
                {meta.semesters_used}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Data:{" "}
              <span className="font-semibold text-gray-700">
                {meta.data_completeness}
              </span>
            </p>
            <p className="text-xs text-gray-500">
              Attendance:{" "}
              <span className="font-semibold text-gray-700">
                {attendance_rate}%
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;