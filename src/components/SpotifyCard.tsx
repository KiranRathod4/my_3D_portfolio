"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const playlist = [
  {
    title: "Lo-Fi Focus",
    artist: "Deep Work Beats",
    duration: "2:47",
    color: "#1db954",
  },
  {
    title: "Neural Drift",
    artist: "Code & Chill",
    duration: "3:12",
    color: "#8b5cf6",
  },
  {
    title: "Terminal Vibes",
    artist: "Dev After Dark",
    duration: "2:58",
    color: "#22d3ee",
  },
];

export function SpotifyCard() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            // auto next track
            setCurrentTrack(t => (t + 1) % playlist.length);
            return 0;
          }
          return p + 0.4;
        });
      }, 80);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  const track = playlist[currentTrack];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      style={{
        width: '320px',
        marginTop: '1rem',
        borderRadius: '16px',
        background: 'rgba(10,10,10,0.9)',
        border: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)`,
      }}
    >
      {/* Top bar — Spotify branding */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.65rem 1rem 0.4rem',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {/* Spotify icon SVG */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#1db954">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span style={{
            fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.12em',
            color: '#1db954', fontFamily: 'var(--mono, monospace)',
            textTransform: 'uppercase',
          }}>
            Dev + Music
          </span>
        </div>
        
        <a 
          href="https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: '0.58rem', color: 'rgba(255,255,255,0.25)',
            fontFamily: 'var(--mono, monospace)', letterSpacing: '0.08em',
            textDecoration: 'none', transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#1db954')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
        >
          OPEN ↗
        </a>
      </div>

      {/* Main player area */}
      <div style={{ padding: '0.85rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>

          {/* Album art placeholder — animated */}
          <motion.div
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
            style={{ flexShrink: 0 }}
          >
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: `conic-gradient(${track.color} 0%, #1a1a1a 60%)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 0 14px ${track.color}40`,
              position: 'relative',
            }}>
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%',
                background: '#0a0a0a',
                position: 'absolute',
              }} />
            </div>
          </motion.div>

          {/* Track info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrack}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{
                  fontSize: '0.82rem', fontWeight: 600, color: '#fff',
                  fontFamily: 'var(--body, sans-serif)',
                  whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  marginBottom: '2px',
                }}>
                  {track.title}
                </p>
                <p style={{
                  fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)',
                  fontFamily: 'var(--mono, monospace)',
                }}>
                  {track.artist}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
            {/* Prev */}
            <button
              onClick={() => { setCurrentTrack(t => (t - 1 + playlist.length) % playlist.length); setProgress(0); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/>
              </svg>
            </button>

            {/* Play/Pause */}
            <motion.button
              onClick={() => setIsPlaying(p => !p)}
              whileTap={{ scale: 0.88 }}
              style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: isPlaying ? track.color : 'rgba(255,255,255,0.1)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isPlaying ? `0 0 12px ${track.color}60` : 'none',
                transition: 'background 0.3s, box-shadow 0.3s',
              }}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill={isPlaying ? '#000' : '#fff'}>
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#fff">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </motion.button>

            {/* Next */}
            <button
              onClick={() => { setCurrentTrack(t => (t + 1) % playlist.length); setProgress(0); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zm2-8.14 4.96 2.14L8 14.14V9.86zM16 6h2v12h-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: '0.75rem' }}>
          <div style={{
            height: '3px', borderRadius: '9999px',
            background: 'rgba(255,255,255,0.08)',
            position: 'relative', overflow: 'hidden',
          }}>
            <motion.div
              style={{
                height: '100%', borderRadius: '9999px',
                background: track.color,
                boxShadow: `0 0 6px ${track.color}80`,
                width: `${progress}%`,
              }}
              transition={{ duration: 0.08 }}
            />
          </div>

          {/* Time labels */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            marginTop: '0.3rem',
          }}>
            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--mono, monospace)' }}>
              {Math.floor(progress * 1.67 / 100)}:{String(Math.floor((progress * 1.67) % 60)).padStart(2,'0')}
            </span>
            <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.2)', fontFamily: 'var(--mono, monospace)' }}>
              {track.duration}
            </span>
          </div>
        </div>

        {/* Track dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '0.5rem' }}>
          {playlist.map((t, i) => (
            <div
              key={i}
              onClick={() => { setCurrentTrack(i); setProgress(0); }}
              style={{
                width: i === currentTrack ? '16px' : '5px',
                height: '3px', borderRadius: '9999px',
                background: i === currentTrack ? track.color : 'rgba(255,255,255,0.12)',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom vibe label */}
      <div style={{
        padding: '0.45rem 1rem',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <motion.div
          animate={{ opacity: isPlaying ? [0.4, 1, 0.4] : 0.3 }}
          transition={{ duration: 1.2, repeat: Infinity }}
          style={{
            width: '5px', height: '5px', borderRadius: '50%',
            background: isPlaying ? '#1db954' : 'rgba(255,255,255,0.2)',
          }}
        />
        <span style={{
          fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)',
          fontFamily: 'var(--mono, monospace)', letterSpacing: '0.08em',
        }}>
          {isPlaying ? `coding to ${track.title.toLowerCase()}` : 'music for deep work & code'}
        </span>
      </div>
    </motion.div>
  );
}
