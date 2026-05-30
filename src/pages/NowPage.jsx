import React, { useState, useEffect } from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { NowCard } from "../components/ui/NowCard";
import { SEO } from "../components/common/SEO";
import { githubService } from "../services/github";
import { Activity, Clock, Cpu, GitPullRequest } from "lucide-react";

export function NowPage() {
  const [githubStats, setGithubStats] = useState(null);

  useEffect(() => {
    githubService.getUserStats().then(setGithubStats).catch(() => {});
  }, []);

  return (
    <PageShell>
      <SEO title="Now" description="What Nikunj Kumar is currently learning, building, and focused on." slug="/now" />
      <PageHero eyebrow="Now" title="Currently building toward internship-ready depth." copy="A modern portfolio page that tells visitors what I am focused on right now." />
      
      {/* Live GitHub Stats Section */}
      <section className="section" style={{ marginBottom: 40 }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, fontSize: 18, color: "var(--gold)" }}>
          <Activity size={20} />
          Live Pulse (Auto-Updated)
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div className="about-card" style={{ textAlign: "center", padding: "24px" }}>
            <Cpu size={24} style={{ color: "var(--gold)", marginBottom: 12, margin: "0 auto" }} />
            <div style={{ fontSize: 24, fontWeight: 800 }}>{githubStats?.public_repos || "10+"}</div>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Public Repositories</span>
          </div>
          <div className="about-card" style={{ textAlign: "center", padding: "24px" }}>
            <GitPullRequest size={24} style={{ color: "var(--gold)", marginBottom: 12, margin: "0 auto" }} />
            <div style={{ fontSize: 24, fontWeight: 800 }}>{githubStats?.followers || "0"}</div>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>GitHub Followers</span>
          </div>
          <div className="about-card" style={{ textAlign: "center", padding: "24px" }}>
            <Clock size={24} style={{ color: "var(--gold)", marginBottom: 12, margin: "0 auto" }} />
            <div style={{ fontSize: 18, fontWeight: 800 }}>Active</div>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>Always Building</span>
          </div>
        </div>
      </section>

      <section className="section now-grid">
        <NowCard title="Currently Learning" items={["Advanced React patterns", "MERN deployment", "Docker + GitHub Actions", "AI workflow automation"]} />
        <NowCard title="Currently Building" items={["Multi-page portfolio", "AI portfolio assistant", "Project case studies", "Private project showcase"]} />
        <NowCard title="Target Roles" items={["Full-stack Developer Intern", "Frontend Developer Intern", "AI Automation Intern", "Junior DevOps Intern"]} />
        <NowCard title="Current Tech Focus" items={["React Router", "Express APIs", "MongoDB", "n8n agents", "Power BI storytelling"]} />
      </section>
    </PageShell>
  );
}
