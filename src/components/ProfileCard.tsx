"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        width: '320px',
        height: '420px',
        perspective: '1200px',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
          y: isHovered && !isFlipped ? -18 : 0,
          rotateX: isHovered && !isFlipped ? 6 : 0,
        }}
        transition={{
          rotateY: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          y: { duration: 0.4, ease: 'easeOut' },
          rotateX: { duration: 0.4, ease: 'easeOut' },
        }}
      >
        {/* ── FRONT FACE ── */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            borderRadius: '24px',
            background: 'linear-gradient(145deg, #141414 0%, #0f0f0f 50%, #111111 100%)',
            border: '1px solid rgba(139,92,246,0.2)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '2rem 1.5rem',
          }}
          animate={{
            boxShadow: isHovered && !isFlipped
              ? '0 40px 80px rgba(0,0,0,0.6), 0 0 40px rgba(139,92,246,0.15), 0 0 80px rgba(139,92,246,0.08)'
              : '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(139,92,246,0.08)',
          }}
          transition={{ duration: 0.4 }}
        >
          {/* Gradient top glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '60%',
            background: 'radial-gradient(ellipse at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* 3D Profile Image */}
          <motion.div
            style={{
              position: 'absolute',
              top: '1.8rem',
              width: '160px', height: '160px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(139,92,246,0.4)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.5), 0 0 24px rgba(139,92,246,0.2)',
            }}
            animate={{
              y: isHovered && !isFlipped ? -6 : 0,
              scale: isHovered && !isFlipped ? 1.04 : 1,
              rotateY: isHovered && !isFlipped ? -8 : 0,
              filter: isHovered && !isFlipped
                ? 'drop-shadow(0 12px 24px rgba(139,92,246,0.3))'
                : 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
            }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Replace src with your actual photo path */}
            <img
              src="/profile.jpg"
              alt="Kiran Rathod"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // Fallback avatar if image not found
                (e.target as HTMLImageElement).src =
                  'https://api.dicebear.com/7.x/initials/svg?seed=KR&backgroundColor=8b5cf6&textColor=ffffff';
              }}
            />
          </motion.div>

          {/* Name */}
          <div style={{ textAlign: 'center', zIndex: 1, width: '100%' }}>
            <h3 style={{
              fontSize: '1.4rem', fontWeight: 700,
              color: '#ffffff', letterSpacing: '-0.02em',
              marginBottom: '0.3rem', fontFamily: 'var(--display, sans-serif)',
            }}>
              Kiran Rathod
            </h3>
            <p style={{
              fontSize: '0.75rem', color: 'rgba(139,92,246,0.9)',
              fontFamily: 'var(--mono, monospace)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: '1.2rem',
            }}>
              AI / ML · MLOps · DevOps
            </p>

            {/* Tag chips */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.2rem' }}>
              {['VTU Belagavi', 'Final Year', 'Open to Work'].map(tag => (
                <span key={tag} style={{
                  padding: '0.2rem 0.7rem', borderRadius: '9999px',
                  background: 'rgba(139,92,246,0.1)',
                  border: '1px solid rgba(139,92,246,0.25)',
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.6)',
                  fontFamily: 'var(--mono, monospace)', letterSpacing: '0.06em',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Flip hint */}
            <motion.p
              style={{
                fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)',
                fontFamily: 'var(--mono, monospace)', letterSpacing: '0.1em',
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              CLICK TO FLIP
            </motion.p>
          </div>
        </motion.div>

        {/* ── BACK FACE ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: '24px',
          background: 'linear-gradient(145deg, #0d0d1a 0%, #110f1a 50%, #0f0d18 100%)',
          border: '1px solid rgba(139,92,246,0.3)',
          padding: '2rem 1.5rem',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(139,92,246,0.12)',
          overflow: 'hidden',
        }}>
          {/* Back glow */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
            background: 'radial-gradient(ellipse at 50% 100%, rgba(139,92,246,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Back content */}
          <div>
            <p style={{
              fontSize: '0.6rem', color: 'rgba(139,92,246,0.7)',
              fontFamily: 'var(--mono, monospace)', letterSpacing: '0.15em',
              textTransform: 'uppercase', marginBottom: '0.8rem',
            }}>
              About Me
            </p>
            <p style={{
              fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.7, fontFamily: 'var(--body, sans-serif)',
              marginBottom: '1.2rem',
            }}>
              Final year CS student at VTU, Belagavi. Passionate about AI/ML, MLOps, and DevOps. I build scalable real-world solutions and create tech content to share knowledge.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.2rem' }}>
            {[
              { val: '7.95', lbl: 'CGPA' },
              { val: '2×', lbl: 'Hackathon Winner' },
              { val: '6+', lbl: 'Projects' },
              { val: '628', lbl: 'Profile Views' },
            ].map(s => (
              <div key={s.lbl} style={{
                background: 'rgba(139,92,246,0.08)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: '10px', padding: '0.6rem 0.8rem',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', fontFamily: 'var(--display, sans-serif)' }}>{s.val}</div>
                <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--mono, monospace)', letterSpacing: '0.08em', marginTop: '2px' }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Contact links */}
          <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
            {[
              { label: 'GitHub', href: 'https://github.com/KiranRathod4' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kiranrathod05/' },
              { label: 'Email', href: 'mailto:kiranrathod4299@gmail.com' },
            ].map(link => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  padding: '0.35rem 0.8rem', borderRadius: '9999px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--mono, monospace)', letterSpacing: '0.08em',
                  textDecoration: 'none', transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.5)';
                  (e.currentTarget as HTMLElement).style.color = '#fff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <motion.p
            style={{
              textAlign: 'center', marginTop: '0.8rem',
              fontSize: '0.6rem', color: 'rgba(255,255,255,0.15)',
              fontFamily: 'var(--mono, monospace)', letterSpacing: '0.1em',
            }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            CLICK TO FLIP BACK
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}
