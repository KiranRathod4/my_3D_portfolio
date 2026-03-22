"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface GalleryHoverCarouselItem {
  id: string;
  title: string;
  summary: string;
  url: string;
  githubUrl?: string;
  image: string;
}

export default function GalleryHoverCarousel({
  heading = "Featured Projects",
  demoUrl = "#",
  items = [],
}: {
  heading?: string;
  demoUrl?: string;
  items?: GalleryHoverCarouselItem[];
}) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  // Carousel scroll tracking
  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };
    update();
    carouselApi.on("select", update);
    return () => {
      carouselApi.off("select", update);
    };
  }, [carouselApi]);

  return (
    <section className="py-16" style={{ background: 'transparent' }}>
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col justify-end md:mb-16 md:flex-row md:items-end lg:mb-20">
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              className="h-12 w-12 rounded-full hover:border-[#8b5cf6]/50 transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              className="h-12 w-12 rounded-full hover:border-[#8b5cf6]/50 transition-all"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#fff',
                backdropFilter: 'blur(8px)',
              }}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="w-full max-w-full">
          <Carousel
            setApi={setCarouselApi}
            opts={{ 
              breakpoints: { "(max-width: 768px)": { dragFree: true, slidesToScroll: 1 } }, 
              align: 'start', 
              loop: true,
              slidesToScroll: 2
            } as any}
            className="relative w-full max-w-full"
          >
            <CarouselContent className="hide-scrollbar w-full max-w-[1400px] mx-auto md:ml-12 md:-mr-12">
              {items.map((item) => (
                <CarouselItem key={item.id} className="pl-16 md:basis-1/2">
                  <motion.div 
                    whileHover={{ y: -15 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="group block relative w-full h-[380px] md:h-[480px]"
                  >
                    <Card 
                      className="overflow-hidden h-full w-full rounded-[32px] transition-shadow duration-700 group-hover:shadow-[0_30px_60px_rgba(139,92,246,0.2)]"
                      style={{ border: '1px solid rgba(255,255,255,0.08)', background: '#090909' }}
                    >
                      {/* Image */}
                      <div className="relative h-full w-full transition-all duration-700 group-hover:h-[45%]">
                        <Image
                          width={600}
                          height={600}
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover object-center grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.style.background =
                              'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)';
                          }}
                        />
                        {/* Fade overlay at bottom */}
                        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>

                      {/* Text Section (Reveal on hover) */}
                      <div 
                        className="absolute bottom-0 left-0 w-full px-10 pb-10 transition-all duration-700 h-0 group-hover:h-[55%] flex flex-col justify-center opacity-0 group-hover:opacity-100 overflow-hidden"
                        style={{ background: 'rgba(9,9,9,0.98)', backdropFilter: 'blur(20px)' }}
                      >
                        <h3 style={{ color: '#ffffff', fontFamily: 'var(--display, sans-serif)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.03em' }}>{item.title}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--body, sans-serif)', fontSize: '0.95rem', marginTop: '10px', lineHeight: '1.7' }} className="line-clamp-2">
                          {item.summary}
                        </p>
                        
                        {/* Links section */}
                        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                          {item.githubUrl && (
                            <a href={item.githubUrl} target="_blank" rel="noopener noreferrer"
                              className="hover:bg-white/10 transition-all duration-300"
                              style={{
                                padding: '0.5rem 1.2rem', borderRadius: '9999px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                fontSize: '0.7rem', color: 'rgba(255,255,255,0.7)',
                                fontFamily: 'var(--mono, monospace)', letterSpacing: '0.05em',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                              }}
                            >
                              GITHUB ↗
                            </a>
                          )}
                          {item.url && item.url !== item.githubUrl && (
                            <a href={item.url} target="_blank" rel="noopener noreferrer"
                               className="hover:bg-[#8b5cf6]/20 transition-all duration-300"
                              style={{
                                padding: '0.5rem 1.2rem', borderRadius: '9999px',
                                background: 'rgba(139,92,246,0.15)',
                                border: '1px solid rgba(139,92,246,0.4)',
                                fontSize: '0.7rem', color: '#c084fc',
                                fontFamily: 'var(--mono, monospace)', letterSpacing: '0.05em',
                                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px',
                              }}
                            >
                              LIVE DEMO ↗
                            </a>
                          )}
                        </div>

                        <Link
                          href={item.url}
                          style={{
                            background: 'rgba(139,92,246,0.25)',
                            border: '1px solid rgba(139,92,246,0.5)',
                            color: '#fff',
                          }}
                          className="absolute bottom-8 right-10 h-12 w-12 rounded-full flex items-center justify-center hover:-rotate-45 transition-all duration-700 shadow-[0_0_25px_rgba(139,92,246,0.3)]"
                        >
                          <ArrowRight size={22} />
                        </Link>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
