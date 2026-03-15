import React, { useEffect, useState, useCallback } from "react";
import api, { createSubject, deleteSubject } from "../services/api";
import {
  Search,
  Plus,
  Archive,
  BookOpen,
  Layers,
  CheckCircle,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

// --- LOADING SKELETON COMPONENT ---
const SkeletonRow = () => (
  <tr className="animate-pulse border-b border-slate-50">
    <td className="px-8 py-6">
      <div className="h-4 w-20 bg-slate-200 rounded"></div>
    </td>
    <td className="px-8 py-6">
      <div className="h-4 w-40 bg-slate-200 rounded mb-2"></div>
      <div className="h-3 w-10 bg-slate-100 rounded"></div>
    </td>
    <td className="px-8 py-6 text-center">
      <div className="h-4 w-16 bg-slate-100 rounded mx-auto"></div>
    </td>
    <td className="px-8 py-6 text-center">
      <div className="h-6 w-20 bg-slate-100 rounded-full mx-auto"></div>
    </td>
    <td className="px-8 py-6 text-right">
      <div className="h-8 w-8 bg-slate-100 rounded-lg ml-auto"></div>
    </td>
  </tr>
);

const EnrollmentPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All");

  // Form State for New Subject
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    units: 3,
    year: "1st Year",
    term: "1st Semester",
    program: "BSIT",
    description: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const params =
        selectedProgram !== "All" ? { program: selectedProgram } : {};
      const [subRes, progRes] = await Promise.all([
        api.get("/subjects", { params }),
        api.get("/programs"),
      ]);
      setSubjects(subRes.data);
      setPrograms(progRes.data);
    } catch (error) {
      toast.error("Failed to sync with database.");
    } finally {
      setLoading(false);
    }
  }, [selectedProgram]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAddSubject = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Saving to database...");
    try {
      const res = await createSubject(formData);
      setSubjects((prev) => [...prev, res.data]);
      setShowModal(false);
      toast.success("Subject added successfully!", { id: loadingToast });
      // Reset Form
      setFormData({
        code: "",
        title: "",
        units: 3,
        year: "1st Year",
        term: "1st Semester",
        program: "BSIT",
        description: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving subject", {
        id: loadingToast,
      });
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Move this subject to archives?")) return;
    try {
      await deleteSubject(id);
      setSubjects((prev) => prev.filter((s) => s.id !== id));
      toast.success("Subject archived.");
    } catch (error) {
      toast.error("Archive failed.");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-[#F8FAFC]">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 rounded-2xl text-[#8C1007]">
            <BookOpen size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Total Subjects
            </p>
            <h3 className="text-xl font-black text-slate-700">
              {loading ? "..." : subjects.length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
            <Layers size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Programs
            </p>
            <h3 className="text-xl font-black text-slate-700">
              {programs.length}
            </h3>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-[#8C1007] text-white p-6 rounded-[2rem] font-black text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#3E0703] transition-all"
        >
          <Plus size={20} strokeWidth={3} /> Add New Subject
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-wrap gap-4 bg-slate-50/30">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder="Search code or title..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm outline-none focus:border-[#8C1007]"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-black text-slate-600 outline-none"
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          >
            <option value="All">All Programs</option>
            {programs.map((prog) => (
              <option key={prog.id} value={prog.code}>
                {prog.code}
              </option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Code
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Subject Information
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Year Level
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                  Status
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : subjects.length > 0 ? (
                subjects
                  .filter(
                    (s) =>
                      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      s.title.toLowerCase().includes(searchTerm.toLowerCase()),
                  )
                  .map((subject) => (
                    <tr
                      key={subject.id}
                      className="hover:bg-slate-50/50 transition-all group"
                    >
                      <td className="px-8 py-6 font-black text-[#8C1007] text-sm italic">
                        {subject.code}
                      </td>
                      <td className="px-8 py-5">
                        <p className="font-bold text-slate-700 text-sm">
                          {subject.title}
                        </p>
                        <span className="text-[9px] text-slate-400 font-black uppercase tracking-tighter">
                          {subject.program}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                          {subject.year}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[9px] font-black border border-green-100 uppercase">
                          Active
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          onClick={() => handleArchive(subject.id)}
                          className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Archive size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="p-20 text-center text-slate-400 font-bold italic"
                  >
                    No subjects found in the database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD SUBJECT MODAL (Simplified) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95">
            <h2 className="text-xl font-black text-slate-800 mb-6 uppercase">
              New Subject Entry
            </h2>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Code (e.g. IT101)"
                  required
                  className="p-3 border rounded-xl outline-none focus:border-red-500"
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Units"
                  required
                  className="p-3 border rounded-xl outline-none"
                  onChange={(e) =>
                    setFormData({ ...formData, units: e.target.value })
                  }
                />
              </div>
              <input
                type="text"
                placeholder="Subject Title"
                required
                className="w-full p-3 border rounded-xl outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-4">
                <select
                  className="p-3 border rounded-xl"
                  onChange={(e) =>
                    setFormData({ ...formData, year: e.target.value })
                  }
                >
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </select>
                <select
                  className="p-3 border rounded-xl"
                  onChange={(e) =>
                    setFormData({ ...formData, term: e.target.value })
                  }
                >
                  <option>1st Semester</option>
                  <option>2nd Semester</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 font-bold text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#8C1007] text-white rounded-2xl font-black uppercase text-xs"
                >
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnrollmentPage;
