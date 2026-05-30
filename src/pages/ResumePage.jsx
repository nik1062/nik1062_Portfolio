import React from "react";
import { FileText, Download, Printer } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { SEO } from "../components/common/SEO";
import { resumeHub } from "../constants";

export function ResumePage() {
  return (
    <PageShell>
      <SEO title="Resume Hub" description="Download or view my technical resumes for Full-Stack, Data, and DevOps roles." slug="/resume" />
      <PageHero eyebrow="Resume Hub" title="Different resumes for different roles." copy="Recruiters can download the resume that matches the role instead of reading one generic file." />
      
      {/* Quick Action: Print Current View */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 60, gap: 16 }} className="no-print">
        <button 
          onClick={() => window.print()} 
          className="primary-button"
          style={{ height: 48, padding: "0 32px", cursor: "pointer" }}
        >
          <Printer size={18} />
          Print View to PDF
        </button>
      </div>

      <section className="section resume-grid printable">
        {resumeHub.map((resume) => (
          <a key={resume.title} href={resume.href} target="_blank" rel="noopener" className="resume-card">
            <FileText size={26} />
            <h3>{resume.title}</h3>
            <p>{resume.role}</p>
            <span className="no-print">
              <Download size={15} />
              Download Original
            </span>
          </a>
        ))}
      </section>
    </PageShell>
  );
}
