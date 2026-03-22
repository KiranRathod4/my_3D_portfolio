"use client";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Github, Linkedin, Mail, Instagram, ArrowRight } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'What I Do', href: '#whatido' },
  { label: 'Arsenal', href: '#arsenal' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL = [
  { icon: Github, href: 'https://github.com/KiranRathod4', color: 'rgba(255,255,255,0.9)', bg: 'rgba(255,255,255,0.08)' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/kiranrathod05/', color: '#22d3ee', bg: 'rgba(34,211,238,0.08)' },
  { icon: Mail, href: 'mailto:kiranrathod4299@gmail.com', color: '#f97316', bg: 'rgba(249,115,22,0.08)' },
  { icon: Instagram, href: 'https://www.instagram.com/', color: '#ec4899', bg: 'rgba(236,72,153,0.08)' },
];

export default function Footer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <footer style={{
      width: '100%',
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      paddingTop: '6rem',
      paddingBottom: '2rem',
      paddingLeft: 'max(5vw, 1.5rem)',
      paddingRight: 'max(5vw, 1.5rem)',
      position: 'relative',
      zIndex: 10,
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* 3-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '3rem',
          marginBottom: '5rem',
        }}>

          {/* LEFT — Brand */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: '4px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: '1.8rem',
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
              KIRAN
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: '#8b5cf6',
                boxShadow: '0 0 8px rgba(139,92,246,0.6)',
                marginLeft: '2px',
                marginBottom: '4px',
              }} />
            </div>
            <p style={{
              color: '#6b7280',
              fontFamily: 'Instrument Sans, sans-serif',
              fontSize: '0.9rem',
              lineHeight: 1.7,
              maxWidth: '280px',
            }}>
              Building intelligent systems and human-centric interfaces. Talk to AIs more than humans.
            </p>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '0.3rem 0.9rem',
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: '9999px',
            }}>
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }}
              />
              <span style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.65rem',
                color: '#22c55e',
                letterSpacing: '0.1em',
              }}>
                Always Innovating
              </span>
            </div>
          </div>

          {/* CENTER — Navigation */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h4 style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#4b5563',
              marginBottom: '2rem',
            }}>
              Navigation
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem 2rem',
            }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: '#6b7280',
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'color 0.2s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#ffffff';
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#6b7280';
                    (e.currentTarget as HTMLElement).style.transform = 'translateX(0)';
                  }}
                >
                  <ArrowRight size={12} style={{ color: '#8b5cf6', opacity: 0.6 }} />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — Connect FAB */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <h4 style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.6rem',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              color: '#4b5563',
              marginBottom: '2rem',
              alignSelf: 'flex-end',
            }}>
              Connect
            </h4>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', height: '48px' }}>
              {/* Social icons slide out to the left */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      overflow: 'hidden',
                      paddingRight: '14px',
                    }}
                  >
                    {SOCIAL.map((s, i) => (
                      <motion.a
                        key={i}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                        style={{
                          width: '40px', height: '40px',
                          borderRadius: '50%',
                          background: '#111111',
                          border: '1px solid rgba(255,255,255,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#9ca3af',
                          textDecoration: 'none',
                          flexShrink: 0,
                          transition: 'color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.color = s.color;
                          (e.currentTarget as HTMLElement).style.background = s.bg;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.color = '#9ca3af';
                          (e.currentTarget as HTMLElement).style.background = '#111111';
                        }}
                      >
                        <s.icon size={16} />
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Plus / Close button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '48px', height: '48px',
                  borderRadius: '50%',
                  background: isOpen ? '#111111' : '#8b5cf6',
                  border: isOpen ? '1px solid rgba(255,255,255,0.15)' : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  boxShadow: isOpen ? 'none' : '0 0 20px rgba(139,92,246,0.4)',
                  transition: 'background 0.3s, box-shadow 0.3s',
                  flexShrink: 0,
                }}
              >
                <Plus size={22} strokeWidth={2.5} />
              </motion.button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            color: '#4b5563',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            © 2026 Kiran Rathod. All rights reserved.
          </span>
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.6rem',
            color: '#4b5563',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            display: 'flex', gap: '6px',
          }}>
            Designed & Built by{' '}
            <span style={{ color: '#ffffff', fontWeight: 600 }}>Kiran Rathod</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
