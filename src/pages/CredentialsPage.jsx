import React from "react";
import { ExternalLink } from "lucide-react";
import { PageShell } from "../components/ui/PageShell";
import { PageHero } from "../components/ui/PageHero";
import { credentials } from "../data/portfolio";

export function CredentialsPage() {
  const categories = ["Hackathons", "AI / ML", "Data Analytics", "Google Analytics", "Python", "Cloud"];
  return (
    <PageShell>
      <PageHero eyebrow="Credentials" title="Certificate gallery with proof." copy="A clean proof hub for achievements, certifications, and job simulations." />
      <section className="section">
        <div className="filter-row muted">
          {categories.map((category) => (
            <span key={category}>{category}</span>
          ))}
        </div>
        <div className="credential-grid">
          {credentials.map((credential) => (
            <a key={credential.title} href={credential.link} target="_blank" rel="noopener">
              {credential.image && <img src={credential.image} alt={`${credential.title} certificate preview`} />}
              <span>{credential.type}</span>
              <h3>{credential.title}</h3>
              <small>{credential.issuer} · {credential.date}</small>
              <p>{credential.copy}</p>
              <ExternalLink size={16} />
            </a>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
