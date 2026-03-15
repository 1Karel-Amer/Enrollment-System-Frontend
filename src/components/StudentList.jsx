import React, { useState } from "react";
import {
  Search,
  Eye,
  UserCircle,
  Mail,
  Phone,
  MapPin,
  X,
  GraduationCap,
  AlertTriangle,
  Calendar,
  Users,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const StudentList = ({
  studentsData,
  onSearchChange,
  onPageChange,
  searchQuery,
}) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

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

  return (
    <div className="relative w-full">
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
              className="w-full pl-11 pr-4 py-3 bg-slate-50 rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-[#8C1007]/20"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          <div className="px-5 py-2 bg-[#8C1007]/5 rounded-xl border border-[#8C1007]/10">
            <span className="text-[11px] font-black text-[#8C1007] uppercase">
              {total} Total Registered
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-6 text-xs font-black text-slate-400 uppercase">
                  Student ID
                </th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase">
                  Full Identity
                </th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase text-center">
                  Year
                </th>
                <th className="p-6 text-xs font-black text-slate-400 uppercase text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.length > 0 ? (
                students.map((student) => (
                  <tr
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="group cursor-pointer hover:bg-[#8C1007]/5 transition"
                  >
                    <td className="p-6">
                      <span className="text-xs font-bold text-slate-500 font-mono bg-slate-100 px-3 py-1 rounded-lg">
                        {student.student_id}
                      </span>
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
                      <div className="mx-auto w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-400 group-hover:bg-[#8C1007] group-hover:text-white transition">
                        <Eye size={16} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-20 text-center">
                    <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
                      No students found in this range
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* PAGINATION CONTROLS */}
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Page {current_page} of {last_page}
            </p>
            <div className="flex gap-2">
              <button
                disabled={current_page === 1}
                onClick={() => onPageChange(current_page - 1)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase disabled:opacity-30 transition hover:bg-slate-50"
              >
                <ChevronLeft size={14} /> Prev
              </button>
              <button
                disabled={current_page === last_page}
                onClick={() => onPageChange(current_page + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-[#8C1007] text-white rounded-xl text-[10px] font-black uppercase disabled:opacity-30 transition hover:bg-[#6b0d06]"
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Student Panel remains exactly as you had it */}
      {selectedStudent && (
        <>
          <div
            onClick={() => setSelectedStudent(null)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          />
          <div
            className={`fixed top-0 right-0 h-full w-[430px] bg-[#3E0703] text-white shadow-2xl z-40 transform transition-transform duration-500 translate-x-0`}
          >
            <div className="h-full overflow-y-auto p-10 relative">
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center"
              >
                <X size={18} />
              </button>
              <div className="flex flex-col items-center text-center mt-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#8C1007] to-[#5c0b05] rounded-3xl flex items-center justify-center mb-6">
                  <UserCircle size={46} />
                </div>
                <h2 className="text-2xl font-black uppercase italic leading-tight">
                  {selectedStudent.first_name}
                  <br />
                  {selectedStudent.last_name}
                </h2>
                <p className="text-xs text-white/60 mt-2">
                  {selectedStudent.student_id}
                </p>
              </div>
              {/* ... existing academic/contact info blocks ... */}
              <div className="mt-10 space-y-4">
                <h3 className="text-xs uppercase font-black text-white/60 tracking-wider">
                  Academic Information
                </h3>
                <div className="bg-white/5 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <GraduationCap size={16} />
                    <span>{selectedStudent.course?.course_name || "N/A"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={16} />
                    <span>{selectedStudent.year_level}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar size={16} />
                    <span>
                      Enrolled {formatDate(selectedStudent.enrollment_date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;
