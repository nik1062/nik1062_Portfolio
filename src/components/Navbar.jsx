import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Github, Linkedin, Menu, X, ChevronDown, Download, Palette, Layers, Terminal } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Navbar({ onOpenCommand, currentTheme, onThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const themeList = [
    { id: "terminal", name: "Industrial Terminal", accent: "#86D65A" },
    { id: "obsidian", name: "Obsidian Minimalist", accent: "#E4D5B7" },
    { id: "slate", name: "Deep Space Slate", accent: "#F08A5D" }
  ];

  const navItems = [
    { to: "/", label: "Overview", end: true },
    { to: "/projects", label: "Systems" },
    { to: "/skills", label: "Skills" },
    { to: "/about", label: "About" },
    { to: "/credentials", label: "Credentials" },
    { to: "/resume", label: "Resume" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" }
  ];

  return (
    <header className="site-nav" role="banner">
      <div className="container nav-inner">
        {/* Brand Monogram & Name */}
        <Link to="/" className="brand">
          <div className="brand-badge" aria-hidden="true">
            NK
          </div>
          <div className="brand-text">
            <span className="brand-name">{profile.name}</span>
            <span className="brand-meta">Full-Stack & DevOps / SRE</span>
          </div>
        </Link>

        {/* Desktop Multi-Page Navigation Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Status Badge */}
          <span className="live-pulse-badge nav-pulse-badge" style={{ fontSize: "12px", fontFamily: "var(--font-mono)", marginRight: "4px" }}>
            <span className="pulse-dot" aria-hidden="true" />
            <span className="nav-status-text">Operational</span>
          </span>

          {/* Cmd+K trigger button */}
          <button
            type="button"
            className="cmd-trigger"
            onClick={onOpenCommand}
            aria-label="Open command palette (Press Ctrl+K or Cmd+K)"
          >
            <Search size={13} aria-hidden="true" />
            <span>Search</span>
            <span className="kbd-shortcut">⌘K</span>
          </button>

          {/* Theme Switcher Dropdown */}
          <div className="theme-dropdown-wrap">
            <button
              type="button"
              className="icon-btn theme-toggle-btn"
              onClick={() => {
                setThemeOpen(!themeOpen);
                setResumeOpen(false);
              }}
              aria-label="Switch color theme"
              title="Switch color theme"
            >
              <Palette size={13} />
              <span className="theme-swatch-dot" aria-hidden="true" />
              <ChevronDown size={11} />
            </button>

            {themeOpen && (
              <div className="theme-menu" onMouseLeave={() => setThemeOpen(false)}>
                <div className="theme-menu-title">Color System</div>
                {themeList.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={`theme-option-item ${currentTheme === t.id ? "active" : ""}`}
                    onClick={() => {
                      if (onThemeChange) onThemeChange(t.id);
                      setThemeOpen(false);
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center" }}>
                      <span className="theme-dot" style={{ background: t.accent }} />
                      <span>{t.name}</span>
                    </span>
                    {currentTheme === t.id && <span style={{ fontSize: "11px" }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Resume Dropdown */}
          <div className="resume-dropdown-wrap">
            <button
              type="button"
              className="icon-btn"
              style={{ width: "auto", padding: "0 12px", gap: 6, fontSize: "12px", fontFamily: "var(--font-mono)" }}
              onClick={() => {
                setResumeOpen(!resumeOpen);
                setThemeOpen(false);
              }}
              aria-label="Resume options"
            >
              <Download size={13} />
              <span>Resume</span>
              <ChevronDown size={11} />
            </button>

            {resumeOpen && (
              <div className="resume-menu" style={{ right: 0, left: "auto" }} onMouseLeave={() => setResumeOpen(false)}>
                <Link
                  to="/resume"
                  className="resume-item"
                  style={{ background: "var(--bg-elevated)", borderBottom: "1px solid var(--border-subtle)" }}
                  onClick={() => setResumeOpen(false)}
                >
                  <strong style={{ color: "var(--accent)" }}>Browse All Resumes →</strong>
                  <span>Interactive Role Hub</span>
                </Link>
                <a
                  href={profile.resumes.fullstack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-item"
                  onClick={() => setResumeOpen(false)}
                >
                  <strong>Full-Stack Resume</strong>
                  <span>React, Node.js, WebSockets, DBs</span>
                </a>
                <a
                  href={profile.resumes.devops}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-item"
                  onClick={() => setResumeOpen(false)}
                >
                  <strong>DevOps & SRE Resume</strong>
                  <span>Docker, AWS EC2, CI/CD, NGINX</span>
                </a>
                <a
                  href={profile.resumes.mobile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-item"
                  onClick={() => setResumeOpen(false)}
                >
                  <strong>Mobile Developer Resume</strong>
                  <span>Flutter, Dart, Riverpod</span>
                </a>
                <a
                  href={profile.resumes.data}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="resume-item"
                  onClick={() => setResumeOpen(false)}
                >
                  <strong>Data & AI Resume</strong>
                  <span>Python, Pandas, EDA, GPT-4o</span>
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="Nikunj Kumar GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="icon-btn"
            aria-label="Nikunj Kumar LinkedIn"
          >
            <Linkedin size={16} />
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="mobile-drawer" role="navigation" aria-label="Mobile menu">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: "16px", padding: "8px 0" }}
            >
              {item.label}
            </NavLink>
          ))}

          {/* Mobile Theme Chips */}
          <div className="mobile-theme-section">
            <span className="mobile-theme-label">Theme Palette</span>
            <div className="mobile-theme-options">
              {themeList.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`mobile-theme-chip ${currentTheme === t.id ? "active" : ""}`}
                  onClick={() => {
                    if (onThemeChange) onThemeChange(t.id);
                    setMobileOpen(false);
                  }}
                >
                  <span className="theme-dot" style={{ background: t.accent, width: 8, height: 8 }} />
                  <span>{t.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="btn-primary"
            style={{ height: "38px", fontSize: "13px", justifyContent: "center", marginTop: "12px" }}
            onClick={() => {
              setMobileOpen(false);
              onOpenCommand();
            }}
          >
            <Search size={14} />
            <span>Open Command Palette (⌘K)</span>
          </button>
        </div>
      )}
    </header>
  );
}
