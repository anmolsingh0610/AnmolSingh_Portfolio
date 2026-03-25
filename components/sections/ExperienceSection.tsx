"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
    { company: "Lovely Professional University", role: "B.Tech Computer Science & Engineering", year: "2023", tech: ["CGPA: 7.53", "Linux", "Cybersecurity"], x: 10, y: 15 },
    { company: "Sunbeam School", role: "Intermediate", year: "2021-2022", tech: ["Score: 77.6%", "Physics", "Chemistry"], x: 55, y: 40 },
    { company: "Sunbeam School", role: "Matriculation", year: "2019-2020", tech: ["Score: 93.4%", "Science", "Maths"], x: 25, y: 75 },
];

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!pathRef.current || !containerRef.current || isMobile) return;

        const length = pathRef.current.getTotalLength();
        gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });

        // Draw the flight path strictly based on scroll progress through the overarching container
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => {
                gsap.to(pathRef.current, {
                    strokeDashoffset: length - (length * self.progress),
                    duration: 0.2,
                    ease: "none",
                    overwrite: "auto"
                });
            }
        });

        return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
    }, [isMobile]);

    return (
        <section ref={containerRef} className="w-full min-h-[150vh] py-24 flex flex-col items-center justify-start perspective-wrapper relative z-20">
            <div className="max-w-7xl w-full px-8 md:px-24 flex flex-col gap-12 relative h-full">

                <motion.div
                    className="flex flex-col gap-2 relative z-30"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-chrome-100 uppercase tracking-tighter">
                        Flight <span className="text-rust-500">Path</span>
                    </h2>
                    <p className="text-chrome-500 font-mono text-sm tracking-widest uppercase mb-12">Educational & Training Trajectory</p>
                </motion.div>

                {/* The SVG Flight Path Map */}
                {!isMobile && (
                    <div className="absolute top-[200px] bottom-0 left-0 w-full pointer-events-none z-10 opacity-40">
                        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                            <path
                                ref={pathRef}
                                d="M10,15 C 80,15 0,60 25,75"
                                fill="none"
                                stroke="#ea580c"
                                strokeWidth="0.4"
                                strokeLinecap="round"
                                vectorEffect="non-scaling-stroke"
                                className="drop-shadow-[0_0_12px_rgba(234,88,12,1)]"
                            />
                        </svg>
                    </div>
                )}

                {/* Waypoints */}
                <div className="relative w-full h-auto md:h-[800px] mt-12 flex flex-col md:block gap-12">
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={i}
                            className="md:absolute flex flex-col gap-3 group"
                            style={{
                                left: !isMobile ? `${exp.x}%` : 'auto',
                                top: !isMobile ? `${exp.y}%` : 'auto',
                                transform: !isMobile ? 'translate(-12px, -12px)' : 'none'
                            }}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.2 }}
                        >
                            {/* Waypoint Marker */}
                            <div
                                className="w-6 h-6 rounded-full bg-void border-2 border-rust-500 shadow-[0_0_15px_rgba(234,88,12,0.8)] flex items-center justify-center group-hover:bg-rust-500 transition-colors z-20 cursor-crosshair"
                                data-magnetic="true"
                            >
                                <div className="w-2 h-2 bg-chrome-100 rounded-full" />
                            </div>

                            {/* Expanded Details Panel */}
                            <div
                                className="glass-panel p-6 rounded-xl border border-chrome-500/30 md:w-80 relative z-30 group-hover:border-rust-500/50 transition-colors cursor-pointer opacity-80 group-hover:opacity-100 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(15,23,42,1)] duration-300"
                                data-magnetic="true"
                            >
                                <span className="text-rust-500 font-mono text-xs tracking-widest block mb-2">{exp.year}</span>
                                <h3 className="text-xl md:text-2xl font-black text-chrome-100 uppercase tracking-tight">{exp.company}</h3>
                                <p className="text-chrome-500 text-sm mt-1">{exp.role}</p>
                                <div className="flex flex-wrap gap-2 mt-4 font-mono text-xs">
                                    {exp.tech.map(t => (
                                        <span key={t} className="px-2 py-1 bg-void/50 border border-chrome-900 rounded-sm text-chrome-100">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
