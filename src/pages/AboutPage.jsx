import React from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { Timeline } from "../components/ui/Timeline";
import { QualityBadge } from "../components/ui/QualityBadge";
import { SEO } from "../components/common/SEO";
import { profile } from "../data/portfolio";

export function AboutPage() {
  return (
    <PageShell>
      <SEO title="About" description="Learn more about Nikunj Kumar's background, journey, and technical philosophy." slug="/about" />
      <PageHero eyebrow="About" title="A builder who connects frontend polish with AI-backed systems." copy="My strongest profile is full-stack development, supported by AI/data automation, DevOps basics, and mobile app development." />
      <section className="section split">
        <div className="about-card">
          <h3>Profile</h3>
          <p>
            I design practical applications: SaaS-style systems, dashboards, workflow automation, educational tools, and mobile productivity apps.
            I care about shipping usable products, not only code snippets.
          </p>
          <div className="info-grid">
            <span>{profile.location}</span>
            <span>B.Tech IT, 2023-2027</span>
            <span>CGPA 8.5 / 10</span>
            <span>English, Hindi</span>
          </div>
          
          <QualityBadge />
        </div>
        <Timeline />
      </section>
    </PageShell>
  );
}
