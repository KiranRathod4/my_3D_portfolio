import React from "react";
import { twMerge } from "tailwind-merge";

interface ChipProps {
  children: React.ReactNode;
  color?: "cyan" | "purple" | "orange" | "green";
  className?: string;
}

export function Chip({ children, color = "cyan", className }: ChipProps) {
  const colorMap = {
    cyan: "bg-[#22d3ee]/10 border-[#22d3ee]/30 text-[#22d3ee]",
    purple: "bg-[#8b5cf6]/10 border-[#8b5cf6]/30 text-[#8b5cf6]",
    orange: "bg-[#f97316]/10 border-[#f97316]/30 text-[#f97316]",
    green: "bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]",
  };

  return (
    <span
      className={twMerge(
        "px-3 py-1 bg-black/40 border border-white/10 rounded-full text-xs font-['DM_Mono'] text-gray-300 backdrop-blur-sm whitespace-nowrap",
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}
