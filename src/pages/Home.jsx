import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Chatbot from "../components/Chatbot";
import Dashboard from "../components/Dashboard";
import Programs from "../components/Programs";
import SubjectListingPage from "../components/SubjectListingPage";
import EnrollmentPage from "../components/EnrollmentPage";
import Sidebar from "../components/Sidebar";
import StudentList from "../components/StudentList";
import AcademicCalendar from "../components/AcademicCalendar.jsx";

// FIX 1: Home.jsx no longer fetches anything itself.
// Each component (Dashboard, Programs, StudentList, etc.) fetches its own
// data internally. This eliminates the waterfall where switching pages
// triggered a full re-fetch of everything through a single useEffect.

const Home = () => {
  const navigate = useNavigate();
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const role = user?.role || "admin";

  const [activePage, setActivePage] = useState("dashboard");

  // These two stay here only for StudentList, which needs
  // search/pagination coordinated at the layout level.
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Guard: redirect to login if no token
  useEffect(() => {
    const token =
      localStorage.getItem("auth_token") || localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

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
            {/* Each component now fetches its own data when it mounts.
                Switching pages no longer triggers a global re-fetch. */}

            {activePage === "dashboard" && <Dashboard />}

            {activePage === "students" && (
              <StudentList
                searchQuery={searchQuery}
                currentPage={currentPage}
                onSearchChange={(v) => {
                  setSearchQuery(v);
                  setCurrentPage(1);
                }}
                onPageChange={setCurrentPage}
              />
            )}

            {activePage === "programs" && <Programs role={role} />}

            {activePage === "subjects" && <SubjectListingPage />}

            {activePage === "calendar" && <AcademicCalendar />}

            {activePage === "enrollment" && <EnrollmentPage />}
          </div>
        </div>
        <Chatbot />
      </main>
    </div>
  );
};

export default Home;
