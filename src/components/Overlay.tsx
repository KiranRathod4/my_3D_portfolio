"use client";

import React from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // Animation values for sections
    const section1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const section1Y = useTransform(scrollYProgress, [0, 0.2], [0, -40]);

    const section2Opacity = useTransform(scrollYProgress, [0.22, 0.35, 0.48], [0, 1, 0]);
    const section2Y = useTransform(scrollYProgress, [0.22, 0.48], [40, 0]);

    const section3Opacity = useTransform(scrollYProgress, [0.52, 0.65, 0.78], [0, 1, 0]);
    const section3Y = useTransform(scrollYProgress, [0.52, 0.78], [40, 0]);

    const rolesOpacity = useTransform(scrollYProgress, [0.82, 0.95], [0, 1]);

    return (
        <div className="pointer-events-none absolute inset-0 z-10 w-full">
            {/* Section 1: Intro */}
            <section id="home" className="flex h-screen w-full items-center justify-center px-[5vw]">
                <motion.div
                    style={{ opacity: section1Opacity, y: section1Y }}
                    className="text-center"
                >
                    <h1 className="text-[clamp(3.5rem,8vw,8rem)] font-space font-black uppercase tracking-tighter text-white leading-none">
                        KIRAN <span className="text-[#4b5563]">RATHOD</span>
                    </h1>
                    <p className="mt-6 text-[clamp(1rem,2vw,1.5rem)] font-mono font-medium text-white/40 tracking-[0.2em] uppercase">
                        AI & MLOps Enthusiast
                    </p>
                </motion.div>
            </section>

            {/* Section 2: Core Philosophy */}
            <section className="flex h-screen w-full items-center px-[5vw]">
                <motion.div
                    style={{ opacity: section2Opacity, y: section2Y }}
                    className="max-w-3xl text-left"
                >
                    <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-space font-black text-white leading-tight uppercase">
                        ENCODING <br />
                        <span className="text-[#4b5563]">INTELLIGENCE.</span>
                    </h2>
                    <p className="mt-8 text-xl text-white/50 leading-relaxed font-medium">
                        Bridging the gap between complex neural architectures and seamless engineering to build digital experiences that matter.
                    </p>
                </motion.div>
            </section>

            {/* Section 3: Engineering and Design */}
            <section className="flex h-screen w-full items-center justify-end px-[5vw]">
                <motion.div
                    style={{ opacity: section3Opacity, y: section3Y }}
                    className="max-w-3xl text-right"
                >
                    <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-space font-black text-white leading-none uppercase">
                        SCALABLE <br />
                        <span className="text-[#4b5563]">ENGINEERING.</span>
                    </h2>
                    <p className="mt-8 text-xl text-white/50 font-medium italic">
                        Crafting high-performance MLOps pipelines and intelligent production systems.
                    </p>
                </motion.div>
            </section>

            {/* Section 4: Roles Highlight */}
            <section className="flex h-screen w-full flex-col items-center justify-center bg-transparent px-[5vw]">
                <motion.div
                    style={{ opacity: rolesOpacity }}
                    className="grid grid-cols-1 gap-4 text-center md:grid-cols-3 md:gap-x-12 md:gap-y-8"
                >
                    {[
                        "MLOps Engineer",
                        "AI Researcher",
                        "DevOps Specialist",
                        "Data Architect",
                        "QA Automator",
                    ].map((role) => (
                        <div
                            key={role}
                            className="rounded-full border border-white/10 bg-white/5 py-4 px-10 backdrop-blur-md transition-all hover:border-[#8b5cf6]/30 hover:bg-[#8b5cf6]/5"
                        >
                            <span className="text-sm font-mono font-bold tracking-[0.15em] text-white uppercase">
                                {role}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </section>
        </div>
    );
}
