import React, { useState, useEffect } from "react";
import { Lock, LogOut, Mail, Trash, Plus, FolderCode, BookOpen, Send, Edit } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { apiService } from "../services/api";
import { useToast } from "../components/ui/Toast";
import { projects as portfolioProjects } from "../data/portfolio";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (token) {
      fetchMessages();
      fetchProjects();
      fetchBlogs();
    }
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

  const handleSeed = async () => {
    if (!window.confirm("This will import all projects from portfolio.js. Continue?")) return;
    setIsSeeding(true);
    try {
      for (const project of portfolioProjects) {
        // Check if project already exists by slug
        const exists = projects.find(p => p.slug === project.slug);
        if (!exists) {
          await apiService.createProject(project, token);
        }
      }
      addToast("Projects seeded successfully", "success");
      fetchProjects();
    } catch (error) {
      addToast("Seeding failed: " + error.message, "error");
    } finally {
      setIsSeeding(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const data = await apiService.getMessages(token);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Fetch Messages Error:", error);
      addToast("Session expired or unauthorized. Please logout and login again.", "error");
    }
  };

  const fetchProjects = async () => {
    try {
      const data = await apiService.getProjects();
      setProjects(data.projects || []);
    } catch (error) {}
  };

  const fetchBlogs = async () => {
    try {
      const data = await apiService.getBlogs();
      setBlogs(data.blogs || []);
    } catch (error) {}
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await apiService.deleteProject(id, token);
      addToast("Project deleted", "success");
      fetchProjects();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await apiService.deleteBlog(id, token);
      addToast("Blog deleted", "success");
      fetchBlogs();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  if (!token) {
    return (
      <PageShell>
        <PageHero eyebrow="Restricted Area" title="Admin Dashboard" copy="Please enter your admin credentials to manage your portfolio content." />
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
      <PageHero eyebrow="Admin Access" title="Content Management" copy="Manage your messages, projects, and daily blogs from one central place." />
      
      <section className="section">
        <div style={{ marginBottom: 24 }}>
          <button className="secondary-button" onClick={handleSeed} disabled={isSeeding}>
            {isSeeding ? "Importing projects..." : "Seed Database from portfolio.js"}
          </button>
        </div>
        
        {/* Tabs */}
        <div className="filter-row" style={{ marginBottom: 40 }}>
          <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>
            <Mail size={16} /> Messages
          </button>
          <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>
            <FolderCode size={16} /> Projects
          </button>
          <button className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>
            <BookOpen size={16} /> Blogs
          </button>
          <button onClick={handleLogout} style={{ marginLeft: "auto", color: "#ff5a5f" }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {activeTab === "messages" && <MessagesList messages={messages} />}
        {activeTab === "projects" && <ProjectsManager projects={projects} token={token} onRefresh={fetchProjects} onDelete={handleDeleteProject} />}
        {activeTab === "blogs" && <BlogsManager blogs={blogs} token={token} onRefresh={fetchBlogs} onDelete={handleDeleteBlog} />}
      </section>
    </PageShell>
  );
}

function MessagesList({ messages }) {
  return (
    <div className="admin-messages-grid" style={{ display: "grid", gap: 16 }}>
      {messages.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No messages found.</p>
      ) : (
        messages.map((msg, i) => (
          <div key={i} className="about-card" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--line)", paddingBottom: 10 }}>
              <div>
                <strong style={{ color: "var(--gold)", fontSize: 16 }}>{msg.name}</strong>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{msg.email}</div>
              </div>
              <div style={{ color: "var(--soft)", fontSize: 12 }}>{new Date(msg.createdAt).toLocaleString()}</div>
            </div>
            <p style={{ color: "var(--text)", lineHeight: 1.6, marginTop: 8 }}>{msg.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

function ProjectsManager({ projects, token, onRefresh, onDelete }) {
  const [showAdd, setShowAdd] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    payload.slug = slugify(payload.title);
    payload.tags = payload.tags.split(",").map(t => t.trim());
    payload.highlights = payload.highlights.split("\n").map(h => h.trim()).filter(h => h);

    try {
      await apiService.createProject(payload, token);
      addToast("Project added!", "success");
      setShowAdd(false);
      onRefresh();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3>Portfolio Projects</h3>
        <button className="primary-button" onClick={() => setShowAdd(!showAdd)} style={{ height: 40 }}>
          <Plus size={16} /> Add New
        </button>
      </div>

      {showAdd && (
        <form className="contact-form about-card" style={{ marginBottom: 40 }} onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label>Title <input name="title" required /></label>
            <label>Category <input name="category" placeholder="Full Stack, AI/ML..." required /></label>
            <label>Year <input name="year" placeholder="2026" /></label>
            <label>Status <input name="status" placeholder="Featured, Case Study..." /></label>
            <label>Repo Link <input name="repo" /></label>
            <label>Live Link <input name="live" /></label>
          </div>
          <label>Summary <textarea name="summary" rows="2" required /></label>
          <label>Problem <textarea name="problem" rows="2" /></label>
          <label>Outcome <textarea name="outcome" rows="2" /></label>
          <label>Tags (comma separated) <input name="tags" placeholder="React, Node, AI..." /></label>
          <label>Highlights (one per line) <textarea name="highlights" rows="3" /></label>
          <button type="submit" className="primary-button"><Send size={16} /> Publish Project</button>
        </form>
      )}

      <div className="admin-messages-grid">
        {projects.map(p => (
          <div key={p._id} className="about-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong style={{ color: "var(--gold)" }}>{p.title}</strong>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{p.category} · {p.status}</div>
            </div>
            <button onClick={() => onDelete(p._id)} style={{ color: "#ff5a5f", background: "transparent", border: 0, cursor: "pointer" }}>
              <Trash size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlogsManager({ blogs, token, onRefresh, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    payload.slug = slugify(payload.title);

    try {
      if (editingBlog) {
        await apiService.updateBlog(editingBlog._id, payload, token);
        addToast("Blog updated!", "success");
      } else {
        await apiService.createBlog(payload, token);
        addToast("Blog published!", "success");
      }
      setShowForm(false);
      setEditingBlog(null);
      onRefresh();
    } catch (error) {
      addToast(error.message, "error");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingBlog(null);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <h3>Daily Technical Blogs</h3>
        <button className="primary-button" onClick={() => setShowForm(!showForm)} style={{ height: 40 }}>
          {showForm ? "Cancel" : <><Plus size={16} /> Write New</>}
        </button>
      </div>

      {showForm && (
        <form key={editingBlog?._id || "new"} className="contact-form about-card" style={{ marginBottom: 40 }} onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label>Title <input name="title" defaultValue={editingBlog?.title} required /></label>
            <label>Category <input name="category" defaultValue={editingBlog?.category} placeholder="Technical, AI, DevOps..." /></label>
            <label>Read Time <input name="readTime" defaultValue={editingBlog?.readTime} placeholder="5 min" /></label>
          </div>
          <label>Short Summary <input name="copy" defaultValue={editingBlog?.copy} placeholder="One sentence summary..." required /></label>
          <label>Content (Markdown) <textarea name="content" defaultValue={editingBlog?.content} rows="10" placeholder="# Hello World..." required /></label>
          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" className="primary-button" style={{ flex: 1 }}>
              <Send size={16} /> {editingBlog ? "Update Post" : "Publish Post"}
            </button>
            {editingBlog && (
              <button type="button" className="secondary-button" onClick={closeForm}>Cancel</button>
            )}
          </div>
        </form>
      )}

      <div className="admin-messages-grid" style={{ display: "grid", gap: 16 }}>
        {blogs.length === 0 ? (
          <p style={{ color: "var(--muted)" }}>No blog posts found.</p>
        ) : (
          blogs.map(b => (
            <div key={b._id} className="about-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "var(--gold)", background: "rgba(245, 166, 35, 0.1)", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", fontWeight: 800 }}>{b.category}</span>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>{b.readTime} read</span>
                  </div>
                  <strong style={{ color: "var(--text)", fontSize: 18, display: "block", marginBottom: 4 }}>{b.title}</strong>
                  <p style={{ fontSize: 14, color: "var(--muted)", margin: 0, lineHeight: 1.5 }}>{b.copy}</p>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => handleEdit(b)} style={{ color: "var(--gold)", background: "rgba(245, 166, 35, 0.1)", border: "1px solid rgba(245, 166, 35, 0.2)", padding: 8, borderRadius: 10, cursor: "pointer", transition: "180ms ease" }} title="Edit Post">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => onDelete(b._id)} style={{ color: "#ff5a5f", background: "rgba(255, 90, 95, 0.1)", border: "1px solid rgba(255, 90, 95, 0.2)", padding: 8, borderRadius: 10, cursor: "pointer", transition: "180ms ease" }} title="Delete Post">
                    <Trash size={18} />
                  </button>
                </div>
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "var(--soft)" }}>ID: {b._id.slice(-8)}</span>
                <span style={{ fontSize: 11, color: "var(--soft)" }}>{new Date(b.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
