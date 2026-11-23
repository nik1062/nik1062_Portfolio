import React from "react";
import { Server, Layers, Cpu, GitBranch } from "lucide-react";

export default function TrackToggle({ activeTrack, onTrackChange }) {
  return (
    <div className="container" id="track-switch" style={{ margin: "28px auto 44px", textAlign: "center" }}>
      <div
        style={{
          display: "inline-flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px"
        }}
      >
        {/* Sleek Segmented Switcher */}
        <div
          role="group"
          aria-label="Perspective track switcher"
          style={{
            display: "inline-flex",
            padding: "5px",
            border: "1px solid var(--border-specular)",
            borderRadius: "999px",
            background: "var(--bg-card)",
            boxShadow: "var(--shadow-card)"
          }}
        >
          <button
            type="button"
            className={`track-btn ${activeTrack === "fullstack" ? "active" : ""}`}
            style={{ borderRadius: "999px", padding: "8px 22px", fontSize: "14px" }}
            onClick={() => onTrackChange("fullstack")}
            aria-pressed={activeTrack === "fullstack"}
          >
            <Layers size={15} />
            <span>Full-Stack Architecture</span>
          </button>

          <button
            type="button"
            className={`track-btn ${activeTrack === "devops" ? "active" : ""}`}
            style={{ borderRadius: "999px", padding: "8px 22px", fontSize: "14px" }}
            onClick={() => onTrackChange("devops")}
            aria-pressed={activeTrack === "devops"}
          >
            <Server size={15} />
            <span>DevOps & SRE Pipeline</span>
          </button>
        </div>

        {/* Dynamic Context Hint */}
        <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>
          {activeTrack === "fullstack"
            ? "Highlighting CodeMeet AI, CRDT multiplayer sync, WebRTC mesh, and React/Node.js stacks"
            : "Highlighting RecoverForge, event-driven webhook streams, atomic locks, Docker, and AWS EC2"}
        </span>
      </div>
    </div>
  );
}
