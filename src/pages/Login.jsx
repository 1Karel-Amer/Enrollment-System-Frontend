import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#3E0703] p-4 md:p-0">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.7)] min-h-[600px]">
        {/* Left Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-black text-[#3E0703] uppercase tracking-tight">
              Login
            </h2>
            <p className="text-slate-500 font-medium mt-1">
              Please enter your credentials to continue.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            <div className="relative">
              <label className="text-[10px] font-black text-[#3E0703] uppercase tracking-widest absolute -top-2 left-3 bg-white px-1">
                Username
              </label>
              <input
                type="text"
                required
                className="w-full px-5 py-4 border-2 border-slate-100 rounded-xl focus:border-[#660B05] outline-none transition-all text-[#3E0703]"
                placeholder="Enter username"
              />
            </div>

            <div className="relative">
              <label className="text-[10px] font-black text-[#3E0703] uppercase tracking-widest absolute -top-2 left-3 bg-white px-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-5 py-4 border-2 border-slate-100 rounded-xl focus:border-[#660B05] outline-none transition-all text-[#3E0703]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#660B05] hover:bg-[#3E0703] text-white font-black rounded-xl shadow-lg shadow-red-900/20 transition-all uppercase tracking-widest transform active:scale-95"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
            © 2026 University of Mindanao
          </p>
        </div>

        {/* Right Side: Branding/Welcome (The Purple section in your reference) */}
        <div className="hidden md:flex w-1/2 bg-[#660B05] p-16 flex-col justify-center items-center text-center relative overflow-hidden">
          {/* Decorative Circle Backgrounds */}
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#8C1007] rounded-full opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#3E0703] rounded-full opacity-30"></div>

          <div className="relative z-10 text-white">
            <h1 className="text-4xl font-black uppercase leading-tight tracking-tighter mb-4">
              University <br /> of Mindanao
            </h1>
            <div className="h-1.5 w-20 bg-white/30 mx-auto mb-6 rounded-full"></div>
            <p className="text-white/80 text-lg font-light max-w-xs mx-auto">
              Excellence in education and character building through innovative
              enrollment systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
