import React from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { NowCard } from "../components/ui/NowCard";

export function NowPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Now" title="Currently building toward internship-ready depth." copy="A modern portfolio page that tells visitors what I am focused on right now." />
      <section className="section now-grid">
        <NowCard title="Currently Learning" items={["Advanced React patterns", "MERN deployment", "Docker + GitHub Actions", "AI workflow automation"]} />
        <NowCard title="Currently Building" items={["Multi-page portfolio", "AI portfolio assistant", "Project case studies", "Private project showcase"]} />
        <NowCard title="Target Roles" items={["Full-stack Developer Intern", "Frontend Developer Intern", "AI Automation Intern", "Junior DevOps Intern"]} />
        <NowCard title="Current Tech Focus" items={["React Router", "Express APIs", "MongoDB", "n8n agents", "Power BI storytelling"]} />
      </section>
    </PageShell>
  );
}
