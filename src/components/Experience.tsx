"use client";
import { motion } from "motion/react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef } from "react";

const bulletPoints = [
  "Architecting and fine-tuning specialized LLMs for targeted domain tasks, improving accuracy by 40%.",
  "Designing end-to-end MLOps pipelines to automate model training, evaluation, and deployment using MLflow.",
  "Building scalable microservices with FastAPI and Docker to serve model inference in production environments.",
  "Collaborating with cross-functional teams to integrate AI capabilities into existing enterprise software.",
  "Implementing vector search databases using FAISS for high-performance retrieval augmented generation (RAG).",
];

export default function Experience() {
  const cardBorderRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardBorderRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.borderColor = 'transparent';
    card.style.backgroundImage = `
      radial-gradient(circle at ${x}% ${y}%, rgba(139,92,246,0.5) 0%, transparent 60%)
    `;
    const cx = e.clientX - rect.left - rect.width / 2;
    const cy = e.clientY - rect.top - rect.height / 2;
    card.style.boxShadow = `
      ${cx * 0.04}px ${cy * 0.04}px 30px rgba(139,92,246,0.25),
      0 0 0 1px rgba(139,92,246,0.4),
      0 20px 60px rgba(0,0,0,0.5)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardBorderRef.current;
    if (!card) return;
    card.style.backgroundImage = 'none';
    card.style.boxShadow = '0 20px 60px rgba(0,0,0,0.4)';
    card.style.borderColor = 'rgba(255,255,255,0.08)';
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (cardRef.current) {
          cardRef.current.style.transition = 'border-color 0.8s ease, box-shadow 0.8s ease';
        }
      },
      { threshold: 0.3 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-4xl mx-auto relative">

        {/* Section Heading */}
        <div className="flex justify-center" style={{ paddingBottom: '100px' }}>
          <SectionHeading
            thinText="WORK"
            boldText="EXPERIENCE"
            glowChar="E"
            glowColor="orange"
            className="justify-center text-center w-full"
          />
        </div>

        <div className="relative pl-8 md:pl-0 mt-16">

          {/* Animated Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute left-0 md:left-12 top-0 w-0.5 rounded-full origin-top"
            style={{
              background: 'linear-gradient(to bottom, #8b5cf6, #22d3ee, transparent)',
            }}
          />

          {/* Experience Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative md:ml-32 mb-12 experience-card"
          >
            {/* Timeline Node */}
            <div
              className="absolute -left-10 md:-left-[84px] top-8 w-4 h-4 rounded-full z-10 border-2 border-accent-purple"
              style={{
                background: '#0a0a0a',
                boxShadow: '0 0 15px rgba(139,92,246,0.8)',
              }}
            />

            {/* Card */}
            <div
              ref={cardBorderRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative overflow-hidden group transition-colors duration-500"
              style={{
                background: 'rgba(17,17,17,0.6)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '24px',
                padding: '2.5rem 3rem',
                minHeight: '420px',
              }}
            >
              {/* Background glow */}
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: '#8b5cf6' }}
              />

              {/* Header row */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 relative z-10">
                <div className="flex items-center gap-5">

                  {/* Company Logo */}
                  <div
                    className="relative flex-shrink-0 transition-all duration-300"
                    style={{
                      width: '64px', height: '64px',
                      borderRadius: '50%',
                      background: '#000000',
                      border: '1px solid rgba(139,92,246,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-full opacity-20 animate-ping"
                      style={{ border: '1px solid rgba(139,92,246,0.5)' }}
                    />
                    <span style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                    }}>
                      IT
                    </span>
                  </div>

                  <div>
                    <h3 style={{
                      fontFamily: 'Syne, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)',
                      color: '#ffffff',
                      marginBottom: '0.25rem',
                    }}>
                      AI / ML Intern
                    </h3>
                    <div style={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      color: '#8b5cf6',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                    }}>
                      Inventeron Technology · Bengaluru, India
                    </div>
                  </div>
                </div>

                {/* Date badge */}
                <div style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '9999px',
                  padding: '0.35rem 1rem',
                  whiteSpace: 'nowrap',
                  alignSelf: 'flex-start',
                }}>
                   <span style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.8rem',
                    color: 'rgba(255,255,255,0.55)',
                  }}>
                    Feb 2025 – April 2026
                  </span>
                </div>
              </div>

              {/* Bullet points */}
              <ul className="flex flex-col gap-4 relative z-10">
                {bulletPoints.map((point, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      size={18}
                      style={{ color: '#8b5cf6', flexShrink: 0, marginTop: '2px' }}
                    />
                    <span style={{
                      fontFamily: 'Instrument Sans, sans-serif',
                      color: 'rgba(255,255,255,0.7)',
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                    }}>
                      {point}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
