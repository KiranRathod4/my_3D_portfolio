import { cn } from "@/lib/utils";

export function DotBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Dot grid */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundSize: '20px 20px',
          backgroundImage: 'radial-gradient(rgba(139,92,246,0.35) 1px, transparent 1px)',
        }}
      />
      {/* Center fade mask — fades dots toward edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #0a0a0a 80%)',
        }}
      />
    </div>
  );
}
