import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const StudentProfile = () => {
  const { id } = useParams();
  
  // API State
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Tab State
  const [activeTab, setActiveTab] = useState('grades');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}`);
        setStudent(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("System Error Response: Request failed. Please verify API states.");
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
        <p className="text-gray-600 font-semibold tracking-widest text-sm uppercase">Accessing Database Records...</p>
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

  if (!student) return <div className="p-8 text-center">No student record found.</div>;

  // Calculations
  const subjectsCount = student.grades ? student.grades.length : 0;
  const totalUnits = student.grades 
    ? student.grades.reduce((sum, subject) => sum + (Number(subject.units) || 3), 0) 
    : 0;

  // Helper for tab styling
  const getTabClass = (tabName) => {
    const baseClass = "pb-3 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ";
    return activeTab === tabName
      ? baseClass + "text-gray-900 border-b-2 border-red-900"
      : baseClass + "text-gray-400 hover:text-gray-600";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Back Navigation */}
        <Link to="/dashboard" className="text-gray-500 hover:text-gray-800 text-sm font-semibold tracking-wide flex items-center w-max">
          <span className="mr-2">←</span> BACK TO STUDENTS LIST
        </Link>

        {/* Top Header Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-[#7c1d1d] text-white rounded-full flex items-center justify-center text-2xl font-bold">
              {student.first_name.charAt(0)}{student.last_name.charAt(0)}
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
                Student ID: <span className="font-semibold text-gray-700">{student.student_id}</span> • {student.course?.course_name || 'Unassigned Program'}
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Enrolled: {student.enrollment_date || 'N/A'} • {student.year_level || '1st Year'}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            {/* Window Print Action */}
            <button 
              onClick={() => window.print()} 
              className="bg-[#5c1a1b] hover:bg-red-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide shadow-sm transition"
            >
              🖨️ PRINT TRANSCRIPT
            </button>
            {/* Options Action */}
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
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">Cumulative GPA</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {student.gpa !== null && student.gpa !== undefined ? Number(student.gpa).toFixed(2) : 'N/A'}
              </span>
              <span className="text-sm text-gray-400 font-medium">out of 5.00</span>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">Units Earned</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">{totalUnits}</span>
              <span className="text-sm text-gray-400 font-medium">of {student.required_units || 148} required</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">Attendance</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">
                {student.attendance !== null && student.attendance !== undefined ? student.attendance : '0'}%
              </span>
              <span className="text-sm text-gray-400 font-medium">this semester</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs text-gray-400 font-bold tracking-wider mb-2 uppercase">Subjects Taken</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-black text-gray-900">{subjectsCount}</span>
              <span className="text-sm text-gray-400 font-medium">dropped subjects</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-8 border-b border-gray-200 mt-8">
          <button onClick={() => setActiveTab('grades')} className={getTabClass('grades')}>
            Grades Per Semester
          </button>
          <button onClick={() => setActiveTab('personal')} className={getTabClass('personal')}>
            Personal Info
          </button>
          <button onClick={() => setActiveTab('attendance')} className={getTabClass('attendance')}>
            Attendance Log
          </button>
          <button onClick={() => setActiveTab('remarks')} className={getTabClass('remarks')}>
            Remarks
          </button>
        </div>

        {/* Dynamic Data Display Area */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mt-6 min-h-[250px]">
          
          {/* TAB 1: GRADES */}
          {activeTab === 'grades' && (
            student.grades && student.grades.length > 0 ? (
              <div className="text-left w-full">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Enrolled Subjects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {student.grades.map((sub, index) => (
                     <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-between items-center">
                       <div>
                         <p className="text-sm font-bold text-gray-800">{sub.subject_name}</p>
                         <p className="text-xs text-gray-500 font-medium">{sub.subject_code} • {sub.units} Units</p>
                       </div>
                       <div className="text-right flex flex-col items-end">
                         <span className={`px-3 py-1 text-xs font-bold rounded-md ${sub.status === 'Enrolled' ? 'bg-green-50 text-green-700' : 'bg-gray-200 text-gray-700'}`}>
                           {sub.status.toUpperCase()}
                         </span>
                       </div>
                     </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full pt-10">
                <p className="text-gray-400 font-bold tracking-widest text-xs uppercase text-center">
                  No verified academic records indexed inside the system data arrays.
                </p>
              </div>
            )
          )}

          {/* TAB 2: PERSONAL INFO */}
          {activeTab === 'personal' && (
            <div className="text-left w-full">
              <h3 className="text-lg font-bold text-gray-800 mb-6">Student Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-sm font-semibold text-gray-900">{student.email || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Contact Number</p>
                  <p className="text-sm font-semibold text-gray-900">{student.contact_no || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Date of Birth</p>
                  <p className="text-sm font-semibold text-gray-900">{student.date_of_birth || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Home Address</p>
                  <p className="text-sm font-semibold text-gray-900">{student.address || 'N/A'}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ATTENDANCE LOG */}
          {activeTab === 'attendance' && (
             <div className="flex items-center justify-center h-full pt-10 text-center">
               <div>
                 <p className="text-gray-800 font-bold mb-2">No attendance logs reported yet.</p>
                 <p className="text-gray-400 font-medium text-sm">Attendance metrics are updated during the midterm period.</p>
               </div>
             </div>
          )}

          {/* TAB 4: REMARKS */}
          {activeTab === 'remarks' && (
            <div className="flex items-center justify-center h-full pt-10 text-center">
              <div>
                <p className="text-gray-800 font-bold mb-2">Clear Record</p>
                <p className="text-gray-400 font-medium text-sm">There are no academic or disciplinary remarks on file for this student.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;