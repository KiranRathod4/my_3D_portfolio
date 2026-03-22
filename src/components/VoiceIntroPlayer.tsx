"use client";
import { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";

const STATIC_HEIGHTS = [
  45, 82, 33, 91, 22, 76, 54, 29, 63, 88, 12, 47, 95, 30, 68, 51, 24, 79, 44, 16, 85, 37, 60, 22, 
  98, 55, 11, 49, 73, 27, 81, 40, 66, 19, 93, 34, 58, 21, 75, 42, 14, 89, 52, 28, 65, 31, 84, 46
];

export function VoiceIntroPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const visualizerBars = 48;

  useEffect(() => {
    // Placeholder audio path - replace with actual uploaded file
    audioRef.current = new Audio(""); 
    if (audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
        (window as any).__resumeAmbient?.();
      };
    }
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const handleClick = () => {
    if (!audioRef.current || !audioRef.current.src) return;
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      (window as any).__resumeAmbient?.();
    } else {
      (window as any).__pauseAmbient?.();
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
        setIsPlaying(false);
        (window as any).__resumeAmbient?.();
      });
      setIsPlaying(true);
    }
  };

  return (
    <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>

      {/* Visualizer bars */}
      <div style={{ height: '32px', width: '200px', display: 'flex', alignItems: 'center', gap: '2px' }}>
        {[...Array(visualizerBars)].map((_, i) => (
          <div
            key={i}
            style={{
              width: '2px',
              borderRadius: '9999px',
              background: isPlaying ? 'var(--accentColor)' : 'rgba(255,255,255,0.12)',
              height: isPlaying ? `${STATIC_HEIGHTS[i]}%` : '4px',
              transition: 'height 0.15s ease',
              animationDelay: `${i * 0.04}s`,
              animation: isPlaying ? `voicePulse 0.8s ${i * 0.04}s ease-in-out infinite alternate` : 'none',
              boxShadow: isPlaying ? `0 0 6px var(--accentColor)` : 'none',
            }}
          />
        ))}
      </div>

      {/* Button + label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={handleClick}
          style={{
            width: '52px', height: '52px',
            borderRadius: '50%',
            background: isPlaying
              ? 'var(--accentColor)'
              : 'rgba(255,255,255,0.06)',
            border: `1.5px solid ${isPlaying ? 'var(--accentColor)' : 'rgba(255,255,255,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: isPlaying
              ? '0 0 20px var(--accentColor), 0 0 40px rgba(139,92,246,0.3)'
              : 'none',
            animation: isPlaying ? 'playerPulse 2s ease-in-out infinite' : 'none',
          }}
        >
          {isPlaying
            ? <Pause size={18} color="#fff" />
            : <Play size={18} color="rgba(255,255,255,0.7)" />
          }
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: isPlaying ? '#fff' : 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            transition: 'color 0.3s ease',
            fontFamily: 'var(--mono, monospace)',
          }}>
            {isPlaying ? 'Playing intro...' : 'Click to hear about me'}
          </span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.25)', fontFamily: 'var(--mono, monospace)' }}>
            ~1 min voice intro
          </span>
        </div>
      </div>

      <style>{`
        @keyframes voicePulse {
          from { height: 15%; }
          to   { height: 85%; }
        }
        @keyframes playerPulse {
          0%,100% { box-shadow: 0 0 20px var(--accentColor), 0 0 40px rgba(139,92,246,0.3); }
          50%      { box-shadow: 0 0 30px var(--accentColor), 0 0 60px rgba(139,92,246,0.5); }
        }
      `}</style>
    </div>
  );
}
