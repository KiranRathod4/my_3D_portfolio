"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export function AudioManager() {
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const mutedRef = useRef(false);

  useEffect(() => {
    // Create audio with direct CDN URL — calm lofi coding track
    const audio = new Audio(
      'https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3'
    );
    audio.loop = true;
    audio.volume = 0.12; // very low — ambient, not intrusive
    ambientRef.current = audio;

    // Must start on first user gesture — browser policy
    const start = () => {
      if (!mutedRef.current && ambientRef.current && !started) {
        ambientRef.current.play().catch(() => {});
        setStarted(true);
      }
    };

    document.addEventListener('click', start, { once: true });
    document.addEventListener('scroll', start, { once: true });
    document.addEventListener('keydown', start, { once: true });

    // Expose global controls for other components
    (window as any).__pauseAmbient = () => {
      ambientRef.current?.pause();
    };
    (window as any).__resumeAmbient = () => {
      if (!mutedRef.current && ambientRef.current) {
        ambientRef.current.play().catch(() => {});
      }
    };

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', start);
      document.removeEventListener('scroll', start);
      document.removeEventListener('keydown', start);
    };
  }, []);

  const toggle = () => {
    const newMuted = !muted;
    setMuted(newMuted);
    mutedRef.current = newMuted;
    if (newMuted) {
      ambientRef.current?.pause();
    } else {
      ambientRef.current?.play().catch(() => {});
    }
  };

  return (
    <button
      onClick={toggle}
      title={muted ? 'Unmute music' : 'Mute music'}
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '28px',
        zIndex: 9998,
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        background: 'rgba(10,10,10,0.85)',
        border: `1px solid ${muted ? 'rgba(255,255,255,0.08)' : 'rgba(139,92,246,0.4)'}`,
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: muted ? 'rgba(255,255,255,0.2)' : '#8b5cf6',
        cursor: 'pointer',
        boxShadow: muted
          ? 'none'
          : '0 0 16px rgba(139,92,246,0.25), 0 4px 12px rgba(0,0,0,0.5)',
        transition: 'all 0.3s ease',
      }}
    >
      {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
    </button>
  );
}
