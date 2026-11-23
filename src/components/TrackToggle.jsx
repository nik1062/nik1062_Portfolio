import React from "react";
import { Server, Layers, Filter } from "lucide-react";

export default function TrackToggle({ activeTrack, onTrackChange }) {
  return (
    <div className="container" id="track-toggle">
      <div className="track-controller">
        <div className="track-label">
          <Filter size={16} className="text-muted" aria-hidden="true" />
          <span>Perspective Switch</span>
          <h2>
            {activeTrack === "devops"
              ? "DevOps & SRE View — Infrastructure, Webhooks & Resilience"
              : "Full-Stack View — Distributed Apps, CRDT Sync & Systems"}
          </h2>
        </div>

        <div className="track-switch" role="group" aria-label="Select role track">
          <button
            type="button"
            className={`track-btn ${activeTrack === "fullstack" ? "active" : ""}`}
            onClick={() => onTrackChange("fullstack")}
            aria-pressed={activeTrack === "fullstack"}
          >
            <Layers size={15} />
            Full-Stack View
          </button>
          <button
            type="button"
            className={`track-btn ${activeTrack === "devops" ? "active" : ""}`}
            onClick={() => onTrackChange("devops")}
            aria-pressed={activeTrack === "devops"}
          >
            <Server size={15} />
            DevOps / SRE View
          </button>
        </div>
      </div>
    </div>
  );
}
