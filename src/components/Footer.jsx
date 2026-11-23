import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div>
          <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "4px" }}>
            {profile.name} — {profile.title}
          </div>
          <div style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            B.Tech IT Final Year, Anna University, Chennai · {profile.founder}
          </div>
        </div>

        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="icon-btn"
            style={{ width: 32, height: 32 }}
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
