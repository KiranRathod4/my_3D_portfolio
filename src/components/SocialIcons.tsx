"use client";

import React, { useEffect } from "react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import "./SocialIcons.css";

const socialLinks = [
    { icon: <FaGithub />, href: "https://github.com/KiranRathod4" },
    { icon: <FaLinkedinIn />, href: "https://www.linkedin.com/in/kiranrathod05/" },
    { icon: <MdOutlineEmail />, href: "mailto:kiranrathod4299@gmail.com" },
    { icon: <FaInstagram />, href: "https://www.instagram.com/" },
];

export default function SocialIcons() {
    useEffect(() => {
        const heroSection = document.getElementById("hero");
        const leftContainer = document.querySelector(".social-container-left") as HTMLElement;
        const rightContainer = document.querySelector(".resume-container-right") as HTMLElement;

        const handleScrollVisibility = () => {
            if (!heroSection || !leftContainer || !rightContainer) return;
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            
            if (window.scrollY > heroBottom - 100) {
                leftContainer.style.opacity = "0";
                leftContainer.style.pointerEvents = "none";
                leftContainer.style.transform = "translateY(20px)";
                
                rightContainer.style.opacity = "0";
                rightContainer.style.pointerEvents = "none";
                rightContainer.style.transform = "translateY(20px)";
            } else {
                leftContainer.style.opacity = "1";
                leftContainer.style.pointerEvents = "auto";
                leftContainer.style.transform = "translateY(0px)";
                
                rightContainer.style.opacity = "1";
                rightContainer.style.pointerEvents = "auto";
                rightContainer.style.transform = "translateY(0px)";
            }
        };

        window.addEventListener("scroll", handleScrollVisibility);
        handleScrollVisibility(); // run once on mount

        return () => window.removeEventListener("scroll", handleScrollVisibility);
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        target.style.setProperty("--siLeft", `${x}px`);
        target.style.setProperty("--siTop", `${y}px`);
    };

    return (
        <div className="social-icons" data-cursor="icons">
            {/* Left Side: Social Icons */}
            <div className="social-container-left">
                {socialLinks.map((link, idx) => (
                    <a
                        key={idx}
                        href={link.href}
                        target={link.href.startsWith("mailto") ? undefined : "_blank"}
                        rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                        className="social-icon-btn"
                        onMouseMove={handleMouseMove}
                    >
                        <span className="icon-wrapper">{link.icon}</span>
                    </a>
                ))}
                <div className="social-line"></div>
            </div>

            {/* Right Side: Resume Button */}
            <div className="resume-container-right">
                <a
                    href="https://github.com/KiranRathod4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-text-btn"
                    onMouseMove={handleMouseMove}
                >
                    RESUME
                </a>
                <div className="social-line"></div>
            </div>
        </div>
    );
}
