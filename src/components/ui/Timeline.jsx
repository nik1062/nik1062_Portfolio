import React from "react";
import { timeline } from "../../data/portfolio.js";

export function Timeline() {
  return (
    <div className="timeline">
      {timeline.map((item) => (
        <article key={item.title}>
          <time>{item.time}</time>
          <div>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
