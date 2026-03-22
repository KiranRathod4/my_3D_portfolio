"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroLoader() {
    const [isVisible, setIsVisible] = useState(true);
    const text = "KIRAN RATHOD";
    const letters = text.split("");

    useEffect(() => {
        // Total animation duration is 3s.
        // 2.5s for text + progress, then panels slide off.
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100000] flex flex-col items-center justify-center overflow-hidden bg-black"
                >
                    {/* Top Panel */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="absolute top-0 left-0 h-1/2 w-full bg-black"
                    />

                    {/* Bottom Panel */}
                    <motion.div
                        initial={{ y: 0 }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                        className="absolute bottom-0 left-0 h-1/2 w-full bg-black"
                    />

                    {/* Grain Texture */}
                    <div className="grain-overlay" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="flex overflow-hidden pb-4">
                            {letters.map((letter, idx) => (
                                <motion.span
                                    key={idx}
                                    initial={{ y: 80, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.8,
                                        delay: idx * 0.06,
                                        ease: [0.33, 1, 0.68, 1],
                                    }}
                                    className={`text-6xl font-black tracking-tighter text-white md:text-8xl ${letter === " " ? "mr-4 md:mr-8" : ""
                                        }`}
                                >
                                    {letter}
                                </motion.span>
                            ))}
                        </div>

                        {/* Progress Line */}
                        <div className="relative mt-8 h-[1px] w-64 overflow-hidden bg-white/20">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "0%" }}
                                transition={{
                                    duration: 2.5,
                                    ease: "easeInOut",
                                }}
                                className="h-full w-full bg-white"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
