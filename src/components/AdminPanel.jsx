import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  MessageSquare, 
  FolderKanban, 
  History, 
  LogOut, 
  Trash2, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Plus,
  Github,
  Radio,
  RefreshCw
} from "lucide-react";
import SEO from "./SEO";
import githubData from "../data/github-projects.generated.json";

const AdminPanel = () => {
  const { token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({ messages: 0, projects: 0, logs: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async (endpoint, setter) => {
    try {
      const res = await fetch(`http://127.0.0.1:5050/api/admin/${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.ok) setter(data[endpoint] || data.stats || data);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchData("stats", setStats),
        fetchData("messages", setMessages),
        fetchData("logs", setLogs)
      ]);
      setLoading(false);
    };
    loadAll();
  }, [token]);

  const updateMessageStatus = async (id, status) => {
    try {
      const res = await fetch(`http://127.0.0.1:5050/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setMessages(prev => prev.map(m => m._id === id ? { ...m, status } : m));
      }
    } catch (err) {
      console.error("Error updating message:", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`http://127.0.0.1:5050/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setMessages(prev => prev.filter(m => m._id !== id));
        setStats(prev => ({ ...prev, messages: prev.messages - 1 }));
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Overview", icon: LayoutDashboard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "projects", label: "Projects", icon: FolderKanban },
    { id: "logs", label: "AI Logs", icon: History },
  ];

  if (loading) return <div className="page-shell"><div className="section centered">Loading Admin Dashboard...</div></div>;

  return (
    <div className="page-shell">
      <SEO title="Admin Dashboard" />
      <div className="admin-container" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "2rem", minHeight: "80vh" }}>
        {/* Sidebar */}
        <aside className="about-card" style={{ padding: "1.5rem", height: "fit-content", position: "sticky", top: "100px" }}>
          <div style={{ marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Admin Panel</h3>
            <p className="muted" style={{ fontSize: "0.85rem" }}>Manage your portfolio</p>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={activeTab === tab.id ? "primary-button" : "secondary-button"}
                style={{ width: "100%", justifyContent: "flex-start", padding: "0.75rem" }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
            <hr style={{ margin: "1rem 0", border: "0", borderTop: "1px solid rgba(255,255,255,0.1)" }} />
            <button
              onClick={logout}
              className="secondary-button"
              style={{ width: "100%", justifyContent: "flex-start", padding: "0.75rem", color: "#ff4d4d" }}
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="admin-content">
          {activeTab === "dashboard" && (
            <section>
              <h2 className="section-title">Overview</h2>
              <div className="hero-metrics" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "2rem" }}>
                <div><strong>{stats.messages}</strong><span>Messages</span></div>
                <div><strong>{stats.projects}</strong><span>Projects</span></div>
                <div><strong>{stats.logs}</strong><span>AI Queries</span></div>
              </div>
              <div className="about-card" style={{ padding: "2rem" }}>
                <h3>Welcome back, Nikunj!</h3>
                <p className="muted">You have {messages.filter(m => m.status === "pending").length} unread messages.</p>
                <div className="hero-actions" style={{ marginTop: "1.5rem" }}>
                  <button className="primary-button" onClick={() => setActiveTab("messages")}>View Messages</button>
                  <button className="secondary-button" onClick={() => setActiveTab("projects")}>Manage Projects</button>
                </div>
              </div>

              {/* GitHub Automation Telemetry */}
              <div className="about-card" style={{ padding: "1.5rem", marginTop: "1.5rem", border: "1px solid rgba(245, 166, 35, 0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(245, 166, 35, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#f5a623" }}>
                      <Github size={20} />
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1rem" }}>GitHub Discovery Automation</h4>
                      <p className="muted" style={{ margin: 0, fontSize: "0.8rem" }}>Topic filter: <code>#{githubData?.topic || "portfolio"}</code> • User: <code>@{githubData?.username || "nik1062"}</code></p>
                    </div>
                  </div>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.8rem", color: "#4ade80", background: "rgba(74, 222, 128, 0.1)", padding: "4px 10px", borderRadius: "100px" }}>
                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80" }} />
                    Cron Active (6h)
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginTop: "1rem" }}>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "8px" }}>
                    <span className="muted" style={{ fontSize: "0.75rem", display: "block" }}>DISCOVERED REPOS</span>
                    <strong style={{ fontSize: "1.25rem", color: "#f6f3ee" }}>{githubData?.totalDiscovered || 0}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "8px" }}>
                    <span className="muted" style={{ fontSize: "0.75rem", display: "block" }}>LAST SYNC RUN</span>
                    <strong style={{ fontSize: "0.9rem", color: "#f6f3ee" }}>{githubData?.lastSynced ? new Date(githubData.lastSynced).toLocaleString() : "Pending"}</strong>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.02)", padding: "1rem", borderRadius: "8px" }}>
                    <span className="muted" style={{ fontSize: "0.75rem", display: "block" }}>PIPELINE ENGINE</span>
                    <strong style={{ fontSize: "0.9rem", color: "#f5a623" }}>GitHub Actions CI</strong>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === "messages" && (
            <section>
              <h2 className="section-title">Contact Messages</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {messages.length === 0 ? (
                  <p className="muted">No messages found.</p>
                ) : (
                  messages.map(msg => (
                    <div key={msg._id} className="about-card" style={{ padding: "1.5rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                        <div>
                          <h4 style={{ margin: 0 }}>{msg.name}</h4>
                          <p className="muted" style={{ fontSize: "0.85rem" }}>{msg.email} • {new Date(msg.createdAt).toLocaleString()}</p>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem" }}>
                          {msg.status === "pending" ? (
                            <button className="secondary-button" style={{ padding: "4px 8px", fontSize: "0.75rem" }} onClick={() => updateMessageStatus(msg._id, "replied")}>
                              <Clock size={14} /> Mark Replied
                            </button>
                          ) : (
                            <span style={{ color: "#4ade80", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "4px" }}>
                              <CheckCircle size={14} /> Replied
                            </span>
                          )}
                          <button className="secondary-button" style={{ padding: "4px 8px", color: "#ff4d4d" }} onClick={() => deleteMessage(msg._id)}>
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <p style={{ background: "rgba(255,255,255,0.03)", padding: "1rem", borderRadius: "8px", fontSize: "0.95rem" }}>{msg.message}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {activeTab === "projects" && (
            <section>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h2 className="section-title" style={{ marginBottom: 0 }}>Manage Projects</h2>
                <button className="primary-button"><Plus size={18} /> Add New</button>
              </div>
              <p className="muted">Project CMS is coming soon. For now, projects are managed via <code>src/data/portfolio.js</code>. You can sync them to MongoDB using the <code>/api/admin/projects</code> endpoint.</p>
            </section>
          )}

          {activeTab === "logs" && (
            <section>
              <h2 className="section-title">Assistant Logs</h2>
              <div className="about-card" style={{ padding: "0", overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                  <thead>
                    <tr style={{ background: "rgba(255,255,255,0.05)", textAlign: "left" }}>
                      <th style={{ padding: "1rem" }}>Question</th>
                      <th style={{ padding: "1rem" }}>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log._id} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "1rem" }}>{log.question}</td>
                        <td style={{ padding: "1rem" }} className="muted">{new Date(log.createdAt).toLocaleTimeString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {logs.length === 0 && <p className="muted" style={{ padding: "2rem", textAlign: "center" }}>No logs yet.</p>}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
