import React, { useState, useEffect } from "react";
import { Download, ChevronDown, Github, Linkedin, Mail, ArrowDown, Play, Terminal, Code2 } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("crdt"); // "crdt" or "terminal"

  // CRDT Editor multi-cursor typing simulation state
  const targetCode = `// CodeMeet AI: CRDT Multi-Cursor Synchronization
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const doc = new Y.Doc();
const wsProvider = new WebsocketProvider('wss://api.codemeet.ai', 'session-812', doc);
const yText = doc.getText('monaco-buffer');

// Zero-conflict operational transformation (<50ms latency)
yText.observe(event => {
  broadcastCursor('nikunj', { line: 14, ch: 28 });
});`;

  const [typedText, setTypedText] = useState(targetCode);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= targetCode.length) {
        setTypedText(targetCode.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 28);
    return () => clearInterval(interval);
  }, []);

  // Webhook event triage log simulation state
  const [logs, setLogs] = useState([
    { time: "09:25:01", tag: "ingest", text: "payment.failed received from Razorpay Gateway (evt_01J98K)" },
    { time: "09:25:01", tag: "verify", text: "HMAC-SHA256 crypto.timingSafeEqual raw buffer: VALID" },
    { time: "09:25:02", tag: "triage", text: "AI GPT-4o-mini classification: INSUFFICIENT_FUNDS (confidence: 0.96)" },
    { time: "09:25:02", tag: "action", text: "Generated Razorpay Payment Link (48h TTL, amount: 249900 paise)" },
    { time: "09:25:03", tag: "status", text: "Cadence #1 scheduled (+24h) with atomic MongoDB lock" }
  ]);

  const triggerWebhookSimulation = () => {
    const timestamp = new Date().toTimeString().split(" ")[0];
    const newLogs = [
      { time: timestamp, tag: "ingest", text: `payment.failed received (evt_${Math.random().toString(36).substring(7)})` },
      { time: timestamp, tag: "verify", text: "HMAC-SHA256 signature verified via timingSafeEqual" },
      { time: timestamp, tag: "triage", text: "AI Classifier diagnosed: BANK_DECLINE (fallback guard: PASS)" },
      { time: timestamp, tag: "action", text: "Instant 48h Razorpay Link created. Outreach email queued." },
      { time: timestamp, tag: "status", text: "State machine transitioned to [RECOVERING]. Halt on payment_link.paid" }
    ];
    setLogs(newLogs);
  };

  return (
    <section className="hero-section" id="hero" aria-label="Introduction & Interactive Showcase">
      <div className="container hero-grid">
        {/* Left Column: Authoritative Engineering Positioning */}
        <div className="hero-content">
          <div className="context-tag">
            <span className="pulse-dot" style={{ width: 6, height: 6 }} aria-hidden="true" />
            <span>
              Anna University '27 · <strong>{profile.founder}</strong>
            </span>
          </div>

          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subheading">{profile.title}</p>

          <p className="hero-desc">{profile.headline}</p>

          <div className="hero-actions">
            <a href="#case-studies" className="btn-primary">
              View Flagship Systems
              <ArrowDown size={15} />
            </a>

            {/* Resume Dropdown */}
            <div className="resume-dropdown-wrap">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setResumeOpen(!resumeOpen)}
                aria-expanded={resumeOpen}
                aria-label="Download resume options"
              >
                <Download size={15} />
                Download Resume
                <ChevronDown size={14} />
              </button>

              {resumeOpen && (
                <div className="resume-menu" role="menu" onMouseLeave={() => setResumeOpen(false)}>
                  <a
                    href={profile.resumes.fullstack}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-item"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    <strong>Full-Stack Resume (PDF)</strong>
                    <span>React, Node.js, CRDTs, PostgreSQL</span>
                  </a>
                  <a
                    href={profile.resumes.devops}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-item"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    <strong>DevOps / SRE Resume (PDF)</strong>
                    <span>Docker, AWS EC2, CI/CD, Linux, NGINX</span>
                  </a>
                  <a
                    href={profile.resumes.mobile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-item"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    <strong>Mobile Resume (PDF)</strong>
                    <span>Flutter, Dart, Riverpod, Firebase</span>
                  </a>
                </div>
              )}
            </div>

            {/* Direct Social Links */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="Nikunj Kumar GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label="Nikunj Kumar LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send email to Nikunj Kumar">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* Right Column: Live Orchestrated Technical Moment */}
        <div className="hero-workbench" aria-label="Interactive Architecture Simulation">
          <div className="workbench-header">
            <div className="window-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>

            <div className="workbench-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "crdt"}
                className={`workbench-tab ${activeTab === "crdt" ? "active" : ""}`}
                onClick={() => setActiveTab("crdt")}
              >
                <Code2 size={13} />
                codemeet-crdt.ts
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "terminal"}
                className={`workbench-tab ${activeTab === "terminal" ? "active" : ""}`}
                onClick={() => setActiveTab("terminal")}
              >
                <Terminal size={13} />
                recoverforge-triage.sh
              </button>
            </div>

            {activeTab === "terminal" && (
              <button
                type="button"
                className="workbench-action"
                onClick={triggerWebhookSimulation}
                aria-label="Simulate failed payment webhook"
              >
                <Play size={11} />
                Simulate Webhook
              </button>
            )}
          </div>

          <div className="workbench-body">
            {activeTab === "crdt" ? (
              <div className="code-editor-view">
                {typedText.split("\n").map((line, idx) => (
                  <div key={idx} className="code-line">
                    <span className="line-number">{idx + 1}</span>
                    <span className="code-text">
                      {line}
                      {/* Live Cursor 1: Nikunj (SRE) */}
                      {idx === 8 && (
                        <span className="named-cursor">
                          <span className="cursor-tag cursor-nikunj">nikunj (SRE)</span>
                        </span>
                      )}
                      {/* Live Cursor 2: Interviewer */}
                      {idx === 4 && (
                        <span className="named-cursor" style={{ background: "#10b981", animationDelay: "0.5s" }}>
                          <span className="cursor-tag cursor-peer">interviewer</span>
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="terminal-stream" role="log" aria-live="polite">
                {logs.map((item, idx) => (
                  <div key={idx} className="term-entry">
                    <span className="term-time">[{item.time}]</span>
                    <span className={`term-badge ${item.tag}`}>{item.tag}</span>
                    <span className="code-text">{item.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="workbench-footer">
            <span>
              {activeTab === "crdt"
                ? "● Live Socket: wss://api.codemeet.ai (Latency: 24ms)"
                : "● Event Listener: /webhooks/razorpay (HMAC SHA-256)"}
            </span>
            <span>UTF-8</span>
          </div>
        </div>
      </div>
    </section>
  );
}
