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
        {/* Left Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-left">
            <h2 className="text-4xl font-bold text-gray-900 mb-1">
              Welcome Back!
            </h2>
            <p className="text-lg text-gray-600 font-normal">
              Sign in to continue {/* Updated Text */}
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Email Address
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </span>
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#660B05] focus:border-transparent outline-none transition-all text-gray-800"
                  placeholder="name@email.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Password
              </label>
              <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect
                      x="3"
                      y="11"
                      width="18"
                      height="11"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </span>
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#660B05] focus:border-transparent outline-none transition-all text-gray-800 tracking-widest"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 accent-[#660B05]"
                />
                <label htmlFor="remember" className="text-gray-600">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-[#660B05] font-bold hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#660B05] hover:bg-[#3E0703] text-white font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              Sign In
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500 text-sm">
              Don't have an account?{" "}
              <span className="text-[#660B05] font-bold cursor-pointer">
                Contact Admin
              </span>
            </p>
          </div>
        </div>

        {/* Right Side: Branding (The UM Section) */}
        <div className="hidden md:flex w-1/2 bg-[#660B05] p-16 flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#8C1007] rounded-full opacity-50"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-[#3E0703] rounded-full opacity-30"></div>

          <div className="relative z-10 text-white px-4">
            <h1 className="text-4xl font-black uppercase leading-tight tracking-tighter mb-4">
              University <br /> of Mindanao
            </h1>
            <div className="h-1.5 w-20 bg-white/30 mx-auto mb-6 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
