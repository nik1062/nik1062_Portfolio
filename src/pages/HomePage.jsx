import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Zap, User, FileText, Award, Layers, Terminal, Sparkles } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import Hero from "../components/Hero";
import TrackToggle from "../components/TrackToggle";
import { flagshipProjects, profile } from "../data/portfolio";
import { SEO } from "../components/common/SEO";

export function HomePage({ activeTrack, setActiveTrack }) {
  const gatewayPortals = [
    {
      to: "/projects",
      title: "Flagship Systems",
      subtitle: "CodeMeet AI, RecoverForge, MediSync & ColdMailForge architecture flows",
      badge: "4 Deep Dives",
      icon: Code2
    },
    {
      to: "/skills",
      title: "Tech Arsenal & Lab",
      subtitle: "CRDTs, WebSockets, Docker, AWS EC2, PostgreSQL & Flutter matrix",
      badge: "Verified Proof",
      icon: Zap
    },
    {
      to: "/about",
      title: "Engineering Story",
      subtitle: "Anna University IT, Founder of Zorbit Studio, NEURA '25 Winner",
      badge: "Background",
      icon: User
    },
    {
      to: "/resume",
      title: "Multi-Role Resume Hub",
      subtitle: "Direct PDF downloads for Full-Stack, DevOps/SRE, and Mobile roles",
      badge: "Instant PDF",
      icon: FileText
    }
  ];

  return (
    <div className="home-view" style={{ position: "relative" }}>
      <SEO title="Full-Stack & DevOps/SRE Engineer" slug="/" />

      {/* 3D Interactive WebGL Scene */}
      <ThreeCanvas density="medium" height="680px" interactive={true} />

      {/* Hero Workbench with Live MacOS IDE & Webhook Simulation */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Hero />
      </div>

      {/* Track Toggle */}
      <div className="container" style={{ marginTop: 12, marginBottom: 28, position: "relative", zIndex: 2 }}>
        <TrackToggle activeTrack={activeTrack} onTrackChange={setActiveTrack} />
      </div>

      {/* 3D Gateway Portals */}
      <section className="container" style={{ padding: "32px 24px 60px", position: "relative", zIndex: 2 }}>
        <div className="section-header" style={{ marginBottom: 24 }}>
          <h2 className="section-title" style={{ fontSize: "1.5rem" }}>Engineering Command Center</h2>
          <p className="section-desc">
            Explore dedicated deep-dive sections for system architectures, technical proficiencies, credentials, and resumes.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {gatewayPortals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card3D key={portal.to}>
                <Link
                  to={portal.to}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "24px 20px",
                    height: "100%",
                    minHeight: "170px",
                    border: "1px solid var(--border-subtle)",
                    borderTop: "1px solid var(--border-specular)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--bg-card)",
                    textDecoration: "none",
                    boxShadow: "var(--shadow-card)",
                    transition: "all 150ms ease"
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 36,
                          height: 36,
                          borderRadius: "var(--radius-sm)",
                          background: "var(--accent-glow)",
                          color: "var(--accent)",
                          border: "1px solid var(--accent-border)"
                        }}
                      >
                        <Icon size={18} />
                      </div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontFamily: "var(--font-mono)",
                          padding: "2px 7px",
                          borderRadius: "4px",
                          background: "var(--bg-surface)",
                          color: "var(--text-muted)",
                          border: "1px solid var(--border-subtle)"
                        }}
                      >
                        {portal.badge}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 6px" }}>
                      {portal.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.45 }}>
                      {portal.subtitle}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 16, fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                    <span>Launch Section</span>
                    <ArrowRight size={13} />
                  </div>
                </Link>
              </Card3D>
            );
          })}
        </div>
      </section>

      {/* Flagship Production Systems Overview */}
      <section className="container" style={{ padding: "0 24px 72px", position: "relative", zIndex: 2 }}>
        <div className="section-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 24 }}>
          <div>
            <h2 className="section-title" style={{ fontSize: "1.5rem" }}>Flagship Production Systems</h2>
            <p className="section-desc">
              Real products engineered for scale, conflict-free synchronization, and automated fault recovery.
            </p>
          </div>
          <Link to="/projects" className="btn-secondary" style={{ height: 38, fontSize: 13, gap: 6 }}>
            <span>Explore All Projects</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {flagshipProjects.map((project) => (
            <Card3D key={project.id}>
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
                    <span className="case-tag-badge">{project.badge}</span>
                    <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      SYS // {project.primaryTrack.toUpperCase()}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 6px", color: "var(--text-primary)" }}>
                    {project.title}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", margin: "0 0 14px", lineHeight: 1.45 }}>
                    {project.tagline}
                  </p>

                  <div className="metric-callout-card" style={{ padding: "8px 12px", marginBottom: 14 }}>
                    <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                      📊 {project.metric}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border-subtle)", paddingTop: 14 }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="tech-pill" style={{ fontSize: 11, padding: "2px 7px" }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <Link to={`/projects/${project.slug}`} style={{ color: "var(--accent)", display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontFamily: "var(--font-mono)" }}>
                    <span>Architecture</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
