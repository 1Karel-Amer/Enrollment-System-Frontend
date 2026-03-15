import React, { useState } from "react";
import { Loader2 } from "lucide-react";
import api from "../services/api";
import ProgramCard from "../components/ProgramCard";
import ProgramDetails from "../components/ProgramDetails";

const Programs = ({ programs = [] }) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectProgram = async (program) => {
    setLoading(true);

    try {
      const response = await api.get(`/programs/${program.id}`);
      setSelectedProgram(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load program curriculum");
    } finally {
      setLoading(false);
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
    <div className="animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="text-4xl font-black text-[#3E0703] tracking-tight">
          Academic Programs
        </h1>

        {loading && (
          <div className="flex items-center gap-2 text-[#8C1007] bg-[#8C1007]/10 px-4 py-2 rounded-full font-bold text-sm animate-pulse w-fit">
            <Loader2 size={16} className="animate-spin" />
            Loading curriculum...
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {programs.map((p) => (
          <ProgramCard
            key={p.id}
            program={p}
            onSelect={() => handleSelectProgram(p)}
          />
        ))}
      </div>
    </div>
  );
};

export default Programs;
