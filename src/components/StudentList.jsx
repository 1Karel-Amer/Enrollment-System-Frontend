import React, { useState } from "react";
import {
  Search,
  Eye,
  UserCircle,
  Phone,
  MapPin,
  Mail,
  GraduationCap,
} from "lucide-react";

const StudentList = ({ students = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Search logic
  const filteredStudents = students.filter(
    (s) =>
      s.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.student_id?.includes(searchTerm),
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 animate-in fade-in duration-500">
      {/* Table Section */}
      <div className="flex-1 space-y-4">
        <div className="relative max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by ID or Name..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-[#8C1007] transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Student ID
                </th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Full Name
                </th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="p-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-5 text-sm font-bold text-slate-500">
                    {student.student_id}
                  </td>
                  <td className="p-5 text-sm font-black text-[#3E0703]">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-full">
                      Enrolled
                    </span>
                  </td>
                  <td className="p-5">
                    <button
                      onClick={() => setSelectedStudent(student)}
                      className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-[#8C1007] transition-all"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Demographic & Academic Profile Panel */}
      {selectedStudent && (
        <div className="w-full lg:w-80 bg-[#3E0703] text-white p-8 rounded-[2.5rem] shadow-xl h-fit sticky top-4">
          <div className="flex justify-between items-start mb-6">
            <UserCircle size={48} className="text-red-400" />
            <button
              onClick={() => setSelectedStudent(null)}
              className="text-white/50 hover:text-white"
            >
              ✕
            </button>
          </div>

          <h3 className="text-xl font-black mb-1">
            {selectedStudent.first_name} {selectedStudent.last_name}
          </h3>
          <p className="text-red-400 text-[10px] font-black uppercase tracking-widest mb-6">
            Student Profile
          </p>

          {/* ACADEMIC INFO SECTION */}
          <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap size={14} className="text-red-400" />
              <p className="text-[10px] text-red-400 font-black uppercase">
                Academic Status
              </p>
            </div>
            <h4 className="text-sm font-bold text-white mb-1">
              {selectedStudent.course?.course_name ||
                "BS in Information Technology"}
            </h4>
            <p className="text-[10px] text-white/50 font-medium">
              Year Level:{" "}
              <span className="text-white">
                {selectedStudent.year_level || "3rd Year"}
              </span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <Mail size={14} className="text-white/40" />
              <p className="text-sm font-medium">{selectedStudent.email}</p>
            </div>
            <div className="flex gap-3 items-center">
              <Phone size={14} className="text-white/40" />
              <p className="text-sm font-medium">
                {selectedStudent.contact_no}
              </p>
            </div>
            <div className="flex gap-3 items-start">
              <MapPin size={14} className="text-white/40 mt-1" />
              <p className="text-sm font-medium leading-relaxed">
                {selectedStudent.address}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-[10px] text-white/40 font-black uppercase mb-3">
              Emergency Contact
            </p>
            <p className="text-sm font-bold">
              {selectedStudent.emergency_contact_name}
            </p>
            <p className="text-xs text-red-400 font-bold">
              {selectedStudent.emergency_contact_no}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentList;
