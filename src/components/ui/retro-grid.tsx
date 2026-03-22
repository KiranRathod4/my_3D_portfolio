"use client";

import React from "react";

export function RetroGrid({
  className,
  angle = 65,
}: {
  className?: string;
  angle?: number;
}) {
  return (
    <div
      className={`pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px] retro-grid-wrapper ${className || ""}`}
      style={{ "--grid-angle": `${angle}deg` } as React.CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={`animate-grid [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-200%] [transform-origin:100%_0_0] [width:600vw]
            [background-image:linear-gradient(to_right,rgba(139,92,246,0.15)_1px,transparent_0),linear-gradient(to_bottom,rgba(139,92,246,0.15)_1px,transparent_0)]
            dark:[background-image:linear-gradient(to_right,rgba(139,92,246,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(139,92,246,0.25)_1px,transparent_0)]
          `}
        />
      </div>

      {/* Background Gradient */}
      <div 
        style={{ 
          background: 'linear-gradient(to top, #0a0a0a 40%, transparent 100%)', 
          position: 'absolute', 
          inset: 0 
        }} 
      />
    </div>
  );
}
