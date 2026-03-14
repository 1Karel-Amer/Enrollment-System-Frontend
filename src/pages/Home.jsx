import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import programsData from "../data/programs.json";
import subjectsData from "../data/subjects.json";

// Components
import Chatbot from "../components/Chatbot";
import Dashboard from "../components/Dashboard";
import ProgramList from "../components/ProgramList";
import ProgramDetails from "../components/ProgramDetails";
import SubjectListingPage from "../components/SubjectListingPage";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import AcademicCalendar from "../components/AcademicCalendar.jsx";

const Home = () => {
  const navigate = useNavigate();

  // Safety check for user data
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role || "admin";

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [students, setStudents] = useState([]);
  const [calendarDays, setCalendarDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (activePage === "students") {
      setLoading(true);
      fetch("http://localhost:8000/api/students", { headers })
        .then((res) => res.json())
        .then((data) => {
          setStudents(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }

    if (activePage === "calendar") {
      setLoading(true);
      fetch("http://localhost:8000/api/school-days", { headers })
        .then((res) => res.json())
        .then((data) => {
          setCalendarDays(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [activePage, navigate]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      <Sidebar
        role={role}
        activePage={activePage}
        onPageChange={(page) => {
          setActivePage(page);
          setSelectedProgram(null);
        }}
        onLogout={handleLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-10">
          <h2 className="text-lg font-black text-[#3E0703] uppercase tracking-tighter">
            {activePage}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-[#3E0703] leading-none mb-1">
                {role === "student" ? "Student User" : "Admin User"}
              </p>
              <p className="text-[10px] font-bold text-[#660B05] uppercase tracking-wider">
                {role === "student" ? "Student Access" : "Registrar Office"}
              </p>
            </div>
            <div className="w-10 h-10 bg-[#8C1007] rounded-full flex items-center justify-center text-white font-bold">
              {role ? role[0].toUpperCase() : "A"}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {activePage === "dashboard" && (
            <Dashboard programs={programsData} subjects={subjectsData} />
          )}
          {activePage === "programs" &&
            (!selectedProgram ? (
              <ProgramList
                programs={programsData}
                onSelect={setSelectedProgram}
                role={role}
              />
            ) : (
              <ProgramDetails
                program={selectedProgram}
                subjects={subjectsData}
                onBack={() => setSelectedProgram(null)}
              />
            ))}
          {activePage === "subjects" && (
            <SubjectListingPage subjects={subjectsData} />
          )}
          {activePage === "students" &&
            (loading ? (
              <div className="p-10 text-center font-bold">Loading...</div>
            ) : (
              <StudentList students={students} />
            ))}
          {activePage === "calendar" &&
            (loading ? (
              <div className="p-10 text-center font-bold">Loading...</div>
            ) : (
              <AcademicCalendar days={calendarDays} />
            ))}
          {activePage === "enrollment" && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm text-center font-black uppercase">
              Enrollment Module Ready
            </div>
          )}
        </div>
        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
