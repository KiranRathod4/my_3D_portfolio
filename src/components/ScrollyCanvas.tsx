"use client";

import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth out the scroll progress to avoid jank
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map smooth scroll progress (0-1) to frame index (0-119)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

    // Preload images
    useEffect(() => {
        const preloadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loadedCount = 0;

            for (let i = 1; i <= FRAME_COUNT; i++) {
                const img = new Image();
                // Adjust the naming to match the actual files: ezgif-frame-001.png
                const frameNum = String(i).padStart(3, "0");
                img.src = `/sequence/ezgif-frame-${frameNum}.png`;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === FRAME_COUNT) {
                        setIsLoaded(true);
                    }
                };
                loadedImages.push(img);
            }
            setImages(loadedImages);
        };

        preloadImages();
    }, []);

    // Update canvas when frameIndex or images change
    useEffect(() => {
        const updateCanvas = (index: number) => {
            if (images.length > 0 && canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext("2d", { alpha: false }); // Optimize for non-transparent backgrounds
                const img = images[Math.floor(index)];

                if (context && img) {
                    // Clear canvas (only if necessary - better for performance if we don't clear when drawing over the full area)
                    // context.clearRect(0, 0, canvas.width, canvas.height);

                    // Calculate aspect ratio for "object-fit: cover" logic
                    const canvasAspect = canvas.width / canvas.height;
                    const imgAspect = img.width / img.height;

                    let drawWidth = canvas.width;
                    let drawHeight = canvas.height;
                    let offsetX = 0;
                    let offsetY = 0;

                    if (canvasAspect > imgAspect) {
                        drawHeight = canvas.width / imgAspect;
                        offsetY = (canvas.height - drawHeight) / 2;
                    } else {
                        drawWidth = canvas.height * imgAspect;
                        offsetX = (canvas.width - drawWidth) / 2;
                    }

                    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                }
            }
        };

        // Listen to changes in frameIndex
        const unsubscribe = frameIndex.on("change", (latest) => {
            updateCanvas(latest);
        });

        // Initial draw
        if (isLoaded) {
            updateCanvas(0);
        }

        return () => unsubscribe();
    }, [images, frameIndex, isLoaded]);

    // Resize canvas to fill the screen
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize, { passive: true });
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[500vh] w-full bg-[#121212]" style={{ contain: 'layout style' }}>
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="h-full w-full object-cover"
                    style={{
                        willChange: 'transform',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden',
                    }}
                />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
                    </div>
                )}
            </div>
        </div>
    );
}
