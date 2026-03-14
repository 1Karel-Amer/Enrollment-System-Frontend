import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. CSRF HANDSHAKE: Required for Laravel Sanctum security
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 2. AUTHENTICATION: Use your API instance to post credentials
      const response = await api.post("/login", { email, password });

      // 3. STORAGE: Save the key (token) and user details
      // We use "auth_token" to match the Home.jsx secure fetch logic
      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // 4. NAVIGATION: Move to dashboard upon successful auth
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error details:", err.response);

      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else if (err.response?.status === 422) {
        setError("Please check your email format or password requirements.");
      } else {
        setError("Server connection failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-auth-container">
        {/* FORM SECTION */}
        <div className="form-section">
          <div className="form-header">
            <h2 className="font-black text-[#3E0703] uppercase tracking-tighter text-3xl">
              Welcome Back!
            </h2>
            <p className="text-slate-400 font-medium">
              Sign in to the UM Enrollment Portal
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-[#8C1007] p-4 rounded-2xl text-xs font-bold border border-red-100 mb-6 animate-pulse">
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-[#8C1007] focus:bg-white outline-none transition-all"
                placeholder="test@example.com"
              />
            </div>

            <div className="input-group mt-6">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-transparent focus:border-[#8C1007] focus:bg-white outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-[#8C1007] hover:bg-[#3E0703] text-white font-black py-4 rounded-2xl shadow-lg shadow-red-900/20 transition-all active:scale-[0.98] disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* BRANDING SECTION */}
        <div className="branding-section bg-[#3E0703] relative overflow-hidden">
          <div className="branding-content relative z-10 p-12 flex flex-col h-full justify-center">
            <h1 className="text-white text-5xl font-black leading-none uppercase tracking-tighter">
              University <br /> <span className="text-red-500">of</span>{" "}
              Mindanao
            </h1>
            <div className="w-12 h-1 bg-red-500 mt-6 mb-4"></div>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
              Enrollment Management System
            </p>
          </div>
          {/* Decorative background circle */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-900/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
