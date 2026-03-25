"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

type GithubData = { totalContributions: number; heatmap: number[][]; pullRequests: number; stars: number };
type LeetcodeData = { totalSolved: number; easy: number; medium: number; hard: number; ranking: number };

export default function StatsSection() {
    return (
        <section className="w-full min-h-screen py-24 flex flex-col items-center justify-center perspective-wrapper relative z-20">
            <div className="max-w-7xl w-full px-8 md:px-24 flex flex-col gap-16">

                <motion.div
                    className="flex flex-col gap-2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-rust-500 font-mono tracking-widest text-sm">— TELEMETRY</span>
                        <div className="h-px bg-chrome-900 w-24"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-chrome-100 uppercase tracking-tighter">
                        Live <span className="text-chrome-500">Data</span>
                    </h2>
                </motion.div>

                <div className="flex justify-center w-full">
                    {/* Kinetic Energy Meters (Certifications) */}
                    <motion.div
                        className="glass-panel p-8 rounded-2xl border border-chrome-500/20 flex flex-col gap-8 w-full max-w-2xl"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.2 }}
                        data-magnetic="true"
                    >
                        <h3 className="text-2xl font-bold font-sans text-rust-500 uppercase tracking-tight">Certifications & Accolades</h3>

                        <div className="flex flex-col gap-8 justify-center h-full">

                            <div className="flex flex-col gap-2">
                                <a href="https://files.lpu.in/umsweb/skilldevcourse/SkillDevelopmentCertificates/12317173_877_20_08_2025.pdf?_gl=1*2pv5rc*_gcl_au*MTYxMjkyOTA0NC4xNzYzMzU0NDYx" target="_blank" rel="noopener noreferrer" className="flex justify-between font-mono text-xs text-chrome-500 uppercase hover:text-rust-500 transition-colors group cursor-pointer">
                                    <span>Linux Fundamentals (LPU) <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span></span>
                                    <span>Aug 2025</span>
                                </a>
                                <div className="h-2 w-full bg-void rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-rust-600" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <a href="https://app.truscholar.io/profile?credId=67d976c3e339c19f6210f90a" target="_blank" rel="noopener noreferrer" className="flex justify-between font-mono text-xs text-chrome-500 uppercase hover:text-rust-500 transition-colors group cursor-pointer">
                                    <span>CodeHunt - Advitiya'25 (IIT Ropar) <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span></span>
                                    <span>Feb 2025</span>
                                </a>
                                <div className="h-2 w-full bg-void rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-rust-500 shadow-[0_0_10px_#ea580c]" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <a href="https://app.truscholar.io/profile?credId=67d9733de339c19f62105f92" target="_blank" rel="noopener noreferrer" className="flex justify-between font-mono text-xs text-chrome-500 uppercase hover:text-rust-500 transition-colors group cursor-pointer">
                                    <span>Capture the Flag (IIT Ropar) <span className="opacity-0 group-hover:opacity-100 transition-opacity">↗</span></span>
                                    <span>Feb 2025</span>
                                </a>
                                <div className="h-2 w-full bg-void rounded-full overflow-hidden">
                                    <motion.div className="h-full bg-rust-400 shadow-[0_0_15px_#ea580c]" initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }} />
                                </div>
                            </div>


                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
