import React from "react";
import { Link } from "react-router-dom";
import { 
  User, Award, GraduationCap, Building2, Code2, ShieldCheck, 
  ArrowRight, CheckCircle2, Sparkles, MapPin, Calendar, Compass 
} from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { SEO } from "../components/common/SEO";
import { profile, experienceTimeline } from "../data/portfolio";

export function AboutPage() {
  return (
    <div className="about-page-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO 
        title="About Nikunj Kumar — Engineering Journey & Philosophy" 
        description="Final-year B.Tech IT at Anna University Chennai, Founder of Zorbit Studio, and 1st Prize Winner at NEURA '25 AI Hackathon." 
        slug="/about" 
      />

      {/* 3D Atmospheric Background */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <User size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>ENGINEERING NARRATIVE // ACADEMIC & BUILDER PROFILE</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>
            About Nikunj Kumar
          </h1>
          <p className="section-desc" style={{ maxWidth: 720 }}>
            Final-year B.Tech Information Technology student at Anna University, Chennai (CGPA 8.5/10). Founder of Zorbit Studio, builder of fault-tolerant distributed systems, and passionate about shipping software that stays up under load.
          </p>
        </div>

        {/* Profile Card & Key Coordinates */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginTop: 32, marginBottom: 48 }}>
          <Card3D>
            <div
              style={{
                padding: "32px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                borderTop: "1px solid var(--border-specular)",
                background: "var(--bg-card)",
                boxShadow: "var(--shadow-card)",
                height: "100%"
              }}
            >
              <h3 style={{ fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", margin: "0 0 16px" }}>
                CORE PROFILE & MISSION
              </h3>
              <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.7, margin: "0 0 20px" }}>
                I engineer software from first principles: focusing on <strong>data integrity, zero-downtime concurrency, and observable reliability</strong>. Whether designing multiplayer CRDT pads, autonomous payment recovery agents, or clinic POS platforms, I care about production survivability over cosmetic demos.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, borderTop: "1px solid var(--border-subtle)", paddingTop: 20 }}>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>DEGREE</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>B.Tech IT (2023–2027)</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>INSTITUTION</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginTop: 2 }}>Anna University, Chennai</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>ACADEMIC STANDING</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--emerald)", marginTop: 2 }}>CGPA 8.5 / 10</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>VENTURE</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--accent)", marginTop: 2 }}>Founder, Zorbit Studio</div>
                </div>
              </div>
            </div>
          </Card3D>

          <Card3D>
            <div
              style={{
                padding: "32px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-subtle)",
                borderTop: "1px solid var(--border-specular)",
                background: "var(--bg-card)",
                boxShadow: "var(--shadow-card)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div>
                <h3 style={{ fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--emerald)", margin: "0 0 16px" }}>
                  ENGINEERING PHILOSOPHY
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle2 size={16} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <strong>Idempotency First:</strong> Every external webhook, cron loop, and payment event must be safely retryable without side effects.
                    </span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle2 size={16} style={{ color: "var(--emerald)", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <strong>Conflict-Free State:</strong> Favor CRDTs (Yjs) and event-driven architectures over brittle row-level locking.
                    </span>
                  </li>
                  <li style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <CheckCircle2 size={16} style={{ color: "var(--violet)", marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <strong>Observable Systems:</strong> Structured logging, metrics attribution, and timing-safe security guarantees from day zero.
                    </span>
                  </li>
                </ul>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <Link to="/resume" className="btn-primary" style={{ flex: 1, justifyContent: "center", height: 42, fontSize: 13 }}>
                  <span>View Role Resumes</span>
                  <ArrowRight size={14} />
                </Link>
                <Link to="/contact" className="btn-secondary" style={{ flex: 1, justifyContent: "center", height: 42, fontSize: 13 }}>
                  <span>Get in Touch</span>
                </Link>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Milestone Timeline */}
        <div className="section-header" style={{ marginBottom: 24 }}>
          <h2 className="section-title" style={{ fontSize: "1.6rem" }}>Academic & Professional Journey</h2>
          <p className="section-desc">Key milestones and hands-on system building highlights.</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {experienceTimeline.map((item, idx) => (
            <Card3D key={idx}>
              <div
                style={{
                  padding: "24px 28px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  borderTop: "1px solid var(--border-specular)",
                  background: "var(--bg-card)",
                  boxShadow: "var(--shadow-card)",
                  display: "grid",
                  gridTemplateColumns: "minmax(140px, 180px) 1fr",
                  gap: 20,
                  alignItems: "center"
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "var(--font-mono)",
                      color: "var(--accent)",
                      background: "var(--accent-glow)",
                      border: "1px solid var(--accent-border)",
                      padding: "4px 10px",
                      borderRadius: "4px",
                      display: "inline-block",
                      marginBottom: 6
                    }}
                  >
                    {item.period}
                  </span>
                  <div style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    MILESTONE 0{idx + 1}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: "17px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
                    {item.role}
                  </h4>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500, marginBottom: 8 }}>
                    {item.organization}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {item.details}
                  </p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
}
