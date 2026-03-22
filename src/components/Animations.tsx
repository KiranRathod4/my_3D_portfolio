"use client";

import React from "react";
import { motion, useInView } from "framer-motion";

interface RevealTextProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const RevealHeading = ({ children, className, delay = 0 }: RevealTextProps) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });

    return (
        <div ref={ref} className={`reveal-container ${className}`}>
            <motion.div
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1], delay }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export const FadeUp = ({ children, delay = 0, className = "" }: RevealTextProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export const StaggerContainer = ({ children, staggerDelay = 0.1, delay = 0 }: { children: React.ReactNode, staggerDelay?: number, delay?: number }) => {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: staggerDelay,
                        delayChildren: delay
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
};

export const StaggerItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
        >
            {children}
        </motion.div>
    );
};
