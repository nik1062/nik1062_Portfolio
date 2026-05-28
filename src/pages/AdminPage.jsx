import React, { useState, useEffect } from "react";
import { Lock, LogOut, Mail, Trash } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { apiService } from "../services/api";
import { useToast } from "../components/ui/Toast";

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await apiService.adminLogin(password);
      setToken(data.token);
      localStorage.setItem("adminToken", data.token);
      addToast("Login successful", "success");
      setPassword("");
    } catch (error) {
      addToast(error.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setToken(null);
    localStorage.removeItem("adminToken");
    setMessages([]);
    addToast("Logged out", "info");
  }

  async function fetchMessages() {
    try {
      const data = await apiService.getMessages(token);
      setMessages(data.messages || []);
    } catch (error) {
      addToast("Session expired, please login again", "error");
      handleLogout();
    }
  }

  if (!token) {
    return (
      <PageShell>
        <PageHero eyebrow="Restricted Area" title="Admin Dashboard" copy="Please enter your admin credentials to view the message inbox." />
        <section className="section" style={{ maxWidth: 400, margin: "0 auto" }}>
          <form className="contact-form" onSubmit={handleLogin}>
            <label>
              Password
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter admin password..." required />
            </label>
            <button type="submit" disabled={loading}>
              <Lock size={16} />
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHero eyebrow="Admin Access" title="Message Inbox" copy="View and manage messages submitted via the contact form." />
      <section className="section">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Mail size={20} />
            Recent Messages ({messages.length})
          </h3>
          <button onClick={handleLogout} className="secondary-button" style={{ height: 38 }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
        
        <div className="admin-messages-grid" style={{ display: "grid", gap: 16 }}>
          {messages.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No messages found in the database.</p>
          ) : (
            messages.map((msg, i) => (
              <div key={i} className="about-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
                  <div>
                    <strong style={{ color: "var(--gold)", fontSize: 16 }}>{msg.name}</strong>
                    <div style={{ color: "var(--muted)", fontSize: 13 }}>{msg.email}</div>
                  </div>
                  <div style={{ color: "var(--soft)", fontSize: 12 }}>
                    {new Date(msg.createdAt).toLocaleString()}
                  </div>
                </div>
                <p style={{ color: "var(--text)", lineHeight: 1.6, marginTop: 8 }}>{msg.message}</p>
              </div>
            ))
          )}
        </div>
      </section>
    </PageShell>
  );
}
