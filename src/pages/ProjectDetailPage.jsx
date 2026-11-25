import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Code2, CheckCircle2, Sparkles, Layers, ShieldCheck, Zap } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { flagshipProjects, secondaryProjects as staticProjects } from "../data/portfolio";
import { SEO } from "../components/common/SEO";

export function ProjectDetailPage() {
  const { slug } = useParams();

  // Find project in flagship or static list
  const project =
    flagshipProjects.find((p) => p.slug === slug || p.id === slug) ||
    staticProjects.find((p) => p.slug === slug) ||
    flagshipProjects[0];

  return (
    <div className="project-detail-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO title={`${project.title} — Architectural Case Study`} description={project.tagline || project.summary} slug={`/projects/${project.slug}`} />

      {/* Atmospheric 3D Canvas */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 36, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Back Link */}
        <Link
          to="/projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            marginBottom: 28,
            transition: "color 120ms ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          <ArrowLeft size={14} />
          <span>Back to Projects Gallery</span>
        </Link>

        {/* Project Header Banner */}
        <div
          style={{
            padding: "36px 32px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-subtle)",
            borderTop: "1px solid var(--border-specular)",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-card)",
            marginBottom: 36
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span className="case-tag-badge">{project.badge || project.category || "Flagship System"}</span>
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
              SYS // {(project.primaryTrack || "FULLSTACK").toUpperCase()}
            </span>
          </div>

          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, margin: "0 0 12px", color: "var(--text-primary)" }}>
            {project.title}
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 760, margin: "0 0 24px" }}>
            {project.tagline || project.summary}
          </p>

          {/* Action Links & Metrics */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div style={{ display: "flex", gap: 10 }}>
              {project.repo && (
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ height: 40, fontSize: 13, gap: 7 }}>
                  <Github size={15} />
                  <span>View Repository</span>
                </a>
              )}
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ height: 40, fontSize: 13, gap: 7 }}>
                  <ExternalLink size={15} />
                  <span>Live System</span>
                </a>
              )}
            </div>

            {project.metric && (
              <div className="metric-callout-card" style={{ padding: "8px 16px", margin: 0 }}>
                <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--accent)" }}>
                  📊 {project.metric}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Deep Case Study Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 36 }}>
          {/* Problem Statement Card */}
          <Card3D>
            <div style={{ padding: 28, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-card)", height: "100%" }}>
              <h3 style={{ fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", margin: "0 0 12px" }}>
                01 // Problem & Failure Mode
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                {project.problem || "Traditional setups suffer from disjointed editing locks, high audio-video latency, and missing automated fault detection, leading to unreliable collaboration states."}
              </p>
            </div>
          </Card3D>

          {/* Architecture & Engineering Decisions */}
          <Card3D>
            <div style={{ padding: 28, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-card)", height: "100%" }}>
              <h3 style={{ fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--emerald)", margin: "0 0 12px" }}>
                02 // Architecture & Tradeoffs
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                {project.outcome || "Architected around zero-conflict Operational Transform (Yjs CRDT), WebRTC SFU mesh for low-latency media streams, and atomic idempotency locks to eliminate race conditions."}
              </p>
            </div>
          </Card3D>
        </div>

        {/* Production Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div style={{ padding: "28px 32px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", marginBottom: 36 }}>
            <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)", margin: "0 0 16px" }}>
              Technical Implementation Highlights
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <CheckCircle2 size={16} style={{ color: "var(--emerald)", flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Matrix */}
        <div style={{ padding: "24px 30px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
          <h4 style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 14px" }}>
            Technologies & Tools Deployed
          </h4>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(project.stack || project.tags || []).map((tech) => (
              <span key={tech} className="tech-pill" style={{ fontSize: 12, padding: "5px 12px" }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailPage;
