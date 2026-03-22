"use client";

import { useEffect } from "react";

export default function HeadingReveal() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const texts = entry.target.querySelectorAll(".reveal-text");
            texts.forEach((el) => el.classList.add("revealed"));
            revealObserver.unobserve(entry.target); // play once only
          }
        });
      },
      { threshold: 0.3 }
    );

    const headings = document.querySelectorAll(".title");
    headings.forEach((heading) => {
      revealObserver.observe(heading);
    });

    return () => {
      headings.forEach((heading) => {
        revealObserver.unobserve(heading);
      });
    };
  }, []);

  return null; // This component doesn't render anything
}
