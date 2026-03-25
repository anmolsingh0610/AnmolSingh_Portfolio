"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const achievements = [
    {
        id: "ACH.01",
        title: "Secured Top 5 spot in AI Fusion Hackathon",
        organization: "IIT Ropar",
        description: "Among top 10 contestants in this hackathon",
        date: "February 2025",
        type: "COMPETITION"
    },
    {
        id: "ACH.02",
        title: "Top 25% in Hack the Box",
        organization: "Hack The Box",
        description: "Completed 20 rooms",
        date: "January 2026",
        type: "RANKING"
    }
];

const DecryptText = ({ text }: { text: string }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [display, setDisplay] = useState(text.replace(/[a-zA-Z]/g, "█"));

    useEffect(() => {
        if (!isInView) return;

        let iteration = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
        const interval = setInterval(() => {
            setDisplay(text.split("").map((letter, index) => {
                if (index < iteration || letter === " ") return text[index];
                return chars[Math.floor(Math.random() * chars.length)];
            }).join(""));

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3; 
        }, 40);

        return () => clearInterval(interval);
    }, [text, isInView]);

    return <span ref={ref}>{display}</span>;
}

export default function AchievementsSection() {
    return (
        <section className="w-full min-h-[80vh] py-24 flex flex-col items-center justify-center perspective-wrapper relative z-20">
            <div className="max-w-5xl w-full px-8 md:px-24 flex flex-col gap-12 border-l border-chrome-900 ml-4 md:ml-0 relative">
                <motion.div
                    className="flex items-center gap-4 -ml-[25px]"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <div className="w-12 h-12 rounded-full border border-rust-500 bg-void flex items-center justify-center text-rust-500 font-mono text-xs shadow-[0_0_15px_rgba(234,88,12,0.5)] z-10 shrink-0">
                        ACH
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-chrome-100 uppercase tracking-tighter shadow-void drop-shadow-lg">
                        Notable <span className="text-chrome-500">Milestones</span>
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-8 mt-4 relative z-0">
                    {achievements.map((achievement, i) => (
                        <motion.div
                            key={achievement.id}
                            className="flex flex-col md:flex-row gap-4 md:gap-12 relative group"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: i * 0.1 }}
                            data-magnetic="true"
                        >
                            {/* Timeline connector dot */}
                            <div className="absolute left-[-47px] top-6 w-3 h-3 rounded-full bg-chrome-900 group-hover:bg-rust-500 group-hover:shadow-[0_0_15px_#ea580c] transition-all hidden md:block" />

                            <div className="flex flex-col text-chrome-500 font-mono text-sm uppercase tracking-widest min-w-[170px] pt-4 md:pt-6">
                                <span className="text-rust-500 font-bold">{achievement.id}</span>
                                <span>{achievement.date}</span>
                                <span className="text-xs bg-chrome-900/50 inline-block px-2 py-1 mt-3 w-max text-center border border-chrome-500/20">{achievement.type}</span>
                            </div>

                            <div className="glass-panel p-6 md:p-8 rounded-xl border border-chrome-500/10 flex-grow group-hover:border-rust-500/30 transition-colors shadow-xl group-hover:shadow-[0_10px_40px_rgba(15,23,42,0.8)]">
                                <h3 className="text-xl md:text-2xl font-bold text-chrome-100 uppercase tracking-tight group-hover:text-rust-400 transition-colors">
                                    <DecryptText text={achievement.title} />
                                </h3>
                                {achievement.organization && (
                                    <h4 className="text-sm font-bold text-chrome-300 uppercase tracking-widest mt-2">
                                        {achievement.organization}
                                    </h4>
                                )}
                                <div className="mt-4 flex items-start gap-2 text-chrome-500 font-mono text-sm group-hover:text-chrome-100 transition-colors">
                                    <div className="w-4 h-px bg-rust-500 mt-2 shrink-0" />
                                    <p className="leading-relaxed normal-case tracking-normal font-sans">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
