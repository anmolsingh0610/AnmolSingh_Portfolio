"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
    { url: "https://github.com/anmolsingh0610/SPM", title: "Secure Password Manager", type: "Security", distance: 220, speed: 20, size: 140, color: "#ea580c" },
    { url: "https://github.com/anmolsingh0610/CCT", title: "Caesar Cipher Tool", type: "Cryptography", distance: 350, speed: 30, size: 120, color: "#38bdf8" },
];

export default function ProjectsSection() {
    return (
        <section className="w-full min-h-screen py-24 flex flex-col items-center justify-center perspective-wrapper relative z-20 overflow-hidden">
            <div className="max-w-7xl w-full px-8 md:px-24 flex flex-col items-center gap-16">
                <motion.div
                    className="flex flex-col items-center gap-4 text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <h2 className="text-4xl md:text-6xl font-black text-chrome-100 uppercase tracking-tighter">
                        Orbital <span className="text-rust-500 line-through decoration-chrome-500">Deployments</span> Projects
                    </h2>
                    <p className="text-chrome-500 font-mono text-sm max-w-lg uppercase tracking-widest">
                        Select a celestial body to intercept its mission parameters.
                    </p>
                </motion.div>

                <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center my-12">
                    {/* Central Star representing the developer */}
                    <motion.div
                        className="w-24 h-24 rounded-full bg-chrome-100 shadow-[0_0_60px_rgba(241,245,249,0.9)] z-10 flex items-center justify-center font-mono font-bold text-void"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        CORE
                    </motion.div>

                    {/* Orbits and Planets */}
                    {projects.map((proj, i) => (
                        <div key={proj.url} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            {/* Orbit Ring */}
                            <div
                                className="absolute rounded-full border border-chrome-500/20"
                                style={{ width: proj.distance * 2, height: proj.distance * 2 }}
                            />

                            {/* Planet Wrapper for continuous rotation */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                // Start each planet at a different rotation to prevent clumping
                                initial={{ rotate: i * 120 }}
                                transition={{ duration: proj.speed, repeat: Infinity, ease: "linear" }}
                            >
                                {/* Counter-rotate the actual planet so text stays upright */}
                                <motion.div
                                    className="absolute pointer-events-auto cursor-pointer"
                                    style={{ top: `calc(50% - ${proj.distance}px)` }}
                                    animate={{ rotate: -360 }}
                                    initial={{ rotate: -i * 120 }}
                                    transition={{ duration: proj.speed, repeat: Infinity, ease: "linear" }}
                                >
                                    <a href={proj.url} target="_blank" rel="noopener noreferrer">
                                        <div
                                            className="group flex flex-col items-center gap-2"
                                            data-magnetic="true"
                                        >
                                            <div
                                                className="rounded-full shadow-lg transition-transform group-hover:scale-125"
                                                style={{
                                                    width: proj.size,
                                                    height: proj.size,
                                                    backgroundColor: proj.color,
                                                    boxShadow: `0 0 25px ${proj.color}90`
                                                }}
                                            />
                                            <span className="font-mono text-base md:text-lg font-bold bg-void/90 px-4 py-2 rounded border border-chrome-900 absolute top-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                                                {proj.title}
                                            </span>
                                        </div>
                                    </a>
                                </motion.div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
