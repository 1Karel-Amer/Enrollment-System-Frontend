import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Eye,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  X,
  GraduationCap,
  Calendar,
  Users,
  ChevronLeft,
  ChevronRight,
  HeartPulse,
  Copy,
  ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";
import api from "../services/api";

// FIX 1 (continued): StudentList now fetches its own paginated data.
// Home.jsx passes searchQuery, currentPage, and the two change handlers
// (so the header can still coordinate search state), but the actual
// API call lives here — it only runs when this component is visible.
const StudentList = ({
  searchQuery,
  currentPage,
  onSearchChange,
  onPageChange,
}) => {
  const [studentsData, setStudentsData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    api
      .get("/students", {
        params: { page: currentPage, search: searchQuery },
      })
      .then((res) => {
        setStudentsData(res.data);
      })
      .catch(() => toast.error("Failed to load students."))
      .finally(() => setLoading(false));
  }, [currentPage, searchQuery]); // Re-fetches only when page or search changes

  const students = studentsData.data || [];
  const { current_page, last_page, total } = studentsData;

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-PH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleCopyId = (e, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(id);
    toast.success(`Copied Student ID: ${id}`);
  };

  return (
    <div className="relative w-full animate-in fade-in duration-500">
      <div className="space-y-6">
        {/* SEARCH BAR */}
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by Student ID or Name..."
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-[#8C1007]/20 transition-all"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="px-5 py-2 bg-[#8C1007]/5 rounded-xl border border-[#8C1007]/10">
            <span className="text-[11px] font-black text-[#8C1007] uppercase tracking-widest">
              {total} Enrolled
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Student ID
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Full Identity
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Year
                </th>
                <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                // Skeleton rows while fetching
                [...Array(8)].map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="p-6">
                      <div className="h-7 w-28 bg-slate-100 rounded-lg" />
                    </td>
                    <td className="p-6">
                      <div className="h-4 w-40 bg-slate-200 rounded mb-2" />
                      <div className="h-3 w-24 bg-slate-100 rounded" />
                    </td>
                    <td className="p-6 text-center">
                      <div className="h-6 w-16 bg-slate-100 rounded-full mx-auto" />
                    </td>
                    <td className="p-6 text-center">
                      <div className="h-8 w-8 bg-slate-100 rounded-full mx-auto" />
                    </td>
                  </tr>
                ))
              ) : students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="group cursor-pointer hover:bg-slate-50 transition-all"
                  >
                    <td className="p-6">
                      <button
                        onClick={(e) => handleCopyId(e, student.student_id)}
                        className="flex items-center gap-2 text-[11px] font-bold text-slate-500 font-mono bg-white border border-slate-200 shadow-sm px-3 py-1.5 rounded-lg hover:border-[#8C1007] hover:text-[#8C1007] transition-colors"
                      >
                        {student.student_id}
                        <Copy size={12} className="opacity-50" />
                      </button>
                    </td>
                    <td className="p-6">
                      <p className="text-sm font-black text-[#3E0703] uppercase">
                        {student.first_name} {student.last_name}
                      </p>
                    </td>
                    <td className="p-6 text-center">
                      <span className="px-3 py-1 text-[10px] font-black rounded-full bg-white text-[#3E0703] border border-slate-200 shadow-sm">
                        {student.year_level}
                      </span>
                    </td>
                    <td className="p-6 text-center">
                      <div className="mx-auto w-8 h-8 rounded-full flex items-center justify-center bg-white border border-slate-200 text-slate-400 group-hover:bg-[#8C1007] group-hover:border-[#8C1007] group-hover:text-white transition-all shadow-sm">
                        <Eye size={14} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                      No students found
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Page {current_page} of {last_page}
            </p>
            <div className="flex gap-2">
              <button
                disabled={current_page === 1}
                onClick={() => onPageChange(current_page - 1)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase disabled:opacity-30 transition hover:bg-slate-50 shadow-sm"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <button
                disabled={current_page === last_page}
                onClick={() => onPageChange(current_page + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8C1007] text-white rounded-xl text-[10px] font-black uppercase disabled:opacity-30 transition hover:bg-[#6b0d06] shadow-sm shadow-red-900/20"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* STUDENT DRAWER PANEL */}
      {selectedStudent && (
        <>
          <div
            onClick={() => setSelectedStudent(null)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] animate-in fade-in duration-300"
          />
          <div className="fixed top-0 right-0 h-screen w-full max-w-[430px] bg-[#3E0703] text-white shadow-2xl z-[101] transform transition-transform duration-500 translate-x-0 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-y-auto p-10 relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center text-center mt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#8C1007] to-[#5c0b05] rounded-[2rem] flex items-center justify-center mb-6 shadow-2xl border border-white/10">
                  <UserCircle size={46} className="text-white/80" />
                </div>
                <h2 className="text-2xl font-black uppercase italic leading-tight tracking-tighter">
                  {selectedStudent.first_name} <br />{" "}
                  {selectedStudent.last_name}
                </h2>
                <span className="mt-3 px-4 py-1 rounded-full bg-white/10 text-[10px] font-black tracking-widest uppercase">
                  {selectedStudent.student_id}
                </span>
              </div>

              <div className="mt-12 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">
                    Academic Profile
                  </h3>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
                    <InfoRow
                      icon={<GraduationCap size={18} />}
                      label="Course"
                      value={
                        selectedStudent.course?.course_name ||
                        "BS Information Technology"
                      }
                    />
                    <InfoRow
                      icon={<Users size={18} />}
                      label="Year Level"
                      value={selectedStudent.year_level}
                    />
                    <InfoRow
                      icon={<Calendar size={18} />}
                      label="Enrolled"
                      value={formatDate(selectedStudent.enrollment_date)}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">
                    Personal Information
                  </h3>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/5 space-y-4">
                    <InfoRow
                      icon={<Mail size={16} />}
                      label="Email"
                      value={selectedStudent.email}
                    />
                    <InfoRow
                      icon={<Phone size={16} />}
                      label="Contact"
                      value={selectedStudent.contact_no}
                    />
                    <InfoRow
                      icon={<MapPin size={16} />}
                      label="Address"
                      value={selectedStudent.address}
                    />
                    <div className="flex items-center gap-4 text-xs font-bold text-white/80 pt-2 border-t border-white/5">
                      <span className="opacity-50">
                        Gender: {selectedStudent.gender}
                      </span>
                      <span className="opacity-50">•</span>
                      <span className="opacity-50">
                        Born: {formatDate(selectedStudent.date_of_birth)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-[10px] uppercase font-black text-[#8C1007] tracking-[0.2em]">
                    Emergency Contact
                  </h3>
                  <div className="bg-[#8C1007]/10 rounded-2xl p-5 border border-[#8C1007]/20">
                    <p className="text-sm font-black uppercase text-white mb-1">
                      {selectedStudent.emergency_contact_name}
                    </p>
                    <div className="flex items-center gap-2 text-[#8C1007]">
                      <HeartPulse size={14} />
                      <span className="text-xs font-bold">
                        {selectedStudent.emergency_contact_no}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 pb-8">
                  <button
                    onClick={() => navigate(`/students/${selectedStudent.id}`)}
                    className="w-full bg-white text-[#3E0703] hover:bg-slate-200 font-black uppercase tracking-widest py-4 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl"
                  >
                    View Full Profile
                    <ArrowUpRight size={18} className="text-[#3E0703]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 group">
    <div className="mt-1 text-white/30 group-hover:text-[#8C1007] transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-white/30 uppercase tracking-widest leading-none mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-white/90">{value}</p>
    </div>
  </div>
);

export default StudentList;
