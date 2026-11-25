import React, { useState } from "react";
import { Send, Mail, Phone, Github, Linkedin, MessageSquare, CheckCircle2, AlertCircle, Sparkles, Terminal } from "lucide-react";
import ThreeCanvas from "../components/ThreeCanvas";
import Card3D from "../components/Card3D";
import { SEO } from "../components/common/SEO";
import { profile } from "../data/portfolio";
import { apiService } from "../services/api";

export function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "SDE-1", message: "" });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [statusMsg, setStatusMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("Establishing connection to API dispatch gateway...");

    try {
      await apiService.submitContact(formData);
      setStatus("success");
      setStatusMsg("Message successfully transmitted and queued for review. Expect a reply within 24 hours.");
      setFormData({ name: "", email: "", role: "SDE-1", message: "" });
    } catch (err) {
      console.warn("API submission error (or local backend offline):", err);
      // Helpful fallback messaging so user can still reach out via direct mail
      setStatus("error");
      setStatusMsg("Direct API gateway is offline. You can dispatch your message directly via email to " + profile.email);
    }
  }

  return (
    <div className="contact-page-view" style={{ position: "relative", minHeight: "85vh" }}>
      <SEO 
        title="Contact & System Inquiries — Nikunj Kumar" 
        description="Direct dispatch terminal for hiring, campus placement, contract engineering, and technical collaborations." 
        slug="/contact" 
      />

      {/* 3D Atmospheric Background */}
      <ThreeCanvas density="low" height="420px" interactive={true} />

      <div className="container" style={{ paddingTop: 40, paddingBottom: 80, position: "relative", zIndex: 2 }}>
        {/* Section Header */}
        <div className="section-header">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 12px", borderRadius: "var(--radius-sm)", background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)", marginBottom: 12 }}>
            <Terminal size={14} style={{ color: "var(--accent)" }} />
            <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>DISPATCH TERMINAL // SECURE TRANSMISSION</span>
          </div>
          <h1 className="section-title" style={{ fontSize: "2.5rem", marginBottom: 12 }}>
            Dispatch & Direct Reach
          </h1>
          <p className="section-desc" style={{ maxWidth: 720 }}>
            Open to SDE-1 Full-Stack, Backend, and DevOps/SRE roles, campus placements, and architecture collaborations. Send a transmission below or reach out directly.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 32, marginTop: 32 }}>
          {/* Contact Terminal Form */}
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
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
                  <span style={{ fontSize: 13, fontFamily: "var(--font-mono)", color: "var(--text-primary)", fontWeight: 600 }}>
                    DISPATCH_GATEWAY.sh
                  </span>
                </div>
                <span style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--emerald)" }}>
                  ONLINE
                </span>
              </div>

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 6 }}>
                    SENDER NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recruiter / Engineer Name"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 6 }}>
                    TRANSMISSION EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="recruiter@company.com"
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                      outline: "none"
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 6 }}>
                    INQUIRY DOMAIN
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                      outline: "none"
                    }}
                  >
                    <option value="SDE-1 Full-Stack">SDE-1 Full-Stack Engineer Role</option>
                    <option value="DevOps / SRE">DevOps & SRE Engineer Role</option>
                    <option value="Mobile App">Mobile App Engineer Role</option>
                    <option value="Contract / System Architecture">Contract Architecture / Consulting</option>
                    <option value="General Technical Inquiry">General Technical Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontFamily: "var(--font-mono)", color: "var(--text-muted)", marginBottom: 6 }}>
                    TRANSMISSION PAYLOAD
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly state your requirements, timeline, or interview details..."
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      color: "var(--text-primary)",
                      fontSize: 14,
                      outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="btn-primary"
                  style={{
                    height: 44,
                    width: "100%",
                    justifyContent: "center",
                    gap: 8,
                    fontSize: 14,
                    fontFamily: "var(--font-mono)",
                    cursor: status === "loading" ? "wait" : "pointer"
                  }}
                >
                  <Send size={15} />
                  <span>{status === "loading" ? "Transmitting..." : "Send Transmission"}</span>
                </button>
              </form>

              {statusMsg && (
                <div
                  style={{
                    marginTop: 16,
                    padding: "12px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: status === "success" ? "var(--emerald-glow)" : "rgba(242, 109, 125, 0.15)",
                    border: status === "success" ? "1px solid rgba(47, 211, 160, 0.3)" : "1px solid rgba(242, 109, 125, 0.3)",
                    fontSize: 12,
                    fontFamily: "var(--font-mono)",
                    color: status === "success" ? "var(--emerald)" : "var(--rose)",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 8
                  }}
                >
                  {status === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                  <span>{statusMsg}</span>
                </div>
              )}
            </div>
          </Card3D>

          {/* Direct Coordinates & Telemetry */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <Card3D>
              <div
                style={{
                  padding: "28px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  borderTop: "1px solid var(--border-specular)",
                  background: "var(--bg-card)",
                  boxShadow: "var(--shadow-card)"
                }}
              >
                <h3 style={{ fontSize: 13, fontFamily: "var(--font-mono)", textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--accent)", margin: "0 0 16px" }}>
                  DIRECT REACH COORDINATES
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <a
                    href={`mailto:${profile.email}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                      transition: "all 120ms ease"
                    }}
                  >
                    <Mail size={18} style={{ color: "var(--accent)" }} />
                    <div>
                      <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>EMAIL</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{profile.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                      transition: "all 120ms ease"
                    }}
                  >
                    <Phone size={18} style={{ color: "var(--emerald)" }} />
                    <div>
                      <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>PHONE / WHATSAPP</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{profile.phone}</div>
                    </div>
                  </a>

                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                      transition: "all 120ms ease"
                    }}
                  >
                    <Github size={18} style={{ color: "var(--violet)" }} />
                    <div>
                      <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>GITHUB PROFILE</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>github.com/nik1062</div>
                    </div>
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid var(--border-subtle)",
                      background: "var(--bg-surface)",
                      textDecoration: "none",
                      color: "var(--text-primary)",
                      transition: "all 120ms ease"
                    }}
                  >
                    <Linkedin size={18} style={{ color: "var(--accent)" }} />
                    <div>
                      <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>LINKEDIN NETWORK</div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>linkedin.com/in/nikunj-kumar-6724b7272</div>
                    </div>
                  </a>
                </div>
              </div>
            </Card3D>

            <Card3D>
              <div
                style={{
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--border-subtle)",
                  background: "var(--bg-card)"
                }}
              >
                <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 8 }}>
                  AVAILABILITY STATUS
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--emerald)" }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>
                    Ready for Campus Placements & SDE-1
                  </span>
                </div>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5, margin: 0 }}>
                  Graduating in 2027 from Anna University, Chennai. Open to full-time engineering roles, summer 2025/2026 internships, and high-impact distributed systems projects.
                </p>
              </div>
            </Card3D>
          </div>
        </div>
      </div>
    </div>
  );
}
