"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "What I Do", href: "#what-i-do" },
    { name: "Arsenal", href: "#arsenal" },
    { name: "Experience", href: "#experience" },
    { name: "Achievements", href: "#achievements" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const playNavClick = () => {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);

        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.06);
    };

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        playNavClick();
        const targetId = href.replace("#", "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
    };

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 flex items-center h-[70px] ${isScrolled
                ? "bg-transparent backdrop-blur-md border-b border-white/5"
                : "bg-transparent"
                }`}
        >
            <div className="w-full px-[5vw] flex items-center justify-between">
                {/* Logo */}
                <Link
                    href="#home"
                    onClick={(e) => {
                        playNavClick();
                        scrollToSection(e, "#home");
                    }}
                    className="text-[1.3rem] font-space font-[800] text-white tracking-tighter"
                >
                    KIRAN<span className="text-[#8b5cf6]">.</span>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center gap-[2.5rem]">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={(e) => scrollToSection(e, link.href)}
                            className="relative text-[0.9rem] font-medium text-white/70 hover:text-white transition-colors tracking-[0.02em] group py-1"
                        >
                            {link.name}
                            {/* Slide-in Underline */}
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#8b5cf6] transition-all duration-300 ease-in-out group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden flex flex-col gap-1.5 p-2 transition-all duration-300"
                    onClick={() => {
                        playNavClick();
                        toggleMobileMenu();
                    }}
                    aria-label="Toggle Menu"
                >
                    <span style={{ 
                        width: '22px', height: '2px', background: '#fff', display: 'block',
                        transform: isMobileMenuOpen ? 'rotate(45deg) translateY(5.5px)' : 'none',
                        transition: '0.3s' 
                    }} />
                    <span style={{ 
                        width: '22px', height: '2px', background: '#fff', display: 'block',
                        opacity: isMobileMenuOpen ? 0 : 1, transition: '0.3s' 
                    }} />
                    <span style={{ 
                        width: '22px', height: '2px', background: '#fff', display: 'block',
                        transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-5.5px)' : 'none',
                        transition: '0.3s' 
                    }} />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 99,
                            background: 'rgba(10,10,10,0.97)',
                            backdropFilter: 'blur(20px)',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            gap: '2rem',
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.href)}
                                style={{
                                    fontFamily: 'Syne, sans-serif', 
                                    fontWeight: 700,
                                    fontSize: '2rem', 
                                    color: '#fff', 
                                    textDecoration: 'none',
                                    transition: 'color 0.2s',
                                }}
                                className="hover:text-[#8b5cf6]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
