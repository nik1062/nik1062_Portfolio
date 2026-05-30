import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/portfolio";

export function TechMarquee() {
  // Use a subset of skills for the marquee to keep it focused
  const marqueeSkills = [...skills, ...skills]; // Duplicate for seamless loop

  return (
    <div className="tech-marquee-container">
      <motion.div
        className="tech-marquee-content"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
            ease: "linear",
          },
        }}
      >
        {marqueeSkills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="marquee-item">
            <img src={skill.logo} alt={skill.name} title={skill.name} />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
