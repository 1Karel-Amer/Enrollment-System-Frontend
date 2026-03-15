import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import api from "../services/api";
import ProgramCard from "../components/ProgramCard";
import ProgramDetails from "../components/ProgramDetails";

// 1. Create the Skeleton for the Program Card
const ProgramCardSkeleton = () => (
  <div className="bg-white p-7 rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col justify-between h-[240px] animate-pulse">
    <div>
      <div className="flex justify-between items-start mb-5">
        {/* Icon Box Skeleton */}
        <div className="w-12 h-12 bg-slate-200 rounded-2xl" />
        {/* Status Badge Skeleton */}
        <div className="w-16 h-6 bg-slate-100 rounded-full" />
      </div>

      {/* Code Skeleton */}
      <div className="h-3 w-16 bg-slate-200 rounded mb-3" />

      {/* Title Skeleton (2 lines) */}
      <div className="h-6 w-3/4 bg-slate-200 rounded mb-2" />
      <div className="h-6 w-1/2 bg-slate-200 rounded" />
    </div>

    {/* Bottom Section Skeleton */}
    <div className="pt-5 mt-auto border-t border-slate-100 flex items-center justify-between">
      <div className="h-4 w-20 bg-slate-200 rounded" />
      <div className="h-4 w-24 bg-slate-100 rounded" />
    </div>
  </div>
);

// 2. Added `isLoading` as a prop here so the parent component can control it
const Programs = ({ programs = [], isLoading = false }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);

  // Renamed from 'loading' to 'isFetchingDetails' to avoid confusion with the main page loading
  const [isFetchingDetails, setIsFetchingDetails] = useState(false);

  const handleSelectProgram = async (program) => {
    setIsFetchingDetails(true);

    try {
      const response = await api.get(`/programs/${program.id}`);
      setSelectedProgram(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load program curriculum");
    } finally {
      setIsFetchingDetails(false);
    }
  };

  // Curriculum View
  if (selectedProgram) {
    return (
      <ProgramDetails
        program={selectedProgram}
        subjects={selectedProgram.subjects || []}
        onBack={() => setSelectedProgram(null)}
      />
    );
  }

  // Program List View
  return (
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black text-[#3E0703] tracking-tight mb-2">
            Academic Programs
          </h1>
          <p className="text-slate-500 font-medium">
            Select a program to view its full curriculum.
          </p>
        </div>

        {/* This loading indicator is specifically for when you click a card to view details */}
        {isFetchingDetails && (
          <div className="flex items-center gap-2 text-[#8C1007] bg-[#8C1007]/10 px-4 py-2 rounded-full font-bold text-sm animate-pulse w-fit">
            <Loader2 size={16} className="animate-spin" />
            Loading curriculum...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* 3. Logic to show skeletons, actual data, or an empty state */}
        {isLoading ? (
          // Show 8 skeletons while data is being fetched
          [...Array(8)].map((_, index) => <ProgramCardSkeleton key={index} />)
        ) : programs.length > 0 ? (
          // Show actual programs
          programs.map((p) => (
            <ProgramCard
              key={p.id}
              program={p}
              onSelect={() => handleSelectProgram(p)}
            />
          ))
        ) : (
          // Empty State
          <div className="col-span-full py-20 text-center text-slate-500 font-medium bg-white rounded-[2rem] border border-dashed border-slate-200">
            No academic programs currently available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Programs;
