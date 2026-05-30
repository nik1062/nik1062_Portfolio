import React, { useState, useEffect } from "react";

export function ReadingProgressBar() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollProgress = `${(totalScroll / windowHeight) * 100}%`;
      setScroll(scrollProgress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: scroll,
        height: "3px",
        background: "var(--gold)",
        zIndex: 1000,
        transition: "width 0.2s ease-out"
      }}
    />
  );
}
