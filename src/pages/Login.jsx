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
      // 1. HANDSHAKE: Must request CSRF cookie from the root domain, NOT the /api prefix
      await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
        withCredentials: true,
      });

      // 2. LOGIN: Now use your configured api instance
      const response = await api.post("/login", { email, password });

      // 3. SUCCESS: Navigate to dashboard
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.log("Full error object:", err.response);
      if (err.response?.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError("Unable to connect to the server. Check console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-auth-container">
        <div className="form-section">
          <div className="form-header">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@email.com"
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <div className="branding-section">
          <div className="branding-content">
            <h1>
              University <br /> of Mindanao
            </h1>
            <div className="divider"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
