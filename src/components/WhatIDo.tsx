"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Database, Brain, Rocket, Shield } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const CARDS = [
  {
    id: 1,
    title: "Data & Analytics",
    hex: "#22d3ee",
    icon: Database,
    num: "01",
    tags: ["SQL", "Pandas", "Airflow", "ETL", "NumPy", "Matplotlib"],
  },
  {
    id: 2,
    title: "AI & ML",
    hex: "#8b5cf6",
    icon: Brain,
    num: "02",
    tags: ["PyTorch", "TensorFlow", "HuggingFace", "LangChain", "FAISS", "Keras"],
  },
  {
    id: 3,
    title: "DevOps & Cloud",
    hex: "#f97316",
    icon: Rocket,
    num: "03",
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD", "Jenkins", "Grafana"],
  },
  {
    id: 4,
    title: "MLOps & QA",
    hex: "#22c55e",
    icon: Shield,
    num: "04",
    tags: ["MLflow", "Selenium", "Playwright", "Postman", "DVC", "Airflow"],
  },
];

export default function WhatIDo() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="what-i-do"
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        padding: '8rem 5vw',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        opacity: 0.15, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Heading */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
      }}>
        <div className="flex justify-center" style={{ paddingBottom: '100px' }}>
          <SectionHeading
            thinText="WHAT I"
            boldText="DO"
            glowChar="O"
            glowColor="cyan"
            className="justify-center text-center w-full"
          />
        </div>
      </div>

      {/* Cards row */}
      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: '16px',
        height: isMobile ? 'auto' : '600px',
        width: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
      }}>
        {CARDS.map((card) => {
          const isHovered = hovered === card.id;
          const isAnyHovered = hovered !== null;
          const isOther = isAnyHovered && !isHovered;
          const Icon = card.icon;

          return (
            <motion.div
              key={card.id}
              onClick={() => {
                if (isMobile) {
                  setHovered(isHovered ? null : card.id);
                }
              }}
              onMouseEnter={() => { if (!isMobile) setHovered(card.id) }}
              onMouseLeave={() => { if (!isMobile) setHovered(null) }}
              animate={isMobile ? {
                height: isHovered ? window.innerWidth > 0 ? 300 : 300 : 120,
              } : {
                flex: isHovered ? 1.8 : isAnyHovered ? 0.8 : 1,
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '24px',
                background: '#111111',
                border: `1px solid ${isHovered ? card.hex + '50' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: isHovered ? `0 0 40px ${card.hex}20` : 'none',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                minWidth: 0,
                width: isMobile ? '100%' : 'auto',
                transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
              }}
            >
              {/* Radial glow — only on hovered */}
              <motion.div
                animate={{ opacity: isHovered ? 0.22 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: `radial-gradient(circle at 50% 50%, ${card.hex} 0%, transparent 65%)`,
                  pointerEvents: 'none',
                }}
              />

              {/* Corner brackets */}
              {[
                { top: '12px', left: '12px', borderTop: '2px solid', borderLeft: '2px solid', borderRight: 'none', borderBottom: 'none', borderRadius: '3px 0 0 0' },
                { top: '12px', right: '12px', borderTop: '2px solid', borderRight: '2px solid', borderLeft: 'none', borderBottom: 'none', borderRadius: '0 3px 0 0' },
                { bottom: '12px', left: '12px', borderBottom: '2px solid', borderLeft: '2px solid', borderTop: 'none', borderRight: 'none', borderRadius: '0 0 0 3px' },
                { bottom: '12px', right: '12px', borderBottom: '2px solid', borderRight: '2px solid', borderTop: 'none', borderLeft: 'none', borderRadius: '0 0 3px 0' },
              ].map((style, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: '16px', height: '16px',
                  borderColor: 'rgba(255,255,255,0.2)',
                  pointerEvents: 'none',
                  zIndex: 2,
                  ...style,
                }} />
              ))}

              {/* Card inner content */}
              <div style={{
                position: 'absolute', inset: 0,
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 3,
                overflow: 'hidden',
              }}>

                {/* Top row: Icon + Number */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Icon
                    size={40}
                    style={{ color: card.hex, flexShrink: 0 }}
                    strokeWidth={1.5}
                  />
                  <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '1.8rem',
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.12)',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}>
                    {card.num}
                  </span>
                </div>

                {/* Bottom: Title + Tags */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                  {/* Title — horizontal when hovered, vertical when not hovered and another is */}
                  {isOther && !isMobile ? (
                    <div style={{
                      writingMode: 'vertical-rl',
                      transform: 'rotate(180deg)',
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: '#ffffff',
                      letterSpacing: '0.02em',
                      alignSelf: 'center',
                      whiteSpace: 'nowrap',
                    }}>
                      {card.title}
                    </div>
                  ) : (
                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 700,
                        fontSize: isHovered && !isMobile ? '1.6rem' : '1.3rem',
                        color: '#ffffff',
                        letterSpacing: '-0.01em',
                        whiteSpace: isHovered && !isMobile ? 'normal' : 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {card.title}
                    </motion.div>
                  )}

                  {/* Tags — only when hovered */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3, delay: 0.15 }}
                        style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}
                      >
                        {card.tags.map((tag) => (
                          <span key={tag} style={{
                            padding: '3px 10px',
                            borderRadius: '9999px',
                            background: 'rgba(0,0,0,0.5)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            fontSize: '0.68rem',
                            fontFamily: 'DM Mono, monospace',
                            color: 'rgba(255,255,255,0.6)',
                            whiteSpace: 'nowrap',
                            backdropFilter: 'blur(8px)',
                          }}>
                            {tag}
                          </span>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* DO glow keyframe */}
      <style>{`
        @keyframes doGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(139,92,246,0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(139,92,246,1), 0 0 60px rgba(139,92,246,0.7), 0 0 100px rgba(139,92,246,0.4);
          }
        }
      `}</style>
    </section>
  );
}
