"use client";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const achievements = [
  {
    id: 1,
    icon: "🥇",
    title: "Winner",
    event: "Vencer Hackathon, AITM Belagavi",
    date: "April 2025",
    desc: "Secured first place out of 20+ teams by building an innovative AI-driven educational platform.",
    color: "#f59e0b",
    shadow: "rgba(245,158,11,0.2)"
  },
  {
    id: 2,
    icon: "🥉",
    title: "Winner",
    event: "Code Prahari, SGBIT Belagavi",
    date: "March 2024",
    desc: "Recognized among 100+ participants for developing a real-time anomaly detection system.",
    color: "#d97706",
    shadow: "rgba(217,119,6,0.2)"
  },
  {
    id: 3,
    icon: "🎗️",
    title: "Event Lead",
    event: "Yukti-2K25 National Technical Fest",
    date: "2025",
    desc: "Led a core team of 15 members to organize and execute a national-level technical symposium.",
    color: "#8b5cf6",
    shadow: "rgba(139,92,246,0.2)"
  }
];

export function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasFired = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasFired.current) {
          fireConfetti();
          hasFired.current = true;
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#8b5cf6', '#22d3ee', '#f97316']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#8b5cf6', '#22d3ee', '#f97316']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section
      ref={sectionRef}
      id="achievements"
      className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading using SectionHeading component */}
        <div className="flex justify-center" style={{ paddingBottom: '100px' }}>
          <SectionHeading
            thinText=""
            boldText="ACHIEVEMENTS"
            glowChar="S"
            glowColor="amber"
            className="justify-center text-center w-full"
          />
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" style={{ perspective: '1000px' }}>
          {achievements.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, rotateX: -90 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
                bounce: 0.4
              }}
              whileHover={{
                y: -10,
                boxShadow: `0 20px 40px ${item.shadow}`
              }}
              className="relative overflow-hidden group cursor-pointer"
              style={{
                background: '#111111',
                borderRadius: '24px',
                padding: '2rem',
                border: '1px solid rgba(255,255,255,0.05)',
                borderTop: `4px solid ${item.color}`,
              }}
            >
              {/* Emoji icon */}
              <div
                className="text-6xl mb-6 transition-transform duration-300 group-hover:scale-110 origin-bottom inline-block"
                style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.5))' }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1.4rem',
                color: '#ffffff',
                marginBottom: '0.4rem',
              }}>
                {item.title}
              </h3>

              {/* Event name */}
              <div style={{
                fontFamily: 'Instrument Sans, sans-serif',
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 500,
                fontSize: '0.95rem',
                marginBottom: '0.25rem',
              }}>
                {item.event}
              </div>

              {/* Date */}
              <div style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem',
                color: '#6b7280',
                marginBottom: '1rem',
                letterSpacing: '0.05em',
              }}>
                {item.date}
              </div>

              {/* Description */}
              <p style={{
                fontFamily: 'Instrument Sans, sans-serif',
                color: '#9ca3af',
                lineHeight: 1.7,
                fontSize: '0.9rem',
              }}>
                {item.desc}
              </p>

              {/* Ambient internal glow */}
              <div
                className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: item.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
