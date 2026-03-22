import React from "react";
import { ProfileCard } from "./ProfileCard";
import { RoleTypography } from "./RoleTypography";
import { SpotifyCard } from "./SpotifyCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import "./About.css";

export default function About() {
    return (
        <section id="about" className="about-section bg-[#0a0a0a] py-32">
            
            {/* New standard heading */}
            <div className="flex justify-center px-6" style={{ paddingBottom: '100px' }}>
                <SectionHeading
                    thinText="ABOUT"
                    boldText="ME"
                    glowChar="E"
                    glowColor="purple"
                    className="justify-center text-center w-full"
                />
            </div>

            {/* Two column layout */}
            <div 
                className="about-two-col"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5rem',
                    flexWrap: 'wrap',
                    padding: '0 5vw',
                    maxWidth: '1100px',
                    margin: '0 auto',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                {/* Left — Profile Card + Spotify Card */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
                    <ProfileCard />
                    <SpotifyCard />
                </div>

                {/* Right — Role Typography */}
                <div style={{ flex: 1, minWidth: '300px' }} className="role-typography">
                    <RoleTypography />
                </div>
            </div>
        </section>
    );
}
