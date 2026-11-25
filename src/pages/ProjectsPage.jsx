import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Github, ExternalLink, ArrowRight, Code2, Layers, Server, Sparkles, Wifi, Video, Users, CheckCircle2 } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import CaseStudies from "../components/CaseStudies";
import { flagshipProjects, secondaryProjects as staticProjects } from "../data/portfolio";
import { SEO } from "../components/common/SEO";

export function ProjectsPage({ activeTrack = "fullstack" }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Flagship Systems", "Full Stack", "DevOps", "AI / ML", "Mobile"];

  const filteredSecondary = staticProjects.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Flagship Systems") return false;
    return p.category?.toLowerCase().includes(activeFilter.toLowerCase()) || p.tags?.some(t => t.toLowerCase().includes(activeFilter.toLowerCase()));
  });

  return (
    <div className="projects-page-view" style={{ position: "relative" }}>
      <SEO title="Flagship Systems & Projects Gallery" description="Architectural case studies of production platforms: CodeMeet AI, RecoverForge, MediSync, ColdMailForge." slug="/projects" />

      {/* 3D Atmospheric Canvas */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      {/* Page Header */}
      <div className="container" style={{ paddingTop: 40, paddingBottom: 24, position: "relative", zIndex: 2 }}>
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <Code2 size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>SYSTEMS & ARCHITECTURE REPOSITORY</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>Flagship Systems & Case Studies</h1>
          <p className="section-desc" style={{ maxWidth: 640 }}>
            In-depth architectural breakdowns of production-ready systems, highlighting real-time CRDT sync, WebRTC mesh, resilient webhook pipelines, and distributed state machines.
          </p>
        </div>

        {/* Filter Navigation */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24, marginBottom: 32 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`track-pill-btn ${activeFilter === cat ? "active" : ""}`}
              onClick={() => setActiveFilter(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                border: activeFilter === cat ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                background: activeFilter === cat ? "var(--accent-glow)" : "var(--bg-surface)",
                color: activeFilter === cat ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: activeFilter === cat ? 600 : 400,
                transition: "all 120ms ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flagship Case Studies Section (Interactive canvases) */}
      {(activeFilter === "All" || activeFilter === "Flagship Systems" || activeFilter === "Full Stack" || activeFilter === "DevOps") && (
        <div style={{ position: "relative", zIndex: 2 }}>
          <CaseStudies activeTrack={activeTrack} />
        </div>
      )}

      {/* Secondary Project Showcase */}
      {activeFilter !== "Flagship Systems" && (
        <section className="container" style={{ padding: "40px 24px 80px", position: "relative", zIndex: 2 }}>
          <div className="section-header" style={{ marginBottom: 28 }}>
            <h2 className="section-title" style={{ fontSize: "1.6rem" }}>Engineered Platforms & Tooling</h2>
            <p className="section-desc">
              SaaS POS applications, automated evaluation platforms, financial analytics dashboards, and mobile study tools.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {filteredSecondary.map((project) => (
              <Card3D key={project.slug || project.title}>
                <div
                  style={{
                    padding: "24px",
                    border: "1px solid var(--border-subtle)",
                    borderTop: "1px solid var(--border-specular)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-card)",
                    boxShadow: "var(--shadow-card)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <span className="case-tag-badge">{project.category || "Application"}</span>
                      {project.status && (
                        <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>
                          ● {project.status}
                        </span>
                      )}
                    </div>

                    <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 8px" }}>
                      {project.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 16px" }}>
                      {project.summary || project.problem}
                    </p>

                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                      {(project.tags || []).slice(0, 4).map((tag) => (
                        <span key={tag} className="tech-pill" style={{ fontSize: 11, padding: "2px 7px" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {project.repo && (
                        <a
                          href={project.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-btn"
                          aria-label={`${project.title} GitHub repository`}
                          style={{ width: 32, height: 32 }}
                        >
                          <Github size={14} />
                        </a>
                      )}
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="icon-btn"
                          aria-label={`${project.title} Live Demo`}
                          style={{ width: 32, height: 32 }}
                        >
                          <ExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    <Link
                      to={`/projects/${project.slug}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 12,
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        textDecoration: "none"
                      }}
                    >
                      <span>Case Details</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProjectsPage;
