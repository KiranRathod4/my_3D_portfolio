"use client";
import { useState, useRef, useEffect } from "react";
import { Mic, Square, Send, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const MAX_SECONDS = 60;

export function VoiceMessageRecorder() {
  const [status, setStatus] = useState<'idle'|'recording'|'preview'|'denied'>('idle');
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string|null>(null);
  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout|null>(null);

  useEffect(() => { 
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startRecording = async () => {
    (window as any).__pauseAmbient?.();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        setStatus('preview');
        stream.getTracks().forEach(t => t.stop());
      };
      recorder.start();
      setStatus('recording');
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= MAX_SECONDS - 1) { 
            stopRecording(); 
            return MAX_SECONDS; 
          }
          return prev + 1;
        });
      }, 1000);
    } catch {
      setStatus('denied');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
    (window as any).__resumeAmbient?.();
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    setStatus('idle');
    setAudioUrl(null);
    setRecordingTime(0);
  };

  const sendMessage = () => {
    window.location.href = `mailto:kiranrathod4299@gmail.com?subject=Voice Message from Portfolio&body=Hi Kiran, I recorded a voice message on your portfolio. Please follow up with me so I can share it directly.`;
  };

  const isRecording = status === 'recording';

  return (
    <div style={{
      width: '100%',
      maxWidth: '480px',
      background: 'rgba(17,17,17,0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '24px',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(to right, transparent, rgba(139,92,246,0.6), transparent)',
      }} />

      <div style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.65rem',
        color: '#6b7280',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        marginBottom: '1.5rem',
      }}>
        Leave a Voice Note
      </div>

      {status === 'preview' && audioUrl ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <audio controls src={audioUrl} style={{ width: '100%', height: '40px', accentColor: '#8b5cf6', filter: 'invert(0)' }} />
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button onClick={sendMessage} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.4rem', borderRadius: '9999px',
              background: '#8b5cf6', border: 'none',
              color: '#fff', fontSize: '0.85rem', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.05em',
              boxShadow: '0 0 16px rgba(139,92,246,0.4)',
            }}>
              <Send size={14} /> Send
            </button>
            <button onClick={reset} style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 1.2rem', borderRadius: '9999px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem',
              cursor: 'pointer',
            }}>
              <RotateCcw size={14} /> Retry
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Mic / Stop button */}
          <button
            onClick={() => isRecording ? stopRecording() : startRecording()}
            style={{
              width: '56px', height: '56px',
              borderRadius: '50%',
              flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isRecording ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
              border: isRecording ? '2px solid #ef4444' : '1px solid rgba(255,255,255,0.1)',
              color: isRecording ? '#ef4444' : '#ffffff',
              cursor: 'pointer',
              animation: isRecording ? 'recPulse 1.5s ease-in-out infinite' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {isRecording
              ? <Square size={22} style={{ fill: '#ef4444' }} />
              : <Mic size={22} />
            }
          </button>

          {/* Visualizer bars */}
          <div style={{ flex: 1, height: '48px', display: 'flex', alignItems: 'center', gap: '3px', justifyContent: 'center' }}>
            {[...Array(28)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  height: isRecording
                    ? ['20%', `${40 + Math.random() * 60}%`, '20%']
                    : '20%'
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.04,
                }}
                style={{
                  width: '3px',
                  background: isRecording
                    ? 'rgba(139,92,246,0.7)'
                    : 'rgba(139,92,246,0.2)',
                  borderRadius: '9999px',
                  boxShadow: isRecording ? '0 0 4px rgba(139,92,246,0.5)' : 'none',
                  transition: 'background 0.3s, box-shadow 0.3s',
                }}
              />
            ))}
          </div>

          {/* Timer */}
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.9rem',
            color: '#8b5cf6',
            minWidth: '36px',
            textAlign: 'right',
            flexShrink: 0,
          }}>
            0:{recordingTime.toString().padStart(2, '0')}
          </span>
        </div>
      )}
      
      {status === 'denied' && (
        <p style={{ color: '#f87171', fontSize: '0.75rem', marginTop: '1rem', fontFamily: 'DM Mono, monospace' }}>
          Microphone access needed.
        </p>
      )}

      <style>{`
        @keyframes recPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { box-shadow: 0 0 0 8px rgba(239,68,68,0); }
        }
      `}</style>
    </div>
  );
}
