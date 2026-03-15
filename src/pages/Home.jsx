import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Chatbot from "../components/Chatbot";
import Dashboard from "../components/Dashboard";
import Programs from "../components/Programs";
import SubjectListingPage from "../components/SubjectListingPage";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import AcademicCalendar from "../components/AcademicCalendar.jsx";

const Home = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role || "admin";

  // Navigation and Content States
  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  // Data States
  const [studentsData, setStudentsData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [programs, setPrograms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);

  // Filter & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const token =
      localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    const fetchData = async () => {
      setLoading(true);
      try {
        // --- DASHBOARD: Fetch basic stats ---
        if (activePage === "dashboard") {
          const [progRes, subjRes, studRes] = await Promise.all([
            axios.get("http://localhost:8000/api/programs", { headers }),
            axios.get("http://localhost:8000/api/subjects", { headers }),
            axios.get("http://localhost:8000/api/students", { headers }),
          ]);
          setPrograms(progRes.data || []);
          setSubjects(subjRes.data || []);
          setStudentsData(studRes.data);
        }

        // --- PROGRAMS PAGE ---
        else if (activePage === "programs") {
          const res = await axios.get("http://localhost:8000/api/programs", {
            headers,
          });
          setPrograms(res.data || []);
        }

        // --- SUBJECTS PAGE ---
        else if (activePage === "subjects") {
          const res = await axios.get("http://localhost:8000/api/subjects", {
            headers,
          });
          setSubjects(res.data.data || res.data || []);
        }

        // --- STUDENTS PAGE: Handles Server-Side Search & Pagination ---
        else if (activePage === "students") {
          const res = await axios.get(`http://localhost:8000/api/students`, {
            headers,
            params: {
              page: currentPage,
              search: searchQuery,
            },
          });
          setStudentsData(res.data);
        }

        // --- CALENDAR PAGE ---
        else if (activePage === "calendar") {
          const res = await axios.get("http://localhost:8000/api/school-days", {
            headers,
          });
          setCalendarDays(res.data || []);
        }
      } catch (error) {
        console.error("API Sync Error:", error);
        if (error.response?.status === 401) handleLogout();
      } finally {
        // Short delay for the spinner to feel smooth
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchData();
  }, [activePage, currentPage, searchQuery]); // Triggers fetch on search or page change

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar
        role={role}
        activePage={activePage}
        onPageChange={(page) => {
          setActivePage(page);
          setCurrentPage(1); // Reset page to 1 when switching modules
          setSearchQuery(""); // Clear search when switching modules
        }}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* TOP HEADER */}
        <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-12 shrink-0 z-20">
          <div>
            <p className="text-[10px] font-black text-[#8C1007] uppercase tracking-[0.3em] mb-1">
              UM System Management
            </p>
            <h2 className="text-2xl font-black text-[#3E0703] uppercase tracking-tighter italic">
              {activePage === "dashboard" ? "Overview" : activePage}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm font-black text-[#3E0703] uppercase">
                {user?.name || "Administrator"}
              </p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                Access Level: {role}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-[#8C1007] to-[#3E0703] rounded-2xl shadow-lg shadow-[#8C1007]/20 flex items-center justify-center text-white text-lg font-black italic">
              {user?.name ? user.name[0] : "A"}
            </div>
          </div>
        </header>

        {/* MAIN CONTENT AREA */}
        <div className="flex-1 overflow-y-auto px-12 py-8">
          {loading && activePage !== "students" ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="w-12 h-12 border-4 border-[#8C1007]/20 border-t-[#8C1007] rounded-full animate-spin" />
              <p className="text-[#3E0703] font-black uppercase text-[10px] tracking-widest">
                Refreshing UM Core Data...
              </p>
            </div>
          ) : (
            <div className="max-w-[1600px] mx-auto">
              {activePage === "dashboard" && (
                <Dashboard
                  programs={programs}
                  subjects={subjects}
                  students={studentsData.data || []}
                />
              )}

              {activePage === "students" && (
                <StudentList
                  studentsData={studentsData}
                  searchQuery={searchQuery}
                  onSearchChange={(val) => {
                    setSearchQuery(val);
                    setCurrentPage(1); // FIX: Reset to page 1 on new search
                  }}
                  onPageChange={setCurrentPage}
                />
              )}

              {activePage === "programs" && (
                <Programs programs={programs} subjects={subjects} role={role} />
              )}

              {activePage === "subjects" && (
                <SubjectListingPage subjects={subjects} programs={programs} />
              )}

              {activePage === "calendar" && (
                <AcademicCalendar days={calendarDays} />
              )}
            </div>
          )}
        </div>
        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
