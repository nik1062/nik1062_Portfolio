import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Lock, Mail, Loader2 } from "lucide-react";
import SEO from "./SEO";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5050/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.ok) {
        login(data.token);
        navigate(from, { replace: true });
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell">
      <SEO title="Admin Login" description="Login to the portfolio admin dashboard." />
      <div className="section centered" style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="about-card" style={{ maxWidth: "400px", width: "100%", padding: "2rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div className="avatar" style={{ margin: "0 auto 1rem" }}>NK</div>
            <h3>Admin Access</h3>
            <p className="muted">Enter your credentials to manage the portfolio.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="input-group">
              <label htmlFor="email"><Mail size={16} /> Email</label>
              <input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
              />
            </div>

            <div className="input-group">
              <label htmlFor="password"><Lock size={16} /> Password</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: "100%", padding: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "white" }}
              />
            </div>

            {error && <p style={{ color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>}

            <button 
              type="submit" 
              className="primary-button" 
              disabled={loading}
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
