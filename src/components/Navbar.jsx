import React, { useState } from "react";
import { Search, Github, Linkedin, Menu, X, FileText, ChevronDown, Download } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Navbar({ onOpenCommand, activeTrack }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <header className="site-nav" role="banner">
      <div className="container nav-inner">
        {/* Brand */}
        <a href="#hero" className="brand">
          <div className="brand-badge" aria-hidden="true">
            NK
          </div>
          <div className="brand-text">
            <span className="brand-name">{profile.name}</span>
            <span className="brand-role">Full-Stack & DevOps</span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="nav-links" aria-label="Main Navigation">
          <a href="#case-studies" className="nav-link">
            Systems
          </a>
          <a href="#track-toggle" className="nav-link">
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

          {/* Quick Resume Dropdown */}
          <div className="resume-dropdown-wrap">
            <button
              type="button"
              className="icon-btn"
              style={{ width: "auto", padding: "0 10px", gap: 6, fontSize: "12px", fontFamily: "var(--font-mono)" }}
              onClick={() => setResumeOpen(!resumeOpen)}
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
          <a href="#track-toggle" className="nav-link" onClick={() => setMobileOpen(false)}>
            Track Switch ({activeTrack})
          </a>
          <a href="#skills" className="nav-link" onClick={() => setMobileOpen(false)}>
            Skills Matrix
          </a>
          <a href="#experience" className="nav-link" onClick={() => setMobileOpen(false)}>
            Experience & Honors
          </a>
          <button
            type="button"
            className="btn-primary"
            style={{ height: "36px", fontSize: "13px", justifyContent: "center" }}
            onClick={() => {
              setMobileOpen(false);
              onOpenCommand();
            }}
          >
            <Search size={14} />
            Open Command Palette
          </button>
        </div>
      )}
    </header>
  );
}
