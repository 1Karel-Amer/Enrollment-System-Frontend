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
import StudentList from "../components/StudentList"; // Ensure you created this file

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "admin";

  const [activePage, setActivePage] = useState("dashboard");
  const [selectedProgram, setSelectedProgram] = useState(null);

  // States for Student Data
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // SECURE FETCH LOGIC
  useEffect(() => {
    if (activePage === "students") {
      setLoading(true);

      // Get the token saved during login to access protected routes
      const token = localStorage.getItem("auth_token");

      fetch("http://localhost:8000/api/students", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // The 'key' for Sanctum
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) navigate("/login"); // Redirect if token expired
            throw new Error("Unauthorized Access");
          }
          return res.json();
        })
        .then((data) => {
          setStudents(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setLoading(false);
        });
    }
  }, [activePage, navigate]);

  const handlePageChange = (pageKey) => {
    setActivePage(pageKey);
    setSelectedProgram(null);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        role={role}
        activePage={activePage}
        onPageChange={handlePageChange}
      />

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* HEADER */}
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
            <div className="w-10 h-10 bg-[#8C1007] rounded-full border-2 border-slate-100 shadow-sm flex items-center justify-center text-white font-bold">
              {role[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar">
          {activePage === "dashboard" && (
            <Dashboard programs={programsData} subjects={subjectsData} />
          )}

          {activePage === "programs" &&
            (!selectedProgram ? (
              <ProgramList
                programs={programsData}
                onSelect={(p) => setSelectedProgram(p)}
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

          {/* SECURE STUDENT MODULE */}
          {activePage === "students" &&
            (loading ? (
              <div className="flex flex-col items-center justify-center h-64 text-slate-300">
                <div className="w-12 h-12 border-4 border-[#8C1007] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                  Accessing Database...
                </p>
              </div>
            ) : (
              <StudentList students={students} />
            ))}

          {/* OTHER MODULES */}
          {["enrollment", "reports"].includes(activePage) && (
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-slate-100 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl opacity-20">
                📁
              </div>
              <h3 className="text-2xl font-black text-[#3E0703] uppercase tracking-tighter">
                {activePage} Module
              </h3>
              <p className="text-slate-400 mt-2 max-w-xs mx-auto text-sm font-medium">
                This module is ready for integration with your protected Laravel
                API.
              </p>
            </div>
          )}
        </div>

        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
