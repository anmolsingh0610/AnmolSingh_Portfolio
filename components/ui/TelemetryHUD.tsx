"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TelemetryHUD() {
    const [time, setTime] = useState("");
    const [scrollP, setScrollP] = useState(0);

    useEffect(() => {
        const updateTime = () => {
            const d = new Date();
            const istString = new Intl.DateTimeFormat('en-GB', {
                timeZone: 'Asia/Kolkata',
                hour: '2-digit', minute: '2-digit', second: '2-digit',
                hour12: false
            }).format(d);
            setTime(`${istString} IST`);
        };
        updateTime();
        const t = setInterval(updateTime, 1000);

        const handleScroll = () => {
            const scrolled = window.scrollY;
            const max = document.body.scrollHeight - window.innerHeight;
            if (max > 0) {
                setScrollP(Math.round((scrolled / max) * 100));
            } else {
                setScrollP(0);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            clearInterval(t);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <motion.div
            className="fixed top-8 right-8 z-[100] flex-col items-end gap-1 font-mono text-xs tracking-widest uppercase pointer-events-none hidden lg:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 2 }}
        >
            <div className="text-rust-500 font-bold mb-1 drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]">SYSTEM NOMINAL</div>
            <div className="flex items-center gap-3 text-chrome-500">
                <span>T+ {time}</span>
                <div className="w-1.5 h-1.5 bg-rust-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(234,88,12,1)]" />
            </div>
            <div className="text-chrome-500">Z-AXIS ALTITUDE: {scrollP}%</div>
            <div className="text-chrome-900 mt-2 text-[10px]">COORDINATE: 42°21'N 71°03'W</div>
        </motion.div>
    );
}
