import React from "react";
import { FileText, Download } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { resumeHub } from "../constants";

export function ResumePage() {
  return (
    <PageShell>
      <PageHero eyebrow="Resume Hub" title="Different resumes for different roles." copy="Recruiters can download the resume that matches the role instead of reading one generic file." />
      <section className="section resume-grid">
        {resumeHub.map((resume) => (
          <a key={resume.title} href={resume.href} target="_blank" rel="noopener" className="resume-card">
            <FileText size={26} />
            <h3>{resume.title}</h3>
            <p>{resume.role}</p>
            <span>
              <Download size={15} />
              Download PDF
            </span>
          </a>
        ))}
      </section>
    </PageShell>
  );
}
