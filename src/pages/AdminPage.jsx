import React, { useState, useEffect } from "react";
import { Lock, LogOut, Mail, Trash, Plus, FolderCode, BookOpen, Send, Edit, BarChart3, MessageSquare, Eye } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { apiService } from "../services/api";
import { useToast } from "../components/ui/Toast";
import { projects as portfolioProjects } from "../data/portfolio";

// Rich Text Editor
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const slugify = (text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "code-block"],
    ["clean"]
  ]
};

export function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("adminToken"));
  const [activeTab, setActiveTab] = useState("dashboard");
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [aiLogs, setAiLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (token) {
      fetchMessages();
      fetchProjects();
      fetchBlogs();
      fetchAiLogs();
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

  const handleGenerateBlogs = async () => {
    if (!window.confirm("This will generate and publish 3 sample blog posts. Continue?")) return;
    const sampleBlogs = [
      {
        title: "Dockerizing a MERN App",
        category: "DevOps",
        readTime: "7 min",
        copy: "A step-by-step guide to containerizing a MERN (MongoDB, Express, React, Node.js) application using Docker for consistent development and deployment environments.",
        content: "<h3>Why Docker?</h3><p>Docker provides a consistent environment for development, testing, and production. This guide will walk you through creating a <code>Dockerfile</code> for a Node.js/Express backend and a React frontend, and then orchestrating them with <code>docker-compose</code>.</p>"
      },
      {
        title: "Intro to AI Chatbots with Node.js",
        category: "AI/ML",
        readTime: "8 min",
        copy: "Learn how to build a simple AI-powered chatbot using Node.js and the OpenAI API, and integrate it into a web application.",
        content: "<h3>The Power of LLMs</h3><p>Large Language Models like GPT-4o can be easily integrated into your applications. This tutorial covers setting up an Express server to securely call the OpenAI API and stream the response back to a React frontend, creating a simple but effective chatbot.</p>"
      },
      {
        title: "Advanced Data Analytics with Python",
        category: "Data Analytics",
        readTime: "6 min",
        copy: "A look at using Pandas and Matplotlib for in-depth data analysis and visualization, with practical examples.",
        content: "<h3>From Data to Insights</h3><p>Data is everywhere, but insights are rare. This post explores how to use the Python libraries Pandas for data manipulation and Matplotlib for creating compelling visualizations. We'll walk through a sample dataset to uncover trends and patterns.</p>"
      }
    ];

    try {
      for (const blog of sampleBlogs) {
        blog.slug = slugify(blog.title);
        blog.isPublished = true;
        await apiService.createBlog(blog, token);
      }
      addToast("Sample blogs published successfully!", "success");
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      addToast("Failed to generate blogs: " + error.message, "error");
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
      const data = await apiService.getProjects(true);
      setProjects(data.projects || []);
    } catch (error) {}
  };

  const fetchBlogs = async () => {
    try {
      const data = await apiService.getBlogs(true);
      setBlogs(data.blogs || []);
    } catch (error) {}
  };

  const fetchAiLogs = async () => {
    try {
      const data = await apiService.getAILogs(token);
      setAiLogs(data.logs || []);
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
        <div style={{ marginBottom: 24, display: "flex", gap: 12 }}>
          <button className="secondary-button" onClick={handleSeed} disabled={isSeeding}>
            {isSeeding ? "Importing projects..." : "Seed Projects from Code"}
          </button>
          <button className="secondary-button" onClick={handleGenerateBlogs}>
            Generate Sample Blogs
          </button>
        </div>
        
        {/* Tabs */}
        <div className="filter-row" style={{ marginBottom: 40, overflowX: "auto", flexWrap: "nowrap" }}>
          <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>
            <BarChart3 size={16} /> Dashboard
          </button>
          <button className={activeTab === "messages" ? "active" : ""} onClick={() => setActiveTab("messages")}>
            <Mail size={16} /> Messages
          </button>
          <button className={activeTab === "ai-logs" ? "active" : ""} onClick={() => setActiveTab("ai-logs")}>
            <MessageSquare size={16} /> AI Logs
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

        {activeTab === "dashboard" && <Dashboard projects={projects} blogs={blogs} messages={messages} aiLogs={aiLogs} />}
        {activeTab === "messages" && <MessagesList messages={messages} />}
        {activeTab === "ai-logs" && <AILogsList logs={aiLogs} />}
        {activeTab === "projects" && <ProjectsManager projects={projects} token={token} onRefresh={fetchProjects} onDelete={handleDeleteProject} />}
        {activeTab === "blogs" && <BlogsManager blogs={blogs} token={token} onRefresh={fetchBlogs} onDelete={handleDeleteBlog} />}
      </section>
    </PageShell>
  );
}

function Dashboard({ projects, blogs, messages, aiLogs }) {
  const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 0) + blogs.reduce((acc, b) => acc + (b.views || 0), 0);
  
  return (
    <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
      <div className="about-card" style={{ textAlign: "center" }}>
        <h4 style={{ color: "var(--muted)", marginBottom: 8 }}>Total Views</h4>
        <div style={{ fontSize: 32, fontWeight: 800, color: "var(--gold)" }}>{totalViews}</div>
      </div>
      <div className="about-card" style={{ textAlign: "center" }}>
        <h4 style={{ color: "var(--muted)", marginBottom: 8 }}>Messages</h4>
        <div style={{ fontSize: 32, fontWeight: 800, color: "var(--gold)" }}>{messages.length}</div>
      </div>
      <div className="about-card" style={{ textAlign: "center" }}>
        <h4 style={{ color: "var(--muted)", marginBottom: 8 }}>AI Queries</h4>
        <div style={{ fontSize: 32, fontWeight: 800, color: "var(--gold)" }}>{aiLogs.length}</div>
      </div>
      <div className="about-card" style={{ textAlign: "center" }}>
        <h4 style={{ color: "var(--muted)", marginBottom: 8 }}>Projects</h4>
        <div style={{ fontSize: 32, fontWeight: 800, color: "var(--gold)" }}>{projects.length}</div>
      </div>
    </div>
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

function AILogsList({ logs }) {
  return (
    <div className="admin-messages-grid" style={{ display: "grid", gap: 16 }}>
      {logs.length === 0 ? (
        <p style={{ color: "var(--muted)" }}>No AI logs found.</p>
      ) : (
        logs.map((log, i) => (
          <div key={i} className="about-card" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ borderBottom: "1px solid var(--line)", paddingBottom: 8, display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "var(--gold)", fontWeight: 700 }}>Question</span>
              <span style={{ color: "var(--soft)", fontSize: 11 }}>{new Date(log.createdAt).toLocaleString()}</span>
            </div>
            <p style={{ color: "var(--text)", fontStyle: "italic" }}>"{log.question}"</p>
            <div style={{ borderTop: "1px solid var(--line)", paddingTop: 8, marginTop: 4 }}>
              <span style={{ color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 4 }}>AI Answer</span>
              <p style={{ color: "var(--soft)", fontSize: 14 }}>{log.answer}</p>
            </div>
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
    payload.isPublished = payload.isPublished === "true";
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
            <label>
              Publish Status
              <select name="isPublished">
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </label>
          </div>
          <label>Summary <textarea name="summary" rows="2" required /></label>
          <label>Problem <textarea name="problem" rows="2" /></label>
          <label>Outcome <textarea name="outcome" rows="2" /></label>
          <label>Tags (comma separated) <input name="tags" placeholder="React, Node, AI..." /></label>
          <label>Highlights (one per line) <textarea name="highlights" rows="3" /></label>
          <button type="submit" className="primary-button"><Send size={16} /> Save Project</button>
        </form>
      )}

      <div className="admin-messages-grid">
        {projects.map(p => (
          <div key={p._id} className="about-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <strong style={{ color: "var(--gold)" }}>{p.title}</strong>
                <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: p.isPublished ? "rgba(76, 175, 80, 0.1)" : "rgba(255, 152, 0, 0.1)", color: p.isPublished ? "#4caf50" : "#ff9800", border: `1px solid ${p.isPublished ? "#4caf5033" : "#ff980033"}` }}>
                  {p.isPublished ? "LIVE" : "DRAFT"}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
                <Eye size={12} style={{ verticalAlign: "middle", marginRight: 4 }} /> {p.views || 0} views · {p.category}
              </div>
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
  const [content, setContent] = useState("");
  const { addToast } = useToast();

  useEffect(() => {
    if (editingBlog) setContent(editingBlog.content);
    else setContent("");
  }, [editingBlog, showForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    payload.slug = slugify(payload.title);
    payload.content = content;
    payload.isPublished = payload.isPublished === "true";

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

  const handlePublishAll = async () => {
    const draftBlogs = blogs.filter(b => !b.isPublished);
    if (draftBlogs.length === 0) {
      addToast("No drafts to publish.", "info");
      return;
    }
    if (!window.confirm(`Publish ${draftBlogs.length} draft posts?`)) return;

    try {
      for (const blog of draftBlogs) {
        await apiService.updateBlog(blog._id, { isPublished: true }, token);
      }
      addToast(`${draftBlogs.length} blogs published!`, "success");
      onRefresh();
    } catch (error) {
      addToast("Failed to publish blogs: " + error.message, "error");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h3>Daily Technical Blogs</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="secondary-button" onClick={handlePublishAll} style={{ height: 40 }}>
            Publish All Drafts
          </button>
          <button className="primary-button" onClick={() => { setShowForm(!showForm); setEditingBlog(null); }} style={{ height: 40 }}>
            {showForm && !editingBlog ? "Cancel" : <><Plus size={16} /> Write New</>}
          </button>
        </div>
      </div>

      {showForm && (
        <form key={editingBlog?._id || "new"} className="contact-form about-card" style={{ marginBottom: 40 }} onSubmit={handleSubmit}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <label>Title <input name="title" defaultValue={editingBlog?.title} required /></label>
            <label>Category <input name="category" defaultValue={editingBlog?.category} placeholder="Technical, AI, DevOps..." /></label>
            <label>Read Time <input name="readTime" defaultValue={editingBlog?.readTime} placeholder="5 min" /></label>
            <label>
              Publish Status
              <select name="isPublished" defaultValue={editingBlog ? (editingBlog.isPublished ? 'true' : 'false') : 'true'}>
                <option value="true">Published</option>
                <option value="false">Draft</option>
              </select>
            </label>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
            <label>Meta Title (SEO) <input name="metaTitle" defaultValue={editingBlog?.metaTitle} placeholder="Search title..." /></label>
            <label>Meta Description (SEO) <input name="metaDescription" defaultValue={editingBlog?.metaDescription} placeholder="Search snippet..." /></label>
          </div>
          <label>Short Summary <input name="copy" defaultValue={editingBlog?.copy} placeholder="One sentence summary..." required /></label>
          <label>Content (Rich Text Editor)</label>
          <div className="quill-editor-container" style={{ marginBottom: 20, borderRadius: 8 }}>
            <ReactQuill theme="snow" value={content} onChange={setContent} modules={QUILL_MODULES} style={{ height: 300, marginBottom: 40 }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
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
                  <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "var(--gold)", background: "rgba(245, 166, 35, 0.1)", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase", fontWeight: 800 }}>{b.category}</span>
                    <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: b.isPublished ? "rgba(76, 175, 80, 0.1)" : "rgba(255, 152, 0, 0.1)", color: b.isPublished ? "#4caf50" : "#ff9800", border: `1px solid ${b.isPublished ? "#4caf5033" : "#ff980033"}` }}>
                      {b.isPublished ? "LIVE" : "DRAFT"}
                    </span>
                  </div>
                  <strong style={{ color: "var(--text)", fontSize: 18, display: "block", marginBottom: 4 }}>{b.title}</strong>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>
                    <Eye size={12} style={{ verticalAlign: "middle", marginRight: 4 }} /> {b.views || 0} views · {b.readTime} read
                  </div>
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
