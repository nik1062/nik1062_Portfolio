import React from "react";
import { Github, ExternalLink, Activity, ArrowRight, ShieldCheck, Cpu, Terminal, Users, Video, Wifi, CheckCircle2 } from "lucide-react";
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
          Architectural breakdowns of production-grade systems, highlighting event-driven webhooks,
          real-time CRDT sync, dual-token security, and transactional ledgers.
        </p>
      </div>

      <div className="case-study-list">
        {sortedProjects.map((project, index) => (
          <article key={project.id} className="case-card" id={project.slug}>
            {/* Case Card Header */}
            <div className="case-card-header">
              <div>
                <div className="case-title-row">
                  <span className="case-tag-badge">{project.badge}</span>
                  <span className="case-id-tag">
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
                    className="btn-secondary"
                    style={{ height: 38, padding: "0 14px", fontSize: 13 }}
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
                    className="btn-primary"
                    style={{ height: 38, padding: "0 14px", fontSize: 13 }}
                    aria-label={`View live deployment of ${project.title}`}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                ) : (
                  <span
                    className="btn-secondary"
                    style={{ height: 38, padding: "0 14px", fontSize: 12, opacity: 0.65, cursor: "not-allowed" }}
                    title="Demo available upon request"
                  >
                    <Activity size={14} />
                    Demo on Request
                  </span>
                )}
              </div>
            </div>

            {/* Case Card Body */}
            <div className="case-card-body">
              {/* Left Column: Problem, Metric & Stack */}
              <div className="case-meta-panel">
                <h4>Problem Statement</h4>
                <p>{project.problem}</p>

                <h4>Production Highlights</h4>
                <ul className="case-highlights-list">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <h4>Concrete Production Metric</h4>
                <div className="metric-callout-card">
                  <div className="metric-callout-text">📊 {project.metric}</div>
                </div>

                <div className="tech-stack-row" aria-label="Technologies used">
                  {project.stack.map((tech) => (
                    <span key={tech} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Tailored Visual Architecture Canvas */}
              <div className="visual-architecture-canvas">
                <h4>System Architecture Pipeline</h4>

                {/* PROJECT 1: RecoverForge Interactive Event Flow */}
                {project.id === "recoverforge" && (
                  <div className="interactive-mock-window">
                    <div className="mock-window-header">
                      <span>EVENT-DRIVEN WEBHOOK PIPELINE</span>
                      <span>HMAC-SHA256 · RAW BUFFER</span>
                    </div>
                    <div className="mock-window-body">
                      <div className="pipeline-nodes-grid">
                        {project.flowSteps.map((step, idx) => (
                          <div key={idx} className="pipeline-node">
                            <span className="node-step-badge">0{idx + 1}</span>
                            <span className="node-title">{step.name}</span>
                            <span className="node-description">{step.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 2: CodeMeet AI Real-time Collaborative Studio */}
                {project.id === "codemeet-ai" && (
                  <div className="interactive-mock-window">
                    <div className="mock-window-header">
                      <span>MULTIPLAYER COLLABORATIVE STUDIO</span>
                      <span style={{ color: "var(--emerald)", display: "flex", alignItems: "center", gap: 5 }}>
                        <Wifi size={12} /> LiveKit SFU: Connected
                      </span>
                    </div>
                    <div className="mock-window-body">
                      <div className="crdt-studio-mock">
                        {/* Editor Canvas Mock */}
                        <div className="crdt-code-mock">
                          <div style={{ color: "var(--text-muted)", marginBottom: 6 }}>// Monaco Buffer Sync via Yjs CRDT</div>
                          <div><span style={{ color: "#f43f5e" }}>function</span> solveGraph(<span style={{ color: "#38bdf8" }}>nodes</span>: <span style={{ color: "#fbbf24" }}>Node[]</span>) &#123;</div>
                          <div style={{ paddingLeft: 14 }}>
                            <span style={{ color: "#64748b" }}>// Real-time conflict-free editing</span>
                          </div>
                          <div style={{ paddingLeft: 14 }}>
                            <span style={{ color: "#f43f5e" }}>return</span> traverseBFS(nodes[0]);
                            <span className="active-cursor" style={{ marginLeft: 2 }} />
                          </div>
                          <div>&#125;</div>
                        </div>

                        {/* WebRTC Video Grid */}
                        <div className="webrtc-video-grid">
                          <div className="video-tile active">
                            <Video size={16} style={{ color: "var(--emerald)" }} />
                            <span>nikunj (host)</span>
                          </div>
                          <div className="video-tile">
                            <Users size={16} style={{ color: "var(--text-muted)" }} />
                            <span>interviewer</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                        <span>⚡ Keystroke Latency: 28ms</span>
                        <span>🛡️ Paste-Burst Guard: Active</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 3: MediSync (ClinicOS) Live OPD Queue & POS */}
                {project.id === "medisync-pos" && (
                  <div className="interactive-mock-window">
                    <div className="mock-window-header">
                      <span>CLINICOS LIVE OPD QUEUE & POS REGISTER</span>
                      <span style={{ color: "var(--emerald)" }}>● WebSocket Sync</span>
                    </div>
                    <div className="mock-window-body">
                      <div className="opd-queue-mock">
                        <div className="token-live-card">
                          <div>
                            <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>CURRENT OPD CALL</div>
                            <div className="token-big">TOKEN #42</div>
                            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Dr. Sarah Rao · Consulting Room 3</div>
                          </div>
                          <div style={{ textAlign: "right" }}>
                            <span style={{ padding: "3px 8px", borderRadius: 4, background: "rgba(16, 185, 129, 0.2)", color: "var(--emerald)", fontSize: 11, fontWeight: 700 }}>
                              IN CONSULT
                            </span>
                            <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>Wait time: ~4 min</div>
                          </div>
                        </div>

                        <div className="medisync-specs-grid">
                          <div style={{ padding: "8px 12px", border: "1px solid var(--border-subtle)", borderRadius: 4, background: "var(--bg-elevated)" }}>
                            <span style={{ color: "var(--accent)" }}>Dual-Token Auth:</span> Active (Access + Refresh Rotation)
                          </div>
                          <div style={{ padding: "8px 12px", border: "1px solid var(--border-subtle)", borderRadius: 4, background: "var(--bg-elevated)" }}>
                            <span style={{ color: "var(--emerald)" }}>ACID Billing:</span> PostgreSQL Transactions
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PROJECT 4: ColdMailForge 3-Stage Cadence Pipeline */}
                {project.id === "coldmailforge" && (
                  <div className="interactive-mock-window">
                    <div className="mock-window-header">
                      <span>3-STAGE SEQUENCE SYNTHESIS & BILLING</span>
                      <span style={{ color: "var(--accent)" }}>Razorpay Verified</span>
                    </div>
                    <div className="mock-window-body">
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div className="cadence-item">
                          <div>
                            <span style={{ color: "var(--accent)", fontWeight: 700 }}>Day 1:</span> Initial Value Hook (GPT-4o-mini personalized)
                          </div>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>-5 Credits</span>
                        </div>
                        <div className="cadence-item">
                          <div>
                            <span style={{ color: "var(--emerald)", fontWeight: 700 }}>Day 3:</span> Pain-Point Follow-up
                          </div>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>-3 Credits</span>
                        </div>
                        <div className="cadence-item">
                          <div>
                            <span style={{ color: "var(--amber)", fontWeight: 700 }}>Day 7:</span> Social Proof Case Study & Close
                          </div>
                          <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>-3 Credits</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Architecture Stages Footer */}
                <div style={{ marginTop: 12 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                    {project.flowSteps.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div
                          style={{
                            padding: "5px 10px",
                            border: "1px solid var(--border-subtle)",
                            borderRadius: "var(--radius-sm)",
                            background: "var(--bg-surface)",
                            fontSize: "12px",
                            fontFamily: "var(--font-mono)"
                          }}
                        >
                          <span style={{ color: "var(--accent)", fontWeight: 700 }}>{idx + 1}. </span>
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
