import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../services/api";
import { toast } from "sonner";
import { Mail, Lock, ArrowRight, GraduationCap } from "lucide-react";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const loadingToastId = toast.loading("Authenticating...");

    try {
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      const response = await api.post("/login", { email, password });

      localStorage.setItem("auth_token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      toast.success("Welcome back!", { id: loadingToastId });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error details:", err.response);

      if (err.response?.status === 401) {
        toast.error("Invalid email or password.", { id: loadingToastId });
      } else if (err.response?.status === 422) {
        toast.error("Please check your email format or password.", {
          id: loadingToastId,
        });
      } else {
        toast.error("Server connection failed.", { id: loadingToastId });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* LEFT SECTION: Form */}
        <div className="login-form-section">
          <div className="login-header">
            <div className="login-header-icon">
              <GraduationCap size={24} />
            </div>
            <h2>Welcome Back</h2>
            <p>Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail className="input-icon" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@umindanao.edu.ph"
                />
              </div>
            </div>

            <div className="input-group">
              <div className="label-row">
                <label>Password</label>
                <button type="button" className="forgot-link">
                  Forgot?
                </button>
              </div>
              <div className="input-wrapper">
                <Lock className="input-icon" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className="login-btn">
              {loading ? "Verifying..." : "Sign In"}
              {!loading && <ArrowRight size={16} className="btn-icon" />}
            </button>
          </form>
        </div>

        {/* RIGHT SECTION: Branding */}
        <div className="login-brand-section">
          <div className="brand-bg-image"></div>
          <div className="brand-overlay"></div>

          <div className="brand-content">
            <h1>
              University <br /> <span>of</span> Mindanao
            </h1>
            <div className="brand-divider"></div>
            <p>
              Tagum Branch <br /> Admin Portal
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
