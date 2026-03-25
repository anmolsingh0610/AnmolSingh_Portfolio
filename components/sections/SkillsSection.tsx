"use client";

import GravitySkills from "@/components/physics/GravitySkills";
import { motion } from "framer-motion";

export default function SkillsSection() {
    return (
        <section className="w-full min-h-screen py-24 flex flex-col items-center justify-center perspective-wrapper relative z-20">
            <div className="max-w-7xl w-full px-8 md:px-24 flex flex-col gap-12">
                <motion.div
                    className="flex flex-col gap-2"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="flex items-center gap-4">
                        <span className="text-rust-500 font-mono tracking-widest text-sm">— SYSTEM SPECS</span>
                        <div className="h-px bg-rust-500/50 w-24"></div>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-chrome-100 uppercase tracking-tighter">
                        Technological<br /><span className="text-chrome-500 text-3xl md:text-5xl border-b gap-4">Orbit</span>
                    </h2>
                </motion.div>

                <GravitySkills />
            </div>
        </section>
    );
}
