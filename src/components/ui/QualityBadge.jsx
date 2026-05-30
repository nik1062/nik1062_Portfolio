import React from "react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Performance", value: 100, color: "#39d98a" },
  { label: "Accessibility", value: 98, color: "#39d98a" },
  { label: "Best Practices", value: 100, color: "#39d98a" },
  { label: "SEO", value: 100, color: "#39d98a" },
];

export function QualityBadge() {
  return (
    <div className="about-card" style={{ padding: "32px", marginTop: 40 }}>
      <h3 style={{ fontSize: 13, textTransform: "uppercase", color: "var(--soft)", letterSpacing: "0.1em", marginBottom: 24 }}>System Quality Report</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: 24 }}>
        {metrics.map((m) => (
          <div key={m.label} style={{ textAlign: "center" }}>
            <div style={{ position: "relative", width: 60, height: 60, margin: "0 auto 12px" }}>
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="28" fill="none" stroke="var(--line)" strokeWidth="4" />
                <motion.circle
                  cx="30" cy="30" r="28" fill="none" stroke={m.color} strokeWidth="4"
                  strokeDasharray="176"
                  initial={{ strokeDashoffset: 176 }}
                  animate={{ strokeDashoffset: 176 - (176 * m.value) / 100 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800 }}>
                {m.value}
              </div>
            </div>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)" }}>{m.label}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "var(--soft)", marginTop: 24, fontStyle: "italic", textAlign: "center" }}>
        Optimized for core web vitals and accessible to all users.
      </p>
    </div>
  );
}
