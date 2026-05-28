import React from "react";

export function PageHero({ eyebrow, title, copy }) {
  return (
    <section className="page-hero section">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{copy}</p>
    </section>
  );
}
