import React from "react";
import { ExternalLink, Github, Award, GraduationCap, Briefcase } from "lucide-react";
import { secondaryProjects, credentials, experienceTimeline } from "../data/portfolio";

export default function SecondaryWork() {
  return (
    <section className="container" id="experience" style={{ padding: "40px 0 60px" }} aria-label="Supporting Projects and Experience">
      {/* Supporting Projects */}
      <div className="section-header">
        <h2 className="section-title">Supporting Work & Production Tools</h2>
        <p className="section-desc">
          Additional applications spanning cross-platform Flutter productivity, automated trading algorithms, and workflow orchestration.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "60px" }}>
        {secondaryProjects.map((p) => (
          <article
            key={p.slug}
            style={{
              padding: "20px",
              border: "1px solid var(--border-subtle)",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-panel)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 600, color: "var(--text-primary)" }}>{p.title}</h3>
              <p style={{ margin: "0 0 14px 0", fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>{p.summary}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
                {p.stack.map((t) => (
                  <span
                    key={t}
                    style={{
                      padding: "2px 8px",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "4px",
                      background: "var(--bg-surface)",
                      fontSize: "11px",
                      fontFamily: "var(--font-mono)",
                      color: "var(--text-muted)"
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px", borderTop: "1px solid var(--border-subtle)", paddingTop: "12px" }}>
              {p.repo && (
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    color: "var(--accent)",
                    fontWeight: 500
                  }}
                >
                  <Github size={13} />
                  Code
                </a>
              )}
              {p.live && (
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    color: "var(--accent)",
                    fontWeight: 500
                  }}
                >
                  <ExternalLink size={13} />
                  Live Preview
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {/* Experience & Credentials Two-Column Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
        {/* Experience Timeline */}
        <div>
          <div className="section-header" style={{ marginBottom: "18px" }}>
            <h2 className="section-title" style={{ fontSize: "20px" }}>Experience & Academic Foundation</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {experienceTimeline.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "18px",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-panel)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "4px" }}>
                  <strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>{item.role}</strong>
                  <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--accent)" }}>{item.period}</span>
                </div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "6px" }}>{item.organization}</div>
                <p style={{ margin: 0, fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.55 }}>{item.details}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Credentials & Awards */}
        <div id="credentials">
          <div className="section-header" style={{ marginBottom: "18px" }}>
            <h2 className="section-title" style={{ fontSize: "20px" }}>Honors & Verified Certifications</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {credentials.map((cred, i) => (
              <div
                key={i}
                style={{
                  padding: "18px",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "var(--radius-md)",
                  background: "var(--bg-panel)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: "3px",
                        background: "rgba(56, 189, 248, 0.1)",
                        color: "var(--accent)",
                        fontSize: "10px",
                        fontFamily: "var(--font-mono)",
                        fontWeight: 600
                      }}
                    >
                      {cred.type}
                    </span>
                    <strong style={{ fontSize: "14px", color: "var(--text-primary)" }}>{cred.title}</strong>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>
                    {cred.issuer} · {cred.date}
                  </div>
                  <p style={{ margin: 0, fontSize: "12px", color: "var(--text-muted)", lineHeight: 1.5 }}>{cred.copy}</p>
                </div>
                {cred.link && (
                  <a
                    href={cred.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-btn"
                    style={{ flexShrink: 0, width: 30, height: 30 }}
                    aria-label={`View certificate: ${cred.title}`}
                  >
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
