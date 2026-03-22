import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import TechnicalArsenal from "@/components/TechnicalArsenal";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Kiran Rathod | AI/ML & Creative Developer",
  description: "Personal portfolio of Kiran Rathod specializing in AI, Machine Learning, and Creative Tech.",
};

export default function Home() {
  return (
    <main className="relative bg-[#121212]">
      <Navbar />
      {/* Sticky Scroll Animation Container */}
      <div id="hero" className="relative w-full">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <About />
      <WhatIDo />
      <TechnicalArsenal />
      <Experience />
      <Achievements />

      {/* Projects Grid Section */}
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
