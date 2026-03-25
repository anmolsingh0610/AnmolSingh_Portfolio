"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DistortedImage from "@/components/canvas/DistortedImage";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !textRef.current) return;

        // Anchor locking effect
        ScrollTrigger.create({
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
                gsap.to(sectionRef.current, { backgroundColor: "rgba(15, 23, 42, 0.5)", duration: 1 });
                // Trigger haptic feedback if mobile
                if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
                    window.navigator.vibrate(50);
                }
            },
            onLeaveBack: () => {
                gsap.to(sectionRef.current, { backgroundColor: "transparent", duration: 1 });
            }
        });

        gsap.fromTo(
            textRef.current.children,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-screen flex items-center justify-center p-8 md:p-24 perspective-wrapper relative z-20 transition-colors"
        >
            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                {/* Left: Distorted WebGL Portrait */}
                <div className="relative w-full aspect-[3/4] md:max-w-md mx-auto lg:mx-0">
                    <img src="/profile.png" alt="Anmol Singh Profile" className="w-full h-full object-cover rounded-2xl border border-chrome-500/20 shadow-2xl" />

                    <div className="absolute -bottom-6 -right-6 glass-panel px-6 py-4 rounded-xl border border-rust-500/30">
                        <p className="font-mono text-rust-500 font-bold tracking-widest text-sm">IDENT: HUMAN</p>
                    </div>
                </div>

                {/* Right: Personal Voice Typography */}
                <div ref={textRef} className="flex flex-col gap-6 font-sans">
                    <h2 className="text-4xl md:text-6xl font-black text-chrome-100 uppercase tracking-tighter mix-blend-difference">
                        Securing the <br /><span className="text-rust-500">Digital Frontier</span>
                    </h2>
                    <p className="text-lg md:text-xl text-chrome-500 leading-relaxed max-w-xl">
                        I am a Computer Science engineering student at LPU, specializing in Linux systems, cybersecurity, and software development. I build tools that encrypt, protect, and innovate.
                    </p>
                    <p className="text-lg md:text-xl text-chrome-500 leading-relaxed max-w-xl">
                        Equipped with a problem-solving mindset and a passion for ethical hacking and systems administration.
                    </p>

                    <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-8 self-start px-8 py-4 bg-rust-600/20 text-rust-400 font-mono tracking-widest uppercase border border-rust-500/50 hover:bg-rust-500 hover:text-white transition-colors cursor-pointer rounded-sm"
                        data-magnetic="true"
                    >
                        Initiate Contact Sequence
                    </button>
                </div>

            </div>
        </section>
    );
}
