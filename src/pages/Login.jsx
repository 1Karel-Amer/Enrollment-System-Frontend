import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Professor's logic for handling the login request
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Connects to the local backend server
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: store token and move to dashboard
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        // Error: display invalid credentials message
        setError(data.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      // Error: handle server connection failure
      setError(
        "Unable to connect to the server. Please check your connection.",
      );
    } finally {
      // Always stop the loading spinner
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="main-auth-container">
        {/* Left Side: Form Section */}
        <div className="form-section">
          <div className="form-header">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue</p>
          </div>

          {/* Show error message if login fails */}
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

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <button type="button" className="forgot-link">
                Forgot password?
              </button>
            </div>

            {/* Changes button text based on loading state */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account? <span>Contact Admin</span>
            </p>
          </div>
        </div>

        {/* Right Side: Branding */}
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
