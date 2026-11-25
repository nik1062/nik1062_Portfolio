import React, { useState, useEffect, useRef } from "react";
import { Search, FileText, ArrowRight, X, ExternalLink, Code2, Server, Layers, Mail, Github, Linkedin, Palette } from "lucide-react";
import { flagshipProjects, profile } from "../data/portfolio";

export default function CommandPalette({ open, setOpen, onSelectTrack, currentTheme, onThemeChange }) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const commandItems = [
    // Flagship Systems
    ...flagshipProjects.map((p) => ({
      id: `project-${p.slug}`,
      category: "Systems & Case Studies",
      title: p.title,
      subtitle: p.tagline,
      badge: p.badge,
      icon: Code2,
      action: () => {
        const el = document.getElementById(p.slug);
        if (el) el.scrollIntoView({ behavior: "smooth" });
        setOpen(false);
      }
    })),
    // Resumes (Direct 1-Click PDF Download)
    {
      id: "resume-fullstack",
      category: "Download Resumes",
      title: "Full-Stack Resume (PDF)",
      subtitle: "React, Node.js, CRDTs, PostgreSQL, System Design",
      badge: "PDF",
      icon: FileText,
      action: () => {
        window.open(profile.resumes.fullstack, "_blank");
        setOpen(false);
      }
    },
    {
      id: "resume-devops",
      category: "Download Resumes",
      title: "DevOps & SRE Resume (PDF)",
      subtitle: "Docker, AWS EC2, GitHub Actions, Linux, NGINX",
      badge: "PDF",
      icon: FileText,
      action: () => {
        window.open(profile.resumes.devops, "_blank");
        setOpen(false);
      }
    },
    {
      id: "resume-mobile",
      category: "Download Resumes",
      title: "Mobile Developer Resume (PDF)",
      subtitle: "Flutter, Dart, Riverpod, Firebase, SQLite",
      badge: "PDF",
      icon: FileText,
      action: () => {
        window.open(profile.resumes.mobile, "_blank");
        setOpen(false);
      }
    },
    // Track Switchers
    {
      id: "switch-fullstack",
      category: "Perspective Switch",
      title: "Switch to Full-Stack View",
      subtitle: "Highlight CodeMeet AI, React, Node.js, and client-side systems",
      badge: "Switch",
      icon: Layers,
      action: () => {
        onSelectTrack("fullstack");
        setOpen(false);
      }
    },
    {
      id: "switch-devops",
      category: "Perspective Switch",
      title: "Switch to DevOps / SRE View",
      subtitle: "Highlight RecoverForge, Docker, AWS, Webhooks, and resilience",
      badge: "Switch",
      icon: Server,
      action: () => {
        onSelectTrack("devops");
        setOpen(false);
      }
    },
    // Theme Switchers
    {
      id: "theme-terminal",
      category: "Color System",
      title: "Industrial Terminal (Default)",
      subtitle: "Phosphor lime (#86D65A) on deep green-black surfaces",
      badge: currentTheme === "terminal" ? "Active" : "Theme",
      icon: Palette,
      action: () => {
        if (onThemeChange) onThemeChange("terminal");
        setOpen(false);
      }
    },
    {
      id: "theme-obsidian",
      category: "Color System",
      title: "Obsidian Minimalist",
      subtitle: "Warm champagne (#E4D5B7) on near-black surfaces",
      badge: currentTheme === "obsidian" ? "Active" : "Theme",
      icon: Palette,
      action: () => {
        if (onThemeChange) onThemeChange("obsidian");
        setOpen(false);
      }
    },
    {
      id: "theme-slate",
      category: "Color System",
      title: "Deep Space Slate",
      subtitle: "Mission copper (#F08A5D) on cool blue-slate surfaces",
      badge: currentTheme === "slate" ? "Active" : "Theme",
      icon: Palette,
      action: () => {
        if (onThemeChange) onThemeChange("slate");
        setOpen(false);
      }
    },
    // Contact & Profiles
    {
      id: "link-github",
      category: "Profiles & Contact",
      title: "GitHub (@nik1062)",
      subtitle: "Explore public repositories & build history",
      badge: "External",
      icon: Github,
      action: () => {
        window.open(profile.github, "_blank");
        setOpen(false);
      }
    },
    {
      id: "link-linkedin",
      category: "Profiles & Contact",
      title: "LinkedIn Profile",
      subtitle: "Connect with Nikunj Kumar",
      badge: "External",
      icon: Linkedin,
      action: () => {
        window.open(profile.linkedin, "_blank");
        setOpen(false);
      }
    },
    {
      id: "link-email",
      category: "Profiles & Contact",
      title: "Send Direct Email",
      subtitle: profile.email,
      badge: "mailto",
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${profile.email}`;
        setOpen(false);
      }
    }
  ];

  const filteredItems = commandItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcut listener (Cmd+K / Ctrl+K & Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, setOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
    }
  }, [open]);

  // Arrow key navigation
  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!open) return null;

  return (
    <div
      className="cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={() => setOpen(false)}
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-input-wrap">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-input"
            placeholder="Type a command or search systems, resumes, stack..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleInputKeyDown}
            aria-autocomplete="list"
          />
          <button
            type="button"
            className="icon-btn"
            style={{ width: 28, height: 28 }}
            onClick={() => setOpen(false)}
            aria-label="Close command palette"
          >
            <X size={15} />
          </button>
        </div>

        <div className="cmd-results" role="listbox">
          {filteredItems.length === 0 ? (
            <div style={{ padding: "24px 16px", textAlign: "center", color: "var(--text-muted)", fontSize: "14px" }}>
              No matching commands or projects found.
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`cmd-item ${isSelected ? "selected" : ""}`}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(index)}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="cmd-item-left">
                    <Icon size={16} style={{ color: isSelected ? "var(--accent)" : "var(--text-muted)" }} />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span style={{ fontWeight: 600 }}>{item.title}</span>
                      <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{item.subtitle}</span>
                    </div>
                  </div>
                  <span className="cmd-badge">{item.badge}</span>
                </button>
              );
            })
          )}
        </div>

        <div className="cmd-footer">
          <span>
            Navigate with <span className="kbd-shortcut">↑</span> <span className="kbd-shortcut">↓</span>
          </span>
          <span>
            Select with <span className="kbd-shortcut">↵ Enter</span>
          </span>
          <span>
            Close with <span className="kbd-shortcut">Esc</span>
          </span>
        </div>
      </div>
    </div>
  );
}
