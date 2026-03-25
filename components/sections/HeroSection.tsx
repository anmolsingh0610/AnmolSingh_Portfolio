"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // 3D Arrival animation for the main heading
        if (!textRef.current) return;

        gsap.fromTo(
            textRef.current.children,
            { y: 150, z: -500, opacity: 0, rotationX: -90 },
            {
                y: 0,
                z: 0,
                opacity: 1,
                rotationX: 0,
                duration: 1.8,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2
            }
        );
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen flex flex-col items-center justify-center no-baseline perspective-wrapper"
        >
            <div className="z-10 text-center pointer-events-none relative">
                <h1
                    ref={textRef}
                    className="text-6xl md:text-8xl lg:text-[10rem] font-black font-sans tracking-tighter uppercase flex flex-wrap justify-center gap-x-6 leading-none"
                >
                    <span className="inline-block transform-gpu">Anmol</span>
                    <span className="inline-block transform-gpu text-rust-500 drop-shadow-[0_0_15px_rgba(234,88,12,0.5)]">Singh</span>
                    <span className="inline-block transform-gpu w-full text-3xl md:text-5xl lg:text-6xl mt-6 text-chrome-500 tracking-wide font-normal">
                        Cybersecurity Portfolio
                    </span>
                </h1>

                <motion.p
                    className="mt-12 text-lg md:text-xl text-chrome-100 font-mono tracking-widest uppercase opacity-70"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.7, y: 0 }}
                    transition={{ delay: 1.8, duration: 1 }}
                >
                    Scroll to explore profile
                </motion.p>
            </div>

            {/* Floating magnetic UI badge */}
            <motion.div
                className="absolute bottom-12 border border-chrome-500/30 rounded-full px-8 py-3 glass-panel font-mono text-xs tracking-widest uppercase text-chrome-100 cursor-pointer"
                data-magnetic="true"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(15, 23, 42, 0.7)" }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.2, type: "spring", stiffness: 200, damping: 20 }}
            >
                <span>STATUS: NOMINAL / SYSTEM ONLINE</span>
            </motion.div>
        </section>
    );
}
