import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Folder, BookOpen, Command } from "lucide-react";
import { apiService } from "../../services/api";

export function CommandPalette({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      apiService.getProjects().then(data => setProjects(data.projects || [])).catch(() => {});
      apiService.getBlogs().then(data => setBlogs(data.blogs || [])).catch(() => {});
    }
  }, [open]);

  const staticCommands = [
    { label: "Home", path: "/", type: "command" },
    { label: "About", path: "/about", type: "command" },
    { label: "Projects", path: "/projects", type: "command" },
    { label: "Skills", path: "/skills", type: "command" },
    { label: "Resume", path: "/resume", type: "command" },
    { label: "Certificates", path: "/credentials", type: "command" },
    { label: "Contact", path: "/contact", type: "command" },
    { label: "Now", path: "/now", type: "command" },
    { label: "Blog", path: "/blog", type: "command" },
  ];

  const dynamicCommands = [
    ...projects.map(p => ({ label: p.title, path: `/projects/${p.slug}`, type: "project" })),
    ...blogs.map(b => ({ label: b.title, path: `/blog`, type: "blog", state: { postId: b._id } })),
  ];

  // Only show static commands when query is empty to avoid clutter
  const allCommands = query ? [...staticCommands, ...dynamicCommands] : staticCommands;
  const visible = allCommands.filter(c => c.label.toLowerCase().includes(query.toLowerCase()));

  function run(cmd) {
    navigate(cmd.path, { state: cmd.state });
    setOpen(false);
    setQuery("");
  }

  return (
    <div className={`terminal-panel command-panel ${open ? "open" : ""}`} aria-live="polite">
      <div className="terminal-head">
        <span>command palette</span>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close command palette">
          <X size={18} />
        </button>
      </div>
      <label className="command-input">
        <Search size={16} />
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, blogs, pages..." autoFocus={open} />
      </label>
      <div className="command-list">
        {visible.map((cmd, i) => (
          <button key={i} type="button" onClick={() => run(cmd)}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {cmd.type === "project" && <Folder size={14} style={{ color: "var(--gold)" }} />}
              {cmd.type === "blog" && <BookOpen size={14} style={{ color: "var(--soft)" }} />}
              {cmd.type === "command" && <Command size={14} style={{ color: "var(--muted)" }} />}
              <span>{cmd.label}</span>
            </div>
            <small>{cmd.path}</small>
          </button>
        ))}
        {visible.length === 0 && (
          <div style={{ padding: 20, textAlign: "center", color: "var(--muted)" }}>
            No results found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}
