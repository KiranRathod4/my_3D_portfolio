"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VoiceIntroPlayer } from "./VoiceIntroPlayer";

const roles = [
  { text: 'AI / ML',   sub: 'Engineer',        color: '#a855f7' },
  { text: 'MLOps',     sub: 'Builder',          color: '#22d3ee' },
  { text: 'DevOps',    sub: 'Engineer',         color: '#f97316' },
  { text: 'QA',        sub: 'Engineer',         color: '#22c55e' },
  { text: 'Content',   sub: 'Creator',          color: '#f59e0b' },
];

export function RoleTypography() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex(i => (i + 1) % roles.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const current = roles[index];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center', gap: '1.5rem',
      padding: '0 0 0 3rem',
      position: 'relative',
    }}>

      {/* Vertical accent line */}
      <div 
        className="vertical-line"
        style={{
          position: 'absolute', left: '1rem', top: '10%', bottom: '10%',
          width: '2px',
          background: `linear-gradient(to bottom, transparent, ${current.color}, transparent)`,
          transition: 'background 0.6s ease',
          borderRadius: '9999px',
        }} 
      />

      {/* Small label */}
      <motion.p
        style={{
          fontSize: '0.7rem', letterSpacing: '0.2em',
          color: 'rgba(255,255,255,0.3)',
          fontFamily: 'var(--mono, monospace)',
          textTransform: 'uppercase',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Aspiring
      </motion.p>

      {/* Big animated role text */}
      <div style={{ overflow: 'hidden', position: 'relative', minHeight: '120px' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 60, opacity: 0, filter: 'blur(12px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -60, opacity: 0, filter: 'blur(12px)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div style={{
              fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
              fontWeight: 800,
              fontFamily: 'var(--display, sans-serif)',
              lineHeight: 1,
              color: current.color,
              textShadow: `0 0 40px ${current.color}60, 0 0 80px ${current.color}30`,
              letterSpacing: '-0.02em',
            }}>
              {current.text}
            </div>
            <div style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 300,
              fontFamily: 'var(--display, sans-serif)',
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '-0.01em',
              marginTop: '0.2rem',
            }}>
              {current.sub}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bio paragraph — fades in once */}
      <p className="text-white/60 text-[1rem] leading-relaxed mb-10 font-medium">
          Aspiring AI/ML & MLOps Engineer. Final year CS at VTU, Belagavi. 
          I build end-to-end ML systems, automate pipelines, and create tech 
          content to share knowledge. CGPA: 7.95 · 2× Hackathon Winner.
      </p>

      {/* Role indicator dots */}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {roles.map((r, i) => (
          <motion.div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              height: '3px', borderRadius: '9999px', cursor: 'pointer',
              background: i === index ? current.color : 'rgba(255,255,255,0.12)',
              transition: 'background 0.4s ease',
            }}
            animate={{ width: i === index ? 28 : 8 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>

      {/* VoiceIntroPlayer stays here */}
      <VoiceIntroPlayer />
    </div>
  );
}
