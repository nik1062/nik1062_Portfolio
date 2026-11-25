import React, { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Code2, Server, Terminal, Shield, Cpu, Database, 
  Smartphone, Layers, CheckCircle2, Zap, Sparkles, ArrowRight 
} from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { SEO } from "../components/common/SEO";
import { profile } from "../data/portfolio";

export function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Backend & Distributed",
    "Cloud & DevOps",
    "Databases & Storage",
    "Languages & Core",
    "Frontend & Mobile"
  ];

  const skillEntries = [
    // Backend & Distributed
    {
      name: "Node.js & Express",
      category: "Backend & Distributed",
      role: "Core Runtime & REST APIs",
      proof: "RecoverForge raw buffer pipelines, MediSync POS, ColdMailForge",
      signal: "Raw stream HMAC verification, cluster mode, modular routing",
      badge: "Production Ready"
    },
    {
      name: "Yjs & CRDTs",
      category: "Backend & Distributed",
      role: "Multiplayer Engine",
      proof: "CodeMeet AI Collaborative Pad",
      signal: "Zero merge conflicts, delta sync, persistent WebSocket rooms",
      badge: "Concurrency"
    },
    {
      name: "WebSockets & Socket.io",
      category: "Backend & Distributed",
      role: "Real-Time Event Transport",
      proof: "MediSync OPD live token queue & CodeMeet session events",
      signal: "Sub-second bidirectional broadcasts across clinic displays",
      badge: "Real-Time"
    },
    {
      name: "LiveKit & WebRTC",
      category: "Backend & Distributed",
      role: "Media Streaming Mesh",
      proof: "CodeMeet AI Interview Pad",
      signal: "Selective Forwarding Unit (SFU) audio/video mesh under 80ms latency",
      badge: "Low Latency"
    },
    {
      name: "Webhooks & HMAC Security",
      category: "Backend & Distributed",
      role: "Event Gateways",
      proof: "RecoverForge & ColdMailForge Razorpay Integrations",
      signal: "crypto.timingSafeEqual on raw buffers, X-Event-Id deduplication",
      badge: "Security"
    },
    {
      name: "Distributed Cron & Locks",
      category: "Backend & Distributed",
      role: "State Machine Automation",
      proof: "RecoverForge AI recovery cadence scheduler",
      signal: "Atomic MongoDB findOneAndUpdate locks preventing race conditions",
      badge: "Distributed"
    },

    // Cloud & DevOps
    {
      name: "Docker & Docker Compose",
      category: "Cloud & DevOps",
      role: "Containerization & Orchestration",
      proof: "Multi-service architectures for RecoverForge, ColdMailForge & CodeMeet",
      signal: "Multi-stage builds, isolated network bridges, volume persistence",
      badge: "Infrastructure"
    },
    {
      name: "AWS EC2 & Networking",
      category: "Cloud & DevOps",
      role: "Cloud Infrastructure",
      proof: "Virtual host deployment, security groups, SSH key rotation",
      signal: "Static IP routing, firewalls, and cloud instance hardening",
      badge: "Cloud"
    },
    {
      name: "NGINX & Reverse Proxy",
      category: "Cloud & DevOps",
      role: "Web Server & Gateway",
      proof: "SSL termination, proxy pass headers, rate-limiting configs",
      signal: "WebSocket proxying, gzip compression, HTTP/2 enforcement",
      badge: "Networking"
    },
    {
      name: "GitHub Actions CI/CD",
      category: "Cloud & DevOps",
      role: "Continuous Delivery",
      proof: "Automated lint, unit test suite, and edge deployment pipelines",
      signal: "Pre-commit hooks, branch protection, zero-downtime shipping",
      badge: "Automation"
    },
    {
      name: "Linux & Shell Scripting",
      category: "Cloud & DevOps",
      role: "System Administration",
      proof: "Debian/Ubuntu server administration, systemd service units, logrotate",
      signal: "Automated backup cron scripts, memory telemetry, process monitoring",
      badge: "OS Core"
    },
    {
      name: "PM2 Process Manager",
      category: "Cloud & DevOps",
      role: "Runtime Stability",
      proof: "Production Node.js process clustering & automatic daemon recovery",
      signal: "Zero-downtime reload, cluster scaling, log aggregator integration",
      badge: "SRE / Uptime"
    },

    // Databases & Storage
    {
      name: "PostgreSQL & Sequelize",
      category: "Databases & Storage",
      role: "Relational Persistence",
      proof: "MediSync (ClinicOS) Billing & Medical Records",
      signal: "ACID transactions, relational indexing, schema migrations",
      badge: "ACID Compliant"
    },
    {
      name: "MongoDB & Mongoose",
      category: "Databases & Storage",
      role: "Document Ledger",
      proof: "RecoverForge payment records & ColdMailForge credit ledger",
      signal: "Compound indices, atomic upsert locks, schema validation",
      badge: "Ledger"
    },
    {
      name: "Dual-Token JWT Auth",
      category: "Databases & Storage",
      role: "Session Architecture",
      proof: "EduHub & MediSync Auth Engines",
      signal: "Short-lived access tokens + HttpOnly rotating refresh cookies",
      badge: "Auth Security"
    },

    // Languages & Core
    {
      name: "TypeScript & JavaScript",
      category: "Languages & Core",
      role: "Full-Stack Development",
      proof: "Every web platform, API service, and interactive UI component",
      signal: "Strict null checks, generic types, asynchronous concurrency",
      badge: "Core Language"
    },
    {
      name: "Python",
      category: "Languages & Core",
      role: "AI, ML & Automation",
      proof: "Binance Futures Trading Bot & Kaggle ML data pipelines",
      signal: "Async HTTP clients, Pandas EDA, ML feature engineering",
      badge: "Data & ML"
    },
    {
      name: "Dart",
      category: "Languages & Core",
      role: "Mobile App Development",
      proof: "MediSync Patient App & FocusFlow Study Tracker",
      signal: "Strongly typed reactive programming with Riverpod state management",
      badge: "Mobile"
    },
    {
      name: "SQL & Data Modeling",
      category: "Languages & Core",
      role: "Relational Queries",
      proof: "Clinical schema design, billing aggregations, normalization",
      signal: "Query optimization, foreign keys, transactional integrity",
      badge: "Data Integrity"
    },

    // Frontend & Mobile
    {
      name: "React 18 / 19",
      category: "Frontend & Mobile",
      role: "Reactive UI Engineering",
      proof: "RecoverForge audit portal, ColdMailForge, CodeMeet Monaco pad",
      signal: "Hooks, custom stores, concurrent rendering, memoization",
      badge: "UI Architecture"
    },
    {
      name: "Flutter & Riverpod",
      category: "Frontend & Mobile",
      role: "Cross-Platform Mobile",
      proof: "MediSync ClinicOS Patient App (iOS & Android)",
      signal: "Offline-first sync, reactive Riverpod providers, native feel",
      badge: "Cross-Platform"
    },
    {
      name: "Monaco Editor Integration",
      category: "Frontend & Mobile",
      role: "Code Workspace UI",
      proof: "CodeMeet AI Multiplayer Coding Environment",
      signal: "Multi-cursor decoration, syntax highlighters, paste-burst telemetry",
      badge: "Developer Tool"
    },
    {
      name: "Three.js & WebGL",
      category: "Frontend & Mobile",
      role: "3D Visuals & Graphics",
      proof: "Nikunj Portfolio 3D particle constellations & wireframe polyhedra",
      signal: "60fps WebGL canvas, mouse raycasting, GPU-efficient rendering",
      badge: "3D Animation"
    }
  ];

  const filtered = skillEntries.filter(
    (s) => activeCategory === "All" || s.category === activeCategory
  );

  return (
    <div className="skills-page-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO 
        title="Technical Arsenal & System Competencies" 
        description="Engineering competencies with real-world project proofs: Distributed CRDTs, Docker, AWS, PostgreSQL, WebSockets, and Flutter." 
        slug="/skills" 
      />

      {/* 3D Atmospheric Background */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <Cpu size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>PROVEN ARSENAL // ZERO PERCENTAGE BARS</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>
            Technical Arsenal & Project Proofs
          </h1>
          <p className="section-desc" style={{ maxWidth: 700 }}>
            Every tool in this stack is backed by verified production implementations: atomic idempotency locks, CRDT real-time sync, containerized cloud infrastructure, and low-latency WebSockets.
          </p>
        </div>

        {/* Filter Pills */}
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

        {/* Skills Grid with 3D Tilt */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20, marginBottom: 60 }}>
          {filtered.map((skill) => (
            <Card3D key={skill.name}>
              <div
                style={{
                  padding: "24px",
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span
                      style={{
                        fontSize: 11,
                        fontFamily: "var(--font-mono)",
                        color: "var(--accent)",
                        background: "var(--accent-glow)",
                        border: "1px solid var(--accent-border)",
                        padding: "2px 8px",
                        borderRadius: "4px"
                      }}
                    >
                      {skill.badge}
                    </span>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                      {skill.category}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px" }}>
                    {skill.name}
                  </h3>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--emerald)", marginBottom: 12 }}>
                    {skill.role}
                  </div>

                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 12, marginBottom: 12 }}>
                    <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 4 }}>
                      Verified In Production:
                    </div>
                    <div style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.45 }}>
                      {skill.proof}
                    </div>
                  </div>
                </div>

                <div style={{ background: "var(--bg-surface)", padding: "10px 12px", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-subtle)", marginTop: 12 }}>
                  <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 2 }}>
                    SIGNAL METRIC:
                  </div>
                  <div style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>
                    ⚡ {skill.signal}
                  </div>
                </div>
              </div>
            </Card3D>
          ))}
        </div>

        {/* Engineering Philosophy Cards */}
        <div className="section-header" style={{ marginBottom: 24 }}>
          <h2 className="section-title" style={{ fontSize: "1.6rem" }}>Engineering Standards & Invariants</h2>
          <p className="section-desc">Every architecture follows these production invariants by design.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          <Card3D>
            <div style={{ padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent)", marginBottom: 10 }}>
                <Shield size={18} />
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Strict Idempotency</h4>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                All webhook ingest points use timing-safe crypto comparisons and event-id deduplication gates to ensure safe retries.
              </p>
            </div>
          </Card3D>

          <Card3D>
            <div style={{ padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--emerald)", marginBottom: 10 }}>
                <Zap size={18} />
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Zero Race Conditions</h4>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                Cron loops and background queues acquire atomic database locks (<code style={{ color: "var(--syn-keyword)" }}>findOneAndUpdate</code>) before executing state transitions.
              </p>
            </div>
          </Card3D>

          <Card3D>
            <div style={{ padding: 24, borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-card)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--violet)", marginBottom: 10 }}>
                <Server size={18} />
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Containerized Parity</h4>
              </div>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                Development, testing, and production run on matching Docker Compose environments to eliminate configuration drift.
              </p>
            </div>
          </Card3D>
        </div>
      </div>
    </div>
  );
}
