"use client";
import { useEffect, useRef, useState } from "react";

export function DragonCursor() {
  const [clicking, setClicking] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const segmentsRef = useRef<HTMLDivElement[]>([]);
  
  // IK-like trailing logic state
  const points = useRef(Array.from({ length: 12 }, () => ({ x: 0, y: 0, angle: 0 })));

  useEffect(() => {
    document.documentElement.style.cursor = 'none';

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    let raf: number;
    const animate = () => {
      // Head follows mouse
      points.current[0].x += (mouse.current.x - points.current[0].x) * 0.25;
      points.current[0].y += (mouse.current.y - points.current[0].y) * 0.25;

      // Segments follow previous point
      for (let i = 1; i < points.current.length; i++) {
        const p = points.current[i];
        const prev = points.current[i - 1];
        
        // Target distance between segments
        const dist = i === 1 ? 12 : 8; 
        const dx = prev.x - p.x;
        const dy = prev.y - p.y;
        const angle = Math.atan2(dy, dx);
        p.angle = angle;

        // Constraint: keep distance
        const currentDist = Math.sqrt(dx * dx + dy * dy);
        if (currentDist > dist) {
          p.x = prev.x - Math.cos(angle) * dist;
          p.y = prev.y - Math.sin(angle) * dist;
        }

        if (segmentsRef.current[i]) {
          const el = segmentsRef.current[i];
          el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.angle}rad)`;
          el.style.opacity = `${Math.max(0.2, 1 - i / points.current.length)}`;
        }
      }

      // Update Head specifically
      if (segmentsRef.current[0]) {
        const head = segmentsRef.current[0];
        const dx = mouse.current.x - points.current[0].x;
        const dy = mouse.current.y - points.current[0].y;
        const headAngle = Math.atan2(dy, dx);
        head.style.transform = `translate(${points.current[0].x}px, ${points.current[0].y}px) rotate(${headAngle}rad)`;
      }

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="dragon-container" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 99999 }}>
        {/* Head Segment */}
        <div
          ref={el => { if (el) segmentsRef.current[0] = el; }}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '24px', height: '16px',
            marginLeft: '-12px', marginTop: '-8px',
            filter: clicking ? 'drop-shadow(0 0 10px #f97316)' : 'none',
            transition: 'filter 0.2s'
          }}
        >
          <svg viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Skeletal Head */}
            <path d="M4 12C4 8 8 4 16 4C24 4 28 8 28 12C28 16 24 20 16 20C8 20 4 16 4 12Z" fill={clicking ? "#f97316" : "#ffffff"} fillOpacity="0.9" />
            <path d="M22 8L30 12L22 16" stroke={clicking ? "#fff" : "#000"} strokeWidth="1.5" />
            {/* Eyes */}
            <circle cx="20" cy="9" r="2" fill={clicking ? "#fff" : "#8b5cf6"} />
            <circle cx="20" cy="15" r="2" fill={clicking ? "#fff" : "#8b5cf6"} />
            {/* Fire on click */}
            {clicking && (
               <path d="M28 12L40 12L36 10M28 12L38 14" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" />
            )}
          </svg>
        </div>

        {/* Body Segments (Ribs/Vertebrae) */}
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            ref={el => { if (el) segmentsRef.current[i + 1] = el; }}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: i < 3 ? '20px' : '10px',
              height: i < 3 ? '16px' : '4px',
              marginLeft: i < 3 ? '-10px' : '-5px',
              marginTop: i < 3 ? '-8px' : '-2px',
              pointerEvents: 'none',
            }}
          >
            <svg viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              {i < 3 ? (
                // Ribcage segments
                <path d="M10 2L10 14M2 6C2 6 6 2 10 2C14 2 18 6 18 6M2 10C2 10 6 14 10 14C14 14 18 10 18 10" 
                  stroke={clicking ? "#f97316" : "#ffffff"} 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  opacity={0.8 - i * 0.15} 
                />
              ) : (
                // Tail vertebrae
                <rect x="6" y="6" width="8" height="4" rx="1" fill={clicking ? "#f97316" : "#ffffff"} opacity={0.6 - i * 0.05} />
              )}
            </svg>
          </div>
        ))}
      </div>

      <style>{`
        * { cursor: none !important; }
        .dragon-container svg {
          overflow: visible;
        }
      `}</style>
    </>
  );
}
