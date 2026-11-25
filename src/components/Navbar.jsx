import React, { useState } from "react";
import { Search, Github, Linkedin, Menu, X, ChevronDown, Download, Palette } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Navbar({ onOpenCommand, activeTrack, currentTheme, onThemeChange }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  const themeList = [
    { id: "terminal", name: "Industrial Terminal", accent: "#86D65A" },
    { id: "obsidian", name: "Obsidian Minimalist", accent: "#E4D5B7" },
    { id: "slate", name: "Deep Space Slate", accent: "#F08A5D" }
  ];

  return (
    <header className="site-nav" role="banner">
      <div className="container nav-inner">
        {/* Brand Monogram & Name */}
        <a href="#hero" className="brand">
          <div className="brand-badge" aria-hidden="true">
            NK
          </div>
          <div className="brand-text">
            <span className="brand-name">{profile.name}</span>
            <span className="brand-meta">Full-Stack & DevOps / SRE</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          <a href="#case-studies" className="nav-link">
            Systems
          </a>
          <a href="#track-switch" className="nav-link">
            {activeTrack === "devops" ? "DevOps Track" : "Full-Stack Track"}
          </a>
          <a href="#skills" className="nav-link">
            Skills Matrix
          </a>
          <a href="#experience" className="nav-link">
            Experience & Honors
          </a>
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
          <a href="#case-studies" className="nav-link" onClick={() => setMobileOpen(false)}>
            Flagship Systems
          </a>
          <a href="#track-switch" className="nav-link" onClick={() => setMobileOpen(false)}>
            Track Switch ({activeTrack})
          </a>
          <a href="#skills" className="nav-link" onClick={() => setMobileOpen(false)}>
            Skills Matrix
          </a>
          <a href="#experience" className="nav-link" onClick={() => setMobileOpen(false)}>
            Experience & Honors
          </a>

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
            style={{ height: "38px", fontSize: "13px", justifyContent: "center" }}
            onClick={() => {
              setMobileOpen(false);
              onOpenCommand();
            }}
          >
            <Search size={14} />
            Open Command Palette (⌘K)
          </button>
        </div>
      )}
    </header>
  );
}
