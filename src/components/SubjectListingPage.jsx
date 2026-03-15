import React, { useEffect, useState } from "react";
import { Search, Filter, BookOpen } from "lucide-react";
import api from "../services/api";
import SubjectCard from "./SubjectCard";
import SubjectDetails from "./SubjectDetails";

// 1. We create a Skeleton component that matches the shape of your SubjectCard
const SubjectCardSkeleton = () => (
  <div className="p-6 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm flex flex-col h-full animate-pulse">
    <div className="flex justify-between items-start mb-4">
      {/* Code Badge Skeleton */}
      <div className="h-6 w-16 bg-slate-200 rounded-md" />
      {/* Term Badge Skeleton */}
      <div className="h-5 w-20 bg-slate-100 rounded-md" />
    </div>

    {/* Title Skeleton (Two lines to mimic text) */}
    <div className="h-5 w-3/4 bg-slate-200 rounded mb-2" />
    <div className="h-5 w-1/2 bg-slate-200 rounded mb-6 flex-grow" />

    {/* Bottom Stats Skeleton */}
    <div className="pt-4 border-t border-slate-50 flex flex-col gap-2">
      <div className="h-4 w-24 bg-slate-100 rounded" />
      <div className="h-4 w-32 bg-slate-100 rounded" />
    </div>
  </div>
);

const SubjectListingPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);

  // 2. Add a loading state (defaults to true)
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [semesterFilter, setSemesterFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await api.get("/subjects");
        setSubjects(response.data);
        setFilteredSubjects(response.data);
      } catch (error) {
        console.error("Failed to load subjects", error);
      } finally {
        // 3. Turn off loading when the fetch is done (whether it succeeded or failed)
        setIsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    let filtered = subjects;

    if (search) {
      filtered = filtered.filter(
        (subject) =>
          subject.code.toLowerCase().includes(search.toLowerCase()) ||
          subject.title.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (semesterFilter) {
      filtered = filtered.filter((subject) => subject.term === semesterFilter);
    }

    if (unitFilter) {
      filtered = filtered.filter(
        (subject) => subject.units.toString() === unitFilter,
      );
    }

    setFilteredSubjects(filtered);
  }, [search, semesterFilter, unitFilter, subjects]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-[#3E0703] mb-2 tracking-tight">
          Subject Offerings
        </h1>
        <p className="text-slate-500 font-medium">
          Browse and search through all available courses.
        </p>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search subject code or title..."
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-[#8C1007]/10 focus:border-[#8C1007] outline-none transition-all font-medium text-slate-700 shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading} // Disable input while loading
          />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <select
              className="pl-10 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl appearance-none focus:ring-4 focus:ring-[#8C1007]/10 focus:border-[#8C1007] outline-none transition-all font-medium text-slate-600 shadow-sm cursor-pointer min-w-[160px] disabled:opacity-50"
              onChange={(e) => setSemesterFilter(e.target.value)}
              disabled={isLoading}
            >
              <option value="">All Semesters</option>
              <option value="1st Semester">1st Semester</option>
              <option value="2nd Semester">2nd Semester</option>
            </select>
          </div>

          <div className="relative">
            <select
              className="px-4 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl appearance-none focus:ring-4 focus:ring-[#8C1007]/10 focus:border-[#8C1007] outline-none transition-all font-medium text-slate-600 shadow-sm cursor-pointer min-w-[120px] disabled:opacity-50"
              onChange={(e) => setUnitFilter(e.target.value)}
              disabled={isLoading}
            >
              <option value="">All Units</option>
              <option value="3">3 Units</option>
              <option value="2">2 Units</option>
              <option value="1">1 Unit</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subject Grid Output */}
      {isLoading ? (
        /* 4. Show 8 fake skeleton cards while loading */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SubjectCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredSubjects.length > 0 ? (
        /* Render real subjects once loaded */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onClick={() => setSelectedSubject(subject)}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 flex flex-col items-center justify-center text-center bg-white border border-dashed border-slate-200 rounded-[2rem]">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
            <BookOpen size={32} className="text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 mb-1">
            No subjects found
          </h3>
          <p className="text-slate-500 text-sm max-w-sm">
            We couldn't find any subjects matching your current search and
            filter criteria.
          </p>
        </div>
      )}

      {/* Subject Details Modal */}
      {selectedSubject && (
        <SubjectDetails
          subject={selectedSubject}
          onClose={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
};

export default SubjectListingPage;
