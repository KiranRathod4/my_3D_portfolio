"use client";
import { motion } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const PROJECTS = [
  {
    id: 1,
    title: "Predictive Maintenance with MLOps",
    desc: "End-to-end MLOps system predicting aircraft engine RUL using NASA C-MAPSS data. FastAPI endpoints, MLflow tracking, Prometheus + Grafana monitoring, AWS EC2 CI/CD.",
    image: "/projects/mlops.jpg",
    tags: ["Python", "MLflow", "FastAPI", "AWS"],
    github: "https://github.com/KiranRathod4/Predictive-Maintenance-with-MLOps",
    live: "https://predictive-maintenance-with-ml-ops.vercel.app/",
    hasLive: true,
    color: '#8b5cf6',
  },
  {
    id: 2,
    title: "AI-Powered Resume Agent",
    desc: "Intelligent recruitment assistant with LangChain RAG + FAISS. Bulk processes 50+ resumes, improves ATS pass rate by 40%, dual LLM support (Llama 3.2 + GPT-4).",
    image: "/projects/resume-agent.jpg",
    tags: ["LangChain", "Ollama", "FAISS", "Streamlit"],
    github: "https://github.com/KiranRathod4/AI-powered-resume_agent",
    live: "https://github.com/KiranRathod4/AI-powered-resume_agent",
    hasLive: false,
    color: '#22d3ee',
  },
  {
    id: 3,
    title: "Netflix Data Analysis",
    desc: "EDA on Netflix's content catalog using Python and Pandas. Uncovers genre trends, release year patterns, and content type distribution with rich visualizations.",
    image: "/projects/netflix.jpg",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    github: "https://github.com/KiranRathod4/Netflix_data_analysis",
    live: "https://github.com/KiranRathod4/Netflix_data_analysis",
    hasLive: false,
    color: '#f97316',
  },
  {
    id: 4,
    title: "Chat with your Codebase RAG",
    desc: "RAG system using LangChain + local LLMs (Ollama) + FAISS to answer context-aware queries about any codebase's structure and logic.",
    image: "/projects/codebase-rag.jpg",
    tags: ["LangChain", "Ollama", "FAISS", "Python"],
    github: "https://github.com/KiranRathod4/Chat-with-your-codebase-RAG",
    live: "https://github.com/KiranRathod4/Chat-with-your-codebase-RAG",
    hasLive: false,
    color: '#22c55e',
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      containerRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#0a0a0a] py-32 pl-6 md:pl-12 lg:pl-24 overflow-hidden"
    >
      {/* Heading row */}
      <div className="flex flex-col items-center pr-6 md:pr-12 lg:pr-24" style={{ paddingBottom: '100px' }}>
        <SectionHeading
          thinText=""
          boldText="PROJECTS"
          glowChar="S"
          glowColor="cyan"
          className="mb-0 justify-center"
        />

        {/* Nav arrows below heading on mobile, or just centered */}
        <div className="hidden md:flex gap-4 mt-8">
          <button
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:border-purple-500 hover:text-purple-500 hover:bg-purple-500/10"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:border-purple-500 hover:text-purple-500 hover:bg-purple-500/10"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Scrollable cards row */}
      <div
        ref={containerRef}
        className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', paddingRight: '6rem' }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.id}
            className="group relative flex-shrink-0 snap-start overflow-hidden cursor-pointer"
            style={{
              width: '350px',
              height: '450px',
              borderRadius: '24px',
              background: '#111111',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'border-color 0.3s ease',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = project.color + '66'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            {/* Image — shrinks on hover */}
            <div
              className="absolute inset-x-0 top-0 w-full overflow-hidden transition-all duration-500"
              style={{
                height: '100%',
              }}
            >
              <div
                className="w-full h-full group-hover:h-[50%] transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.parentElement as HTMLElement).style.background =
                      'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';
                  }}
                />
              </div>
            </div>

            {/* Hover content panel — slides up from bottom */}
            <div
              className="absolute bottom-0 inset-x-0 flex flex-col p-6 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              style={{
                height: '55%',
                background: 'rgba(22,22,22,0.97)',
                backdropFilter: 'blur(16px)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.6rem',
                    color: project.color,
                    padding: '2px 8px',
                    background: `${project.color}12`,
                    border: `1px solid ${project.color}30`,
                    borderRadius: '9999px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#ffffff',
                marginBottom: '0.4rem',
                lineHeight: 1.3,
              }}>
                {project.title}
              </h3>

              {/* Description */}
              <p style={{
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.5)',
                lineHeight: 1.6,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                marginBottom: 'auto',
              }}>
                {project.desc}
              </p>

              {/* Action buttons */}
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.8rem' }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 transition-colors duration-200"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontFamily: 'DM Mono, monospace',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.09)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                >
                  <Github size={13} /> Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className="flex-1 flex items-center justify-center gap-2 transition-colors duration-200"
                  style={{
                    padding: '0.5rem',
                    borderRadius: '12px',
                    background: project.hasLive ? `${project.color}15` : 'rgba(255,255,255,0.03)',
                    border: project.hasLive ? `1px solid ${project.color}40` : '1px solid rgba(255,255,255,0.06)',
                    color: project.hasLive ? project.color : 'rgba(255,255,255,0.25)',
                    fontSize: '0.72rem',
                    fontFamily: 'DM Mono, monospace',
                    textDecoration: 'none',
                    cursor: project.hasLive ? 'pointer' : 'default',
                  }}
                >
                  <ExternalLink size={13} />
                  {project.hasLive ? 'Live' : 'Coming Soon'}
                </a>
              </div>
            </div>

            {/* Default state — title visible before hover */}
            <div
              className="absolute bottom-0 left-0 w-full p-8 z-20 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none"
            >
              <h3 style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1.3rem',
                color: '#ffffff',
                marginBottom: '0.4rem',
                textShadow: '0 2px 8px rgba(0,0,0,0.8)',
              }}>
                {project.title}
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    color: 'rgba(255,255,255,0.6)',
                    textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Corner arrow button */}
            <div
              className="absolute top-5 right-5 z-30 flex items-center justify-center transition-all duration-300 group-hover:-rotate-45"
              style={{
                width: '38px', height: '38px',
                borderRadius: '50%',
                background: 'rgba(17,17,17,0.8)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#ffffff',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = project.color;
                e.currentTarget.style.borderColor = project.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(17,17,17,0.8)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              <ArrowUpRight size={18} />
            </div>

            {/* Spotlight glow on hover */}
            <div
              className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${project.color}18 0%, transparent 60%)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Hide scrollbar globally for this element */}
      <style>{`
        #projects .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
