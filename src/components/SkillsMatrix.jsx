import React from "react";
import { skillsByTrack } from "../data/portfolio";

export default function SkillsMatrix({ activeTrack }) {
  const currentSkills = skillsByTrack[activeTrack] || skillsByTrack.fullstack;

  return (
    <section className="container skills-section" id="skills" aria-label="Technical Skills & Competencies">
      <div className="section-header">
        <h2 className="section-title">
          {activeTrack === "devops" ? "DevOps & Systems Engineering Matrix" : "Full-Stack & Architecture Matrix"}
        </h2>
        <p className="section-desc">
          Core competencies proven through shipped systems, production deployment pipelines, and high-concurrency architectures.
        </p>
      </div>

      <div className="skills-matrix">
        {currentSkills.map((skill) => (
          <div key={skill.name} className="skill-row-card">
            <div className="skill-top">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-cat">{skill.category}</span>
            </div>
            <p className="skill-note">{skill.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
