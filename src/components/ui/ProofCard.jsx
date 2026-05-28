import React from "react";

export function ProofCard({ skill, proof }) {
  return (
    <article>
      <h3>{skill}</h3>
      <p>{proof}</p>
    </article>
  );
}
