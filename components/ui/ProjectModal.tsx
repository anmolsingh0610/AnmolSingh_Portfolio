"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { X, ExternalLink, Github } from "lucide-react";

export default function ProjectModal({ projectSlug }: { projectSlug: string }) {
    const router = useRouter();

    // Esc key closure handling
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") router.back();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [router]);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            {/* Background Dim - clicking it closes overlay */}
            <motion.div
                className="absolute inset-0 bg-void/80 backdrop-blur-sm cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => router.back()}
            />

            {/* Modal Surface */}
            <motion.div
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass-panel border border-chrome-500/30 rounded-2xl p-8 flex flex-col gap-6 no-scrollbar"
                initial={{ y: 50, scale: 0.95, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: 20, scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <button
                    onClick={() => router.back()}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-chrome-900/50 border border-transparent hover:border-rust-500/50 transition-colors cursor-pointer"
                    data-magnetic="true"
                >
                    <X size={24} className="text-chrome-100" />
                </button>

                <h1 className="text-3xl md:text-5xl font-black text-chrome-100 uppercase tracking-tighter mt-4">
                    PROJECT: <span className="text-rust-500">{projectSlug.toUpperCase().replace("-", " ")}</span>
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-sm font-mono tracking-widest uppercase">
                    <span className="px-3 py-1 bg-chrome-900 rounded-sm text-chrome-100 border border-chrome-500/20">Next.js 14</span>
                    <span className="px-3 py-1 bg-chrome-900 rounded-sm text-chrome-100 border border-chrome-500/20">WebGL</span>
                    <span className="px-3 py-1 bg-chrome-900 rounded-sm text-chrome-100 border border-chrome-500/20">Matter.js</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-sans text-rust-500">Mission Parameter</h3>
                        <p className="text-chrome-500 leading-relaxed">
                            Traditional grid systems fail to capture the chaotic yet deterministic nature of physical dependencies in complex software architectures. The goal is to escape linear reading patterns.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold font-sans text-rust-500">Implemented Solution</h3>
                        <p className="text-chrome-500 leading-relaxed">
                            Engineered a zero-gravity interaction paradigm using vectorized layout engines and rigid body physics logic overlaying the standard DOM. Achieved sub-100ms interaction latency.
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                    <a href="#" className="flex items-center gap-2 px-6 py-3 bg-rust-600 text-chrome-100 font-bold font-mono text-sm uppercase tracking-widest hover:bg-rust-500 transition-colors rounded-sm" data-magnetic="true">
                        <ExternalLink size={18} /> View Live
                    </a>
                    <a href="#" className="flex items-center gap-2 px-6 py-3 bg-chrome-900 text-chrome-100 font-bold font-mono text-sm uppercase tracking-widest border border-chrome-500/30 hover:bg-chrome-800 transition-colors rounded-sm" data-magnetic="true">
                        <Github size={18} /> Source Code
                    </a>
                </div>
            </motion.div>
        </div>
    );
}
