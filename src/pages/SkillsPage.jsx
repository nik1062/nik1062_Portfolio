import React from "react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { ProofCard } from "../components/ui/ProofCard";
import { skills, skillGroups } from "../data/portfolio";

export function SkillsPage() {
  const grouped = skills.reduce((acc, skill) => {
    acc[skill.group] ||= [];
    acc[skill.group].push(skill);
    return acc;
  }, {});

  return (
    <PageShell>
      <PageHero eyebrow="Skills" title="Logo-based skills with project proof." copy="No percentage bars. Each skill is connected to a real project, workflow, or portfolio signal." />
      <section className="section">
        <div className="skills-grid">
          {skillGroups.map((skill) => (
            <article key={skill.title}>
              <span>{skill.index}</span>
              <h3>{skill.title}</h3>
              <p>{skill.copy}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="logo-skill-groups">
          {Object.entries(grouped).map(([group, items]) => (
            <article key={group} className="logo-skill-group">
              <h3>{group}</h3>
              <div className="logo-skill-grid">
                {items.map((skill) => (
                  <div key={skill.name} className="skill-logo-card">
                    <img src={skill.logo} alt={`${skill.name} logo`} />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section proof-grid">
        <ProofCard skill="React" proof="Used in SpendLens, FinVault, RESTROPro, and Smart Library UI work." />
        <ProofCard skill="Python / FastAPI" proof="Used in Smart Library backend and data/ML workflows." />
        <ProofCard skill="MongoDB / MySQL" proof="Used for library and POS-style backend data modelling." />
        <ProofCard skill="n8n / AI Automation" proof="Used in the Email Assistant workflow with Gemini and Gmail." />
        <ProofCard skill="Flutter" proof="Used in FocusFlow Study Tracker for cross-platform mobile development." />
        <ProofCard skill="Docker / AWS" proof="Supported by DevOps resume work: EC2, NGINX, GitHub Actions, Docker basics." />
      </section>
    </PageShell>
  );
}
