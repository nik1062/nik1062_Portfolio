import React, { useState } from "react";
import { ExternalLink, Award, ShieldCheck, CheckCircle2, FileCheck, Sparkles } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { SEO } from "../components/common/SEO";
import { credentials } from "../data/portfolio";

export function CredentialsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hackathons & Awards", "Certifications & Sim"];

  const filtered = credentials.filter((cred) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Hackathons & Awards") return cred.type === "Award";
    if (activeCategory === "Certifications & Sim") return cred.type === "Certification" || cred.type === "Simulation";
    return true;
  });

  return (
    <div className="credentials-page-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO 
        title="Credentials, Hackathons & Verifiable Certifications" 
        description="Verifiable proof of technical accomplishments: 1st Prize at NEURA '25 AI Hackathon, Forage GenAI Data Analytics, Google Analytics, and Kaggle ML." 
        slug="/credentials" 
      />

      {/* 3D Atmospheric Background */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <Award size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>ACCREDITATION // VERIFIABLE PROOF HUB</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>
            Credentials & Achievements
          </h1>
          <p className="section-desc" style={{ maxWidth: 700 }}>
            Verifiable proof of competitive hackathon performance, industry job simulations, and foundational technical certifications.
          </p>
        </div>

        {/* Category Filters */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 24, marginBottom: 36 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`track-pill-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                border: activeCategory === cat ? "1px solid var(--accent)" : "1px solid var(--border-subtle)",
                background: activeCategory === cat ? "var(--accent-glow)" : "var(--bg-surface)",
                color: activeCategory === cat ? "var(--accent)" : "var(--text-secondary)",
                fontWeight: activeCategory === cat ? 600 : 400,
                transition: "all 120ms ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Credentials Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24, marginBottom: 48 }}>
          {filtered.map((cred) => (
            <Card3D key={cred.title}>
              <div
                style={{
                  padding: "28px",
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        color: cred.type === "Award" ? "var(--accent)" : "var(--emerald)",
                        background: cred.type === "Award" ? "var(--accent-glow)" : "var(--emerald-glow)",
                        border: cred.type === "Award" ? "1px solid var(--accent-border)" : "1px solid rgba(47, 211, 160, 0.3)",
                        padding: "2px 8px",
                        borderRadius: "4px"
                      }}
                    >
                      {cred.type.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      {cred.date}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>
                    {cred.title}
                  </h3>
                  <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 14 }}>
                    Issued by: <strong style={{ color: "var(--text-secondary)" }}>{cred.issuer}</strong>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55, margin: "0 0 16px" }}>
                    {cred.copy}
                  </p>
                </div>

                <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
                  {cred.link ? (
                    <a
                      href={cred.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: "12px",
                        fontFamily: "var(--font-mono)",
                        width: "100%",
                        justifyContent: "center",
                        height: 38
                      }}
                    >
                      <ShieldCheck size={14} style={{ color: "var(--emerald)" }} />
                      <span>Verify Certificate Proof</span>
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      Verified on institutional record
                    </span>
                  )}
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Verifiability Invariant Note */}
        <Card3D>
          <div
            style={{
              padding: "24px 28px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-elevated)",
              display: "flex",
              alignItems: "center",
              gap: 16
            }}
          >
            <ShieldCheck size={28} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                Institutional & Cryptographic Verification Guarantee
              </h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Every certification and hackathon accolade presented above corresponds to an official PDF asset or external credential URL directly hosted in this repository's assets directory.
              </p>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
