import React from "react";
import { Github, ExternalLink, Activity, ArrowRight, ShieldCheck, Cpu, Terminal, GitBranch } from "lucide-react";
import { flagshipProjects } from "../data/portfolio";

export default function CaseStudies({ activeTrack }) {
  // Sort projects so the active track's primary projects appear first
  const sortedProjects = [...flagshipProjects].sort((a, b) => {
    if (a.primaryTrack === activeTrack && b.primaryTrack !== activeTrack) return -1;
    if (b.primaryTrack === activeTrack && a.primaryTrack !== activeTrack) return 1;
    return 0;
  });

  return (
    <section className="container" id="case-studies" aria-label="Flagship Systems & Architecture">
      <div className="section-header">
        <h2 className="section-title">Flagship Systems & Architecture</h2>
        <p className="section-desc">
          In-depth architectural breakdowns of production-ready systems, highlighting real-time CRDT sync,
          cryptographic webhook ingestion, dual-token security, and transactional ledgers.
        </p>
      </div>

      <div className="case-study-list">
        {sortedProjects.map((project, index) => (
          <article key={project.id} className="case-card" id={project.slug}>
            <div className="case-card-header">
              <div className="case-title-group">
                <div className="case-badge-row">
                  <span className="badge-flagship">{project.badge}</span>
                  <span className="text-muted" style={{ fontFamily: "var(--font-mono)", fontSize: "12px" }}>
                    SYS-0{index + 1} // {project.primaryTrack.toUpperCase()}
                  </span>
                </div>
                <h3 className="case-title">{project.title}</h3>
                <p className="case-tagline">{project.tagline}</p>
              </div>

              <div className="case-links">
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github size={15} />
                    Source Code
                  </a>
                )}
                {project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn"
                    aria-label={`View live deployment of ${project.title}`}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                ) : (
                  <span className="link-btn" style={{ opacity: 0.6, cursor: "not-allowed" }} title="Demo available upon request">
                    <Activity size={14} />
                    Demo on Request
                  </span>
                )}
              </div>
            </div>

            <div className="case-card-body">
              {/* Left Column: Problem & System Highlights */}
              <div className="case-problem-block">
                <h4>Problem Statement</h4>
                <p>{project.problem}</p>

                <h4>Production Highlights</h4>
                <ul style={{ margin: "0 0 16px 0", paddingLeft: "20px", color: "var(--text-secondary)", fontSize: "14px" }}>
                  {project.highlights.map((h, i) => (
                    <li key={i} style={{ marginBottom: "6px" }}>
                      {h}
                    </li>
                  ))}
                </ul>

                <h4>Concrete Production Metric</h4>
                <div className="case-metric-box">
                  <div className="case-metric-val">📊 {project.metric}</div>
                </div>

                <div className="stack-tags" aria-label="Technologies used">
                  {project.stack.map((tech) => (
                    <span key={tech} className="stack-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Architecture Flow Breakdown */}
              <div className="case-arch-block">
                <h4>System Architecture Pipeline</h4>
                <div className="flow-diagram" aria-label="Architecture flow stages">
                  <div className="flow-step">
                    <span className="flow-step-num">01</span>
                    <span className="flow-step-name">Client Layer</span>
                    <span className="flow-step-desc">{project.architecture.client}</span>
                  </div>
                  <div className="flow-step">
                    <span className="flow-step-num">02</span>
                    <span className="flow-step-name">Transport & API</span>
                    <span className="flow-step-desc">{project.architecture.api}</span>
                  </div>
                  <div className="flow-step">
                    <span className="flow-step-num">03</span>
                    <span className="flow-step-name">Queue / Cadence</span>
                    <span className="flow-step-desc">{project.architecture.queue}</span>
                  </div>
                  <div className="flow-step">
                    <span className="flow-step-num">04</span>
                    <span className="flow-step-name">Data & Inference</span>
                    <span className="flow-step-desc">{project.architecture.db}</span>
                  </div>
                </div>

                {/* Architecture Stages Flow */}
                <div style={{ marginTop: "20px" }}>
                  <h4 style={{ marginBottom: "10px" }}>Data Lifecycle Flow</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                    {project.flowSteps.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div
                          style={{
                            padding: "6px 10px",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--bg-elevated)",
                            fontSize: "12px",
                            fontFamily: "var(--font-mono)"
                          }}
                          title={step.desc}
                        >
                          <span style={{ color: "var(--accent)" }}>{idx + 1}. </span>
                          <span style={{ color: "var(--text-primary)" }}>{step.name}</span>
                        </div>
                        {idx < project.flowSteps.length - 1 && (
                          <ArrowRight size={12} style={{ color: "var(--text-muted)" }} />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
