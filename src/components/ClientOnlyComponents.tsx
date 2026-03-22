"use client";

import dynamic from "next/dynamic";

export const TechnicalArsenal = dynamic(
  () => import("@/components/TechnicalArsenal"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[500px] flex items-center justify-center bg-transparent">
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          border: '2px solid rgba(139,92,246,0.2)',
          borderTopColor: '#8b5cf6',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    ),
  }
);
