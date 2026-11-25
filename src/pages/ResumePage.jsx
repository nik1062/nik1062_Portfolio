import React from "react";
import { FileText, Download, Printer, ExternalLink, CheckCircle2, Sparkles, Terminal } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { SEO } from "../components/common/SEO";
import { profile } from "../data/portfolio";

export function ResumePage() {
  const resumeHub = [
    {
      role: "Full-Stack Software Engineer",
      slug: "fullstack",
      target: "SDE-1 / Full-Stack Engineer / Frontend & Backend",
      summary: "Specialized in React, Node.js, WebSockets, CRDT multiplayer architectures, and ACID-compliant relational databases.",
      highlights: [
        "RecoverForge & CodeMeet AI architectural case studies",
        "Multiplayer CRDT synchronization with Yjs & Monaco Editor",
        "Dual-token JWT authentication with HttpOnly cookies & rate limiting",
        "React 18 / 19 concurrent mode, custom state hooks, and Next.js / Vite"
      ],
      href: profile.resumes.fullstack
    },
    {
      role: "DevOps & SRE Engineer",
      slug: "devops",
      target: "DevOps Engineer / Site Reliability Engineer / Cloud Infra",
      summary: "Specialized in containerization, Linux systems, AWS EC2, GitHub Actions CI/CD, NGINX reverse proxies, and automated recovery pipelines.",
      highlights: [
        "RecoverForge autonomous webhook recovery agent with atomic locks",
        "Docker Compose multi-container networks with volume persistence",
        "AWS EC2 virtual server provisioning, SSH key hardening, and firewall rules",
        "NGINX SSL termination, proxy pass headers, and rate limiting"
      ],
      href: profile.resumes.devops
    },
    {
      role: "Mobile App Developer",
      slug: "mobile",
      target: "Cross-Platform Mobile Engineer / Flutter & Dart",
      summary: "Specialized in cross-platform mobile application development with Flutter, Dart, Riverpod reactive state management, and offline-first data sync.",
      highlights: [
        "MediSync ClinicOS Patient Mobile Application with real-time OPD queue",
        "FocusFlow Study Tracker with Pomodoro timer & daily streak logic",
        "Socket.io real-time token synchronization across mobile and web displays",
        "Clean architecture: Domain, Data, Presentation layering with Riverpod"
      ],
      href: profile.resumes.mobile
    },
    {
      role: "Data Analytics & AI Automation",
      slug: "data",
      target: "Data Analyst / AI Automation Engineer / Python Systems",
      summary: "Specialized in exploratory data analysis (EDA), predictive risk modeling, n8n automated pipelines, and OpenAI API integrations.",
      highlights: [
        "Forage GenAI Data Analytics simulation: delinquency risk modeling & EDA",
        "Kaggle Intro to Machine Learning certification & regression workflows",
        "Google Analytics GA4 certified property setup & funnel attribution",
        "n8n AI agent workflows integrating Gemini LLM and Gmail webhooks"
      ],
      href: profile.resumes.data
    }
  ];

  return (
    <div className="resume-page-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO 
        title="Role-Tailored Resumes — Full-Stack, DevOps/SRE, Mobile, Data" 
        description="Download tailored technical resumes for Full-Stack, DevOps/SRE, Mobile App, and Data Analytics engineering roles." 
        slug="/resume" 
      />

      {/* 3D Atmospheric Background */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <FileText size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>RECRUITMENT HUB // ROLE-SPECIFIC RESUMES</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>
            Targeted Technical Resumes
          </h1>
          <p className="section-desc" style={{ maxWidth: 720 }}>
            Recruiters and hiring managers: download the curriculum vitae calibrated specifically to the technical domain of the role you are hiring for.
          </p>
        </div>

        {/* Global Print / PDF View Bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 24, marginBottom: 36, padding: "16px 20px", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)", background: "var(--bg-surface)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Terminal size={16} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              All resumes are optimized for ATS parsers and reflect verified production metrics.
            </span>
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="btn-secondary"
            style={{ fontSize: 12, fontFamily: "var(--font-mono)", gap: 6, height: 36 }}
          >
            <Printer size={13} />
            <span>Print Current Page</span>
          </button>
        </div>

        {/* 4 Resume Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 60 }}>
          {resumeHub.map((resume) => (
            <Card3D key={resume.slug}>
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
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                    <span className="case-tag-badge">
                      {resume.slug.toUpperCase()} TRACK
                    </span>
                    <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>
                      ● ATS Calibrated
                    </span>
                  </div>

                  <h3 style={{ fontSize: "19px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 6px" }}>
                    {resume.role}
                  </h3>
                  <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--accent)", marginBottom: 14 }}>
                    {resume.target}
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5, margin: "0 0 16px" }}>
                    {resume.summary}
                  </p>

                  <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: 14, marginBottom: 20 }}>
                    <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                      Key Resume Proof Points:
                    </div>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {resume.highlights.map((h, i) => (
                        <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                          <CheckCircle2 size={13} style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 10, borderTop: "1px solid var(--border-subtle)", paddingTop: 16 }}>
                  <a
                    href={resume.href}
                    download
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: "center", height: 38, fontSize: 12, gap: 6 }}
                  >
                    <Download size={13} />
                    <span>Download PDF</span>
                  </a>
                  <a
                    href={resume.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: "center", height: 38, fontSize: 12, gap: 6 }}
                  >
                    <ExternalLink size={13} />
                    <span>View in Tab</span>
                  </a>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    </div>
  );
}
