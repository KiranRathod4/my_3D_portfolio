import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kiran Rathod | AI/ML & Creative Developer",
  description: "Personal portfolio of Kiran Rathod specializing in AI, Machine Learning, and Creative Tech.",
};

import { DragonCursor } from "@/components/DragonCursor";
import IntroLoader from "@/components/IntroLoader";
import SocialIcons from "@/components/SocialIcons";
import HeadingReveal from "@/components/HeadingReveal";
import { AudioManager } from "@/components/AudioManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased font-sans bg-[#121212]`} suppressHydrationWarning>
        <IntroLoader />
        <DragonCursor />
        <SocialIcons />
        <HeadingReveal />
        <AudioManager />
        {children}
      </body>
    </html>
  );
}



