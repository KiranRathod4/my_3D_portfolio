"use client";
import { motion } from "motion/react";
import { Download, Send } from "lucide-react";
import { VoiceMessageRecorder } from "./VoiceMessageRecorder";
import confetti from "canvas-confetti";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useState, useRef } from "react";
import { DotBackground } from "@/components/ui/dot-background";

export default function Contact() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleDownloadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { x, y },
      colors: ['#ffffff', '#8b5cf6', '#22d3ee', '#f97316'],
    });
    // trigger CV download
    const link = document.createElement('a');
    link.href = '/Rathod_kiran_08.pdf';
    link.download = 'Kiran_Rathod_CV.pdf';
    link.click();
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[70vh] bg-[#0a0a0a] py-32 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dot Background — purple glow follows cursor */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          zIndex: 5,
          opacity: isHovered ? 1 : 0.3,
        }}
      >
        {/* Base dot grid */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: '20px 20px',
          backgroundImage: 'radial-gradient(rgba(139,92,246,0.25) 1px, transparent 1px)',
        }} />

        {/* Cursor spotlight — follows mouse */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundSize: '20px 20px',
            backgroundImage: 'radial-gradient(rgba(139,92,246,0.9) 1px, transparent 1px)',
            maskImage: isHovered
              ? `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`
              : 'none',
            WebkitMaskImage: isHovered
              ? `radial-gradient(circle 220px at ${mousePos.x}% ${mousePos.y}%, black 0%, transparent 100%)`
              : 'none',
            transition: 'mask-image 0.1s ease, opacity 0.3s ease',
            opacity: isHovered ? 1 : 0,
          }}
        />

        {/* Edge fade so dots fade out at borders */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, #0a0a0a 85%)',
        }} />
      </div>
      {/* Neon Grid Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}>
        {/* Animated neon grid */}
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            backgroundImage: `
              linear-gradient(rgba(180, 100, 255, 0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(180, 100, 255, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px',
            animation: 'neonGridFloat 6s ease-in-out infinite',
            filter: 'blur(0.3px)',
          }}
        />

        {/* Glow layer — same grid but blurred for halo effect */}
        <div
          style={{
            position: 'absolute',
            inset: '-20%',
            backgroundImage: `
              linear-gradient(rgba(200, 80, 255, 0.12) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200, 80, 255, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px',
            animation: 'neonGridFloat 6s ease-in-out infinite',
            filter: 'blur(6px)',
          }}
        />

        {/* Bottom fade — fades grid into dark background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom,
              #0a0a0a 0%,
              transparent 20%,
              transparent 60%,
              #0a0a0a 100%
            )
          `,
          zIndex: 2,
        }} />

        {/* Left + right edge fade */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to right,
              #0a0a0a 0%,
              transparent 12%,
              transparent 88%,
              #0a0a0a 100%
            )
          `,
          zIndex: 2,
        }} />

        {/* Center radial dimmer so grid fades toward center for depth */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(10,10,10,0.55) 0%, transparent 100%)',
          zIndex: 3,
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-5xl px-6 text-center">

        {/* Heading — Fix 4 */}
        <div className="flex justify-center" style={{ paddingBottom: '100px' }}>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'nowrap',
          }} className="contact-heading">
            <span style={{ color: '#ffffff', fontWeight: 800 }}>LET'S WORK</span>
            <span style={{ color: '#4b5563', fontWeight: 300 }}>TOGETHE</span>
            <span style={{
              color: '#8b5cf6',
              fontWeight: 800,
              textShadow: '0 0 20px rgba(139,92,246,0.8), 0 0 40px rgba(139,92,246,0.5)',
              animation: 'rGlow 3s ease-in-out infinite',
            }}>R</span>
          </h2>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-heading {
              white-space: normal !important;
              flex-wrap: wrap !important;
              font-size: clamp(2rem, 8vw, 3rem) !important;
            }
          }
        `}</style>

        {/* Subtitle */}
        <p style={{
          color: '#9ca3af',
          fontFamily: 'Instrument Sans, sans-serif',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '600px',
          lineHeight: 1.7,
          marginBottom: '4rem',
        }}>
          I'm currently open for opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        {/* Buttons row — exact Figma style */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1.5rem',
          justifyContent: 'center',
          marginBottom: '5rem',
        }}>
          {/* Send a Message — white pill, purple fill on hover */}
          <a
            href="mailto:kiranrathod4299@gmail.com"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '1rem 2rem',
              borderRadius: '9999px',
              background: '#ffffff',
              color: '#000000',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
            }}
            className="group send-btn"
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.04)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
          >
            {/* Purple fill overlay slides in from left */}
            <span style={{
              position: 'absolute', inset: 0,
              background: '#8b5cf6',
              transform: 'translateX(-100%)',
              transition: 'transform 0.35s ease',
              zIndex: 0,
            }} className="send-fill" />
            <span style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              SEND A MESSAGE
              <Send size={18} />
            </span>
          </a>

          {/* Download CV — dark outline pill + confetti */}
          <button
            onClick={handleDownloadClick}
            style={{
              padding: '1rem 2rem',
              borderRadius: '9999px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: '#ffffff',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.06em',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
              transition: 'background 0.2s ease, border-color 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            DOWNLOAD CV <Download size={18} />
          </button>
        </div>

        {/* Voice Note Card — exact Figma dark glass card */}
        <VoiceMessageRecorder />

      </div>

      <style>{`
        @keyframes neonGridFloat {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-18px); }
          100% { transform: translateY(0px); }
        }
        @keyframes retroGridScroll {
          0%   { background-position: 0 0; }
          100% { background-position: 0 60px; }
        }
        .send-btn:hover .send-fill { transform: translateX(0) !important; }
        .send-btn:hover span { color: #ffffff !important; }
      `}</style>
    </section>
  );
}
