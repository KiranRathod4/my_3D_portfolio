import React from "react";

interface SectionHeadingProps {
  thinText: string;
  italicText: string;
  boldText: string;
  glowChar: string;
  glowColor: "cyan" | "purple" | "orange" | "green";
}

export function SectionHeading({
  thinText,
  italicText,
  boldText,
  glowChar,
  glowColor,
}: SectionHeadingProps) {
  const parts = boldText.split(glowChar);
  
  const colors = {
    cyan: "#22d3ee",
    purple: "#8b5cf6",
    orange: "#f97316",
    green: "#22c55e",
  };
  
  const colorHex = colors[glowColor] || colors.cyan;

  return (
    <h2 className="text-6xl md:text-8xl font-['Syne'] font-bold text-white tracking-tighter">
      {thinText}
      <span className="italic font-light opacity-80">{italicText}</span>{" "}
      {parts[0]}
      <span
        style={{
          color: colorHex,
          textShadow: `0 0 15px ${colorHex}80`,
        }}
        className="animate-pulse"
      >
        {glowChar}
      </span>
      {parts[1]}
    </h2>
  );
}
