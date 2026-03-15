import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Chatbot from "../components/Chatbot";
import Dashboard from "../components/Dashboard";
import Programs from "../components/Programs";
import SubjectListingPage from "../components/SubjectListingPage";
import EnrollmentPage from "../components/EnrollmentPage";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import AcademicCalendar from "../components/AcademicCalendar.jsx";

const Home = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role || "admin";

  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [studentsData, setStudentsData] = useState({
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [programs, setPrograms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);

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
        const baseUrl = "http://localhost:8000/api";

        if (activePage === "dashboard") {
          const [progRes, subjRes, studRes] = await Promise.all([
            axios.get(`${baseUrl}/programs`, { headers }),
            axios.get(`${baseUrl}/subjects`, { headers }),
            axios.get(`${baseUrl}/students`, { headers }),
          ]);
          setPrograms(progRes.data || []);
          setSubjects(subjRes.data.data || subjRes.data || []);
          setStudentsData(studRes.data);
        } else if (activePage === "programs") {
          const res = await axios.get(`${baseUrl}/programs`, { headers });
          setPrograms(res.data || []);
        } else if (activePage === "subjects") {
          const res = await axios.get(`${baseUrl}/subjects`, { headers });
          setSubjects(res.data.data || []);
        } else if (activePage === "students") {
          const res = await axios.get(`${baseUrl}/students`, {
            headers,
            params: { page: currentPage, search: searchQuery },
          });
          setStudentsData(res.data);
        } else if (activePage === "calendar") {
          const res = await axios.get(`${baseUrl}/school-days`, { headers });
          setCalendarDays(res.data || []);
        }
      } catch (error) {
        console.error("API Sync Error:", error);
        if (error.response?.status === 401) handleLogout();
      } finally {
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchData();
  }, [activePage, currentPage, searchQuery]);

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar
        role={role}
        activePage={activePage}
        onPageChange={(page) => {
          setActivePage(page);
          setCurrentPage(1);
          setSearchQuery("");
        }}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
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
                Access: {role}
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-tr from-[#8C1007] to-[#3E0703] rounded-2xl shadow-lg flex items-center justify-center text-white text-lg font-black italic">
              {user?.name ? user.name[0] : "A"}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-12 py-8">
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
                onSearchChange={(v) => {
                  setSearchQuery(v);
                  setCurrentPage(1);
                }}
                onPageChange={setCurrentPage}
              />
            )}
            {activePage === "programs" && (
              <Programs
                programs={programs}
                subjects={subjects}
                role={role}
                isLoading={loading}
              />
            )}
            {activePage === "subjects" && (
              <SubjectListingPage subjects={subjects} isLoading={loading} />
            )}
            {activePage === "calendar" && (
              <AcademicCalendar days={calendarDays} isLoading={loading} />
            )}
            {activePage === "enrollment" && <EnrollmentPage />}
          </div>
        </div>
        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
