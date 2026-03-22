"use client";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";

type SectionHeadingProps = {
  thinText: string;
  italicText?: string;
  boldText: string;
  glowChar?: string;
  glowColor?: "purple" | "cyan" | "orange" | "green" | "amber";
  className?: string;
};

export function SectionHeading({
  thinText,
  italicText,
  boldText,
  glowChar,
  glowColor = "purple",
  className,
}: SectionHeadingProps) {
  const glowColors = {
    purple: "text-accent-purple drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]",
    cyan:   "text-accent-cyan drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]",
    orange: "text-accent-orange drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]",
    green:  "text-accent-green drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]",
    amber:  "text-accent-amber drop-shadow-[0_0_10px_rgba(245,158,11,0.8)]",
  };

  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={twMerge(
        "font-display text-4xl md:text-5xl uppercase tracking-tighter flex flex-wrap items-baseline gap-x-4",
        className
      )}
    >
      {thinText && <span className="font-light text-white/50">{thinText}</span>}
      {italicText && <span className="italic text-white/30">{italicText}</span>}
      <span className="font-black text-white flex">
        {boldText.split("").map((char, index) => {
          const isGlow = glowChar && 
            char.toUpperCase() === glowChar.toUpperCase() && 
            index === boldText.toUpperCase().lastIndexOf(glowChar.toUpperCase());
          
          if (isGlow) {
            const shadows = {
              purple: { c: "rgba(139,92,246,0.8)", s: "rgba(139,92,246,0.4)", e: "rgba(139,92,246,0.2)" },
              cyan:   { c: "rgba(34,211,238,0.8)", s: "rgba(34,211,238,0.4)", e: "rgba(34,211,238,0.2)" },
              orange: { c: "rgba(249,115,22,0.8)", s: "rgba(249,115,22,0.4)", e: "rgba(249,115,22,0.2)" },
              green:  { c: "rgba(34,197,94,0.8)", s: "rgba(34,197,94,0.4)", e: "rgba(34,197,94,0.2)" },
              amber:  { c: "rgba(245,158,11,0.8)", s: "rgba(245,158,11,0.4)", e: "rgba(245,158,11,0.2)" },
            };
            const shadow = shadows[glowColor];

            return (
              <span 
                key={index} 
                className={glowColors[glowColor]}
                style={{
                  animation: 'sectionCharGlow 3s ease-in-out infinite',
                  "--glow-color": shadow.c,
                  "--glow-color-soft": shadow.s,
                  "--glow-color-extra": shadow.e,
                } as any}
              >
                {char}
              </span>
            );
          }
          return <span key={index}>{char}</span>;
        })}
      </span>
    </motion.h2>
  );
}
