import React, { useState, useEffect } from "react";
import { Download, ChevronDown, Github, Linkedin, Mail, ArrowDown, Play, Terminal, Code2, GitCommit, CheckCircle2 } from "lucide-react";
import { profile } from "../data/portfolio";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("crdt"); // "crdt" or "terminal"

  // Dynamic GitHub commit fetcher
  const [commitInfo, setCommitInfo] = useState({
    hash: "e049e15",
    repo: "RecoverForge",
    message: "feat(recoverforge): atomic lock queue for webhook cadence"
  });

  useEffect(() => {
    fetch("https://api.github.com/users/nik1062/events/public", {
      headers: { Accept: "application/vnd.github.v3+json" }
    })
      .then((res) => res.json())
      .then((events) => {
        const push = events.find((e) => e.type === "PushEvent" && e.payload?.commits?.length > 0);
        if (push) {
          const c = push.payload.commits[push.payload.commits.length - 1];
          setCommitInfo({
            hash: c.sha.slice(0, 7),
            repo: push.repo.name.replace("nik1062/", ""),
            message: c.message.split("\n")[0].slice(0, 48)
          });
        }
      })
      .catch(() => {});
  }, []);

  // Clean code lines with isolated cursor placement
  const codeLines = [
    { no: 1, tokens: [{ t: "kw", v: "import" }, { t: "txt", v: " * " }, { t: "kw", v: "as" }, { t: "txt", v: " Y " }, { t: "kw", v: "from" }, { t: "str", v: " 'yjs'" }, { t: "txt", v: ";" }] },
    { no: 2, tokens: [{ t: "kw", v: "import" }, { t: "txt", v: " { " }, { t: "type", v: "WebsocketProvider" }, { t: "txt", v: " } " }, { t: "kw", v: "from" }, { t: "str", v: " 'y-websocket'" }, { t: "txt", v: ";" }] },
    { no: 3, tokens: [{ t: "com", v: "// CRDT Room Session & Zero-Conflict Operational Transform" }] },
    { no: 4, tokens: [{ t: "kw", v: "const" }, { t: "txt", v: " ydoc = " }, { t: "kw", v: "new" }, { t: "txt", v: " Y." }, { t: "type", v: "Doc" }, { t: "txt", v: "();" }] },
    { no: 5, tokens: [{ t: "kw", v: "const" }, { t: "txt", v: " provider = " }, { t: "kw", v: "new" }, { t: "type", v: "WebsocketProvider" }, { t: "txt", v: "(" }, { t: "str", v: "'wss://api.codemeet.ai'" }, { t: "txt", v: ", " }, { t: "str", v: "'room-812'" }, { t: "txt", v: ", ydoc);" }], cursor: "interviewer" },
    { no: 6, tokens: [{ t: "kw", v: "const" }, { t: "txt", v: " yText = ydoc." }, { t: "fn", v: "getText" }, { t: "txt", v: "(" }, { t: "str", v: "'monaco-buffer'" }, { t: "txt", v: ");" }] },
    { no: 7, tokens: [{ t: "txt", v: "" }] },
    { no: 8, tokens: [{ t: "com", v: "// Broadcast cursor & state across peer mesh (<50ms)" }] },
    { no: 9, tokens: [{ t: "txt", v: "provider." }, { t: "fn", v: "on" }, { t: "txt", v: "(" }, { t: "str", v: "'sync'" }, { t: "txt", v: ", (" }, { t: "type", v: "isSynced" }, { t: "txt", v: ") => {" }] },
    { no: 10, tokens: [{ t: "txt", v: "  broadcastPresence(" }, { t: "str", v: "'nikunj (SRE)'" }, { t: "txt", v: ", { line: 12, col: 34 });" }], cursor: "nikunj" },
    { no: 11, tokens: [{ t: "txt", v: "});" }] }
  ];

  // Webhook event log
  const [logs, setLogs] = useState([
    { time: "09:25:01", tag: "ingest", text: "POST /webhooks/razorpay (event: payment.failed, id: evt_01J98K)" },
    { time: "09:25:01", tag: "verify", text: "HMAC-SHA256 signature verification via crypto.timingSafeEqual: PASS" },
    { time: "09:25:02", tag: "triage", text: "GPT-4o-mini classified failure: INSUFFICIENT_FUNDS (Confidence: 0.98)" },
    { time: "09:25:02", tag: "action", text: "Generated 48h Razorpay Payment Link (Amount: 249900 paise)" },
    { time: "09:25:03", tag: "status", text: "Atomic MongoDB lock acquired. Cadence #1 (+24h) scheduled" }
  ]);

  const triggerWebhookSimulation = () => {
    const ts = new Date().toTimeString().split(" ")[0];
    setLogs([
      { time: ts, tag: "ingest", text: `POST /webhooks/razorpay (id: evt_${Math.random().toString(36).substring(7)})` },
      { time: ts, tag: "verify", text: "Timing-safe HMAC-SHA256 verification on raw stream buffer: PASS" },
      { time: ts, tag: "triage", text: "AI Root Cause Diagnosed: BANK_DECLINE (Heuristic guard: SAFE)" },
      { time: ts, tag: "action", text: "Dynamic 48h Razorpay Link created & empathetic recovery email queued" },
      { time: ts, tag: "status", text: "State machine transitioned to [RECOVERING]. Halt on payment_link.paid" }
    ]);
  };

  return (
    <section className="hero-section" id="hero" aria-label="Introduction & Interactive Showcase">
      <div className="container hero-grid">
        {/* Left Column: Clear Engineering Positioning */}
        <div className="hero-content">
          {/* Integrated Ticker Pill */}
          <div className="status-hero-pill">
            <span className="pulse-dot" aria-hidden="true" />
            <span>
              Anna University '27 · <strong>{profile.founder}</strong>
            </span>
          </div>

          <h1 className="hero-title">{profile.name}</h1>
          <p className="hero-subheading">{profile.title}</p>

          <p className="hero-desc">
            Final-year B.Tech IT student at Anna University, Chennai. Engineering resilient distributed platforms,
            real-time CRDT collaboration engines, and event-driven DevOps recovery agents.
          </p>

          {/* Real-time GitHub Commit Ticker */}
          <div className="hero-latest-build">
            <GitCommit size={14} style={{ color: "var(--accent)", flexShrink: 0 }} aria-hidden="true" />
            <span style={{ flexShrink: 0 }}>Latest build:</span>
            <span className="commit-hash">{commitInfo.hash}</span>
            <span className="hero-commit-msg" style={{ color: "var(--text-secondary)" }}>
              <strong>{commitInfo.repo}</strong>: "{commitInfo.message}"
            </span>
          </div>

          {/* Unified Action Button Bar */}
          <div className="hero-actions">
            <a href="#case-studies" className="btn-primary">
              Explore Flagship Systems
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
                    <span>React, Node.js, WebSockets, DBs</span>
                  </a>
                  <a
                    href={profile.resumes.devops}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-item"
                    role="menuitem"
                    onClick={() => setResumeOpen(false)}
                  >
                    <strong>DevOps & SRE Resume (PDF)</strong>
                    <span>Docker, AWS EC2, CI/CD, NGINX</span>
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
                    <span>Flutter, Dart, Riverpod</span>
                  </a>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="hero-social-links">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="GitHub Profile">
                <Github size={17} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="icon-btn" aria-label="LinkedIn Profile">
                <Linkedin size={17} />
              </a>
              <a href={`mailto:${profile.email}`} className="icon-btn" aria-label="Send direct email">
                <Mail size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Live Interactive MacOS IDE / Terminal */}
        <div className="hero-workbench" aria-label="Live Interactive Architecture Workbench">
          <div className="workbench-chrome">
            <div className="window-controls" aria-hidden="true">
              <span className="win-dot close" />
              <span className="win-dot min" />
              <span className="win-dot max" />
            </div>

            <div className="workbench-tabs" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "crdt"}
                className={`workbench-tab ${activeTab === "crdt" ? "active" : ""}`}
                onClick={() => setActiveTab("crdt")}
              >
                <Code2 size={13} style={{ color: "#38bdf8" }} />
                <span>codemeet-crdt.ts</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "terminal"}
                className={`workbench-tab ${activeTab === "terminal" ? "active" : ""}`}
                onClick={() => setActiveTab("terminal")}
              >
                <Terminal size={13} style={{ color: "#10b981" }} />
                <span>recoverforge-triage.sh</span>
              </button>
            </div>

            {activeTab === "terminal" ? (
              <button
                type="button"
                className="workbench-action-btn"
                onClick={triggerWebhookSimulation}
                aria-label="Simulate failed payment webhook"
              >
                <Play size={11} />
                Trigger Webhook
              </button>
            ) : (
              <span className="workbench-lang-meta" style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
                TypeScript 5.4
              </span>
            )}
          </div>

          <div className="workbench-body">
            {activeTab === "crdt" ? (
              <div className="code-editor-canvas" role="region" aria-label="Live code simulation">
                {codeLines.map((line) => (
                  <div key={line.no} className="code-line">
                    <span className="line-no">{line.no}</span>
                    <span className="code-content">
                      {line.tokens.map((token, tidx) => (
                        <span key={tidx} className={`code-${token.t}`}>
                          {token.v}
                        </span>
                      ))}
                      {/* Active Cursor: Nikunj (SRE) */}
                      {line.cursor === "nikunj" && (
                        <span className="active-cursor" style={{ marginLeft: "4px" }}>
                          <span className="cursor-pill nikunj">nikunj (SRE)</span>
                        </span>
                      )}
                      {/* Active Cursor: Interviewer */}
                      {line.cursor === "interviewer" && (
                        <span className="active-cursor" style={{ background: "#10b981", marginLeft: "4px" }}>
                          <span className="cursor-pill peer">interviewer</span>
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="terminal-event-log" role="log" aria-live="polite">
                {logs.map((log, idx) => (
                  <div key={idx} className="log-entry">
                    <span className="log-timestamp">[{log.time}]</span>
                    <span className={`log-badge ${log.tag}`}>{log.tag}</span>
                    <span className="code-content" style={{ fontSize: "12px" }}>
                      {log.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="workbench-footer">
            <span>
              {activeTab === "crdt"
                ? "● Real-Time CRDT Sync: <50ms · Yjs v13.6 · LiveKit WebRTC"
                : "● Event Listener: /webhooks/razorpay (Raw Stream + HMAC)"}
            </span>
            <span>UTF-8 · 2 Spaces</span>
          </div>
        </div>
      </div>
    </section>
  );
}
